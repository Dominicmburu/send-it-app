const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const credentials = {
    // apiKey: 'atsk_98afb0ae3202f5a9f1ce5687677f590ddf3277245e423a7cdfe0f6990a29831bb1c7911e',
    apiKey: process.env.API_KEY,
    // username: 'h-care',
    username: process.env.AFRICAS_USERNAME,
};

const AfricasTalking = require("africastalking")(credentials);

const sms = AfricasTalking.SMS;

router.post("/send-sms", (req, res) => {
    const { to, message } = req.body;

    if (!to || !message) {
        return res.status(400).json({ error: "Phone number and message are required" });
    }

    sms.send({
        to,
        message,
        enqueue: true
    })

        .then(response => {
            console.log(response);
            res.json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error.toString() });
        });
});

router.post("/delivery", async (req, res) => {
    console.log(req.body);

    res.status(200).json({
        status: "success",
        message: "SMS received successfully"
    });
});

router.post('/incoming-sms', (req, res) => {
    const message = req.body.text;
    const from = req.body.from;

    // Forward the SMS to the main server
    axios.post(`${process.env.MAIN_SERVER_URL}/api/tickets/incoming-sms`, {
        message,
        from,
    })
    .then(response => {
        res.status(200).send('OK');
    })
    .catch(error => {
        console.error('Error forwarding incoming SMS:', error);
        res.status(500).send('Error');
    });
});

module.exports = router;


