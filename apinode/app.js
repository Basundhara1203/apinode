/*const express = require('express')
const app = express()
const port = 3000
const course=[{id:1,name:'physics'},
{id:2,name:'biology'}]

app.get('/', (req, res) => {
  res.send(JSON.stringify(course))
})
app.post('/post', function (req, res) {
    console.log("Got a POST request for the homepage");
    res.send('Hello POST');
 })
 
 // This responds a DELETE request for the /del_user page.
 app.delete('/del_user', function (req, res) {
    console.log("Got a DELETE request for /del_user");
    res.send('Hello DELETE');
 })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const express = require('express')
const app = express()
app.get('/', (req, res) => {
    const output = { value:  'hello world!' }
    res.send(output)
})
//configure the server port
app.listen(3000, () => {
    console.log('Server runs on port 3000')
})
*/
const cors=require('cors')
const express = require('express')
const fs = require('fs')
const jwt = require("jsonwebtoken");
const app = express()
const { check, validationResult } = require('express-validator')

app.use(express.json())
app.use(cors())






function verifyToken(req, res, next) {
  console.log(req)
    const bearerHeader = req.headers["authentication"];
    //res.sendStatus(403).send(bearerHeader);
    //console.log(bearerHeader)
    if (typeof bearerHeader !== "undefined") {
  
      const bearerToken = bearerHeader.split(" ")[1];
  
      req.token = bearerToken;
  
      next();
  
    } else {
  
      res.sendStatus(403).send(bearerHeader);
  
    }
  
  }
  
  
app.post("/api/posts", verifyToken, (req, res) => {

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




  app.post("/api/login", (req, res) => {

    const user=req.body;
    console.log(req);

    const userNode = {
  
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
  
}
  );






app.post('/Employee/add',verifyToken,

   // [
    // check('username','Enter valid Email').isEmail(),
       /* check('age','Enter integer').isInt(),
        check('mobile','Enter valid mobile number').isLength({ min: 10,max:10 }),
        check('fullname','Enter atleast 5 characters').isLength({ min: 5 }),

      ],*/
      (req, res) => {
    /*
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() })
        }
        */
    
   
    const EmployeeList = getEmployees()
    
    
    const EmployeeData = req.body

  
    
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
    
    EmployeeList.push(EmployeeData)
 
    saveEmployees(EmployeeList);

    res.send({success: true, msg: 'Employee data added successfully'})
})



app.get('/Employee/list', (req, res) => {
    const EmployeeList = getEmployees()
    res.send(EmployeeList)
})

app.get('/Employee/data/:id',verifyToken, (req, res) => {
    const id= req.params.id
    const EmployeeList = getEmployees()
    const find = EmployeeList.find( emp => emp.id === id )
    res.send(find)
})



app.patch('/Employee/update/:id' , verifyToken,
//[
        
    //check('username','Enter valid Email').isEmail(),
   /* check('age','Enter integer').isInt(),
    check('mobile','Enter valid mobile number').isLength({ min: 10,max:10 }),
    check('fullname','Enter atleast 5 characters').isLength({ min: 5 }),

  ],*/
  (req, res) => {

  /*  const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
*/

  
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

app.delete('/Employee/delete/:id',verifyToken, (req, res) => {
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
    const readData = fs.readFileSync('EmployeeData.json')
    return JSON.parse(readData)    
}


const saveEmployees= (data) => {
    const writeData = JSON.stringify(data)
    fs.writeFileSync('EmployeeData.json', writeData)
}

//var port=process.env.PORT||3000;
app.listen(3001, () => {
    console.log('Server is running on port 3001')
})