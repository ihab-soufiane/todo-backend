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

//image storage
/*
filename="";
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images')
    },
    filename: function(req, file, cb) {
        cb(null, file.filename + "_" + Date.now() + "_" + file.originalname);
    },
});
var upload = multer({
    storage: storage,
});

router.post('/',upload.single('image'),
    asyncHandler(
        async(req, res) => {
       
            let hotel = new Hotel({
                Nom: req.body.Nom,
                NbreEtoile: req.body.NbreEtoile,
                Description: req.body.Description,
                Prix: req.body.Prix,
                image: req.file.filename, 
            });
            hotel.image = filename;
            result = await hotel.save();
            filename = '';
            console.log(result);
            res.status(201).send(result);
    
        }))*/
        filename = '';
        const mystorage = multer.diskStorage({
        
            destination: './images',
            filename: (req, file, redirect) => {
                let date = Date.now();
        
                let fl = date + '.' + file.mimetype.split('/')[1];
                redirect(null, fl);
                filename = fl;
        
            }
        })
        const upload = multer({ storage: mystorage });
        
        router.post('/addHotel', upload.any('image'), AddHotel);
    /**
     * @desc update hotel 
     * @route /api/users/:id
     * @method PUT 
     * @access private
     */
router.put("/update/:id",updateHotel );

 /**
     * @desc Get All  hotels 
     * @route /api/users
     * @method GET
     * @access private(only admin)
     */
router.get("/",gettAllHotel );
 
 /**
     * @desc Get  hotel By Id
     * @route /api/users/:id
     * @method GET
     * @access private(only admin & user himself)
     */
 router.get("/:id",getHotelById)

 /**
     * @desc Delete hotel 
     * @route /api/users/:id
     * @method DELETE
     * @access private(only admin )
     */
 router.delete("/:id", deleteHotel)
 
module.exports = router;