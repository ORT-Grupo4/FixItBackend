const {Schema, model} = require('mongoose')
const serviceSchema = new Schema({
    name:{
        type:String,
        required:true
    }
})

module.exports = model('Service', serviceSchema)