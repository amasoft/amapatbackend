const express =require('express')
const app=express()
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const authRoute=require("./routes/auth");
const userRoute=require("./routes/users");
const postRoute=require("./routes/posts");
const categoryRoute=require("./routes/categories");
const commentsRoute=require("./routes/comments");
const cors=require("cors")
const multer=require("multer");
const path = require("path");
app.use(express.json())
var bodyParser = require('body-parser');
app.use(bodyParser.json());
dotenv.config();
app.use("/images",express.static(path.join(__dirname,"/images")))
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log("Connected to MongoDB")).catch(err=>console.log(err))
var port = process.env.PORT || 5000
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        // cb(null,req.body.name)
        cb(null,req.body.name)
    }
})
app.use(cors())
const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded")
})
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/categories",categoryRoute)
app.use("/api/comments",commentsRoute)
app.listen(port,()=>{
    console.log(`Backend is running on port ${port}`)
})