# Dashboard monitor water level by Reactjs + Nodejs

This simple web dashboard for monitor water level, client (Reactjs) will fetch data from backend server (Nodejs) by socket.io and backend server (Nodejs) fetch data from firebase realtime database.

## .ENV file for Server folder

```
NODE_ENV=production node index.js
PORT=5001
NODE_PRIVATE_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
NODE_DATABASEURL="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
NODE_PROJECT_ID="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
NODE_PRIVATE_KEY_ID="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
NODE_CLIENT_EMAIL="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
NODE_CLIENT_ID="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
NODE_CLIENT_X509="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

Get this value from Firebase Admin SDK

## Project photo

<img alt="photo1" src="https://i.ibb.co/BfdZWcm/Screenshot-16.png">

## Other project

- Arduino monitor water level with NodeMCU ESP8266 + firebase + Blynk: https://github.com/kreangsak-project-sharing/arduino-water-level-firebase-blynk
- Arduino monitor water level with NodeMCU ESP8266 + firebase: https://github.com/kreangsak-project-sharing/arduino-water-level-firebase-realtime
