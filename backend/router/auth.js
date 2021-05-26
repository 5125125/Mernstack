const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");


require('../db/conn');
const User = require("../model/userSchema");        //geting user.

router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});

// Async-Await 

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword} = req.body;     //getting data
    //we are checking if any of the inputs are empty or not
    if (!name || !email || !phone || !work || !password || !cpassword) {             
        return res.status(422).json({ error: "Plz filled the field properly" });
    }

    try {

        const userExist = await User.findOne({ email: email });            // storing response of existing email

        if (userExist) {
             return res.status(400).json({ error: "Email already Exist" });
        } else if (password != cpassword) {
             return res.status(400).json({ error: "password are not matching" });
        } else {    
            //if the email dont exist , that means the user is new and we will store it's data in the DB
             const user = new User({ name, email, phone, work, password, cpassword });
            // to save data of new user.
            await user.save();
            res.status(201).json({ message: "user registered successfuly" });
        }
        
  
    } catch (err) {
        console.log(err);
    }

});

// login route 

router.post('/signin', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;   //getting email & password.

        if (!email || !password) {
            return res.status(422).json({error:"Plz Filled the data"})
        }

        const userLogin = await User.findOne({ email: email });       //storing response same email

        console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

           

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credientials " });
        } else {
             // need to genereate the token and stored cookie after the password match 
            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            });
            
            res.json({ message: "user Signin Successfully" });
        }
        } else {
             return res.status(400).json({ error: "Invalid Credientials " });
        }

    } catch (err) {
        console.log(err);
    }
});


// about us ka page 

router.get('/about', authenticate ,(req, res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
});

// get user data for contact us and home page 
router.get('/getdata', authenticate, (req, res) => {
    console.log(`Hello my About`);
    res.send(req.rootUser);
});

// contact us page 

router.post('/contact', authenticate, async (req, res) => {
    try {

        const { name, email, phone, message } = req.body;
        
        if (!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.status(422).json({ error: "plzz filled the contact form " });
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {
            
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({ message: "user Contact successfully" });

        }
        
    } catch (error) {
        console.log(error);
    }

});


// Logout  ka page 
router.get('/logout', (req, res) => {
    console.log(`Hello my Logout Page`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User lOgout');
});


module.exports = router;

