const User = require('../db/models/user')
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

async function login(req, res){
  let { email, password } = req.body;

  // check if user login credentials are valid
  let isUser = await User.findOne({email, password});
  
  if (!isUser) { 
    return res.status(401).json({message :"Incorrect username or password"});
  }
  // for valid user returns jwt token
  else {
    let token = jwt.sign({ email }, secretKey, { expiresIn: "1hr" });
    res.status(200).json({ message: "Login successful", token });
  }
}

module.exports = login;
