const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const becrypt = require("bcrypt");

//update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await becrypt.genSalt(10);
    }

    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      console.log("my erro" + err);
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("you can only update your account !"); //401 means not allowd
  }
});
//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      //delete post
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(500).json("user has been deleted..");
      } catch (err) {
        console.log("my erro" + err);
        res.status(500).json(err);
      }
    } catch (error) {
      res.status(404).json("user not found!"); //401 means not allowd
    }
  } else {
    res.status(401).json("ypu can only delete your account !"); //401 means not allowd
  }
});

//getuser
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
   const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.log("my issue "+err)
    res.send(500)
  }
});
module.exports = router;
