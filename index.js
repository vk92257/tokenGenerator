
const express = require('express');

const RtcTokenBuilder = require('./src/RtcTokenBuilder').RtcTokenBuilder;
// const RtcTokenBuilder = require(__dirname+'./..').RtcTokenBuilder;
const RtcRole = require('./src/RtcTokenBuilder').Role;

const app = express();
app.use(express.json());
 
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.post('/api/token', function (req, res){
const appID = req.body.appID;
const appCertificate = req.body.appCertificate;
const channelName = req.body.channelName;
const uid = req.body.uid;
const account = req.body.account;
const role = RtcRole.PUBLISHER;

const expirationTimeInSeconds = 3600;

const currentTimestamp = Math.floor(Date.now() / 1000);

const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

// IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

// Build token with uid
const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);
// console.log("Token With Integer Number Uid: " + tokenA);

// Build token with user account
const tokenB = RtcTokenBuilder.buildTokenWithAccount(appID, appCertificate, channelName, account, role, privilegeExpiredTs);
// console.log("Token With UserAccount: " + tokenB);

res.status(200).json({
    status:"successs",
    tokenA:{
            tokenWithUID:tokenA,
    },
    tokenB:{
            tokenWithUserAccount:tokenB    
    },
});
});
 
 let port = process.env.PORT|| 3000;
 
app.listen(port);
