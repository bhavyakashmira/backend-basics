const asyncHanlder = require("express-async-handler")
const User = require("../models/userModels.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const registerUser = asyncHanlder(async (req, res) => {
    
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All field are mandatory");
    } 
    const userAv = await User.findOne({ email });
    if (userAv) {
        res.status(400);
        throw new Error("User Exist")
    }


    const haspassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username , email , password:haspassword
    })

    console.log(`user created ${user} `)
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });

    } else {
        res.status(400);
        throw new Error("SOMETHING WRONG")
    }




    res.json("user registered")
})

const loginUser = asyncHanlder(async (req, res) => {
    
    const { email, password } = req.body;
    if ( !email || !password) {
        res.status(400);
        throw new Error("All field are mandatory");
    } 
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accesstoken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,

            }
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"})
        res.status(200).json({accesstoken})
    } else {
        res.status(400);
        throw new Error("not valid ")
    }

    res.json("user login")
}) 
const currentUser = asyncHanlder(async (req, res) => {
    res.json(req.user)
}) 

module.exports ={ registerUser , loginUser , currentUser}
