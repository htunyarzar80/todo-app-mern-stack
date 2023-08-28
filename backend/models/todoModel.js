const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema(
    {
    text:{
        type:String,
        trim:true,
        required:[true,"Text is required"]
    }
})

module.exports =mongoose.model("Todo",todoSchema)