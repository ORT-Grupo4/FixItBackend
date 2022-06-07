const {Schema, model} = require('mongoose');

const workSchema= new Schema({
    userClient: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userProfessional: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true,
    },
    paymentType: {
        type: Schema.Types.ObjectId,
        ref: "PaymentType",
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true,
        enum: ['pendiente', 'aceptado', 'finalizado']
    },
    start:{
        type: Date,
        required:false
    }, 
    end:{
        type: Date,
        required:false
    },
    state:{
        type: String,
        required: true,
        enum: ['pendiente', 'aceptado', 'finalizado']
    }
})

workSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Work', workSchema)