# Dialogflow Bike Shop Sample

## Setup Instructions
### Dialogflow and Fulfillment Setup
Click on the **Add to Dialogflow** button below and follow the prompts to create a new agent:

[![Bike Shop](https://storage.googleapis.com/dialogflow-oneclick/deploy.svg "Bike Shop")](https://console.dialogflow.com/api-client/oneclick?templateUrl=https://storage.googleapis.com/dialogflow-oneclick/bike-shop-agent.zip&agentName=BikeShopSample)

#### Service Account Setup
1. In [Dialogflow's console](https://console.dialogflow.com), go to settings ⚙ and under the general tab, you'll see the project ID section with a Google Cloud link to open the Google Cloud console. Open **Google Cloud**.
2. In the Cloud console, go to the menu icon **☰ > APIs & Services > Library**
3. Select **Google Calendar API** and then **Enable** to enable the API on your cloud project.
4. Under the menu icon **☰ > APIs & Services > Credentials > Create Credentials > Service Account Key**.
5. Under **Create service account key**, select **New Service Account** from the dropdown and enter `bike-shop-calendar` for the name and click **Create**. In the popup, select **Create Without Role**.  
  + JSON file will be downloaded to your computer that you will need in the setup sections below.

#### Bike Shop Calendar Setup
1. Open the JSON file that was downloaded in the previous section and copy the email address indicated by the `client_email` field
```js
// Ex:
bike-shop-calendar@${PROJECTID}.iam.gserviceaccount.com
```
2. [Open Google Calendar](https://calendar.google.com). On the left, next to **Add a friend's calendar** click the **+** and select **New Calendar**
3. Enter `Bike Shop` for the name of the calendar and select **Create Calendar**. Next, go to the `Bike Shop` calendar that will appear on the left column.
4. Paste the email copied from the first step into the **Add people** field of the **Share with specific people** section and then select **Make changes to events** in the permissions dropdown and select **Send**.
5. While still in Settings, scroll down and copy the **Calendar ID** in the **Integrate Calendar** section.

#### Add Service Account and Calendar ID to Fulfillment
1. Go to the `index.js` file in [Dialogflow's Fulfillment section](https://console.dialogflow.com/api-client/#/agent//fulfillment)
2. Take the **Calendar ID** copied from the prior section and replace `<INSERT CALENDAR ID HERE>` on line 24 of `index.js`.
```js
// Ex:
const calendarId = '6ujc6j6rgfk02cp02vg6h38cs0@group.calendar.google.com';
```
3. Next copy the contents of the JSON file downloaded in the "Service Account Setup" section and paste it into the empty object on line 25 of `index.js` `const serviceAccount = {}`.
```js
//Ex:
    const serviceAccount = {
      "type": "service_account",
      "project_id": "bikesample",
    ...
  };
```
4. Click **Deploy** at at the bottom of the page.

## Running the sample
1. In [Dialogflow's console](https://console.dialogflow.com), in the Dialogflow simulator on the right, query your Dialogflow agent with `My bike is broken` and respond to the questions your Dialogflow agent asks.   After getting the required information, an appointment will be added to the "Bike Shop Calendar" calendar.

## How to make contributions?
Please read and follow the steps in the CONTRIBUTING.md.

## License
See [LICENSE](LICENSE).

## Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).
