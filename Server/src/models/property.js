const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
      type: String,
      required: true,
    },
  });

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      description: String,
      price: {
        type: Number,
        required: true,
      },
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
      },
      bedrooms: Number,
      bathrooms: Number,
      availableDates: [
        {
          type: Date,
          required: true,
        },
      ],
      images: [imageSchema],
    /*   owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }, */

})

const Property = mongoose.model('Property', propertySchema);

module.exports= Property;

