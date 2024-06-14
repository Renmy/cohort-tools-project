const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model.js");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //CHECKS IF REQ BODY HAS ALL INFO (email, password and username)
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide a name, email and password" });
    }
    //Checks if an user with name or email already exist in DB
    const user = await User.findOne({ $or: [{ email }, { name }] });
    if (user) return res.status(400).json({ message: "User already exists" });

    //Validate the password and email with REGEX
    //Regex for password
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 8 characters and contain at least one number, one lowercase, one uppercase letter and a special character.",
      });
      return;
    }
    //Regex for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }
    //Once all validations passed proceed to create the User and add it to the DB
    const hashedPassword = await bcrypt.hash(password, bcrypt.genSalt(10));
    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Validate if get name or email and password from req.body
    if (!(name || email) || !password) {
      return res
        .status(400)
        .json({ message: "Please provide a name, email and password" });
    }
    //Try to find the user in the DB
    const user = await User.findOne({ $or: [{ email }, { name }] });
    if (!user)
      return res
        .status(401)
        .json({ message: "User don't exists, firts Signup" });
    //CHECK IF PASSWORD IS CORRECT, USING BCRYPT TO COMPARE USER INPUT AND PASSWORD IN DATABASE
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res
        .status(401)
        .json({ message: "Email/Username or password incorrect" });
    }
    //Exclude password from the object to be tokenized with JWT
    delete user._doc.password;
    //Create the token and send it to the frontend as json object
    const jwtToken = jwt.sign(
      { payload: { user } },
      process.env.TOKEN_SIGN_SECRET,
      { algorithm: "HS256", expiresIn: "24h" }
    );
    res.json({ user, jwtToken });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
