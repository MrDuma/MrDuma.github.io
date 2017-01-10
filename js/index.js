$(document).ready(function() {
	
	setTimeout(function() {
		if(localStorage.length !== 0){
			window.location = "tt.html";
		}else{
			window.location = "add.html";
		}
	}, 2000);
	
});
