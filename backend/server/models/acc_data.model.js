const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accSchema = new Schema({
    x: Number,
    y: Number,
    z: Number,
  }, {
    timestamps: true,
  });
  
  const AccData = mongoose.model('acc_data', accSchema);

module.exports = AccData;