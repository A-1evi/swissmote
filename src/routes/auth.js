const express = require("express");
const { validateSignUpData, validateLoginData } = require("../utils/validate");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  //Validate the request
  try {
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;

    //Hash the password
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/login", userAuth, async (req, res) => {
  try {
    validateLoginData(req);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: "User logged in successfully!", data: user });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

authRouter.post("/guest", async (req,res)=>{
  
})

authRouter.get("/logout", userAuth, async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User logged out successfully!" });
});

module.exports = authRouter;
