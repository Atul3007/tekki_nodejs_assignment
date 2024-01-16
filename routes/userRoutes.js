const express=require("express");
const { registerController, loginController, getUsers } = require("../controller/userController");


const router=express.Router();

router.get("/allUsers",getUsers)
router.post("/register",registerController)
router.post("/login",loginController)


module.exports={
    router
}
