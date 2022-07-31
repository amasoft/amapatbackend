const router=require("express").Router();
const User=require("../models/User")
const becrypt=require("bcrypt")

//REGISTER
router.post("/register",async(req,res)=>{
    try{
        const salt=await becrypt.genSalt(10);
        const hashedPass=await becrypt.hash(req.body.password,salt);
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass
        })
        console.log("amadi "+hashedPass)
        const user=await newUser.save()
        res.status(200).json(user)
    }catch(err){
        console.log("my erro"+err)
        res.status(500).json(err)
    }
})
//login
router.post("/login",async (req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        !user && res.status(400).json("wrong credentials usersname")
        const validated =await becrypt.compare(req.body.password,user.password)
        !validated && res.status(400).json("wrong credentials passw")

        // to prevent user from seeing pssword
        const{password,...others}=user._doc
        res.status(200).json(others)
    }catch(err){
        // res.status(400).json(err)
    }
})
module.exports=router