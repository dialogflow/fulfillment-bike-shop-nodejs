/*
 * Copyright 2017 The Android Open Source Project.
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

const google = require('googleapis');
const clientId = 'CLIENTID';
const clientSecret = 'CLIENTSECRET';
const refreshToken = 'REFRESHTOKEN';
const timeZoneOffset = '-04:00'

exports.marysBikeShop = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // Get the city and date from the request
  let date = req.body.result.parameters['date']; // city is a required param
  let timeStart = req.body.result.parameters['time']; // city is a required param
  let appointmentType = req.body.result.parameters['appointment-type']; // city is a required param

  // Setup Google Calendar Auth
  let OAuth2 = google.auth.OAuth2;
  let auth = new OAuth2(clientId, clientSecret);
  auth.setCredentials({refresh_token: refreshToken});
  auth.refreshAccessToken(function(err, tokens) {
  	if (err) { console.log("Auth Error: " + err); }
  });
  
  // Calculate appointment start and end datetimes (end = +1hr from start)
  if (parseInt(timeStart.slice(0,2)) + 1 > 9) {
  	var timeEnd = (parseInt(timeStart.slice(0,2))+1).toString() + timeStart.slice(2,8);
  } else {
  	var timeEnd = "0" + (parseInt(timeStart.slice(0,2))+1).toString() + timeStart.slice(2,8);
  }
  let dateTimeStart = date + "T" + timeStart + timeZoneOffset;
  let dateTimeEnd = date + "T" + timeEnd + timeZoneOffset;
  console.log("Appointment Start: " + dateTimeStart);
  console.log("Appointment End: " + dateTimeEnd);
  
  // Check calendar, if event reject, if no event, create event
  let calendar = google.calendar('v3');
  calendar.events.list({
  	auth: auth,
  	calendarId: 'primary',
  	timeMin: dateTimeStart,
  	timeMax: dateTimeEnd
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
  		const successResponse = `Great! I've setup your appointment for ${date} at ${timeStart}.  See you then`;
    	res.send(JSON.stringify({ 'speech': successResponse, 'displayText': successResponse }));
  	  });
  	} else {
  	  console.log('Event already present in requested period');
	    const rejectResponse = `I'm sorry, there are no slots available for ${date} at ${timeStart}, would you like to check another time?`;
	    res.send(JSON.stringify({ 'speech': rejectResponse, 'displayText': rejectResponse }));
  	}
  });
};
