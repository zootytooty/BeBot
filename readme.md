# BeBot

The main zoot chatbot. This is very much in its infancy & currently most resembles a development playground. Expect it to change.

Currently the supported functionality & keywords are supported:

| Action        | Examples  |
| :------------- | :---------|
| What's On      | What's happening? <br> Who's playing at jazzlab? <br> What's on tomorrow? <br> Show me todays gigs |
| Help | Help! <br> help me <br> What can you do? |
| Hello | Hey! <br> Hello <br> sup |
| | | |

## Running BeBot

Quite a number of steps are required to get BeBot up & running. Simplifying this process & making it repeatable for multiple developers in parallel is something that is absolutely required.

### 0. Deployment
BeBot is deployed to Heroku, which simply starts the app (`npm start`). Collect the hosted domain from:
1. Enter app (`zoot-bot` in this case)
2. Settings
3. Domain, eg `https://what-a-great-app.herokuapp.com`

Local hosting might be desirable though for development purposes:

### 1. Setup NGROK

ngrok allows for exposing local webservers without having to deal with opening ports etc.

1. Download [ngrok](https://ngrok.com/) & unzip
2. Navigate to where it's located & start a server on port 3000 using:
```bash
./ngrok http 3000
```

Take note of the `https` forwarding URL as you'll need to provide that to facebook.


### 2. Start BeBot

In a new terminal:

1. Navigate to the bot location:
```bash
cd ../BeBot/
```

2. Create a `.env` file so the app can load in required tokens and secrets    
```bash
FACEBOOK_APPID={appId}
FACEBOOK_APP_SECRET={appSecret}
FACEBOOK_ACCESS_TOKEN={accessToken}
FACEBOOK_VERIFY_TOKEN={verifyToken}

WIT_TOKEN={witToken}
```

3. Install dependencies
```bash
npm ci
```

4. Start BeBot for development. nodemon will watch for changes to files and re-start BeBot for you.
```bash
npm run dev
```

5. Or to start BeBot regularly.
```bash
npm run start
```






### 3. Configure Facebook

**NOTE: BeBot must be started before this step or Facebook won't accept the webhook URL as valid.**

Next we'll configure our Facebook page to talk to allow messenger conversations & tell it how to connect with our chatbot.


1. Navigate to [Developer Facebook](https://developer.facebook.com)
2. Go to `My Apps` & select your app
3. Go to `Webhooks` -> `Edit subscription` & enter:    
    - Callback URL: `https://{hostname}:3000/api/messages`
    - Verify Token: The value specified in your `FACEBOOK_VERIFY_TOKEN` environment variable
4. Go to `Messenger` -> `Settings` & scroll down to `Webhooks` & select the page to subscribe. If required, re-enter the webhook details used in step 3


### 4. Chat with Zoot

If everything went as planned above you should now be able to chat with Zoot. Start a Facebook messenger chat with Zoot & chat away :)