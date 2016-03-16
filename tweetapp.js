var express = require('express');
var path = require('path');
var session = require('express-session');
var fs = require("fs");
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
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

/*function getAllUsers(){
    var users;
   ajax({
        url: "http://localhost:3000/users",
        type: "GET",
        dataType: "json",
        success: function(data) {
            users = parseJSON(data);
        },
        error: function(xhr, textStatus, errorThrown) {
            window.alert("Error" + xhr + textStatus + errorThrown);
        }
    });  
    
    return users;
    
};*/

app.listen(4000);