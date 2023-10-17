const mongoose = require('mongoose');
const joi = require('joi');
const hotel_Schema = new mongoose.Schema({
    Nom: {
        type: String,
        required: true,

    },
    NbreEtoile: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true,

    },
    Prix:{
        type:String,
        requires:true
    },
    image:{
        type:String,
        requires:true
    }
    
}, { timestamps: true })
const Hotel = mongoose.model("Hotel ", hotel_Schema);

function validateHotel(obj) {
    const schema = joi.object({
        Nom: joi.string().trim().min(3).max(255),
        NbreEtoile: joi.string().trim().min(0).max(6),
        Description: joi.string().trim().min(3).max(255),
        Prix:joi.string().trim().min(3).max(255),
        
    })
    return schema.validate(obj);
}
function validateUpdateHotel(obj) {
    const schema = joi.object({
        Nom: joi.string().trim().min(3).max(255),
        NbreEtoile: joi.string().trim().min(0).max(6),
        Description: joi.string().trim().min(3).max(255),
        Prix:joi.string().trim().min(3).max(255),
        
    })
    return schema.validate(obj);
}
module.exports = {
    Hotel,
    validateHotel,
    validateUpdateHotel
}