var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var app = express();
var Twitter = require('twitter');
 var client = new Twitter({
        consumer_key: 'S2869yTRZhlJKvDo1T79iSvFR',
        consumer_secret: 'HJpcNm6sIetiuZRtzpCQb5XuZwSW6orQo8UO5Iyh2VoYzYaR8t',
        access_token_key: '711730133019680769-AdrIKRiWQgz15nEcyRQjVxQMZmfdgh0',
        access_token_secret: 'iHr1ufUNxhPA9imvvVWpMmtZ51IAzqehh7rDlpVXTv7zb'
    });
app.use(bodyParser.json());


// --- config
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
    res.sendFile( __dirname + "/" + "index.html" );
});

app.get('/signUp',function(req,res){
    res.sendFile( __dirname + "/" + "signUp.html" );
});

app.get('/dashboard',function(req,res){
    res.sendFile( __dirname + "/" + "dashboard.html" );
});

app.post("/postTweet",function (req,res) {
    var tweet = req.body.status;

    client.post('statuses/update', {status: tweet },  function(error, tweet, response){
        /// if(error) throw error;
        console.log(tweet);  // Tweet body. 
        console.log(response);  // Raw response object. 
    });

    
})

app.listen(7012);