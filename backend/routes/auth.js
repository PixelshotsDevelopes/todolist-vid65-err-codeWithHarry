const express = require('express');
const User = require('../models/User');
// const {Schema} = mongoose; // harry bhai write this cause he got error schema not defined I did not get that error so commented in case I need it
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'amirisagoodbo$Y';


// ROUTE 1: create a user using: POST "/api/auth/createuser" no loggin require
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    //if there arrors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //check whether the use with this email exists already

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errror: "sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //creating a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        res.json({authtoken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Enternal server error");
    }
})

// ROUTE 2: authenticate a user using: POST "/api/auth/login" no loggin required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

      //if there arrors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      const {email, password} = req.body;

      try {
        let user = await User.findOne({email});
        if(!user){
           return res.status(400).json({error: "Please try to login with correct credentials"});
        }
           const passwordCompare = await bcrypt.compare(password, user.password);
           if(!passwordCompare){
                return res.status(400).json({error: "Please try to login with correct credentials"});
            }
            const data = {
                user:{
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({authtoken});
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Enternal server error");
      }


})

// ROUTE 3: Get loggin user Details using: POST "/api/auth/getuser" Loggin required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
     userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Enternal server error");
    }
})
module.exports = router;