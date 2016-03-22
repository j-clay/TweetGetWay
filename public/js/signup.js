/**
 * http://usejsdoc.org/
 */
var  session;
var email;
var pass;


function updateSessionData(session)
{
	
	$("#f1").submit(function(event){

	    event.preventDefault();
	})
	
	$.ajax({
							 url: 'http://localhost:3000/session/',
							 type: 'post',
						
							 dataType:'json',
							 data: {
									user : session,
									isactive : true,
									id:1
							 },
							 success: function(data) {
								
								 		var url = "http://localhost:7012/dashboard.html";
									 	window.location.replace(url);
								
							 },

							 error: function(xhr, textStatus, errorThrown) {
								 
									 console.log("Error" + xhr + textStatus + errorThrown);
							 }
			 });
}

function signup(){

	$("#f1").submit(function(event){

	    event.preventDefault();
	})
	
      var email = $("#inputEmail").val();
      var pass = $("#inputPassword").val();
      var session=null;    
    	
    $.ajax({
				url: 'http://localhost:3000/users/',
				type: "post",	
				dataType:'json',
				 data: {
						id : email,
						password : pass
				 },
				success: function(data) {
					
							session = data.id;
							updateSessionData(session);
							
				},
				error: function(xhr, textStatus, errorThrown) {
					 console.log("Error" + xhr + textStatus + errorThrown);
				}
		});
    }

