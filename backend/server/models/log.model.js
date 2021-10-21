const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
    dance_move_type: String,
    relative_postion: String
  }, {
    timestamps: true,
  });
  
  const Log= mongoose.model('test_input_log', logSchema);

module.exports = Log;