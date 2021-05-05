# chatwoot-websocket-messages-exchanger

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

This project aims to allow the exchange of messages with [Chatwoot](https://github.com/chatwoot/chatwoot) API via Web Socket(socket.io).

## Getting Started <a name = "getting_started"></a>

1. Setup the application that you want to receive websocket messages from using these [socket.io documentation](https://socket.io/docs/v3/client-api/index.html)
2. Setup Chatwoot following these [steps](https://www.chatwoot.com/docs/contributing-guide/project-setup)
3. Signup to a new account in your running Chatwoot instance
4. Create a new inbox in your Chatwoot instance
5. Generate a ACCESS TOKEN in Chatwoot. This token can be obtained by visiting the profile page in your Chatwoot instance or via rails console
6. Create a .env file in the root of chatwoot-api-messages-exchanger project and add the following environment variables:

```
CLIENT_ENDPOINT_URL = http://url-of-your-websocket-service-to-receive-the-messages.com
CHATWOOT_URL = http://chatwoot-instance-url.com
API_ACCESS_TOKEN = TheTokenThatYouGeneratedInStepOne
INBOX_ID = 1 /* A easy way to obtain this id is accessing the Chatwoot inbox page and take it from the URL of that page */
ACCOUNT_ID = 2 /* A easy way to obtain this id is to take it from the URL after signin into Chatwoot */
```

7. To test that everything is working, open a Terminal and type "yarn" to install all dependencies and "yarn start" to start the application

### Prerequisites

- Chatwoot setted-up;
- An application using socket.io client;

## Usage <a name = "usage"></a>

Send messages from your client and see them appearing in the configured Chatwoot Inbox.
