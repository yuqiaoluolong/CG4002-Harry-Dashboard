const MQTT_BROKER = require("mqtt");
const CryptoJS = require("crypto-js")
const BASE_64 = require("base-64")
require('dotenv').config()

const MQTT_BROKER_URL = 'tcp://broker.hivemq.com:1883'
//const MQTT_BROKER_URL = 'tcp://0.tcp.ap.ngrok.io:'+process.argv[2]
//const MQTT_BROKER_URL = 'tcp://0.tcp.ap.ngrok.io:11280'
console.log(MQTT_BROKER_URL);

const MQTT_BROKER_URL2 = `ws://broker.emqx.io:8083/mqtt`

const ULTRA_TO_DASHBOARD_TOPIC = "ultraToDashboard"
const LAPTOP_TO_DASHBOARD_TOPIC = "laptopToDashboard"
const REACT_TOPIC = 'dance move type | relative position | sync delay'

const SECRET_KEY_PASSPHRASE = process.env.SECRET_KEY_PASSPHRASE

const client = MQTT_BROKER.connect(MQTT_BROKER_URL);

const client2 = MQTT_BROKER.connect(MQTT_BROKER_URL2);

class Dancer {
  constructor(number, isHoldingEmg) {
      this.index = number
      this.syncRating = null
      this.currMove = null
      this.correctMoves = 0
      this.moveAccuracy = 0

      this.beetleStatus = [false, false]
      if(isHoldingEmg)
          this.emgBeetleStatus = false
  }

  updateMoveAccuracy(new_move, performedMoves) {
      if (new_move == this.currMove)
          this.correctMoves += 1

      if (performedMoves > 0)
          this.moveAccuracy = this.correctMoves/performedMoves  * 100
  }

} 

const MAX_DANCERS = 3

class DancerGroup {
    
    constructor() {
        this.dancers = [new Dancer(1), new Dancer(2, true), new Dancer(3)]
        this.performedMoves = 0


        this.groupMoveAccuracy = 0
        
        this.position
        this.correctPositions = 0
        this.groupPositionAccuracy = 0

        this.syncDelay = []
        this.averageSync = 0


    }

    updateBeetleStatus(beetle_index, status, isEmgBeetle = false) {
        if (isEmgBeetle)
            this.dancers[1].emgBeetleStatus = status
        else {
            var dancer_index = 0
            if (beetle_index > 3)
                dancer_index = 2
            else if (beetle_index > 1)
                dancer_index = 1
            
            this.dancers[dancer_index].beetleStatus[beetle_index % 2] = status
        }

    }

    updateDanceMove(index, move) {
        console.log(index)
        this.dancers[index].currMove = move
    }

    updateSyncRating(index, syncRating) {
        this.dancers[index].syncRating = syncRating
    }

    updateInferenceResults(position, move, syncDelay) {
	this.performedMoves += 1
        for (var i = 0; i < MAX_DANCERS; i++)
            this.dancers[i].updateMoveAccuracy(move, this.performedMoves)
        
        var calc_num = this.dancers[0].correctMoves + this.dancers[1].correctMoves + this.dancers[2].correctMoves
        var calc_den = this.performedMoves * 3
        this.groupMoveAccuracy = calc_num /calc_den * 100

        this.position = position.split(" ").map(Number)
    }

  }

client2.on("connect", () => {
  client2.subscribe(REACT_TOPIC, (error) => { //change topic name
    if (!error) 
	    console.log("Dashboard has connected to MQTT Broker and ready to publish data for page!")
    
  });
});
var danceGroupStats = new DancerGroup()

client2.on("error", (error) => {
  console.log(error);
  console.log("Reconnecting...")
  client.reconnect();
  
});

client2.on("disconnect", (packet) => {
  client2.reconnect();
});

client2.on("message", (REACT_TOPIC, message) => {

  console.log("Received Message from database: " + message);
  // Do stuff with it
  
});


client.on("connect", () => {                      //connect to mqtt
  client.subscribe(ULTRA_TO_DASHBOARD_TOPIC, (error) => {
    if (!error) 
      console.log("Dashboard has connected to MQTT Broker and subscribed to receive data from Ultra 96!")
    
  });
  client.subscribe(LAPTOP_TO_DASHBOARD_TOPIC, (error) => {
    if (!error) 
      console.log("Dashboard has connected to MQTT Broker and subscribed to receive data from Laptop!")
    
  });
});   

