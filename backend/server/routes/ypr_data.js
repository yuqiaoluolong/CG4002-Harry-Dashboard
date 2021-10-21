const router = require('express').Router();
let YprData = require('../models/ypr_data.model');

router.route('/').get((req, res) => {                       //get the info of all ypr_data
    YprData.find()
    .then(yprdatas => res.json(yprdatas))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {                   //add a ypr_data
    const ypr_data = req.body.ypr_data;

    const newYprData = new YprData({ypr_data});

    newYprData.save()
    .then(() => res.json('YprData added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {                    //get the info about the ypr_data with id:..
    YprData.findById(req.params.id)
    .then(yprdata => res.json(yprdata))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) => {                 //delete the ypr_data with id:..
    YprData.findByIdAndDelete(req.params.id)
    .then(() =>res.json('Ypr_data deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {                    //delete all ypr_data
    YprData.deleteMany()
    .then(() =>res.json('All ypr_data deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;