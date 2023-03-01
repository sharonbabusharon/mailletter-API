 const express=require("express");
 const bodyParser=require("body-parser");
 const request=require("request");
 const https=require("https")

const app=express();
app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))



app.get("/",function(req,res){
	res.sendFile(__dirname+"/signup.html")
})

app.post("/signup",function(req,res){
	var firstName=req.body.fName;
	var lastName=req.body.lName;
	var email=req.body.email;

		const data={
			members: [
				{
				email_address:email,
				status:"subscribed",
				merge_fields:{
				FNAME: firstName,
				LNAME: lastName
				}
			}
			]
		}

		var JSONdata=JSON.stringify(data)

		const url=" https://us12.api.mailchimp.com/3.0/lists/c91127d05e"

		const options={
			method:"POST",
			auth: "sharon:3423d6133412b3c814158b5e90a91b33-us12"
		}

const request=https.request(url,options,function(respose){

	if(respose.statusCode===200){
		res.sendFile(__dirname+"/success.html")
	}else{
		res.sendFile(__dirname+"/failure.html")
	}


respose.on("data",function(data){
	console.log(JSON.parse(data));
})
})

request.write(JSONdata);
request.end();
})

app.post("/failure",function(res,req){
	res.redirect("/")
})


app.listen(3000,function(){
	console.log("server started at port 3000.");
})



//apiKey
//3423d6133412b3c814158b5e90a91b33-us12

//listid
//c91127d05e