const {Schema, model} = require('mongoose');

const paymentTypeSchema = new Schema({
    name:{ 
        type: String,
        required: true
    }
})

module.exports = model('PaymentType', paymentTypeSchema);