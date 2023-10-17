const mongoose = require('mongoose');
const joi = require('joi');
const voiture_Schema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,

    },
    model: {
        type: String,
        required: true
    },
    categorie: {
        type: String,
        required: true,

    },
    prix:{
        type:String,
        requires:true
    },
    image:{
        type:String,
        requires:true
    },
    nbrePlace:{
        type:String,
        requires:true
    },
    puissance:{
        type:String,
        requires:true
    }
    
}, { timestamps: true })
const Voiture = mongoose.model("Voiture ", voiture_Schema);

function validateVoiture(obj) {
    const schema = joi.object({
        nom: joi.string().trim().min(3).max(255),
        model: joi.string().trim().min(3).max(255),
        nbrePlace: joi.string().trim().min(0).max(6),
        puissance: joi.string().trim().min(3).max(255),
        prix:joi.string().trim().min(3).max(255),
        image:joi.string().trim().max(255),
        
    })
    return schema.validate(obj);
}
function validateUpdateVoiture(obj) {
    const schema = joi.object({
        nom: joi.string().trim().min(3).max(255),
        model: joi.string().trim().min(3).max(255),
        nbrePlace: joi.string().trim().min(0).max(6),
        puissance: joi.string().trim().min(1).max(255),
        prix:joi.string().trim().min(3).max(255),
        image:joi.string().trim().min(3).max(255),
        categorie:joi.string().trim().min(1).max(255),
        
    })
    return schema.validate(obj);
}
module.exports = {
    Voiture,
    validateVoiture,
    validateUpdateVoiture
}