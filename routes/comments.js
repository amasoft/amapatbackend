const router = require("express").Router();
const Comment = require("../models/Comment");

router.post("/", async (req, res) => {
  const name = req.body.name;
  const comment = req.body.comment;
  const postid = req.body.postid;
  console.log("data saved succesfully" + name + comment + postid);
  try {
    const addComment = new Comment({
      name: name,
      comment: comment,
      postId: postid,
    }).save();
    res.status(200).json({
      data: addComment,
      message: "Comment Added Succesfully",
    });
    console.log("Comment Added Succesfully");
  } catch (error) {
    res.status(200).json({
      message: "Error Adding Comment",
      caused: error,
    });
    console.log("Error Adding Comment");
  }
});
router.get("/", async (req, res) => {
  console.log("ijek"+req.query.postid)
  //get all comment related to the pos
  try {
    const comments = await Comment.find({ postId: req.query.postid});
    if (!comments) {
      res.status(200).json({
        data: comments,
        message: "empty",
      });
    } else {
      res.status(200).json({
        data: comments,
        message: "Comment retrieved Succesfully",
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Error retriving Comment",
      caused: error,
    });
  }
});
module.exports = router;
