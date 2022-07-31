const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const becrypt = require("bcrypt");

//reate post
router.post("/", async (req, res) => {
console.log("arinze diff"+req.body.id)
  const newPost=new Post(req.body)
  try {
    const savedpost=await newPost.save();
    res.status(200).json(savedpost)

  } catch (err) {
    res.status(500).json(err)
  }
});
// update
router.put("/:id", async (req, res) => {   
      const post = await Post.findById(req.params.id);
      try{
        if(post.username===req.body.username){
          try {
            const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
              $set:req.body
            },{new:true});
            res.status(200).json(updatedPost)

        }catch(err){
          res.status(500).json(err);

        }
        }else{
          res.status(401).json("you can update only your post!")
        }
          } catch (err) {
      console.log("my erro" + err);
      res.status(500).json(err);
    }

});

// delete
// router.delete("/:id", async (req, res) => {   
  router.delete("/:id", async (req, res) => {
    console.log('welcome')   
    console.log("post infor"+req.params.id)
    console.log("post infor"+req.body.username)

  try{
    const post = await Post.findById(req.params.id);
    console.log("post infor"+JSON.stringify(post))
    console.log("post req username"+req.body.id)


    if(post.username===req.body.username){
      try {
await post.delete();
        res.status(200).json("post has been deleted sucessfuly")

    }catch(err){
      res.status(500).json(err);
console.log("issue"+err)
    }
    }else{
      res.status(401).json("you can delete only your post!")
    }
      } catch (err) {
  console.log("my erro" + err);
  res.status(500).json(err);
}

});

//getuser
router.get("/:id", async (req, res) => {
      
  try {
    const post = await Post.findById(req.params.id);
  
    res.status(200).json(post);
  } catch (err) {
    console.log("my issue "+err)
    res.send(500)
  }
});

//get all post
router.get("/", async (req, res) => {
  const username=req.query.user
  const catName=req.query.cat
  try {
    let posts
    if(username){
      posts=await Post.find({username}) //username:username is same as {username} if only they have same spelling
    }else if(catName){
      posts=await Post.find({categories:{
        $in:[catName] //i.e check if categories is among the catName array returned and assigned the result to posts
      }})
    }else{
      posts=await Post.find();
    }
    res.status(200).json(posts)
  } catch (err) {
    console.log("my issue "+err)
    res.status(500).json(err)
  }
});
module.exports = router;
