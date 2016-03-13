<%@ page language="java" pageEncoding="ISO-8859-1"%>

<!DOCTYPE html >
<html>
<head>
<!-- Bootstrap framework(v3.3.5) referenced from (http://getbootstrap.com/), 
JQuery(v1.11.3) referenced from (http://jqueryui.com) used in below script -->
<!-- <link rel="stylesheet" type="text/css"
	href="http://fonts.googleapis.com/css?family=Courgette"> -->
	
	<link href="css/bootstrap.min.css" rel="stylesheet">
		<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet">
	
		<link href="css/styles.css" rel="stylesheet">
<%-- <script
	src="${pageContext.request.contextPath}bootstrap//css/js/bootstrap.min.js"></script> --%>
<!-- Sign.css adjusts width of signin buttons, also draws border line  -->


<style>
body {
	font-family: 'Courgette', serif;
}
</style>

<script>
$(document).ready(function() {
	var session = $("#session").val();
	
	/* For hiding signin form */
	if(session != "notSet"){
		$("#f1").hide();
		$("#HomeLink").attr('href', '/TweetGetWay/index.html');
	}
	
	/* For hiding signout link */
	if(session == "notSet"){
		$("#HomeLink").hide();	
		$("#signout").hide();
	}
	
	$("#HomeLink").click (function(){
		if(session == "notSet"){
			alert("Please signin first");
		}
	});
	
	
	
	
	$("button#Signin").click(function(){
		 
		var email = $("#inputEmail").val();
	    var password = $("#inputPassword").val();
	    
	    if(email=='' || password== '' ){
	    	alert('Please enter details');
	    	if(email==''){$("#inputEmail").focus();}
	    	if(password==''){$("#inputPassword").focus();}
	    	return false;
	    }
	    
		jsonObject = [];
		
		SignupData = {}
		SignupData ["userName"] = email;
		SignupData ["password"] = password;
		
		jsonObject.push(SignupData);
		
	     $.ajax({
	    	 	type: "POST",
				url: "/Blog/Login",
				dataType: 'json',
				async: false,
		   	 
		    	data: {jsonObject : JSON.stringify(jsonObject)},
		    	
				beforeSend: function () {
                },
				success: function(js){
					var json =  JSON.stringify(js["user"]);
					var jsonParsedBlog = $.parseJSON(json);
					if(jsonParsedBlog == "fail"){
						alert("Login Failed,Please enter correct username.. ");
					}else{
						window.location= "/TweetGetWay/index.html";
							
					}
					 return false;
					//debugger;
					
                 },
        		error: function(jqXHR, textStatus, errorMessage){
            							
            	}
              });
	     return false;
	});	
	
	
	
});
</script>

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Blogger v. 1.0</title>
</head>

<body>
	<br />

	<div class="container" style="max-height: 90vh;">
		<div class="row">

			<div class="col-md-4 col-md-push-9">
				<div id="sidebar">
					<form id="f1" class="form-signin">
						<h2 id="hd" class="form-signin-heading">Sign in</h2>

						<input type="email" id="inputEmail" class="form-control"
							placeholder="Email address" required autofocus> <br /> <input
							type="password" id="inputPassword" class="form-control"
							placeholder="Password" required> <br />
						<button class="btn btn-lg btn-primary btn-block" id="Signin"
							type="submit">Sign in</button>
						<div id="link">
							<a id="crtLink" href="/TweetGetWay/Signup.jsp">Create account</a>
						</div>
					</form>
				</div>
			</div>

			<div class="col-md-8 col-md-pull-4">
				<div id="main">
					<div id="post" class="post"></div>
				</div>
			</div>
		</div>


	</div>
</body>
</html>