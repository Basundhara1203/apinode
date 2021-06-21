/*exports.function verifyToken(req, res, next) {
    
    const bearerHeader = req.headers["authentication"];
    //res.sendStatus(403).send(bearerHeader);
    //console.log(bearerHeader)
    if (typeof bearerHeader !== "undefined") {
  
      const bearerToken = bearerHeader.split(" ")[1];

      jwt.verify(bearerToken,process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
  
        if (err) {
    
          res.sendStatus(403);
    
        }
      })
      req.token = bearerToken
      //console.log(bearerToken)
      
      next();
  
    } //else {
}
*/




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



module.exports=function(req, res, next) {
    
    const bearerHeader = req.headers["authentication"];
    //res.sendStatus(403).send(bearerHeader);
    //console.log(bearerHeader)
    if (typeof bearerHeader !== "undefined") {
  
      const bearerToken = bearerHeader.split(" ")[1];

      jwt.verify(bearerToken,process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
  
        if (err) {
    
        return  res.sendStatus(403);
    
        }
      })
     req.token = bearerToken
      //console.log(bearerToken)
      
      next();
    }
}
    //else {
