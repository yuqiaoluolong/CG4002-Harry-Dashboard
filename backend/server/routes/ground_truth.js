const router = require('express').Router();
let GroundTruth = require('../models/ground_truth.model');

router.route('/').get((req, res) => {                       //get the info of all ground truth
    GroundTruth.find()
    .then(groundtruths => res.json(groundtruths))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {                   //add a ground truth
    const ground_truth = req.body.grount_truth;

    const newGroundTruth = new GroundTruth({ground_truth});

    newGroundTruth.save()
    .then(() => res.json('Ground Truth added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {                    //get the info about the ground_truth with id:..
    GroundTruth.findById(req.params.id)
    .then(ground_truth => res.json(ground_truth))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) => {                 //delete the ground_truth with id:..
    GroundTruth.findByIdAndDelete(req.params.id)
    .then(() =>res.json('Ground Truth deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {                    //delete all ground truth
    GroundTruth.deleteMany()
    .then(() =>res.json('All Ground Truth deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;