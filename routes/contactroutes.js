const express = require("express");
const router = express.Router();
const {getContact , putContact , getContacts , deleteContact , createContact} =  require("../controllers/contactController.js");
const validToken = require("../middleware/validateTokenHanlder.js");


router.route('/').get(getContacts).post(createContact)
router.use(validToken)
router.route('/:id').get(getContact).put(putContact).delete(deleteContact);


module.exports = router;