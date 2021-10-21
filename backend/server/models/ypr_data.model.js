const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const yprSchema = new Schema({
  did: { type: Number, required: true },
  roll: { type: Number, required: true },
  pitch: { type: Number, required: true },
  yaw: { type: Number, required: true },
  }, {
    timestamps: true,
  });
  
const YprData = mongoose.model('ypr_data', yprSchema);

module.exports = YprData;