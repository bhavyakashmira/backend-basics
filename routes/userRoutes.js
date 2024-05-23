const express = require("express");
const router = express.Router();
const {registerUser , loginUser , currentUser} = require("../controllers/userController.js");
const validToken = require("../middleware/validateTokenHanlder.js");


router.post("/register", registerUser )
router.post("/login",loginUser )

router.get("/current", validToken, currentUser)


module.exports = router;
