const express = require("express");
// const signup = require("./routes/signup");
// const login = require("./routes/login");
// const User = require("./db/models/user");
const { connectDB } = require("./db/connection");
const userRouter = require("./routes/loginRouter");
const app = express();
app.use(express.json());

connectDB();

app.use("/user", userRouter);

app.listen("3000", () => console.log("listening on port 3000..."));
