

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
const { CreateEmployee, GetEmployeeDetails,login } = require('./Controllers')
const { getEmployee, editEmployee, deleteEmployee } =require('./Controllers')


      
  router.post('/add',verifyToken,CreateEmployee)
  router.post('/login',login)
  
  
  
  router.get('/list', verifyToken,getEmployee)
  
  router.get('/data/:id',verifyToken,GetEmployeeDetails)
  
  
  
  router.patch('/update/:id' , verifyToken,editEmployee)
  
  router.delete('/delete/:id',verifyToken,deleteEmployee)
  
  


  module.exports=router;
  