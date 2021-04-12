const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
});

//Setting up MailChimp
mailchimp.setConfig({
    //*****************************ENTER YOUR API KEY HERE******************************
     apiKey: "1705b10aac207d049e5f52072964fbf0-us1",
    //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
     server: "us1"
    });
    


app.post("/",function(req,res){

const firstname=req.body.fname;
const lastname=req.body.lname;
const email=req.body.email;

const listId="e6b3bdc4c6";
const  subscribingUser =
    {
    firstName: firstname,
    lastName: lastname,
    email: email
    };
    async function run() 
    {
    const data =  await mailchimp.lists.addListMember(listId, 
    {
     email_address: subscribingUser.email,
     status: "subscribed",
     merge_fields:
    {
     FNAME: subscribingUser.firstName,
     LNAME: subscribingUser.lastName
    }
    });

    }
//     async function run()
// {
// const data ={
//     members:{
//         email_address : email,
//         status: "subscribed",
//         merge_fields:{
//             FNAME:firstName,
//             LNAME:lastName
//         }
//     }
// };
const jsondata= JSON.stringify(data);
const url ="https://us1.api.mailchimp.com/3.0/lists/e6b3bdc4c6"
    const options={
        method: "POST",
        auth: "amrutha:1705b10aac207d049e5f52072964fbf0-us1"
    }

const request =https.request(url,options, function(response)
{
    response.on("data",function(response){
    console.log(JSON.parse(response));
    })

});

request.write(jsondata);
request.end();
})

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running");
});


//api
//1705b10aac207d049e5f52072964fbf0-us1

// list ID
// e6b3bdc4c6
