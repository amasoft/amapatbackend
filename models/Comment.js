const mongoose =require("mongoose")
const commentSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"please Add your Name"]
    },
    comment:{
        type:String,
        required:[true,"please Add your Comments"],
    },
    postId:{
        type:String,
        required:[true,"Post id needed"]
    }
},{
    timestamps:true
}
)
module.exports=mongoose.model("Comments",commentSchema)