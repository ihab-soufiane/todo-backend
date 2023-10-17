const mongoose = require('mongoose');
const joi = require('joi');
const reservation_Schema = new mongoose.Schema({
   DateReservation:{
    type:"date"
    
   },
   nbreJour:{
    type :"string",
    required:true
   }
    
}, { timestamps: true })
const Reservation = mongoose.model("Reservation ", reservation_Schema);
module.exports = {
    Reservation
    
    
}