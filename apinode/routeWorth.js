const cors=require('cors')
const express = require('express')
const fs = require('fs')
const joi=require('joi')
require('dotenv').config()
const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt')
const app = express()
const router=express.Router();
const { check, validationResult } = require('express-validator');
const { Hash } = require('crypto');

const verifyToken=require('./verifyToken')
const { CreateWorth,updateWorth,updateLabel ,CancelWorth} = require('./WorthControllers')
const { getWorth, } =require('./WorthControllers')




      
  router.post('/add',verifyToken,CreateWorth)
  //router.post('/cancel',CancelWorth)
  //router.post('/login',login)
  router.put('/update/:id',verifyToken,updateWorth)
  router.put('/updatelabel/:id',verifyToken,updateLabel)
  
  
  router.get('/list',verifyToken, getWorth)
  
  //router.get('/data/:id',verifyToken,GetEmployeeDetails)
  
  
  
  //router.patch('/update/:id' , verifyToken,editEmployee)
  
 // router.delete('/delete/:id',verifyToken,deleteEmployee)
  
  


  module.exports=router;