# Dialogflow Bike Shop Sample

## Setup Instructions
### Dialogflow Setup
1. [Sign up for or sign into Dialogflow](https://console.dialogflow.com/api-client/#/login)
1. [Create a Dialogflow agent](https://dialogflow.com/docs/getting-started/building-your-first-agent#create_an_agent)
1. [Restore the zip file `BikeShopAgent.zip`](https://dialogflow.com/docs/agents#export_and_import)

### Google Calendar Setup
#### Service Account Setup
1. In [Dialogflow's console](https://console.dialogflow.com), click the settings button (⚙) to go to your agent's settings. In the project ID section click on the name of the project to open the Google Cloud console for the project.
1. In the Cloud console click on the menu button (☰), then **APIs & Services > Library**
1. Search for and select the **Google Calendar API** and then click **Enable** to enable the API on your cloud project
1. Next select **Credentials** on the left, then click **Create Credentials** and select **Service Account Key** from the dropdown menu.
1. Select **New Service Account** from the dropdown and enter `bike-shop-calendar` for the name and click **Create**. In the popup, select **Create Without Role**.  A JSON file will be downloaded to your computer that you'll use in the "Bike Shop Calendar Setup" and "Fulfillment Setup" sections below.

#### Bike Shop Calendar Setup
1. Open the JSON file that was downloaded in the previous section ("Service Account Setup"), and copy the email address indicated by the `client_email` field (it should look like `bike-shop-calendar@${PROJECTID}.iam.gserviceaccount.com`)
1. [Open Google Calendar](https://calendar.google.com) and on the left click the **+** next to **Add a friends calendar** and select **New Calendar**
1. Enter `Bike Shop` for the name of the calendar and then click **Create Calendar**. Next, click on the bike shop calendar that will appear on the left column.
1. Paste the email copied in the first step of this section into the **Add people** field in the **Share with specific people** section and then select **Make changes to events** in the permissions dropdown and click **Send**.
1. Scroll down and copy the **Calendar ID** in the **Integrate Calendar** section.


### Fulfillment Setup
#### Add service account and Calendar ID to `index.js`
1. Open the `functions/index.js` file in this repo
1. Paste the **Calendar ID** copied in a "Bike Shop Calendar Setup" section into the `const calendarId = '<INSERT CALENDAR ID HERE>'` and replace `<INSERT CALENDAR ID HERE>` on line 25 of `index.js`. (the line should look similar to `const calendarId = '6ujc6j6rgfk02cp02vg6h38cs0@group.calendar.google.com'`)
1. Next copy the contents of the JSON file downloaded in the "Service Account Setup" section and paste it into `const serviceAccount = {}` on the next line.  Paste the raw JSON, without quotes.  The JSON file will be multiple lines, the first few coouple lines should look something like this:

    const serviceAccount = {
      "type": "service_account",
    ...

1. Save the `index.js` file

Choose from one of the to two options below, only one (inline editor *or* Firebase CLI) is required:
#### Fulfillment Setup Option #1: Dialogflow Inline Editor
1. [Enable the Cloud Function for Firebase inline editor](https://dialogflow.com/docs/fulfillment#cloud_functions_for_firebase)
1. Copy this code in `functions/index.js` the `index.js` file in the Dialogflow Cloud Function for Firebase inline editor.
1. Copy this code in `functions/package.json` the `package.json` file in the Dialogflow Cloud Function for Firebase inline editor.
1. Click `Deploy`

#### Fulfillment Setup Option #2: Firebase CLI
1. `cd` to the `functions` directory
1. Run `npm install`
1. Install the Firebase CLI by running `npm install -g firebase-tools`
1. Login to your Google account with `firebase login`
1. Add your project to the sample with `firebase use [project ID]` [find your project ID here](https://dialogflow.com/docs/agents#settings)
1. Run `firebase deploy --only functions:dialogflowFirebaseFulfillment`
1. Paste the URL into your Dialogflow agent's fulfillment and click `Save`

## Running the sample
1. In [Dialogflow's console](https://console.dialogflow.com), in the Dialogflow simulator on the right, query your Dialogflow agent with `My bike is broken` and answer the questions your Dialogflow agent asks.  After getting the requuired information a appointment will be added to the "Bike Shop Calendar" calendar you setup earlier.

## License
See [LICENSE](LICENSE).

## Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).
