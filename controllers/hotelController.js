const asyncHandler = require("express-async-handler");
const {Hotel,validateUpdateHotel}=require("../models/Hotel")
const multer =require("multer");
const path= require("path");

/**
     * @desc Post All  hotels 
     * @route /api/hotels
     * @method POST
     * @access private(only admin)
     *//*
filename = '';
const storage = multer.diskStorage ({
    destination: function (req, file, cb){
    cb(null, path.join(__dirname, "./images"));
    },
    filename: function (req, file, cb){
    cb(null, new Date().toISOString().replace(/:/g,"-") + file.originalname);
    }
    });
    const upload = multer({ storage });

const AddHotel= asyncHandler(
    async(req, res) => {

        let hotel = new Hotel(req.body);
        hotel.image = filename;
        result = await hotel.save();
        filename = '';
        res.status(201).send(result);

    })*/
    
    /**
     * @desc Post All  hotels 
     * @route /api/hotels
     * @method POST
     * @access private(only admin)
     */
    const AddHotel= asyncHandler(
    async(req, res) => {
        try {
            data1 = req.body;
    
            hotel = new Hotel(data1);
            hotel.image = filename;
            savedHotels = await hotel.save();
            filename = '';
            res.send(savedHotels)
        } catch (err) {
            res.send(err)
        }
    
    
    })

/**
     * @desc Get All  Users 
     * @route /api/users
     * @method GET
     * @access private(only admin)
     */
const gettAllHotel = asyncHandler(async(req,res)=>{
    const hotels= await Hotel.find();
    res.status(200).send(hotels);
});
  /**
     * @desc Update  User 
     * @route /api/users/:id
     * @method PUT 
     * @access private
     */

const updateHotel =asyncHandler(async(req, res) => {
   
    /*if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: 'you are not allow you ken update your profile' })
    }*/

    const { error } = validateUpdateHotel(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    
    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {
        $set: {
            Nom: req.body.Nom,
            NbreEtoile: req.body.NbreEtoile,
            Description: req.body.Description,
            Prix:req.body.Prix
            
        }
      
    },{new:true});
    res.status(200).json(updateHotel);
})

 /**
     * @desc Get  hotel By Id
     * @route /api/hotels/:id
     * @method GET
     * @access public
     */
const getHotelById= asyncHandler(async(req,res)=>{
    const hotel= await Hotel.findById(req.params.id);
    if(hotel){
        res.status(200).json(hotel);
    }else {
        res.status(200).json({message:"hotel not found"})
    }
    
})




 /**
     * @desc Delete hotel 
     * @route /api/hotels/:id
     * @method DELETE
     * @access private(only admin )
     */
 /*const deleteHotel=asyncHandler(async(req,res)=>{
    const hotel= await User.findById(req.params.id);
    if(hotel){
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"hotel has been deleted successfully"});
    }else {
        res.status(404).json({message:"hotel not found"})
    }
    
})*/
const deleteHotel=asyncHandler(async(req,res)=>{
    const hotel= await Hotel.findById(req.params.id);
    if(hotel){
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"hotel has been deleted successfully"});
    }else {
        res.status(200).json({message:"hotel not found"})
    }
    
})
module.exports={
   AddHotel,
    gettAllHotel,
    updateHotel,
    getHotelById ,
    deleteHotel,
}