/**
 * http://usejsdoc.org/
 */

$( document ).ready(function() {
   
	$.ajax({
		 url: 'http://localhost:3000/session/'+1,
		 type: 'PUT',
		 contentType: 'application/json',
		 dataType:'json',
		 data: JSON.stringify({
				user : "temp",
				isactive : false
		 }),
		 success: function(data) {
				
		 },
		 error: function(xhr, textStatus, errorThrown) {
			 
				 console.log("Error" + xhr + textStatus + errorThrown);
		 }
});
});

function updateSessionData(session)
{
	$.ajax({
							 url: 'http://localhost:3000/session/'+1,
							 type: 'PUT',
							 contentType: 'application/json',
							 dataType:'json',
							 data: JSON.stringify({
									user : session,
									isactive : true
							 }),
							 success: function(data) {
								 
								 if(data.id!== 'temp')
									 {
								 		var url = "http://localhost:7012/dashboard.html";
									 	window.location.replace(url);
									 }
							 },
							 error: function(xhr, textStatus, errorThrown) {
								 
									 console.log("Error" + xhr + textStatus + errorThrown);
							 }
			 });
}


function login(){
	$("#f1").submit(function(event){
	    event.preventDefault();
	})
	

      var email = $("#inputEmail").val();
      var password = $("#inputPassword").val();
      var session=null;
      
      
      if(email!='' || password!= '' ){
    	  if(email==''){$("#inputEmail").focus();}
         	if(password==''){$("#inputPassword").focus();}
    
        	
      	$.ajax({
				url: 'http://localhost:3000/users/'+email,
				type: "GET",
				contentType:'application/json',
				dataType:'json',
				success: function(data) {
					
					if(data.id===email && data.password === password)
						{
						    
							session = email;
							updateSessionData(session);
						}
					else{
						window.alert("Please Enter Valid Username Password");
					}
				},
				error: function(xhr, textStatus, errorThrown) {
					 console.log("Error" + xhr + textStatus + errorThrown);
				}
		});
    }
      else{
    	  
    	  alert("Username & Password can not be blank");
      }
  }