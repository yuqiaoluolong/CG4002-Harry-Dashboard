const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const MQTT_BROKER = require("mqtt");
const CryptoJS = require("crypto-js")
const BASE_64 = require("base-64")

require('dotenv').config();

const MQTT_BROKER_URL = 'tcp://broker.hivemq.com:1883'

const DASHBOARD_TO_ULTRA_TOPIC = "dashboardToUltra"
const ULTRA_TO_DASHBOARD_TOPIC = "ultraToDashboard"
const LAPTOP_TO_DASHBOARD_TOPIC = "laptopToDashboard"

const ACKNOWLEDGEMENT_MESSAGE = 'ACK_DASHBOARD'

const SECRET_KEY_PASSPHRASE = process.env.SECRET_KEY_PASSPHRASE

const client = MQTT_BROKER.connect(MQTT_BROKER_URL);

client.on("connect", () => {                      //connect to mqtt
  client.subscribe(ULTRA_TO_DASHBOARD_TOPIC, (error) => {
    if (!error) 
      console.log("Dashboard has connected to MQTT Broker and subscribed to receive data from Ultra 96!")
    
  });
});                                               //
client.on("connect", () => {                      //connect to mqtt
  client.subscribe(ULTRA_TO_DASHBOARD_TOPIC, (error) => {
    if (!error) 
      console.log("Dashboard has connected to MQTT Broker and subscribed to receive data from Ultra 96!")
    
  });
  client.subscribe(LAPTOP_TO_DASHBOARD_TOPIC, (error) => {
    if (!error) 
      console.log("Dashboard has connected to MQTT Broker and subscribed to receive data from Ultra 96!")
    
  });
});   

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }			//leave out the useCreateIndex because not supported.
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const messageRouter = require('./routes/messages');
const yprDataRouter = require('./routes/ypr_data');
const gyroDataRouter = require('./routes/gyro_data');
const accDataRouter = require('./routes/acc_data');
const logRouter = require('./routes/log');
const groundTruthRouter = require('./routes/ground_truth');

