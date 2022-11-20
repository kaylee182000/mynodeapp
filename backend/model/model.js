const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true
    },
    gender:{
        //true: Male,false: Female
        type:Boolean,
        require: true
    }
})

let User = mongoose.model("User", userSchema)

module.exports = {User}