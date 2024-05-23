const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required:[true , "enter a username"]
    },
    email: {
        type: String,
        required: [true, "enter email of user"],
        unique :[true , "email is already registered"]
    },
    password: {
        type: String,
        required:[true , "enter a password"],
    }
}, {
    timestamps:true
}
)

module.exports = mongoose.model("User", userSchema);