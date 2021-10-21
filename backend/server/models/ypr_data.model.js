const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const yprSchema = new Schema({
    yaw: Number,
    pitch: Number,
    roll: Number,
  }, {
    timestamps: true,
  });
  
const YprData = mongoose.model('ypr_data', yprSchema);

module.exports = YprData;