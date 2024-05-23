//@desc get all contact
const asyncHanlder = require("express-async-handler");
const Contact = require("../models/contact.models.js")

//@routeGet api/contact
//@access public
const getContacts = asyncHanlder(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user?.id });
    res.status(200).json(contacts);
});

const createContact = asyncHanlder(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('ALL fields are neccessary');
    }
    const contact  = await Contact.create({name , email , phone, user_id: req.user.id})
    res.status(200).json(contact)
})


const getContact = asyncHanlder(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})


const deleteContact = asyncHanlder(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("update your only")
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

const putContact = asyncHanlder(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
      
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("update your only")
    }

    const updataContact  = await Contact.findByIdAndUpdate(req.params.id , req.body ,{new:true})
    res.status(200).json(updataContact)
})




module.exports= {getContact , createContact , getContacts , deleteContact  ,putContact}