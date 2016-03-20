var express = require('express');
var path = require('path');
var session = require('client-sessions');
var fs = require("fs");
var app = express();
var bodyParser =   require("body-parser");
var request = require("request");
var email;
var request1 = require('request-json');

// --- config
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
	  cookieName: 'session',
	  secret: 'random_string_goes_here',
	  duration: 30 * 60 * 1000,
	  activeDuration: 5 * 60 * 1000,
	}));


//--- web servisess


//app.use('/login', function(req, res) {
//		
//	res.sendFile( __dirname + "/" + "index.html" );
//	});
//
//
//app.get('/',function(req,res){
//    
//    res.sendFile( __dirname + "/" + "index.html" );
//});
//
//app.get('/signUp',function(req,res){
//    res.sendFile( __dirname + "/" + "signUp.html" );
//});
//
//app.get('/dashboard',function(req,res){
//  
//    res.sendFile( __dirname + "/" + "dashboard.html" );
//});

app.listen(7012);