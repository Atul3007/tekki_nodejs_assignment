const { userModel } = require("./../models/userModel");
const { hashpass, comparePass } = require("../helper/authHelper");
const jwt = require("jsonwebtoken");

require('dotenv').config();
let JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;

   //get all users
const getUsers = async (req,res) => {
    try {
        const data = await userModel.find({});
        res.send(data);
    } catch (error) {
        console.log({msg:"error in getting users data",error})
    }
}

   //register
const registerController = async (req, res) => {
    try {
      const { name, email, phone, password, address } = req.body;
      // console.log('req.body', req.body)
      if (
        !name ||
        !email ||
        !phone ||
        !password ||
        !address 
      ) {
        res.send({ error: "All fields required" });
      } else {
        const uniqueEmail = await userModel.findOne({ email });
        if (uniqueEmail) {
          res.send({
            message: "All ready registered, Please login",
          });
        } else {
          const hashPassword = await hashpass(password);
          const newUserData = new userModel({
            name,
            email,
            phone,
            password: hashPassword,
            address
          });
          await newUserData.save();
  
          res.status(201).json({ message: "data inserted successfully" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "error in registration",
        sucess: false,
      });
    }
  };
  
  //login
  const loginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(200).json({ message: "email,password required" });
    } else {
      const user = await userModel.findOne({ email });
      if(!user){
        res.json("either email or oassword is wrong");
        return;
      }
      const compare = await comparePass(password, user.password);
      //console.log(user)
      if (compare) {
        let jwtSecretKey = JWT_SECRET_KEY;
        const token = jwt.sign({ id: user._id }, jwtSecretKey); 
        res.status(200).json({ message: "login success", token, user });
      } else {
        res.status(400).json({ message: "login failed" });
      }
    }
  };
  

module.exports = {
registerController,
loginController,
getUsers
}