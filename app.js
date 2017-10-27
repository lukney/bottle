var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
//var mongoOp     =   require("./models/mongo");
var router      =   express.Router();
var bcrypt = require('bcryptjs');
//var csv = require('fast-csv');
var util = require('util');
//monogo db connection::
var mongoose    =   require("mongoose");
mongoose.connect('mongodb://mydbdd:mydbdd@ds229435.mlab.com:29435/mydb');
var mongoSchema =   mongoose.Schema;
/*var fs = require('fs');
var lineList = fs.readFileSync('Book2134.csv').toString().split('\n');
lineList.shift(); // Shift the headings off the list of records.*/

var schemaKeyList = ['location', 'pincode', 'state', 'area'];

var RepOppSchema = {
    location: String,
    pincode: String,
    state: String,
    area: String
    
};
var RepOppDoc = mongoose.model('RepOppDoc', RepOppSchema);
var userSchema  = {
    "userEmail" : String,
    "userPassword" : String
};
var registrationSchema  = {
    "first_name" : String,
    "last_name" : String,
    "email_id" : String,
    "phone" : String,
    "gender" : String,
    "dob" : String,
    "city" : String,
	"pwd" : String
    
};
//first page..
var registrationSchema  = {
    "first_name" : String,
    "last_name" : String,
    "email_id" : String,
    "phone" : String,
    "gender" : String,
    "dob" : String,
    "city" : String,
	"pwd" : String
    
};
var registeruserSchema  = {
    "first_name" : String,
    "last_name" : String,
    "email_id" : String,
    "phone" : String,
    "gender" : String,
    "dob" : String,
    "city" : String,
	"pwd" : String
    
};
var dailywordsSchema  = {
    "location" : String,
    "pincode" : String,
    "state" : String,
    "area" : String
};
var dailywordSchema  = {
    "location" : String,
    "pincode" : String,
    "state" : String,
    "area" : String
};
var userLogin = mongoose.model('userLogin',userSchema);
var myregister = mongoose.model('myregister',registrationSchema);
var registeruser = mongoose.model('registeruser',registeruserSchema);
var dailywords = mongoose.model('dailywords',dailywordsSchema);
var dailyword = mongoose.model('dailyword',dailywordsSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
//user registration:http://localhost:3009/register
router.get("/register",function(req,res){
        myregister.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    
});
//inserting data pincode database:http://localhost:3009/pincoderegister
router.get("/pincoderegister",function(req,res){  
        /*var reg = {
        location : req.body.location,
		pincode : req.body.pincode,
		state : req.body.state,
		area : req.body.area
		};*/
        dailywords.find({},function(err,post){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : post};
            }
            res.json(response);
        });	 
});
//inserting data pincode database:http://localhost:3009/pincoderegister13
router.get("/pincoderegister13",function(req,res){  
        /*var reg = {
        location : req.body.location,
		pincode : req.body.pincode,
		state : req.body.state,
		area : req.body.area
		};*/
        dailyword.find({},function(err,post){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : post};
            }
            res.json(response);
        });	 
});
// :http://localhost:3009/pincoderegister12
router.post("/pincoderegister12",function(req,res){  
        var reg = {
        location : req.body.location,
		pincode : req.body.pincode,
		state : req.body.state,
		area : req.body.area
		};
        dailywords.find(reg,function(err,post){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : post};
            }
            res.json(response);
        });	 
});
router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});
//:http://localhost:3009/register
router.post("/register",function(req,res){  
        var reg = {
        first_name : req.body.first_name,
		last_name : req.body.last_name,
		email_id : req.body.email_id,
		phone : req.body.phone,
		gender : req.body.gender,
		dob : req.body.dob,
		city : req.body.city,
        pwd : require('crypto').createHash('sha1').update(req.body.pwd).digest('base64')
		};
        myregister.create(reg,function(err,post){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : post};
            }
            res.json(response);
        });	 
});
//user register:http://localhost:3009/registeruser
router.post("/registeruser",function(req,res){ 
bcrypt.hash(req.body.pwd, 5, function( err, bcryptedpwd) { 
        var reg = {
        first_name : req.body.first_name,
		last_name : req.body.last_name,
		email_id : req.body.email_id,
		phone : req.body.phone,
		gender : req.body.gender,
		dob : req.body.dob,
		city : req.body.city,
        pwd:bcryptedpwd
		};
        registeruser.create(reg,function(err,post){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : post};
            }
            res.json(response);
        });
});		
});
//http://localhost:3009/login/:email_id
router.get("/login/:email_id",function(req,res){
myregister.findById(req.params.email_id, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
});
//login of the user details..http://localhost:3009/loginuser
router.post('/loginuser',function(req,res){
   var email_id = req.body.email_id;
  var pwd = req.body.pwd;
  
  registeruser.find({email_id:email_id},function(err,results){
  if (err) {
   console.log(err);
  }else{
    if(results.length >0){
		
		bcrypt.compare(pwd, results[0].pwd, function(err, doesMatch) {
    // res == true
	
        if (doesMatch){
     res.send({
       "code":200,
       "success":"login sucessfull"
         });
      }else{
     res.send({
       "code":204,
       "success":"password does not match"
         });
      } 
});
	}
	
	 else{
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }
  }
  });
 });
router.post("/login/:email_id",function(req,res){
	  
		var email_id =req.body.email_id;
		var pwd = req.body.pwd;

        myregister.findById(req.params.email_id,function(err,result){
			//console.log(result.pwd);
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if([req.body.email_id == result.email_id] && [require('crypto').createHash('sha1').update(req.body.pwd).digest('base64') === result.pwd]) {
					//if(pwd == data.pwd){
					//if(req.body.email_id == data.email_id &&pwd == data.pwd)){
                    response = {"error" : false,"message" : "login success"};
					//console.log('success');
                } 		
            }
			 res.json(response);
        });  
});
// delete register user
router.delete("/delete:id",function(req,res){ 
        myregister.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                myregister.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    });
