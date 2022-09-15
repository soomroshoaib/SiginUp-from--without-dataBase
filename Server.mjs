import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";

const App = express();

App.use(express.json());
App.use(cors());

const Port = process.env.PORT || 3000;

const UserBae = []

function randomNumber(){
    return Math.floor(Math.random() * 10000)
}

App.post('/signup',(req , res)=>{
  
    let body = req.body ;

    if(!body.FirstName 
        || !body.LastName 
        || !body.email 
        || !body.password
        ){
             res.status(400).send(
                `require missing field please requst example :
             {
                FirstName : "jon" ,
                LastName :  "Sing",
                email :  "jonsin@gmail.com",
                password : "12345"  
             }
             `)
             return ;
        }
          /// email  phala rigster hai
let isFound = false;
for(let i = 0; i<UserBae.length; i++){
    if(UserBae[i].email === body.email.toLowerCase()){
        isFound = true;
        break; 
    }
}
if(isFound){   //this email already exist
    res.status(400).send({
        message: `email ${body.email} already exist `
    })
    return; 
}

        let NewUser  = {
            userId : nanoid(),
            FirstName : body.FirstName,
            LastName : body.LastName,
            email : body.email.toLowerCase(),
            password : body.password
        }    
        UserBae.push(NewUser )
        res.status(201).send({message :"user is created "})
})


App.post('/Login', (res, req)=>{
    
    if(
           !body.email 
        ||  !body.password
        ){
             req.status(400).send(`
             require missing field please requst example :
             {
                 
                email :  "jonsin@gmail.com",
                password : "12345"
            
                
             }
             `)
             return ;
        }

        let isFound = false

        for(let i = 0; i<UserBae.length; i++){
            if(UserBae[i].email === body.email){
                 isFound = true
                if(UserBae[i].password === body.password){    // correct password 
                    res.status(200).send({
                        FirstName: UserBae[i].FirstName,
                        LastName : UserBae[i].LastName,
                        email : UserBae[i].email,
                        message : "Login is successful"
                    }) 
                    return
                }else{       // password incorrect
                    res.status(401).send({
                        message : 'incorrect password'
                    })
                    return 
                }
            }
            
        }
        if(!isFound){
            res.status(404).send({
                message : "user is not found"
            })

        }
})


App.listen(Port,()=>{
    console.log(`your server is working ${Port}`)
})