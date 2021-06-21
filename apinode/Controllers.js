

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
  
    
    
  module.exports={

  
 login:async function(req, res){
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

}
,

  
 CreateEmployee:function(req, res)
     
        {
    
      const EmployeeList = getEmployees()
      
      
      const EmployeeData = req.body
  
      const ErrorSet=schema.validate(req.body)
      
      if (EmployeeData.id== null || EmployeeData.employeeName.trim() == null|| EmployeeData.employeeDepartment == null ) {
          return res.status(401).send({error: true, msg: 'Employee data not available'})
      }
    
     
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
      
  },
  
  
  
 getEmployee:function(req, res) {
      const EmployeeList = getEmployees()
      res.send(EmployeeList)
  },
  
  GetEmployeeDetails:function(req, res){
      const id= req.params.id
      const EmployeeList = getEmployees()
      const find = EmployeeList.find( emp => emp.id === id )
      res.send(find)
  },
  
  
  
  editEmployee:function(req, res)
   {

    
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
  },
  
  deleteEmployee:function(req, res) {
      const id = req.params.id
      
      const EmployeeList = getEmployees()
     
      const DeleteEmployee = EmployeeList.filter( emp => emp.id !== id)
      if ( EmployeeList.length === DeleteEmployee.length ) {
          return res.status(409).send({error: true, msg: 'username does not exist'})
      }
      
      saveEmployees(DeleteEmployee)
      res.send({success: true, msg: 'Data removed successfully'})
      
  }

}


 // module.exports=router;
  