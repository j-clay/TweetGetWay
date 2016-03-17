var express = require('express');
var path = require('path');
var session = require('client-sessions');
var fs = require("fs");
var app = express();
var bodyParser =   require("body-parser");
var request = require("request");


// --- config
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
	  cookieName: 'session',
	  secret: 'random_string_goes_here',
	  duration: 30 * 60 * 1000,
	  activeDuration: 5 * 60 * 1000,
	}));

//--- web servisess

function getAllUsers(users){	
    request.get("http://localhost:3000/users", function (err, res, body) {
    if (!err) {	 
         users = JSON.parse(body);
    }

});
    console.log("get json data : " +JSON.parse(body)); 
    return users;
}

function postUser(users)
{
	request.post("http://localhost:3000/users", function (err, res, body) {
		 console.log("post enter json data : " +users);
		    if (!err) {
		    	users = JSON.parse(body);
		    }
		    console.log("post after enter json data : " +users);
		    });	
	
	return users;
}

app.use('/login', function(req, res) {
	
	var result = JSON.stringify(req.body);
	 console.log("email : "+result);
	 
	if(result.email!==null && result.password !==null)
		 {
		
		    var cuser = postUser();
		    console.log("psdt out json data : "+cuser);
		    
		    var json = getAllUsers();
		    
			var allUsers = JSON.stringify(json);
			
			console.log("json data : "+allUsers);
			return json;	
	    
	      } else {
	        res.render('login.jade', { error: 'Invalid email or password.' });
	      }
	});


app.get('/',function(req,res){
    

    res.sendFile( __dirname + "/" + "index.html" );
});

app.get('/signUp',function(req,res){
    res.sendFile( __dirname + "/" + "signUp.html" );
});

app.get('/dashboard',function(req,res){
    var allUsers = getAllUsers();
    res.sendFile( __dirname + "/" + "dashboard.html" );
});

function getAllUsers(){
    var contents = fs.readFileSync("db.json"),
        jsonContent = JSON.parse(contents);
        return jsonContent.users;
};


app.listen(7001);