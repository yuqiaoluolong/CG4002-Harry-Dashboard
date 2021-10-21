const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groundTruthSchema = new Schema({
    dance_move_type: String,
    relative_postion: String
  }, {
    timestamps: true,
  });
  
  const GroundTruth= mongoose.model('ground_truth', groundTruthSchema);

module.exports = GroundTruth;