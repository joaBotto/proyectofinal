const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ // DEFINO EL FORMATO DEL DOCUMENTO QUE VA A TENER EL MODELO
    id: String,
    name:String,
    lastName: String,
})

const users = mongoose.Model('users', userSchema); // CREO EL MODELO Y LE ASIGNO EL DOCUMENTO

module.exports = users;