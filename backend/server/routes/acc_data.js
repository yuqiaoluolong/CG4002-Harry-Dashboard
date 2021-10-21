const router = require('express').Router();
let AccData = require('../models/acc_data.model');

router.route('/').get((req, res) => {                       //get the info of all acc_data
    AccData.find()
    .then(accdatas => res.json(accdatas))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {                   //add a acc_data
    const acc_data = req.body.acc_data;

    const newAccData = new AccData({acc_data});

    newAccData.save()
    .then(() => res.json('AccData added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {                    //get the info about the acc_data with id:..
    AccData.findById(req.params.id)
    .then(accdata => res.json(accdata))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) => {                 //delete the acc_data with id:..
    AccData.findByIdAndDelete(req.params.id)
    .then(() =>res.json('Acc_data deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {                    //delete all acc_data
    AccData.deleteMany()
    .then(() =>res.json('All Acc_data deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;