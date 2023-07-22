const express = require("express");
const User = require("../db/models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

module.exports.login = async (req, res) => {
  let { email, password } = req.body;

  // check if user login credentials are valid
  let isUser = await User.findOne({ email, password });

  if (!isUser) {
    return res.status(401).json({ message: "Incorrect username or password" });
  }
  // for valid user returns jwt token
  else {
    let token = jwt.sign({ email }, secretKey, {
      expiresIn: "1hr",
    });
    res.status(200).json({ message: "Login successful", token });
  }
};

module.exports.signup = async (res, req) => {
  const { email, password } = req.body;

  // checking if an account with email already exits
  const isUser = await User.findOne({ email });

  if (isUser) {
    return res.status(409).json({ message: "Account already exits" });
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
};
