const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gyroSchema = new Schema({
    x: Number,
    y: Number,
    z: Number,
  }, {
    timestamps: true,
  });
  
  const GyroData = mongoose.model('gyro_data', gyroSchema);

module.exports = GyroData;