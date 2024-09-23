const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/payment-sheet', async (req, res) => {
    console.log(req.body); // Debug request body
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'lkr',
        automatic_payment_methods: {
          enabled: true
        }
      });
      res.json({ paymentIntent: paymentIntent.client_secret });
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error);
    }
  });

app.listen(PORT, () => {
    console.log("Server is Running at " + PORT);
});