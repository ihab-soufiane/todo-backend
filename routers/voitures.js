const express = require('express');
const router = require('express').Router();
const asyncHandler = require("express-async-handler");
const { Voiture, validateUpdateVoiture } = require("../models/Voiture");
const { verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const{gettAllVoiture, deleteVoiture,getVoitureById,updateVoiture,AddVoiture}= require("../controllers/voitureController");
const multer =require("multer");
const path= require("path");
/**
 * @desc Ajoute Voiture
 * @route api/voitures
 * @method post
 */


const storage = multer.diskStorage ({
    destination: function (req, file, cb){
    cb(null, path.join(__dirname, "../images"));
    },
    filename: function (req, file, cb){
    cb(null, new Date().toISOString().replace(/:/g,"-") + file.originalname);
    }
    });
    const upload = multer({ storage });
router.post('/',upload.single("image"), AddVoiture);
    /**
     * @desc update Voiture 
     * @route /api/voitures/:id
     * @method PUT 
     * @access private
     */
router.put("/:id",updateVoiture);

 /**
     * @desc Get All  Voiture 
     * @route /api/voitures
     * @method GET
     * @access private(only admin)
     */
router.get("/",gettAllVoiture);
 
 /**
     * @desc Get  Voiture By Id
     * @route /api/voitures/:id
     * @method GET
     * @access private(only admin & user himself)
     */
 router.get("/:id",getVoitureById)

 /**
     * @desc Delete Voiture 
     * @route /api/voitures/:id
     * @method DELETE
     * @access private(only admin )
     */
 router.delete("/:id", deleteVoiture)
 
module.exports = router;