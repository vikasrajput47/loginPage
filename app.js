const express=require('express');
const app=express();
const port=80;
const path=require('path');
const mongoose=require("mongoose")
const bodyparser=require("body-parser");
// const { render } = require('pug');
app.use('/static',express.static('static'));
app.use(express.urlencoded());
mongoose.connect('mongodb://127.0.0.1:27017/loginDetail')

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
res.status(200).render('home.pug');
})
app.get('/signUp',(req,res)=>{
res.status(200).render('signUp.pug');
})
app.get('/loginPage',(req,res)=>{
res.status(200).render('loginPage.pug');
})



//signUp system
var contactSchema=new mongoose.Schema({
     email:String,
     password:String
});
var loginDetails=mongoose.model("loginDetails",contactSchema);
app.post('/signUp',async(req,res)=>{
    var contactData=new loginDetails(req.body);
    const exist=await loginDetails.findOne({email:contactData.email});
    if(exist){
      res.status(200).render('signUpError.pug')
    }else
    {
      contactData.save()
      .then(() => {
          // res.send('Value saved successfully!');
          res.status(200).render('loginPage.pug');
         
        })
        .catch((error) => {
        res.send('Error saving value:', error);
        });
    }
    console.log(req.body)   
});




//login System
app.post('/loginPage',async(req,res)=>{
  var email=req.body.email;
  var password=req.body.password;
  const check=await loginDetails.findOne({email:email});
  const check2=await loginDetails.findOne({password:password});
  if(check && check2){
    var k="";
    var i=0;
    while(email[i]!='@'){
      k+=email[i++];
    }
    res.send(`Welcome : ${k}`);
  }else{
 res.send("wrong id or password")
  }
})









app.listen(port,()=>{
   console.log("server is started\n");
})
 

