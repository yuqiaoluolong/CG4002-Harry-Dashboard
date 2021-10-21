const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
    relative_postion: String,
    dance_move_type: String,
    delay: Number
  }, {
    timestamps: true,
  });
  
  const Log= mongoose.model('test_input_log', logSchema);

module.exports = Log;