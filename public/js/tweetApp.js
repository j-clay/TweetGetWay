
$(document).ready(function () {
	var username; 
		//to get current user	
	$.ajax({
		url: 'http://localhost:3000/session/1',
		type: "GET",
		contentType:'application/json',
		dataType:'json',
		success: function(data) {
			
			username = data.user;	
		//	alert("user : "+username);
			$("#user").html(username);
		},
		error: function(xhr, textStatus, errorThrown) {
			 console.log("Error" + xhr + textStatus + errorThrown);
		}
});    
	
	//To check current user
function checkCurrentUser(id){	

	var flag= function(){
		var temp = true;
		var votedUsers = new Array();
		$.ajax({
        url: 'http://localhost:3000/blog/'+id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
       
        	var str = ""+data.approvedBy;
        	votedUsers = str.split(",");
         	//alert("approver : "+data.approvedBy+"   user : "+votedUsers[0]+"  created by :  "+data.createdby+" username : "+username);
        	
        	if(data.createdby === username)
        		{
        			temp = false;
        		}
        	else
        	{
        		//alert("in str : "+str);
        		for (str in votedUsers ) {
        		
        			if(str === username)
        	    	{
        	    	    temp = false;
        	    	}
        	}
        	}
        	
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("Error" + xhr + textStatus + errorThrown);
        }
	});
		return temp;
	//alert("falg = "+flag);
}();
return flag;
}


function getCurrentDate()
{
    var date = new Date(),
        dateStr = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2,2);

      return dateStr;
}



	 $("#tweetForm").submit(function (event) {
	        event.preventDefault();
	        var tweet = $(".tweet").val();

	        if (tweet !== "" && tweet !== undefined && tweet !== null) {

	            $.ajax({
	                url: "http://localhost:3000/blog",
	                type: "POST",
	                dataType: 'json',
	                data: { 
	                	votes: 1,
	                	date: getCurrentDate(), 
	                	text: tweet, 
	                	postedOnTwitter: false,
	                	createdby: username, 
	                	approvedBy: username		
	                },
	                success: function (data) {
	                    $(".blogs").append(loadNewTweets(data));
	                },
	                error: function (xhr, textStatus, errorThrown) {
	                    window.alert("Error" + xhr.status);
	                }
	            });
	            $(".tweet").val("");
	        } else {
	            window.alert("Please enter the actor's name.");
	        }
	    });

	    function display() {
	        $.ajax({
	            url: "http://localhost:3000/blog",
	            type: "GET",
	            dataType: "json",
	            success: function (data) {
	                $.each(data, function (x, value) {
	                    
	                    if(value.postedOnTwitter){
	                        $(".voted").append(loadVotedTweets(value));
	                    }
	                    else{
	                        $(".blogs").append(loadNewTweets(value));
	                    }
	                });
	            },
	            error: function (xhr, textStatus, errorThrown) {
	                window.alert("Error" + xhr + textStatus + errorThrown);
	            }
	        });
	    };
	    
	    
	    function loadNewTweets(tweet) {
	        var blog = "";
	        blog += "<div class=\"panel panel-primary\"><div class=\"panel-heading\"><h3 class=\"panel-title\">Tweets</h3>";
	        blog += "</div><div class=\"panel-body\">" + tweet.text + "</div><div id=\"demo\"class=\"panel-footer textright\">";
	       alert( "status : "+checkCurrentUser(tweet.id));
	       var result = checkCurrentUser(tweet.id);
	       //alert("status : "+result);
	       if(result)
	    	   {
		        blog += "<button class=\"btn like btn-warning\"><span class=\"glyphicon glyphicon-thumbs-up\" aria-hidden=\"true\"></span> Votes <span class=\"likes\" id=" + tweet.id + ">" + tweet.votes + "</span></button>";

	    	   }
	       else
	    	   {
		        blog += "<span class=\"glyphicon glyphicon-thumbs-up\" aria-hidden=\"true\"></span> Votes <span class=\"likes\" id=" + tweet.id + ">" + tweet.votes + "</span>";

	    	   }
	        blog += "</div></div>"
	        return blog;
	    };
	    
	    function loadVotedTweets(tweet) {
	     
	        var blog = "";
	        blog += "<div class=\"panel panel-primary\"><div class=\"panel-heading\"><h3 class=\"panel-title\">Tweets</h3></div><div class=\"panel-body\">";
	        blog += "</div><div class=\"panel-body\">" + tweet.text + "</div><div id=\"demo\"class=\"panel-footer textright\">";
	        blog += "<span class=\"glyphicon glyphicon-thumbs-up\" aria-hidden=\"true\"></span> Votes <span class=\"likes\" id=" + tweet.id + ">" + tweet.votes + "</span>";
	        blog += "</div></div>"
	        	
	        return blog;
	    };
	    

	    display();

	    
	    $(".blogs").on("click","button",function(){
	        var id=this.lastChild.id;
	        var parent=this.parentNode;
	        var votes=this.lastChild.innerHTML;
	       
	        this.lastChild.innerHTML=parseInt(votes) + 1;

	       
	        $.ajax({
	            url: 'http://localhost:3000/blog/' + id,
	            type: 'GET',
	            dataType: 'json',
	            success: function (data) {
	            	
	                createdBy=data.createdby;
	                votes = data.votes+1;
	    	        date = data.date;
	    	        text = data.text;
	    	        postedOnTwitter= data.postedOnTwitter;
	    	        createdby = data.createdby;
	    	        approvedBy = data.approvedBy+', '+username;
	    	        
	    	        updateDb(votes, date, text, postedOnTwitter, createdby, approvedBy);
	    	    
	            },
	            error: function (xhr, textStatus, errorThrown) {
	                console.log("Error" + xhr + textStatus + errorThrown);
	            }
	    	});
	       

	        
	   
	   function  updateDb(votes, date, text, postedOnTwitter, createdby, approvedBy)
               
	   {
	       $.ajax({
	                url: "http://localhost:3000/blog/"+id,
	                type: "PUT",
	                dataType: 'json',
	                data: {
	                	votes: votes,
	                    date: date,
	                    text: text,
	                    postedOnTwitter: postedOnTwitter,
	                    createdby: createdby,
	                    approvedBy: approvedBy,
	                  
	                      },
	       success: function (data) {
           	
           },
           error: function (xhr, textStatus, errorThrown) {
               console.log("Error" + xhr + textStatus + errorThrown);
           }

	             }); 
	   }
	    });
	
	});
