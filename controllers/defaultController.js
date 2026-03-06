const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login_get = async (req, res) => {
    res.render('login', {title: 'Login', msg: '', email: ''})
}

const register_get = async (req, res) => {
    res.render('register', {title: 'Registro', msg: '', nome: '', email: ''})
}

const login_post = async (req, res) => {
    const { email, password } = req.body    
    const user = await User.findOne({ email })
    if(user) {
        const auth = await bcrypt.compare(password, user.password)        
        if(auth) {
            const id = user._id
            const token = jwt.sign({id}, process.env.TOKEN, {
                expiresIn: "1d"
            })            
            res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 1000 * 60 * 60 * 24 })
            res.redirect('/home')
        }
        else {
            res.render('login', { title: 'Login', msg: 'Erro ao fazer login', email })
        }
    } 
    else {
        res.render('login', { title: 'Login', msg: 'Erro ao fazer login', email })
    }  
    
}

const register_post = async (req, res) => {    
    const { nome, email, password } = req.body
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)
    const exists = await User.findOne({ email })
    if(!exists) {
        const user = await User.create({nome, email, password: hash})
        if(user) {                    
            res.redirect('/')
        } 
        else {
            res.render('register', {title: 'Registro', msg: 'Erro ao fazer registro', nome, email})
        }
    }
    else {
        res.render('register', {title: 'Registro', msg: 'E-mail já registrado', nome, email})
    }
}

const home_get = (req, res) => {
    res.render('home', {title: 'Home'})
}

const logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.locals.user = null
    res.redirect('/login')
}

const error_404 = (req, res) => {
    res.render('404', {title: 'Erro 404'})
}

module.exports = {
    login_get,
    register_get,
    login_post,
    register_post,
    home_get,
    logout_get,
    error_404
}
