const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gyroSchema = new Schema({
    did: { type: Number, required: true },
    gx: { type: Number, required: true },
    gy: { type: Number, required: true },
    gz: { type: Number, required: true },
  }, {
    timestamps: true,
  });
  
  const GyroData = mongoose.model('gyro_data', gyroSchema);

module.exports = GyroData;