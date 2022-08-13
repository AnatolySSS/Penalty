$(document).ready(function(){

	// $("#menu_osago_penalty").on('click', function(){
    // 	$("#jumbotron_osago_penalty").show();
    // 	$("#jumbotron_osago_fs").hide();
	// 	$("#jumbotron_fu_decision_analyze").hide();
	// })

	// $("#menu_osago_fs").on('click', function(){
	// 	$("#jumbotron_osago_fs").show();
	// 	$("#jumbotron_osago_penalty").hide();
	// 	$("#jumbotron_fu_decision_analyze").hide();
	// })

	// $("#menu_fu_decision_analyze").on('click', function(){
	// 	$("#jumbotron_fu_decision_analyze").show();
	// 	$("#jumbotron_osago_fs").hide();
	// 	$("#jumbotron_osago_penalty").hide();
	// })

	$("#preambula").on('click', function(){
		$(".preambula").show();
		$(".btn-desicion").show();
		$(".main-claims-all").hide();
		$(".main-request").hide();
		$(".dtp-description").hide();
		$(".apps-to-fo").hide();
		$(".payments_all").hide();
		$(".fus-all").hide();
		$(".courts-all").hide();
		$(".fu-expertise-all").hide();
		$(".fu-decision-analyze").hide();
	})

	$("#main-claims-all").on('click', function(){
		$(".main-claims-all").show();
		$(".btn-desicion").show();
		$(".preambula").hide();
		$(".main-request").hide();
		$(".dtp-description").hide();
		$(".apps-to-fo").hide();
		$(".payments_all").hide();
		$(".fus-all").hide();
		$(".courts-all").hide();
		$(".fu-expertise-all").hide();
		$(".fu-decision-analyze").hide();
	})

	$("#main-request").on('click', function(){
		$(".main-request").show();
		$(".btn-desicion").show();
		$(".preambula").hide();
		$(".main-claims-all").hide();
		$(".dtp-description").hide();
		$(".apps-to-fo").hide();
		$(".payments_all").hide();
		$(".fus-all").hide();
		$(".courts-all").hide();
		$(".fu-expertise-all").hide();
		$(".fu-decision-analyze").hide();
	})

	$("#dtp-description").on('click', function(){
		$(".dtp-description").show();
		$(".btn-desicion").show();
		$(".preambula").hide();
		$(".main-claims-all").hide();
		$(".main-request").hide();
		$(".apps-to-fo").hide();
		$(".payments_all").hide();
		$(".fus-all").hide();
		$(".courts-all").hide();
		$(".fu-expertise-all").hide();
		$(".fu-decision-analyze").hide();
	})

	$("#apps-to-fo").on('click', function(){
		$(".apps-to-fo").show();
		$(".preambula").hide();
		$(".main-claims-all").hide();
		$(".main-request").hide();
		$(".dtp-description").hide();
		$(".payments_all").hide();
		$(".fus-all").hide();
		$(".courts-all").hide();
		$(".fu-expertise-all").hide();
		$(".fu-decision-analyze").hide();
	})

	$("#fus-all").on('click', function(){
		$(".fus-all").show();
		$(".btn-desicion").show();
		$(".preambula").hide();
		$(".main-claims-all").hide();
		$(".main-request").hide();
		$(".dtp-description").hide();
		$(".payments_all").hide();
		$(".apps-to-fo").hide();
		$(".courts-all").hide();
		$(".fu-expertise-all").hide();
		$(".fu-decision-analyze").hide();
	})

	$("#courts-all").on('click', function(){
		$(".courts-all").show();
		$(".btn-desicion").show();
		$(".preambula").hide();
		$(".main-claims-all").hide();
		$(".main-request").hide();
		$(".dtp-description").hide();
		$(".payments_all").hide();
		$(".apps-to-fo").hide();
		$(".fus-all").hide();
		$(".fu-expertise-all").hide();
		$(".fu-decision-analyze").hide();
	})

	$("#fu-expertise-all").on('click', function(){
		$(".fu-expertise-all").show();
		$(".btn-desicion").show();
		$(".preambula").hide();
		$(".main-claims-all").hide();
		$(".main-request").hide();
		$(".dtp-description").hide();
		$(".payments_all").hide();
		$(".apps-to-fo").hide();
		$(".fus-all").hide();
		$(".courts-all").hide();
		$(".fu-decision-analyze").hide();
	})

	$("#menu_fu_decision_analyze").on('click', function(){
		$(".fu-decision-analyze").show();
		$(".preambula").hide();
		$(".main-claims-all").hide();
		$(".main-request").hide();
		$(".dtp-description").hide();
		$(".payments_all").hide();
		$(".apps-to-fo").hide();
		$(".fus-all").hide();
		$(".courts-all").hide();
		$(".fu-expertise-all").hide();
		$(".btn-desicion").hide();
	})
})
