$(document).ready(function(){
	$("#menu_osago_penalty").on('click', function(){
    $("#jumbotron_osago_penalty").show();
    $("#jumbotron_osago_fs").hide();
	});
  $("#menu_osago_fs").on('click', function(){
    $("#jumbotron_osago_fs").show();
    $("#jumbotron_osago_penalty").hide();
	});
});
