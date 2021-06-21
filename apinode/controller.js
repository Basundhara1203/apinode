

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


       // res.sendStatus(403).send(bearerHeader);
    
     // }
    
  
  
    
    
  router.post("/api/posts", verifyToken, (req, res) => {
  
      jwt.verify(req.token, "secretkey", (err, authData) => {
    
        if (err) {
    
          res.sendStatus(403);
    
        } else {
    
          res.json({
    
            message: "POST created...",
    
            authData
    
          });
    
        }
    
      });
    
    });
  
  
  
  
    router.post("/login",async (req, res) => {
        try{
  
         // console.log(req.body)
            const salt=await bcrypt.genSalt(10);
            console.log(salt);
            const hashedPassword=await bcrypt.hash("12345",salt)
          
            console.log(hashedPassword)
  
        
  
      const user={username:'admin',password:hashedPassword};
      if(req.body.username!==user.username){
            return res.status(409).send({error:"Invalid username"});
      }
      console.log(user.password);
      if(await bcrypt.compare(req.body.password,user.password)){
          const token=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'})
          res.json({token:token})
  
      }
  
  
  
      else{
          return res.status(409).send({error:"Invalid password"});
      }
        }
        catch(e){}
  /*
      const user = {
    
        id: 1,
    
        username: "BS",
    
        email: "BS@gmail.com"
    
      };
  
  
     console.log(user.id +user.username+user.email)
  
  
      if (userNode.id==user.id && userNode.username==user.username && userNode.email==user.email){
      
    
      jwt.sign({ user: user }, "secretkey", (err, token) => {
    
        res.json({
    
          token
    
        });
    
      });
    }
  
    
    else {
      token=null 
      res.json(token)
    }
    */
  }
    );
  
  
  
  
  
  
  router.post('/add',verifyToken,
  
     
        (req, res) => {
    
      const EmployeeList = getEmployees()
      
      
      const EmployeeData = req.body
  
      const ErrorSet=schema.validate(req.body)
      
      if (EmployeeData.id== null || EmployeeData.employeeName.trim() == null|| EmployeeData.employeeDepartment == null ) {
          return res.status(401).send({error: true, msg: 'Employee data not available'})
      }
      /*
      if (EmployeeData.fullname.length<3)
      {
          return res.status(401).send({error: true, msg: 'Full Name too short'})
      }
      */
     
      const find = EmployeeList.find( user => user.id === EmployeeData.id )
      if (find) {
          return res.status(409).send({error: true, msg: ' username already exist'})
      }

      if(ErrorSet.error){
     console.log(ErrorSet)
     return res.status(409).send(ErrorSet.error)
      
        }
        
      else{
      EmployeeList.push(EmployeeData)
   
      saveEmployees(EmployeeList);
  
      res.send({success: true, msg: 'Employee data added successfully'})
      }
      
  })
  
  
  
  router.get('/list', (req, res) => {
      const EmployeeList = getEmployees()
      res.send(EmployeeList)
  })
  
  router.get('/data/:id',verifyToken, (req, res) => {
      const id= req.params.id
      const EmployeeList = getEmployees()
      const find = EmployeeList.find( emp => emp.id === id )
      res.send(find)
  })
  
  
  
  router.patch('/update/:id' , verifyToken,
  [
      check('employeeName','Enter atleast 5 characters').isLength({ min: 5 }),
    ],
    (req, res) => {

    
      const id = req.params.id
     
      const EmployeeData = req.body
     
      const EmployeeList = getEmployees()
         
      const find = EmployeeList.find( emp => emp.id === id )
  
  
      if (!find) {
          return res.status(409).send({error: true, msg: 'Employee id does not exist'})
       }
    
      const updateEmployee = EmployeeList.filter( emp => emp.id !== id )
  
      updateEmployee.push(EmployeeData)
    
      saveEmployees(updateEmployee)
  
      res.send({success: true, msg: 'data updated successfully'})
  })
  
  router.delete('/delete/:id',verifyToken, (req, res) => {
      const id = req.params.id
      
      const EmployeeList = getEmployees()
     
      const DeleteEmployee = EmployeeList.filter( emp => emp.id !== id)
      if ( EmployeeList.length === DeleteEmployee.length ) {
          return res.status(409).send({error: true, msg: 'username does not exist'})
      }
      
      saveEmployees(DeleteEmployee)
      res.send({success: true, msg: 'Data removed successfully'})
      
  })
  
  const getEmployees = () => {
      const readData = fs.readFileSync('model/EmployeeData.json')
      return JSON.parse(readData)    
  }
  
  
  const saveEmployees= (data) => {
      const writeData = JSON.stringify(data)
      fs.writeFileSync('model/EmployeeData.json', writeData)
  }
  
  const schema=joi.object({
    id:joi.string().required(),
    employeeDepartment:joi.string().required(),
    employeeName:joi.string().min(6).required()
  });


  module.exports=router;
  