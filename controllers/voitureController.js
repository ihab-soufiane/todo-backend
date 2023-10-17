const asyncHandler = require("express-async-handler");
const {Voiture,validateUpdateVoiture}=require("../models/Voiture")
 


/**
     * @desc Post All  Voiture 
     * @route /api/voitures
     * @method POST
     * @access private(only admin)
     */


const AddVoiture=asyncHandler(
    async(req, res) => {
        try {
            data1 = req.body;
    
            voiture = new Voiture(data1);
            voiture.image = filename;
            savedvoiture = await voiture.save();
            filename = '';
            res.send(savedvoiture)
        } catch (err) {
            res.send(err)
        }
    
    
    })

/**
     * @desc Get All  Voitures 
     * @route /api/voitures
     * @method GET
     * @access private(only admin)
     */
const gettAllVoiture = asyncHandler(async(req,res)=>{
    const voitures= await Voiture.find();
    res.status(200).send(voitures);
});
  /**
     * @desc Update  Voiture 
     * @route /api/voitures/:id
     * @method PUT 
     * @access private
     */

const updateVoiture =asyncHandler(async(req, res) => {
   
    /*if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: 'you are not allow you ken update your profile' })
    }*/

  const { error } = validateUpdateVoiture(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    
    const updateVoiture = await Voiture.findByIdAndUpdate(req.params.id, {
        $set: {
            nom: req.body.nom,
            nbrePlace: req.body.nbrePlace,
            model: req.body.model,
            prix:req.body.prix,
            image:req.body.image,
            puissance:req.body.puissance,
            categorie:req.body.categorie,
            
        }
      
    },{new:true});
    res.status(200).json(updateVoiture);
})

 /**
     * @desc Get  Voiture By Id
     * @route /api/voitures/:id
     * @method GET
     * @access public
     */
const getVoitureById= asyncHandler(async(req,res)=>{
    const voiture= await Voiture.findById(req.params.id);
    if(voiture){
        res.status(200).json(voiture);
    }else {
        res.status(200).json({message:"Voiture not found"})
    }
    
})




 /**
     * @desc Delete Voiture 
     * @route /api/voitures/:id
     * @method DELETE
     * @access private(only admin )
     */
 const deleteVoiture=asyncHandler(async(req,res)=>{
    const voiture= await Voiture.findById(req.params.id);
    if(voiture){
        await Voiture.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"voiture has been deleted successfully"});
    }else {
        res.status(200).json({message:"voiture not found"})
    }
    
})
module.exports={
    AddVoiture,
    gettAllVoiture,
    updateVoiture,
    getVoitureById ,
    deleteVoiture,
}