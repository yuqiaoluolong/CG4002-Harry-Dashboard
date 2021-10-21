const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accSchema = new Schema({
    did: { type: Number, required: true },
    ax: { type: Number, required: true },
    ay: { type: Number, required: true },
    az: { type: Number, required: true },
  }, {
    timestamps: true,
  });
  
  const AccData = mongoose.model('acc_data', accSchema);

module.exports = AccData;