const isAuth = require("../middlewares/jwt.middleware");
const User = require("../models/User.model.js");

const router = require("express").Router();

router.get("/:userId", isAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
