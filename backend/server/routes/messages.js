const router = require('express').Router();
let Message = require('../models/message.model');

router.route('/').get((req, res) => {
    Message.find()
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const message = req.body.message;

    const newMessage = new Message({message});

    newMessage.save()
    .then(() => res.json('Message added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;