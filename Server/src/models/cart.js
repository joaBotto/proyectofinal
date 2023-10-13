const mongoose = require("mongoose");
const cartCollection = "carts";

const cartSchema = mongoose.Schema(
  {
    products: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
          },
          quantity: Number,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
