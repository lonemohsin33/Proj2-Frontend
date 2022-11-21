const mongoose = require("mongoose")

collegeSchema = new mongoose.Schema({
    name : {type:String, required:true, unique: true},
    fullname: {type:String, required:true, unique:true},
    logoLink: {type:String, required:true},
    isDeleted: {type:Boolean, default:false}

},{timestamps:true})

module.exports= mongoose.model("college", collegeSchema)