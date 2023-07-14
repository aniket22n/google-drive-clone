import { connectDB } from "../db/connection";
import User from "../db/models/user";
require("dotenv").config({ path: "../.env" });

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

async function signup(req, res) {
  // connecting to database
  await connectDB();

  let { email, password } = req.body;

  // checking if an account with email already exits
  let isUser = User.findOne({email})
  
  if (isUser) { 
    return res.status(409).json({message :"Account already exits"});
  }

  // save new user to database and returns jwt token
  let newUser = new User({
    email,
    password,
  });

  newUser
    .save()
    .then(() => {
      let token = jwt.sign({ email }, secretKey, { expiresIn: "1hr" });
      res.status(200).json({ message: "User created successfully", token });
    })
    .catch((error) => {
      console.error("error saving user", error);
      res.status(500).json({ message: "Signup failed" });
    });
}

module.exports = signup;
