const express = require("express");
const bodyParser = require("body-parser");
const ngrok = require("ngrok");
const decodeJWT = require("did-jwt").decodeJWT;
const { Credentials } = require("uport-credentials");
const transports = require("uport-transports").transport;
const message = require("uport-transports").message.util;
const cors = require("cors");
const ethers = require("ethers");
const { abi } = require("./contract");
const { creds } = require("./credentials");

const provider = new ethers.providers.JsonRpcProvider("https://blockchainfyjsubbloc.blockchain.azure.com:3200/OBwwyHUPU7aZFrPT5aCtRkzm")
const wallet = new ethers.Wallet("282e974241d6f77f753966aae8fa3ab0b64ab2ab6d9e28a3aee4a021699d937c", provider);
const contractAddress = "0x33fBDF52047c0519376Bf4247A461D4bE7a023c7";


const ElectionContract = new ethers.Contract(contractAddress, abi, provider);
const ContractWithSigner = ElectionContract.connect(wallet);

let endPoint = "";
const app = express();
app.use(bodyParser.json({ type: "*/*" }));
app.use(cors());

let voterRegistry = {
  byWalletAddr: {},
  isWalletAddrRegistered: {},
  voterToAdd: ""
};

let generateOtpRequestState = {
  state: "not-started"
  /*
    Other states:
      1. started
      2. done
      3. failed
  */
}

const credentials = new Credentials({
  appName: "uport-example-app",
  did: creds.did,
  privateKey: creds.privateKey
});

app.post("/", (req, res) => {
  const payload = req.body;
  voterRegistry = {
    byWalletAddr: { ...voterRegistry.byWalletAddr, [payload.walletAddr]: payload },
    isWalletAddrRegistered: { ...voterRegistry.isWalletAddrRegistered, [payload.walletAddr]: false },
    voterToAdd: payload.walletAddr
  }
  credentials
    .createDisclosureRequest({
      requested: ["name"],
      notifications: true,
      callbackUrl: endPoint + "/callback"
    })
    .then(requestToken => {
      console.log(decodeJWT(requestToken));
      const uri = message.paramsToQueryString(
        message.messageToURI(requestToken),
        { callback_type: "post" }
      );
      const qr = transports.ui.getImageDataURI(uri);
      res.send({ qr });
    });
});

app.post("/callback", (req, res) => {
  const jwt = req.body.access_token;
  credentials
    .authenticateDisclosureResponse(jwt)
    .then(creds => {
      console.log("Credentials: ", creds);
      const push = transports.push.send(creds.pushToken, creds.boxPub);
      const { voterToAdd } = voterRegistry;
      credentials
        .createVerification({
          sub: creds.did,
          // exp: Math.floor(new Date().getTime() / 1000) + 30 * 24 * 60 * 60,
          claim: { "Voter Credentials": { 
            "Name": voterRegistry.byWalletAddr[voterToAdd].name,
            "Date of Birth": voterRegistry.byWalletAddr[voterToAdd].dob,
            "Registered wallet": voterToAdd,
            "Registered Constituency": voterRegistry.byWalletAddr[voterToAdd].constituency }}    
        })
        .then(attestation => {
          console.log(`Encoded JWT sent to user: ${attestation}`);
          console.log(
            `Decodeded JWT sent to user: ${JSON.stringify(
              decodeJWT(attestation)
            )}`
          );
          return push(attestation);
        })
        .then(async res => {
          console.log(res);
          console.log(
            "Push notification sent and should be recieved any moment..."
          );
          console.log(
            "Accept the push notification in the uPort mobile application"
          );
          const { voterToAdd } = voterRegistry;
          let tx = await ContractWithSigner.registerVoter(voterRegistry.byWalletAddr[voterToAdd].constituency, voterToAdd);
          await tx.wait()
          console.log("Transaction: ", tx);
          // ngrok.disconnect();
        });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/start-verification", (req, res) => {
  generateOtpRequestState = { state: "not-started" }
  credentials.createDisclosureRequest({
    verified: ["Voter Credentials"],
    callbackUrl: endPoint + "/generate-otp"
  }).then(requestToken => {
    const uri = message.paramsToQueryString(message.messageToURI(requestToken), {callback_type: 'post'});
    const qr =  transports.ui.getImageDataURI(uri);
    res.send({ qr });
  });
});

app.post('/generate-otp', (req, res) => {
  generateOtpRequestState = { state: "started" }
  const jwt = req.body.access_token;
  credentials.authenticateDisclosureResponse(jwt).then(async _creds => {
    //validate specific data per use case
    if(_creds.verified[0].iss === creds.did) {
      const reqWalletAddr = _creds.verified[0].claim["Voter Credentials"]["Registered wallet"];
      const otp = Math.floor((Math.random()*10000) + 1);
      console.log("OTP: ", otp);
      const tx = await ContractWithSigner.mapOTP(otp, reqWalletAddr);
      await tx.wait();
      console.log("mapOTP tx: ", tx);
      generateOtpRequestState = { state: "done", otp: otp }
    }
    // console.log("verfied[0]: ", _creds.verified[0]);
  }).catch( err => {
    console.log("oops");
  })
});

app.get("/otpstate", (req, res) => {
  res.send(generateOtpRequestState);
});

app.post("/registercandidate", async (req, res) => {
  const candidate = req.body;
  const tx = await ContractWithSigner.registerCandidate(
    candidate.name,
    candidate.constituency,
    candidate.politicalParty,
    candidate.walletAddress
  );
  await tx.wait();
  res.send(candidate);
});

const server = app.listen(8088, () => {
  ngrok.connect(8088).then(ngrokUrl => {
    endPoint = ngrokUrl;
    console.log(`Login Service running, open at ${endPoint}`);
  });
});
// const server = app.listen(8088, (url) => {
//   console.log(url)
// });