const express = require('express');               //connect to mongodb
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//message schema
const messageSchema = new mongoose.Schema({
  message: String,
}, {
  timestamps: true,
});

const Message = mongoose.model('messages', messageSchema);

const newMessage = new Message({
  message: "the first message",
});

//yaw, pitch, roll schema
const yprSchema = new mongoose.Schema({
  did: Number,
  roll: Number,
  pitch: Number,
  yaw: Number,
}, {
  timestamps: true,
});

const YprData = mongoose.model('ypr_data', yprSchema);

const newYprData = new YprData({
  did: 1,
  roll: 312.2,
  pitch: 123.4,
  yaw: 1.4,
});

//gyro_data schema
const gyroSchema = new mongoose.Schema({
  did: Number,
  gx: Number,
  gy: Number,
  gz: Number,
}, {
  timestamps: true,
});

const GyroData = mongoose.model('gyro_data', gyroSchema);

const newGyroData = new GyroData({
  did: 1,
  gx: 1.34,
  gy: 12.4,
  gz: 34.2,
});

//acc_data schema
const accSchema = new mongoose.Schema({
  did: Number,
  ax: Number,
  ay: Number,
  az: Number,
}, {
  timestamps: true,
});

const AccData = mongoose.model('acc_data', accSchema);

const newAccData = new AccData({
  did: 1,
  ax: 14.3,
  ay: 15.3,
  az: 23.2,
});

//test input log schema
const logSchema = new mongoose.Schema({
  dance_move_type: String,
  relative_postion: String
}, {
  timestamps: true,
});

const Log= mongoose.model('test_input_log', logSchema);

const newLog = new Log({
  dance_move_type: "Dance Move Type 1",
  relative_postion: "Position 1, 3, 2"
});

//ground truth schema
const groundTruthSchema = new mongoose.Schema({
  dance_move_type: String,
  relative_postion: String
}, {
  timestamps: true,
});

const GroundTruth= mongoose.model('ground_truth', groundTruthSchema);

const newGroundTruth = new GroundTruth({
  dance_move_type: "Dance Move Type 2",
  relative_postion: "Position 1, 3, 2"
});

//EMG
const emgSchema = new mongoose.Schema({
  number: Number,
  emg: String
}, {
  timestamps: true,
});

const EMG= mongoose.model('emg', emgSchema);

//

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }         //connect
  );
  const connection = mongoose.connection;
  connection.once('open', () => {
      console.log("MongoDB database connection established successfully");
  })
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);    //server running
});                                                     //

//
//newUser.save().then(() => console.log("Saved new user"));
//newMessage.save().then(() => console.log("Saved new message"));
//newYprData.save().then(() => console.log("Saved new yprMessage"));
//newGyroData.save().then(() => console.log("Saved new gyroMessage"));
//newAccData.save().then(() => console.log("Saved new accMessage"));
//newLog.save().then(() => console.log("Saved new test input log"));
//newGroundTruth.save().then(() => console.log("Saved new ground truth"));
//
// sendMessage("connected", "d1beetle1");
// sendMessage("mermaid | 1 2 3 | 78", "dance move type | relative position | sync delay");
// sendMessage("mermaid", "dancer1");
// console.log("sent beetle connection");

