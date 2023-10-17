const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
 /**
     * @desc Get All  Users 
     * @route /api/users
     * @method GET
     * @access private(only admin)
     */
const gettAllUsers = asyncHandler(async(req,res)=>{
    const users= await User.find();
    res.status(200).send(users);
});
  /**
     * @desc Update  User 
     * @route /api/users/:id
     * @method PUT 
     * @access private
     */

const updateUser =asyncHandler(async(req, res) => {
   
    /*if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: 'you are not allow you ken update your profile' })
    }*/

    const { error } = validateUpdateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    if (req.body.password) {

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            
        }
      
    },{new:true}).select("-password");
    res.status(200).json(updateUser);
})

 /**
     * @desc Get  User By Id
     * @route /api/users/:id
     * @method GET
     * @access private(only admin & user himself)
     */
const getUserById= asyncHandler(async(req,res)=>{
    const user= await User.findById(req.params.id).select("-password");
    if(user){
        res.status(200).json(user);
    }else {
        res.status(200).json({message:"user not found"})
    }
    
})




 /**
     * @desc Delete User 
     * @route /api/users/:id
     * @method DELETE
     * @access private(only admin & user himself)
     */
 const deleteUser=asyncHandler(async(req,res)=>{
    const user= await User.findById(req.params.id).select("-password");
    if(user){
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"user has been deleted successfully"});
    }else {
        res.status(200).json({message:"user not found"})
    }
    
})
module.exports={
    gettAllUsers,
    updateUser,
    getUserById ,
    deleteUser,
}