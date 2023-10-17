const express = require('express');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const { verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const{gettAllUsers, deleteUser,getUserById,updateUser}= require("../controllers/userContoller");

    /**
     * @desc update User 
     * @route /api/users/:id
     * @method PUT 
     * @access private
     */
router.put("/:id", verifyToken,updateUser );

 /**
     * @desc Get All  Users 
     * @route /api/users
     * @method GET
     * @access private(only admin)
     */
router.get("/",verifyTokenAndAdmin,gettAllUsers );
 
 /**
     * @desc Get  User By Id
     * @route /api/users/:id
     * @method GET
     * @access private(only admin & user himself)
     */
 router.get("/:id", verifyTokenAndAuthorization,getUserById)

 /**
     * @desc Delete User 
     * @route /api/users/:id
     * @method DELETE
     * @access private(only admin & user himself)
     */
 router.delete("/:id", verifyTokenAndAuthorization, deleteUser)
 
module.exports = router;