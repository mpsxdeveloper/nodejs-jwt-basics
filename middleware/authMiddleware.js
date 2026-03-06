const User = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const requireAuth = (req, res, next) => {    
    const token = req.cookies.jwt    
    if(token) {
        jwt.verify(token, process.env.TOKEN, (err, decodedToken) => {
            if(err) {                
                res.redirect('/login')
            }
            else {                
                next()
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token, process.env.TOKEN, async (err, decodedToken) => {
            if(err) {                
                res.locals.user = null
                next()
            }
            else {
                let user = await User.findById(decodedToken.id).select("nome")                
                if(user) {
                    res.locals.user = user                    
                    if(req.path === '/login' || req.path === '/register' || req.path === '/') {
                        res.redirect('/home')
                    }
                    else {
                        next()
                    }
                }
                else {
                    res.redirect('/login')
                }                
            }
        })
    }
    else {
        res.locals.user = null
        next()
    }
}

module.exports =  {
    requireAuth,
    checkUser
}
