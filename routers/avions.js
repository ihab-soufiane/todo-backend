const express = require('express');
const router = require('express').Router();
const asyncHandler = require("express-async-handler");
const { Hotel, validateUpdateHotel } = require("../models/Hotel");
const { verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const{gettAllHotel, deleteHotel,getHotelById,updateHotel,AddHotel}= require("../controllers/hotelController");
const multer =require("multer");
const path= require("path");
/**
 * @desc Ajoute todo
 * @route api/todos/ajouter
 * @method post
 */


const params = {
  access_key: '611117e9254f25e09d69cee5c58054a4'
}

router.get('http://api.aviationstack.com/v1/flights', {params})
  .then(response => {
    const apiResponse = response.data;
    if (Array.isArray(apiResponse['results'])) {
        apiResponse['results'].forEach(flight => {
            if (!flight['live']['is_ground']) {
                console.log(`${flight['airline']['name']} flight ${flight['flight']['iata']}`,
                    `from ${flight['departure']['airport']} (${flight['departure']['iata']})`,
                    `to ${flight['arrival']['airport']} (${flight['arrival']['iata']}) is in the air.`);
            }
        });
    }
  }).catch(error => {
    console.log(error);
  });