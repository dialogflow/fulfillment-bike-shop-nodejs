/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const functions = require('firebase-functions');
const google = require('googleapis');
const fs = require('fs');

// Get user's calendar authorization information
const clientSecrets = require('./client_secret.json');
const clientId = clientSecrets.installed.client_id;
const clientSecret = clientSecrets.installed.client_secret;
const refreshToken = require('./google-calendar-auth.json').refresh_token;

// Set the time zone
const timeZone = 'America/Los_Angeles';
const timeZoneOffset = '-07:00';

exports.marysBikeShop = functions.https.onRequest((req, res) => {
  // Set header for response
  res.setHeader('Content-Type', 'application/json');

  // Setup Google Calendar Auth
  let OAuth2 = google.auth.OAuth2;
  let auth = new OAuth2(clientId, clientSecret);
  auth.setCredentials({refresh_token: refreshToken});
  auth.refreshAccessToken(function(err, tokens) {
    if (err) { console.log("Auth Error: Credentials not set up: " + err); }
  });

  // Get the city and date from the request
  let date = req.body.result.parameters['date']; // city is a required param
  let timeStart = req.body.result.parameters['time']; // city is a required param
  let appointmentType = req.body.result.parameters['appointment-type']; // city is a required param

  // Calculate appointment start and end datetimes (end = +1hr from start)
  dateTimeStart = Date.parse(date + 'T' + timeStart + timeZone);
  dateTimeEnd = new Date(dateTimeStart)
  dateTimeEnd.setHours(datetimeStart.getHours() + 1 );

  console.log("Appointment Start: " + dateTimeStart);
  console.log("Appointment End: " + dateTimeEnd);
  
  // Check calendar, if event -> reject, if no event -> create event
  let calendar = google.calendar('v3');
  calendar.events.list({
  	auth: auth,
  	calendarId: 'primary',
  	timeMin: dateTimeStart.toISOString(),
  	timeMax: dateTimeEnd.toISOString()
  	}, function(err, response) {
  	if (err) {
  	  console.log('Error retriving calendar information: ' + err);
  	  const errorResponse = 'Sorry, I can\'t seem to connect to my calendar, please try again later.';
	    res.send(JSON.stringify({ 'speech': errorResponse, 'displayText': errorResponse }));
  	}
  	let events = response.items;
  	// Create event if there isn't a event already there for this time period
  	if (events.length == 0) {
  	  console.log('No events found.');
  
  	  calendar.events.insert({
  		auth: auth,
  		calendarId: 'primary',
  		resource: {'summary': appointmentType,
  			'start': {'dateTime': dateTimeStart},
  			'end': {'dateTime': dateTimeEnd}}},
  		function(err, event) {
  		if (err) {
  			console.log('Error creating calendar event: ' + err);
  			const errorResponse = 'Sorry, I can\'t seem to connect to my calendar, please try again later.';
	    	res.send(JSON.stringify({ 'speech': errorResponse, 'displayText': errorResponse }));
  		}
  		console.log('Event created: %s', event.htmlLink);
  		const successResponse = `Great! I've setup your appointment for ${dateTimeStart.toLocaleString('en-US')}.  See you then`;
    	res.send(JSON.stringify({ 'speech': successResponse, 'displayText': successResponse }));
  	  });
  	} else {
  	  console.log('Event already present in requested period');
	    const rejectResponse = `I'm sorry, there are no slots available for ${dateTimeStart.toLocaleString('en-US')}, would you like to check another time?`;
	    res.send(JSON.stringify({ 'speech': rejectResponse, 'displayText': rejectResponse }));
  	}
  });
});
