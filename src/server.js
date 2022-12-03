const express = require('express')
var app = express()

app.get('/login', (req,res) => {
  res.render('login.ejs')
})

app.get('/register', (req,res) => {
  res.render('register.ejs')
})

app.listen(3000)