client.on("error", (error) => {
  console.log(error);
  console.log("Reconnecting to mqtt...")
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
      //console.log("Received yprdata: " + decrypted_message);    //print received data
      // Do stuff with it
      const newYprData = new YprData({
        id: Math.trunc(parseInt(decrypted_message.split("|")[1])/2 + 1),
        roll: parseFloat(decrypted_message.split("|")[2].substring(decrypted_message.split("|")[2].indexOf("sr")+2)),
        pitch: parseFloat(decrypted_message.split("|")[3].substring(decrypted_message.split("|")[3].indexOf("sp")+2)),
        yaw: parseFloat(decrypted_message.split("|")[4].substring(decrypted_message.split("|")[4].indexOf("sy")+2)),
      });
      //newYprData.save().then(() => console.log("Saved new YPR_DATA: Dancer" + Math.trunc(parseInt(decrypted_message.split("|")[1])/2 + 1) + " ROLL" + parseFloat(decrypted_message.split("|")[2].substring(decrypted_message.split("|")[2].indexOf("sr")+2)) + " PITCH" + parseFloat(decrypted_message.split("|")[3].substring(decrypted_message.split("|")[3].indexOf("sp")+2)) + " YAW" + parseFloat(decrypted_message.split("|")[4].substring(decrypted_message.split("|")[4].indexOf("sy")+2))));
    }
    //gyro
    if (decrypted_message.includes("gx")) {
      //console.log("Received gyrodata: " + decrypted_message);    //print received data
      // Do stuff with it
      const newGyroData = new GyroData({
        id: Math.trunc(parseInt(decrypted_message.split("|")[1])/2 + 1),
        gx: parseFloat(decrypted_message.split("|")[2].substring(decrypted_message.split("|")[2].indexOf("gx")+2)),
        gy: parseFloat(decrypted_message.split("|")[3].substring(decrypted_message.split("|")[3].indexOf("gy")+2)),
        gz: parseFloat(decrypted_message.split("|")[4].substring(decrypted_message.split("|")[4].indexOf("gz")+2)),
      });
      //newGyroData.save().then(() => console.log("Saved new GYRO_DATA: Dancer" + Math.trunc(parseInt(decrypted_message.split("|")[1])/2 + 1) + " GX" + parseFloat(decrypted_message.split("|")[2].substring(decrypted_message.split("|")[2].indexOf("gx")+2)) + " GY" + parseFloat(decrypted_message.split("|")[3].substring(decrypted_message.split("|")[3].indexOf("gy")+2)) + " GZ" + parseFloat(decrypted_message.split("|")[4].substring(decrypted_message.split("|")[4].indexOf("gz")+2))));
    }
    //acc
    if (decrypted_message.includes("ax")) {
      //console.log("Received accdata: " + decrypted_message);    //print received data
      // Do stuff with it
      const newAccData = new AccData({
        id: Math.trunc(parseInt(decrypted_message.split("|")[1])/2 + 1),
        ax: parseFloat(decrypted_message.split("|")[2].substring(decrypted_message.split("|")[2].indexOf("ax")+2)),
        ay: parseFloat(decrypted_message.split("|")[3].substring(decrypted_message.split("|")[3].indexOf("ay")+2)),
        az: parseFloat(decrypted_message.split("|")[4].substring(decrypted_message.split("|")[4].indexOf("az")+2)),
      });
      //newAccData.save().then(() => console.log("Saved new ACC_DATA: Dancer" + Math.trunc(parseInt(decrypted_message.split("|")[1])/2 + 1) + " AX" + parseFloat(decrypted_message.split("|")[2].substring(decrypted_message.split("|")[2].indexOf("ax")+2)) + " AY" + parseFloat(decrypted_message.split("|")[3].substring(decrypted_message.split("|")[3].indexOf("ay")+2)) + " AZ" + parseFloat(decrypted_message.split("|")[4].substring(decrypted_message.split("|")[4].indexOf("az")+2))));
    }
    if (decrypted_message.includes("#")) {
      console.log("Received log: " + decrypted_message);    //print received data
      // Do stuff with it
      const newLog = new Log({
        relative_postion: decrypted_message.split("|")[0].substring(decrypted_message.split("|")[0].indexOf("#")+1),
        dance_move_type: decrypted_message.split("|")[1],
        delay: parseFloat(decrypted_message.split("|")[2]),
      });
      newLog.save().then(() => console.log("Saved new Inference: relative_postion-" + decrypted_message.split("|")[0].substring(decrypted_message.split("|")[0].indexOf("#")+1) + " dance move type-" + decrypted_message.split("|")[1] + " delay-" + parseFloat(decrypted_message.split("|")[2])));
      sendMessage(decrypted_message.split("|")[1] + " | dancer " + decrypted_message.split("|")[0].substring(decrypted_message.split("|")[0].indexOf("#")+1) + " | " + parseFloat(decrypted_message.split("|")[2]), REACT_TOPIC);
      console.log(newLog.relative_postion)
      danceGroupStats.updateInferenceResults(newLog.relative_postion, newLog.dance_move_type, newLog.delay)
      console.log(danceGroupStats)
    }

    if (decrypted_message.includes("DS")) {
      console.log("Received emg: " + decrypted_message);    //print received data
      console.log(decrypted_message.split("|")[2]);
      // Do stuff with it
      const newEMG = new EMG({
        number: parseInt(decrypted_message.split("|")[1]),
        emg: decrypted_message.split("|")[2],
      });
      newEMG.save().then(() => console.log("Saved new EMG: number-" + parseInt(decrypted_message.split("|")[1]) + "EMG- " + decrypted_message.split("|")[2]));
      if(parseFloat(decrypted_message.split("|")[2].substring(3)) < 1) {
        sendMessage("not tired", "emg");
      } else if (parseFloat(decrypted_message.split("|")[2].substring(3)) < 3) {
        sendMessage("slow", "emg");
      } else {
        sendMessage("tired", "emg");
      }
      //sendMessage("DS | " + parseInt(decrypted_message.split("|")[1]) + " | " + decrypted_message.split("|")[2] , REACT_TOPIC2);
    } 

    //receive bettle connection: d1bettle1: connected or d1bettle1: disconnected
    if (decrypted_message.includes("bettle")) {
      console.log("Received bettle connection: " + decrypted_message);
      sendMessage(decrypted_message.split(":")[1], decrypted_message.split(":")[0]);
    }
    //receive dancer move type: dancer1: dab
    if(decrypted_message.includes("dancer")) {
      console.log("Received dancer move type: " + decrypted_message);
      sendMessage(decrypted_message.split(":")[1], decrypted_message.split(":")[0]);
    }

    else if(decrypted_message.startsWith("HS")) {
      splitSegments = decrypted_message.split("|")
      danceGroupStats.createDancer(parseInt(decrypted_message[2]),splitSegments[1]);
    }

    else if(decrypted_message.startsWith("BTS")) {
      splitSegments = decrypted_message.split("|")
      // danceGroupStats.processSyncStatus(splitSegments[1])
      sendMessage(decrypted_message.split("|")[3], "delay" + decrypted_message.split("|")[1]);
      console.log("delay" + parseFloat(decrypted_message.split("|")[3]) + "delay" + decrypted_message.split("|")[1]);
    }

    else if(decrypted_message.startsWith("P")) {
      console.log(decrypted_message.split("|")[1])
      splitSegments = decrypted_message.split("|")
      // danceGroupStats.processSyncStats()
      sendMessage(decrypted_message.split("|")[1], "position");
    }
    
    else if(decrypted_message.startsWith("BC")) { 
      danceGroupStats.updateBeetleStatus(parseInt(decrypted_message[2]), true);
      console.log(decrypted_message);
      console.log(danceGroupStats);
      switch (parseInt(decrypted_message.substring(2))) {
        case 1 : sendMessage("connected", "beetle1");
          break;
        case 2 : sendMessage("connected", "beetle2");
          break;
        case 3 : sendMessage("connected", "beetle3");
          break;
        case 4 : sendMessage("connected", "beetle4");
          break;
        case 5 : sendMessage("connected", "beetle5");
          break;
        case 6 : sendMessage("connected", "beetle6");
          break;
        case 0 : sendMessage("connected", "beetle7");
          break;
      }
    }

    else if(decrypted_message.startsWith("BDC")) {
      danceGroupStats.updateBeetleStatus(parseInt(decrypted_message[2]), false)
      console.log(decrypted_message)
      console.log(danceGroupStats)
      switch (parseInt(decrypted_message.substring(3))) {
        case 1 : sendMessage("disconnected", "beetle1");
          break;
        case 2 : sendMessage("disconnected", "beetle2");
          break;
        case 3 : sendMessage("disconnected", "beetle3");
          break;
        case 4 : sendMessage("disconnected", "beetle4");
          break;
        case 5 : sendMessage("disconnected", "beetle5");
          break;
        case 6 : sendMessage("disconnected", "beetle6");
          break;
        case 0 : sendMessage("disconnected", "beetle7");
          break;
      }
    }

    else if(decrypted_message.startsWith("A")) {
      console.log(decrypted_message.split("|")[2])
      danceGroupStats.updateDanceMove(parseInt(decrypted_message[2]), decrypted_message.substring(4))
      //console.log(danceGroupStats)
      sendMessage(decrypted_message.split("|")[2], "dancer" + (parseInt(decrypted_message.split("|")[1])+1));
    }

    //console.log("Received Message: " + decrypted_message);    //print received data
    // Do stuff with it
    const newMessage = new Message({
      message: decrypted_message,
    });
    //newMessage.save().then(() => console.log("Saved new message"));
  }
});

function sendMessage(message, destTopic) {
  client2.publish(destTopic, message)
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
