const Users = require('../models/UserModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const {CLIENT_URL} = process.env

const userCtrl = {
    register: async (req, res) => {
        try {
            const {firstName, lastName, email, password} = req.body

            if(!firstName || !lastName || !email || !password) {
                return res.status(400).json({msg: "Please fill in all fields."})
            }

            if(!validateEmail(email)) {
                return res.status(400).json({msg: "Invalid Email."})
            }

            const user = await Users.findOne({email})
            if(user) {
                return res.status(400).json({msg: "This email already exists."})
            }

            if(password.length < 6) {
                return res.status(400).json({msg: "Password must be atleast 6 characters."})
            }

            const passwordHash = await bcrypt.hash(password, 12)
            
            const newUser = {
                firstName, lastName, email, password: passwordHash
            }

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, "Verify your email address.")

            res.json({msg: "Register Success! Please activate your email."})
        } catch (err) {
            return res.status(500).json({msg: "Register Failed."})
        }
    },
    activateEmail: async (req, res) => {
        try {
            const {activation_token} = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const {firstName, lastName, email, password} = user

            const check = await Users.findOne({email})
            if(check) return res.status(400).json({msg: "This email already exists."})

            const newUser = new Users({
                firstName,
                lastName,
                email,
                password
            })

            await newUser.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            console.log(user)
            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 
            })

            res.json({msg: "Login Success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            console.log(rf_token)
            if(!rf_token) return res.status(400).json({msg: 'Please Log In.'})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: 'Please Log In.'})
            
                console.log(user)
            })


        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl