
const cors=require('cors')
const express = require('express')
const fs = require('fs')
require('dotenv').config()
const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt')
const app = express()
//const { check, validationResult } = require('express-validator');
const { Hash } = require('crypto');
//router=require('router')
//const routes=require('./controller');
const routes=require('./routeWorth');
app.use(express.json())
app.use(cors())




app.use('/Worth',routes)


//var port=process.env.PORT||3000;
app.listen(3001, () => {
    console.log('Server is running on port 3001')
})