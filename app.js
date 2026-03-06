const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const router = require('./routes/router')
const mongoose = require('mongoose')

const app = express();

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/static'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(router)

const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(process.env.PORT || 5000, () => {})
})
.catch((err) => console.log(err))