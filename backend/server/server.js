const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }			//leave out the useCreateIndex because not supported.
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const messageRouter = require('./routes/messages');
const yprDataRouter = require('./routes/ypr_data');
const gyroDataRouter = require('./routes/gyro_data');
const accDataRouter = require('./routes/acc_data');
const logRouter = require('./routes/log');
const groundTruthRouter = require('./routes/ground_truth');

app.use('/messages', messageRouter);
app.use('/yprdatas', yprDataRouter);
app.use('/gyrodatas', gyroDataRouter);
app.use('/accdatas', accDataRouter);
app.use('/logs', logRouter);
app.use('/groundtruths', groundTruthRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});