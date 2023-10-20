const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  images:{
    type:String
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  

	type: String,
  active:Boolean,
  role: String,

  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  ],
  paymentInfo: paymentSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
