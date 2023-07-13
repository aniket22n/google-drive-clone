import { connectDB } from "../db/connection";
import User from "../db/models/user";
require("dotenv").config({ path: "../.env" });

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

async function signup(req, res) {
  // connecting to database
  await connectDB();

  // save new user to database and returns jwt token
  let { email, password } = req.body;

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
