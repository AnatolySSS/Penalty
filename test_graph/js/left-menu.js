$(document).ready(function(){
	$("#menu_osago_penalty").on('click', function(){
    $("#jumbotron_osago_penalty").show();
    $("#jumbotron_osago_fs").hide();
		$("#jumbotron_fu_decision_analyze").hide();
	});
  $("#menu_osago_fs").on('click', function(){
    $("#jumbotron_osago_fs").show();
    $("#jumbotron_osago_penalty").hide();
		$("#jumbotron_fu_decision_analyze").hide();
	});
	$("#menu_fu_decision_analyze").on('click', function(){
		$("#jumbotron_fu_decision_analyze").show();
    $("#jumbotron_osago_fs").hide();
    $("#jumbotron_osago_penalty").hide();

	});
});
