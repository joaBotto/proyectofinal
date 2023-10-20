const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
	imageUrl: {
		type: String,
		required: true,
	},
});

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
    /* required: true, */
    unique: true,
  },
  password: {
    type: String,
    /* required: true, */
  },
  name: {
    type: String,
    /* required: true, */
  },
  lastName: {
    type: String,
    /* required: true, */
  },
  image:{
    type:String
  },
  country: {
    type: String,
    /* required: true, */
  },
  city: {
    type: String,
    /* required: true, */
  },
  address: {
    type: String,
    /* required: true, */
  },
  phoneNumber: {
    type: String,
    /* required: true, */
  },
  images: [imageSchema],

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
