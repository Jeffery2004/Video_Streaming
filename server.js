// server.js
const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = Stripe("your-secret-key");

app.use(express.json());
app.use(cors());

app.post("/payment", async (req, res) => {
  const { amount, id } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method: id,
      confirm: true,
    });
    res.json({ success: true, payment });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
