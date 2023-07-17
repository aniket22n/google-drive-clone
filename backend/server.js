const express = require('express');
const signup = require('./routes/signup');
const login = require('./routes/login');
const User = require('./db/models/user');
const { connectDB } = require('./db/connection');

const app = express();
app.use(express.json());

connectDB();

app.post('/user/signup', signup);
app.post('/user/login', login);

app.listen("3000", () => console.log("listening on port 3000..."))