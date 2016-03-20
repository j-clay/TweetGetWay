
$(document).ready(function () {
	var username; 
	
	$.ajax({
		url: 'http://localhost:3000/session/'+1,
		type: "GET",
		contentType:'application/json',
		dataType:'json',
		success: function(data) {
			username = data.user;	
		},
		error: function(xhr, textStatus, errorThrown) {
			 console.log("Error" + xhr + textStatus + errorThrown);
		}
});    
   
    $("#tweetForm").submit(function (event) {
        event.preventDefault();

        var tweet = $(".tweet").val();

        if (tweet !== "" && tweet !== undefined && tweet !== null) {

            $.ajax({
                url: "http://localhost:3000/blog",
                type: "POST",
                dataType: 'json',
                data: { votes: 0, date: "03/19/2016", text: tweet, postedOnTwitter: false, createdby: "martial", approvedBy: "sss, xxx" },
                success: function (data) {
                    $(".blogs").append(loadTweetPost(data));
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
            url: "http://localhost:3000/blogs",
            type: "GET",
            dataType: "json",
            success: function (data) {
                $.each(data, function (x, value) {
                    $(".blogs").append(loadTweetPost(data));

                });
            },
            error: function (xhr, textStatus, errorThrown) {
                window.alert("Error" + xhr + textStatus + errorThrown);
            }
        });
    }

    /*$(".like").click(function(){
        var id=$(this)[0].id;
        var like;
       $.ajax({
                url: "http://localhost:3000/blog/"+id,
                type: "GET",
                dataType:'json',
               
                success: function(data) {
                    like = data.votes + 1;
                    $(".blogs").append(loadTweetPost(data));
                },
                error: function(xhr, textStatus, errorThrown) {
                    window.alert("Error" + xhr.status);
                }
            });
        
    });*/

    function loadTweetPost(tweet) {
        var blog = "";
        blog += "<div class=\"panel panel-primary\"><div class=\"panel-heading\"><h3 class=\"panel-title\">Tweets</h3>";
        blog += "</div><div class=\"panel-body\">" + tweet.text + "</div><div id=\"demo\"class=\"panel-footer textright\">";
        blog += "<button class=\"btn like btn-warning\"><span class=\"glyphicon glyphicon-thumbs-up\" aria-hidden=\"true\"></span> Votes <span class=\"likes\" id=" + tweet.id + ">" + tweet.votes + "</span></button>";
        blog += "</div></div>"
        return blog;
    };
});

