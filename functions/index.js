const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
  'sk_test_51LrmN4CMUJYb034JbjVq0I6EHWYpAHDTNY064z9KDHfLpMnAfKEZP0i8iVycyoGl2QqthlcDknBkYQ6JlYcaVgdt00zWqOOmOi'
);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (req, res) => res.status(200).send('hello world'));

exports.api = functions.https.onRequest(app);
