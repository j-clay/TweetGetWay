/**
 * http://usejsdoc.org/
 */
$( document ).ready(function() {
    //console.log( "ready!" );
    
});
var  session;
var email;
var pass;


function updateSessionData(session)
{
	
	$("#f1").submit(function(event){

	    event.preventDefault();
	})
	
	alert("in update");
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

      alert("in sign up : "+email);
    
    	
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
							alert("id : "+session);
							updateSessionData(session);
							
							
				},
				error: function(xhr, textStatus, errorThrown) {
					 console.log("Error" + xhr + textStatus + errorThrown);
				}
		});
    }