router.get("/users",function(req,res){  
        userLogin.find({},function(err,post){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : post};
            }
            res.json(response);
        });
});
router.post("/userreg",function(req,res){ 
           var options = {   
       userEmail:req.body.email,
        userPassword:require('crypto').createHash('sha1').update(req.body.password).digest('base64')
		   };
 /*userLogin.save(options, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });*/
        userLogin.create(options,function(err,post){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
 });
router.get("/users/:id",function(req,res){ 
        
        userLogin.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
});
		
router.put("/usersput",function(req,res){
        userLogin.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(req.body.userEmail !== undefined) {
                    data.userEmail = req.body.userEmail;
                }
                if(req.body.userPassword !== undefined) {
                    data.userPassword = req.body.userPassword;
                }
                userLogin.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
         })
});
router.delete("/delete:id",function(req,res){ 
        userLogin.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                userLogin.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    });
//distance calculation..:http://localhost:3009/destinationapi
var distance = require('google-distance-matrix');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

router.post('/destinationapi', function (req, res){
	var origins=[req.body.origins]; 
	var destinations=[req.body.destinations];
   var dist;
  var user_gms=req.body.user_gms;
distance.key('AIzaSyAykFlST8qAZY7EzGLEN4lTTNpPirenuVE');
distance.units('metric');

distance.matrix(origins, destinations, function (err, distances) {
  
        

if (distances.status == 'OK') {
        for (var i=0; i < origins.length; i++) {
            for (var j = 0; j < destinations.length; j++) {
                var origin = distances.origin_addresses[i];
                var destination = distances.destination_addresses[j];
                if (distances.rows[0].elements[j].status == 'OK') {
                     dist = distances.rows[i].elements[j].distance.text;
					console.log(dist);
                    console.log('Distance from ' + origin + ' to ' + destination + ' is ' + dist);
					
					    /* var user_gms=req.body.user_gms;
						   var orginal_amount=500;
						   var total_amount;
						 var weightGroup;
                         var columns;
	                    if((dist>'100')&& (user_gms>200 && user_gms<=500)){
						   columns=['kms_201'];
						   weightGroup = ['201 - 500 gms']; 
					   }
					   else if((user_gms>500 && user_gms<=1000)&& (dist>'100' && dist<='600')){
						   columns=['kms1001_2000'];
						   weightGroup = ['add 500 gms'];
					   }/*else if(user_gms>50 && user_gms<=200){
						   weightGroup='51 - 200 gms';
					   }else 
						   if((user_gms>200 && user_gms<=500) && (dist>200 && dist<=1000)){
						    col='kms201_1000';
						   weightGroup='201 - 500 gms';
					   }/*else /*if(user_gms>500 &&){
						   weightGroup='add 500 gms';
					   }*/
					  // console.log(weightGroup);*/
				
				
					/*  connection.query('select ?? from rates where weights =? ' , [columns,weightGroup], function(error, results ){
	   //select  [col]  from rates where weights = ? ",[weightGroup],
	   
						
	   res.end(JSON.stringify(results));
	   });
	   
					 /* connection.query("select local from rates ", function(error, results ){
	   //select  [col]  from rates where weights = ? ",[weightGroup],
	   
						
	   res.end(JSON.stringify(results));
	   });*/
			
					 
						// console.log(Number(results[0].solution));
						  /* if(user_gms>500){		   
						   console.log(user_gms);
						  
						   //*res1= [(user_gms-orginal_amount)/orginal_amount]*10;
						   //console.log(res1);
						   total_amount= 30 + Number(results[0].local);
						   console.log(total_amount);
					   
						   }
						 */
					 
						
				}
					
                 else {
                    console.log(destination + ' is not reachable by land from ' + origin);
                }
            }
        }
    }
}); 

 
});


