var express = require('express');
var path = require('path');
var session = require('client-sessions');
var fs = require("fs");
var app = express();


// --- config
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
	  cookieName: 'session',
	  secret: 'random_string_goes_here',
	  duration: 30 * 60 * 1000,
	  activeDuration: 5 * 60 * 1000,
	}));

//--- web servisess


app.post('/login', function(req, res) {
	  User.findOne({ email: req.body.email }, function(err, user) {
	    if (!user) {
	      res.render('login.jade', { error: 'Invalid email or password.' });
	    } else {
	      if (req.body.password === user.password) {
	        res.redirect('/dashboard');
	      } else {
	        res.render('login.jade', { error: 'Invalid email or password.' });
	      }
	    }
	  });
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


app.listen(7000);