const router = require('express').Router();
let Log = require('../models/log.model');

router.route('/').get((req, res) => {                       //get the info of all test input logs
    Log.find()
    .then(logs => res.json(logs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {                   //add a log
    const log = req.body.log;

    const newLog = new Log({log});

    newLog.save()
    .then(() => res.json('Log added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {                    //get the info about the log with id:..
    Log.findById(req.params.id)
    .then(log => res.json(log))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req, res) => {                 //delete the log with id:..
    Log.findByIdAndDelete(req.params.id)
    .then(() =>res.json('Log deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {                    //delete all logs
    Log.deleteMany()
    .then(() =>res.json('All Logs deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;