
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
	var votedUsers = new Array();
	var flag;
	$.ajax({
        url: 'http://localhost:3000/blog/'+id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
        	alert("approver : "+data.approvedBy);
        	votedUsers = data.approvedBy.split();
        	alert("user : "+votedUsers[0]);
        	if(data.createdby === username)
        		{
        		  return false;
        		}
        	else
        	{
	
        		for (str in votedUsers ) {
        		
        			if(str === username)
        	    	{
        	    	    alert(str);
        	    	    return false;
        	    	}
        	}
        	}            	
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("Error" + xhr + textStatus + errorThrown);
        }
	});
	//alert("falg = "+flag);
}

function getCurrentDate()
{
    var date = new Date(),
        output = document.getElementById( 'output' ),
        dateString = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2,2);

      return dateString;
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
	                	votes: 0,
	                	date: getCurrentDate(), 
	                	text: tweet, 
	                	postedOnTwitter: false,
	                	createdby: username, 
	                	approvedBy: ""		
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
	        if(checkCurrentUser(tweet.id))
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
	        var votes=this.lastChild.innerHTML;
	        var date;
	        var text;
	        var postedOnTwitter;
	        var createdby;
	        var approvedBy;
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
	    	        
	    	    
	            },
	            error: function (xhr, textStatus, errorThrown) {
	                console.log("Error" + xhr + textStatus + errorThrown);
	            }
	    	});
	       

	        
	   
	        
	        alert("vaotes : "+votes+" date : "+date)
	       $.ajax({
	                url: "http://localhost:3000/blog/"+id,
	                type: "PUT",
	                dataType: 'json',
	                data: {
	                	"votes": votes,
	                    "date": date,
	                    "text": text,
	                    "postedOnTwitter": postedOnTwitter,
	                    "createdby": createdby,
	                    "approvedBy": approvedBy,
	                    "id": id
	                      },
	       success: function (data) {
           	
              
   	        
   	        //alert("appvoved by"+approvedBy );
   	        alert("vaotes  in put : "+data.votes+" date in : "+data.date)
           },
           error: function (xhr, textStatus, errorThrown) {
               console.log("Error" + xhr + textStatus + errorThrown);
           }

	             });       
	    });

	});