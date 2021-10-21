const router = require('express').Router();
let GyroData = require('../models/gyro_data.model');

router.route('/').get((req, res) => {                       //get the info of all gyro_data
    GyroData.find()
    .then(gyrodatas => res.json(gyrodatas))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {                   //add a gyro_data
    const did = Number(req.body.did);
    const gx = Number(req.body.ax);
    const gy = Number(req.body.ay);
    const gz = Number(req.body.az);  

    const newGyroData = new GyroData({
        did,
        gx,
        gy,
        gz,
    });

    newGyroData.save()
    .then(() => res.json('GyroData added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {                    //get the info about the gyro_data with id:..
    GyroData.findById(req.params.id)
    .then(gyrodata => res.json(gyrodata))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) => {                 //delete the gyro_data with id:..
    GyroData.findByIdAndDelete(req.params.id)
    .then(() =>res.json('Gyro_data deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {                    //delete all gyro_data
    GyroData.deleteMany()
    .then(() =>res.json('All Gyro_data deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;