const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const request=require("request");
const https=require("https")
require("dotenv").config();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
	res.sendFile(__dirname+"/index.html")
});

app.post("/",function(req,res){

	const fName=req.body.firstName;
	const lName=req.body.lastName;
	const email=req.body.email;
	

	const data={
		members:[
			   {
			   	email_address:email,
			   	status:"subscribed",
			   	merge_fields: {
			   		FNAME: fName,
			   		LNAME: lName
			   	}
			   }
			    ]
	};
	const jsonData=JSON.stringify(data);
	const url=process.env.API_KEY;
	const  options={
         method:"POST",
         auth:process.env.AUTHEN
	};    

	const request= https.request(url,options,function(response){

		if (response.statusCode === 200){
			res.send("Successfully Subscribed");
		}else{
			res.send("Oops! Something Went Wrong! ")
		}
		response.on("data",function(data){
               console.log(JSON.parse(data))
		});
	});
	request.write(jsonData);
	request.end();
});



app.listen(process.env.PORT || 3000,function(){
	console.log("server running")
});






