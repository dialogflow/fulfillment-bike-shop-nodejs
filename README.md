# API.AI: Mary's Bike Shop using Node.js and Cloud Functions for Firebase

## Setup Instructions

### Steps
1. Open the API.AI console.
1. Click *Save* to save the project.
1. Click on the gear icon to see the project settings.
1. Select *Export and Import*.
1. Select *Restore from zip*. Follow the directions to restore from the `MarysBikeShop.zip` file in this directory.
1. Create a Google Cloud project, enable the Google Calendar API and create an OAuth client IDs credentials
1. Download the <code>client_secrets.json</code> file and save it to the <code>functions</code> directory.
1. Run <code>npm install</code> in the <code>functions</code> directory
1. Run <code>node acthorizeGoogleCalendar.js</code> and follow the prompts to authorize access to your calendar.
1. Deploy the fulfillment webhook provided in the `functions` folder using [Google Cloud Functions for Firebase]
(https://firebase.google.com/docs/functions/):
    1. Follow the instructions to [set up and initialize Firebase SDK for Cloud Functions](https://firebase.google.com/docs/functions/get-started#set_up_and_initialize_functions_sdk). Make sure to reply `N` when asked to overwrite existing files by the Firebase CLI.
    1. Run `firebase deploy --only functions:marysBikeShop` and take note of the endpoint where the fulfillment webhook has been published. It should look like `Function URL (marysBikeShop): https://${REGION}-${PROJECT}.cloudfunctions.net/marysBikeShop`
1. Go back to the API.AI console and select *Fulfillment* from the left navigation menu. Enable *Webhook*, set the value of *URL* to the `Function URL` from the previous step, then click *Save*.
1. Select *Intents* from the left navigation menu. Select the `Bike Service Intent` intent, scroll down to the end of the page and click *Fulfillment*, check *Use webhook* and then click *Save*.

## How to make contributions?
Please read and follow the steps in the [CONTRIBUTING.md](CONTRIBUTING.md).

## License
See [LICENSE](LICENSE).

## Terms
Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).
