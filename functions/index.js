const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors')
const stripe = require('stripe')('sk_test_51IR3I1FIhTeLNQmVz03h4Ej1EmKua4cF13xPjdAVPcVIdXG0mw8zwKnVpgDmB80x81ZVPpBswibjtegyHNNOx6px007vEQNjE4')

//API

//App config
const app = express();

//Middlewares
app.use(cors({ origin:true }));
app.use(express.json());

//API routes
    //for test purpose
app.get('/', (request,response) => response.status(200).send('Hello World'))
app.post('/payments/create', async (request, response)=> {
    const total = request.query.total;

    console.log('Payment request received for this amount ---->', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: "usd",
    });

    // 201 status -> created something
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})

//Listen command
exports.api = functions.https.onRequest(app);

//Example endpoint
//http://localhost:5001/challenge-b6e36/us-central1/api