app.use('/',router);
var server = app.listen(3009,   function () {

  var host = 'https://firebase-nemai.appspot.com'
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});
//app.liseten(3009);
console.log("Listening to PORT 3009");
router.get("/RepOppDoc",function(req,res){  
     
        RepOppDoc.find({},function(err,post){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : post};
            }
            res.json(response);
        });	 
});
router.get("/RepOppDoc/:state",function(req,res){ 
        
        RepOppDoc.findById(req.params.state,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
});
/*function queryAllEntries () {
    RepOppDoc.aggregate(
        {$group: {  oppArray: {$push: {
			 location: '$location',
            pincode: '$pincode', 
            state: '$state',
            area: '$area'
           
            }}
        }}, function(err, qDocList) {
        console.log(util.inspect(qDocList, false, 10));
        process.exit(0);
    });
}
// Recursively go through list adding documents.
// (This will overload the stack when lots of entries
// are inserted.  In practice I make heavy use the NodeJS 
// "async" module to avoid such situations.)
function createDocRecurse (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    if (lineList.length) {
        var line = lineList.shift();
        var doc = new RepOppDoc();
        line.split(',').forEach(function (entry, i) {
            doc[schemaKeyList[i]] = entry;
        });
        doc.save(createDocRecurse);
    } else {
        // After the last entry query to show the result.
        queryAllEntries();
    }
}
createDocRecurse(null);
//var bson = require("bson");
//var BSON = new bson.BSONPure.BSON();
/*var max = 0;
registeruser.find({},function(obj) {
    var curr = Object.bsonsize(obj); 
    if(max < curr) {
        max = curr;
    } 
})
console.log(max);*/
/*router.get("/Repsize",function(req,res){ 
//Object.bsonsize(RepOppDoc.findOne({test:"RepOppDoc"}));
RepOppDoc.find({},function(err, doc) {
  var size = bson.calculateObjectSize(doc);
  console.log(size);
});
});*/