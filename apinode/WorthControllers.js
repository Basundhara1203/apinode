

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
        const readData = fs.readFileSync('WorthData.json')
        return JSON.parse(readData)                                                   
        const writeData = JSON.stringify(data)
        fs.writeFileSync('WorthData.json', writeData)
    }
    
   
  
    
    
  module.exports={

  
 

  
    CreateWorth:function(req, res)
     
        {
    
      const List = getEmployees()
      
      const id1=parseInt(req.body.id1)
      const id2=parseInt(req.body.id2)

      const EmployeeData = {
        id:(Math.floor(Math.random() * 999 + 100)).toString(), 
        noteName:"",
        amt:0

      }
  
      //const found = List[parseInt(id[0])].data[parseInt(id[1])]
      const doc=List[id1].data[id2].data
     
     doc.push(EmployeeData)
       console.log(doc)
      saveEmployees(List);
  
      res.send({success: true, msg: 'Employee data added successfully'})
      
      
  },


  
  updateLabel:function(req, res)
     
  {

 const List = getEmployees()
 const id = req.params.id
console.log(id[0]," ",id[1])
//const amt = req.body.amt

const found = List[parseInt(id[0])].data[parseInt(id[1])].data[parseInt(id[2])]
console.log(found)
let updated={
  id:found.id,
  noteName:req.body.noteName,
  amt: found.amt
}

let targetIndex=List[parseInt(id[0])].data[parseInt(id[1])].data.indexOf(found);
List[parseInt(id[0])].data[parseInt(id[1])].data.splice(targetIndex,1,updated)

// EmployeeList.push(EmployeeData)

saveEmployees(List);

res.send({success: true, msg: 'Employee data added successfully'})


},


  
  updateWorth:function(req, res)
     
  {

 const List = getEmployees()
 const id = req.params.id
console.log(id[0]," ",id[1])
//const amt = req.body.amt

const found = List[parseInt(id[0])].data[parseInt(id[1])].data[parseInt(id[2])]
console.log(found)
let updated={
  id:found.id,
  noteName:found.noteName,
  amt: req.body.amt
}

let targetIndex=List[parseInt(id[0])].data[parseInt(id[1])].data.indexOf(found);
List[parseInt(id[0])].data[parseInt(id[1])].data.splice(targetIndex,1,updated)

// EmployeeList.push(EmployeeData)

saveEmployees(List);

return res.send({success: true, msg: 'Employee data added successfully'})


},
  
  


 
CancelWorth:function(req, res)
     
{

const List = getEmployees()

const id1=parseInt(req.body.id1)
const id2=parseInt(req.body.id2)
console.log(id1+id2)
const found = List[id1].data[id2].data
let updatedArray=[];
found.map(i=>{
  let updated={
       id:i.id,
       noteName:i.noteName,
       amt:0
  }
  updatedArray.push(updated)
})
const form=List[id1].data[id2]
console.log("form",form)
let formdata={
  id:form.id,
  budget_name:form.budget_name,
  data:updatedArray
}

let targetIndex=List[id1].data.indexOf(form);
List[id1].data.splice(targetIndex,1,formdata)
console.log(targetIndex)
console.log(formdata)
saveEmployees(List);

res.send({success: true, msg: 'Employee data added successfully'})


},

  
  getWorth:function(req, res) {
      const EmployeeList = getEmployees()
      res.send(EmployeeList)
  },
  

  
  
 


}


 // module.exports=router;
  