app.use('/messages', messageRouter);
app.use('/yprdatas', yprDataRouter);
app.use('/gyrodatas', gyroDataRouter);
app.use('/accdatas', accDataRouter);
app.use('/logs', logRouter);
app.use('/groundtruths', groundTruthRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//
//newUser.save().then(() => console.log("Saved new user"));
//newMessage.save().then(() => console.log("Saved new message"));
//newYprData.save().then(() => console.log("Saved new yprMessage"));
//newGyroData.save().then(() => console.log("Saved new yprMessage"));
//newAccData.save().then(() => console.log("Saved new yprMessage"));
//newLog.save().then(() => console.log("Saved new test input log"));
//newGroundTruth.save().then(() => console.log("Saved new ground truth"));
//

client.on("error", (error) => {
  console.log(error);

  if(error == ECONNREFUSED || error == ECONNRESET) 
    client.reconnect();
  
});

client.on("disconnect", (packet) => {
  client.reconnect();
});

client.on("message", (topic, message) => {
  
  var decrypted_message = decryptData(message)

  if (decrypted_message) {

    //ypr
    if (decrypted_message.includes("sr")) {
      console.log("Received: " + decrypted_message);    //print received data
      // Do stuff with it
      const newYprData = new YprData({
        did: parseInt(parseInt(decrypted_message.substring(2,3))/2) + 1,
        roll: parseFloat(decrypted_message.substring(6, decrypted_message.indexOf("sp")-1)),
        pitch: parseFloat(decrypted_message.substring(decrypted_message.indexOf("sp")+2, decrypted_message.indexOf("sy")-1)),
        yaw: parseFloat(decrypted_message.substring(decrypted_message.indexOf("sy")+2)),
      });
      newYprData.save().then(() => console.log("Saved new YPR_DATA: Dancer" + parseInt(parseInt(decrypted_message.substring(2,3))/2) + " YAW-" + parseFloat(decrypted_message.substring(14, decrypted_message.indexOf("pitch")-2)) + "PITCH" + parseFloat(decrypted_message.substring(decrypted_message.indexOf("pitch")+6, decrypted_message.indexOf("roll")-2)) + "ROLL" + parseFloat(decrypted_message.substring(decrypted_message.indexOf("roll")+5))));
    }
    //gyro
    if (decrypted_message.includes("gx")) {
      console.log("Received: " + decrypted_message);    //print received data
      // Do stuff with it
      const newGyroData = new GyroData({
        did: parseInt(parseInt(decrypted_message.substring(2,3))/2) + 1,
        gx: parseFloat(decrypted_message.substring(6, decrypted_message.indexOf("gy")-1)),
        gy: parseFloat(decrypted_message.substring(decrypted_message.indexOf("gy")+2, decrypted_message.indexOf("gz")-1)),
        gz: parseFloat(decrypted_message.substring(decrypted_message.indexOf("gz")+2)),
      });
      newGyroData.save().then(() => console.log("Saved new GYRO_DATA: Dancer" + parseInt(parseInt(decrypted_message.substring(2,3))/2) + " X-" + parseFloat(decrypted_message.substring(13, decrypted_message.indexOf("y|")-2)) + "Y" + parseFloat(decrypted_message.substring(decrypted_message.indexOf("y|")+2, decrypted_message.indexOf("z|")-2)) + "Z" + parseFloat(decrypted_message.substring(decrypted_message.indexOf("z|")+2))));
    }
    //acc
    if (decrypted_message.includes("ax")) {
      console.log("Received: " + decrypted_message);    //print received data
      // Do stuff with it
      const newAccData = new AccData({
        did: parseInt(parseInt(decrypted_message.substring(2,3))/2) + 1,
        ax: parseFloat(decrypted_message.substring(6, decrypted_message.indexOf("ay")-1)),
        ay: parseFloat(decrypted_message.substring(decrypted_message.indexOf("ay")+2, decrypted_message.indexOf("az")-1)),
        az: parseFloat(decrypted_message.substring(decrypted_message.indexOf("az")+2)),
      });
      newAccData.save().then(() => console.log("Saved new ACC_DATA: Dancer" + parseInt(parseInt(decrypted_message.substring(2,3))/2) + " X-" + parseFloat(decrypted_message.substring(12, decrypted_message.indexOf("y|")-2)) + "Y" + parseFloat(decrypted_message.substring(decrypted_message.indexOf("y|")+2, decrypted_message.indexOf("z|")-2)) + "Z" + parseFloat(decrypted_message.substring(decrypted_message.indexOf("z|")+2))));
    }
    if (decrypted_message.includes("test input log")) {
      console.log("Received: " + decrypted_message);    //print received data
      // Do stuff with it
      const newLog = new Log({
        dance_move_type: decrypted_message.substring(15, decrypted_message.indexOf("|")),
        relative_postion: decrypted_message.substring(decrypted_message.indexOf("|")+1),
      });
      newLog.save().then(() => console.log("Saved new TEST IPUT LOG: X-" + decrypted_message.substring(15, decrypted_message.indexOf("|")) + decrypted_message.substring(decrypted_message.indexOf("|")+1)));
    }
    console.log("Received Message: " + decrypted_message);    //print received data
    // Do stuff with it
    const newMessage = new Message({
      message: decrypted_message,
    });
    newMessage.save().then(() => console.log("Saved new message"));
  }
});

function sendMessage(message, destTopic) {
  var encrypted_message = encryptData(message)
    
  if (encrypted_message)
    client.publish(destTopic, encrypted_message)
}

function padMessage(plainText) {
  var extraCharacters = plainText.length % 16
  if (extraCharacters == 0) 
    return plainText 
  return plainText.concat(" ".repeat(16 - extraCharacters))
}

function encryptData(plainText) {
  var paddedMessage = padMessage(plainText)

  var iv = CryptoJS.lib.WordArray.random(16);

  var key = CryptoJS.enc.Utf8.parse(SECRET_KEY_PASSPHRASE);
  try {
    var encrypted = CryptoJS.AES.encrypt(paddedMessage, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.NoPadding
    });

    var final_string = iv.clone().concat(encrypted.ciphertext); 

    return CryptoJS.enc.Base64.stringify(final_string);
  } catch (InvalidCharacterError) {
    console.log("Invalid Encryption")
    return null
  }
}

function decryptData(cipherText) {
  var decoded_string = BASE_64.decode(cipherText.toString())

  var iv = decoded_string.substring(0,16)
  var cipher = decoded_string.substring(16)

  var iv_words = CryptoJS.enc.Latin1.parse(iv)
  var cipher_words = CryptoJS.enc.Latin1.parse(cipher)
  var key = CryptoJS.enc.Utf8.parse(SECRET_KEY_PASSPHRASE);

  try {
    var decrypted = CryptoJS.AES.decrypt({ciphertext: cipher_words}, key, {
      iv: iv_words,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.NoPadding
    });

    return decrypted.toString(CryptoJS.enc.Utf8).trim()
  } catch (InvalidCharacterError) {
    console.log("Invalid Decryption")
    return null
  }
}
