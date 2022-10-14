const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { Stripe } = require('stripe');

const app = express();
const stripe = new Stripe(functions.config().stripe.secret);

app.use(cors({ origin: true }));
app.use(express.json());

app.post('/payments/create', async (req, res) => {
  const { total } = req.query;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'usd',
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);
