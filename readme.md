# BeBot

The main zoot chatbot. This is very much in its infancy & currently most resembles a development playground. Expect it to change.

Currently the supported functionality & keywords are supported:

| Action        | Keywords      | Examples  |
| :------------- |:-------------| :---------|
| What's On      | happening <br> playing <br> what <br> gig | What's happening? <br> Who's playing? <br> What's on? <br> Show me todays gigs |
| | | |
| | | |





## Running BeBot

Quite a number of steps are required to get BeBot up & running. Simplifying this process & making it repeatable for multiple developers in parallel is something that is absolutely required.


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
cd .../BeBot/
```

2. Add the Facebook page & vertify tokens to your environment    
```bash
export page_token={page token}
export verify_token={verify token}
```

3. Install dependencies
```bash
npm install
```

4. Start the bot    
```bash
node bot.js
```


### 3. Configure Facebook

**NOTE: BeBot must be started before this step or Facebook won't accept the webhook URL as valid.**

Next we'll configure our Facebook page to talk to allow messenger conversations & tell it how to connect with our chatbot.


1. Navigate to [Developer Facebook](https://developer.facebook.com)
2. Go to `My Apps` & select your app
3. Go to `Webhooks` -> `Edit subscription` & enter:    
    - Callback URL: {ngrok https forwarding url}/facebook/receive
    - Verify Token: Whatever you like, just take note of it as we'll need it later
4. Go to `Messenger` -> `Settings` & scroll down to `Webhooks` & select the page to subscribe. If required, re-enter the webhook details used in step 3


### 4. Chat with Zoot

If everything went as planned above you should now be able to chat with Zoot. Start a Facebook messenger chat with Zoot & chat away :)