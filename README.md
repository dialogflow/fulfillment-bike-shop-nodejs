# Dialogflow Bike Shop Sample

## Setup Instructions
### Dialogflow and Fulfillment Setup

To create this agent from our template:

<a href="https://console.dialogflow.com/api-client/oneclick?templateUrl=https://oneclickgithub.appspot.com/dialogflow/fulfillment-bike-shop-nodejs&agentName=BikeShopSample" target="blank">
  <img src="https://dialogflow.com/images/deploy.png">
</a>

#### Service Account Setup
1. In [Dialogflow's console](https://console.dialogflow.com), go to settings ⚙ and under the general tab, you'll see the project ID section with a Google Cloud link to open the Google Cloud console. Open **Google Cloud**.
1. In the Cloud console, go to the menu icon **☰ > APIs & Services > Library**
1. Select **Google Calendar API** and then **Enable** to enable the API on your cloud project.
1. Under the menu icon **☰ > APIs & Services > Credentials > Create Credentials > Service Account Key**.
1. Under **Create service account key**, select **New Service Account** from the dropdown and enter `bike-shop-calendar` for the name and click **Create**. In the popup, select **Create Without Role**.
    + JSON file will be downloaded to your computer that you will need in the setup sections below.

#### Bike Shop Calendar Setup
1. Open the JSON file that was downloaded in the previous section and copy the email address indicated by the `client_email` field
```js
// Ex:
bike-shop-calendar@${PROJECTID}.iam.gserviceaccount.com
```
1. [Open Google Calendar](https://calendar.google.com). On the left, next to **Add a friend's calendar** click the **+** and select **New Calendar**
1. Enter `Bike Shop` for the name of the calendar and select **Create Calendar**. Next, go to the `Bike Shop` calendar that will appear on the left column.
1. Paste the email copied from the first step into the **Add people** field of the **Share with specific people** section and then select **Make changes to events** in the permissions dropdown and select **Send**.
1. While still in Settings, scroll down and copy the **Calendar ID** in the **Integrate Calendar** section.

#### Add Service Account and Calendar ID to Fulfillment
1. Go to the `index.js` file in [Dialogflow's Fulfillment section](https://console.dialogflow.com/api-client/#/agent//fulfillment)
1. Take the **Calendar ID** copied from the prior section and replace `<INSERT CALENDAR ID HERE>` on line 24 of `index.js`.
```js
// Ex:
const calendarId = '6ujc6j6rgfk02cp02vg6h38cs0@group.calendar.google.com';
```
1. Next copy the contents of the JSON file downloaded in the "Service Account Setup" section and paste it into the empty object on line 25 of `index.js` `const serviceAccount = {}`.
```js
//Ex:
    const serviceAccount = {
      "type": "service_account",
      "project_id": "bikesample",
    ...
  };
```
1. Click **Deploy** at at the bottom of the page.

#### [OPTIONAL] Add Bike Shop FAQ Knowledge Connector
1. Go to `bike-shop-faq.csv` in this repo >  Raw > Copy the contents to a file on your computer.
1. In Dialogflow's console go to **Settings (⚙) > General** tab **> Enable Beta Features and APIs > Save**.
1. Go to the **Knowledge** tab in the left menu > **Create Knowledge Base**.  
  + Name the knowledge base `Bike Shop` then **Save**
1. Next, click **Create the first one**.
  + Use `Bike Shop FAQ` for document name,
  + `text/csv` for the "Mime Type",
  + `FAQ` for the "Knowledge type",
  + Under "Data source" > select `Upload file from computer` to upload `bike-shop-faq.csv`> **Create**.
1. In the response section > click **Add Response**. In text response you should see `$Knowledge.Answer[1]` > **Save**.
1. Try it out! In the simulator on the right enter `do you sell ebikes?`. You should see the exact response from the CSV you just uploaded: "We sell Electric bikes. We also can outfit your existing bike with a retrofit Bionx electric wheel kit. We do not do gas powered conversions."

## Running the sample
1. In [Dialogflow's console](https://console.dialogflow.com), in the simulator on the right, query your Dialogflow agent with `My bike is broken` and respond to the questions your Dialogflow agent asks.   After getting the required information, an appointment will be added to the "Bike Shop Calendar" calendar.

## How to make contributions?
Please read and follow the steps in the CONTRIBUTING.md.

## License
See [LICENSE](LICENSE).

## Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).
