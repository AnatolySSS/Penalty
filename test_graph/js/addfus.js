var fuId = 1;
var claimFuId = 1;

function addFu() {
	fuId++;
  var str = '<div id="fu_' + fuId + '">' +
		'<hr>' +
		'<div id="fu_form_row_' + fuId + '" class="form-row fus">' +
	    '<div class="form-group col-md-4">' +
			'<select id="fu_name_' + fuId + '" class="fu_names custom-select col-md-12">' +
				'<option>Воронин Ю.В.</option>' +
				'<option>Климов В.В.</option>' +
				'<option>Никитина С.В.</option>' +
				'<option>Писаревский Е.Л.</option>' +
				'<option>Савицкая Т.М.</option>' +
			'</select>' +
	    '</div>' +
			'<div class="form-group col-md-4">' +
				'<div class="input-group">' +
					'<input id="fu_number_' + fuId + '" class = "fu_numbers form-control input-number-fu" placeholder="Номер" type="text" size="10">' +
					'<div class="input-group-append">' +
						'<span class="input-group-text">&#8470;</span>' +
					'</div>' +
				'</div>' +
			'</div>' +
	    '<div class="form-group col-ms-1">' +
	      '<button id="add_fu_info_btn_' + fuId + '" class="add_fu_info_btns btn btn-outline-warning add_info">' +
	        '<i class="fa fa-chevron-down toggle"></i>' +
	      '</button>' +
	    '</div>' +
	    '<div class="form-group col-ms-1">' +
	      '<button id="fu_btn_' + fuId + '" class="fu_btns btn btn-outline-danger" onclick="removeFu(' + fuId + ')">×</button>' +
	    '</div>' +
	  '</div><!-- fu_form_row_1 -->' +

		'<div id="add_fu_info_' + fuId + '" class="ml-3" style="display:none">' +
			'<div class="add_fu_info_dates">' +
				'<div class="form-row">' +
					'<div class="form-group col-md-3 form-inline justify-content-center">' +
						'<input id = "fu_date_' + fuId + '" class = "fu_dates datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
					'</div>' +
					'<div class="form-group col-md-3 form-inline">' +
						'<h6>Дата решения</h6>' +
					'</div>' +
				'</div>' +
				'<div class="form-row">' +
					'<div class="form-group col-md-3 form-inline justify-content-center">' +
						'<span id = "fu_in_force_date_' + fuId + '" class="fu_in_force_dates"></span>' +
					'</div>' +
					'<div class="form-group col-md-4 form-inline">' +
						'<h6>Дата вступления в силу</h6>' +
					'</div>' +
				'</div>' +
				'<div class="form-row">' +
					'<div class="form-group col-md-3 form-inline justify-content-center">' +
						'<span id = "fu_last_day_for_pay_date_' + fuId + '" class="fu_last_day_for_pay_dates"></span>' +
					'</div>' +
					'<div class="form-group col-md-5 form-inline">' +
						'<h6>Дата окончания срока исполнения</h6>' +
					'</div>' +
				'</div>' +
				'<div class="form-row">' +
					'<div class="form-group col-md-3 form-inline justify-content-center">' +
						'<input id = "fu_pay_date_' + fuId + '" class = "fu_pay_dates datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
					'</div>' +
					'<div class="form-group col-md-3 form-inline">' +
						'<h6>Дата исполнения</h6>' +
					'</div>' +
				'</div>' +
			'</div><!-- add_fu_info_dates -->' +
			'<div class="form-row">' +
				'<div class="form-group col-md-6">' +
					'<h6>Удовлетворенные требования</h6>' +
				'</div>' +
			'</div>' +
			'<div id="add_fu_info_row_' + fuId + '_1" class="add_fu_info_' + fuId + ' add_fu_infos form-row">' +
				'<div class="form-group col-md-4 form-inline">' +
					'<select id="fu_claim_' + fuId + '_1" class="fu_claim_' + fuId + ' fu_claims custom-select col-md-12">' +
						'<option>Страховое возмещение</option>' +
						'<option>УТС</option>' +
						'<option>Эвакуатор</option>' +
						'<option>Хранение</option>' +
						'<option>Неустойка</option>' +
						'<option>Экспертиза</option>' +
						'<option>Юрист</option>' +
						'<option>Нотариус</option>' +
						'<option>Почта</option>' +
					'</select>' +
				'</div>' +
				'<div class="form-group col-md-3">' +
					'<div class="input-group">' +
						'<input id="fu_claim_summ_' + fuId + '_1" class = "fu_claim_summ_' + fuId + ' fu_claim_summs input-numeral form-control" placeholder="Сумма" type="text" size="10">' +
						'<div class="input-group-append">' +
							'<span class="input-group-text">&#8381;</span>' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="form-group col-ms-1">' +
					'<button id="fu_claim_btn_' + fuId + '_1" class="fu_claim_btn_' + fuId + ' btn btn-outline-warning" onclick="addFuClaim(' + fuId + ')">+</button>' +
				'</div>' +
			'</div><!-- add_court_info_row_1 -->' +
			'<div id="add_fu_claim_info_' + fuId + '_1" class="add_fu_claim_info_' + fuId + ' form-group ml-3" style="display:none">' +
				'<div class="form-group">' +
					'<h6>Период неустойки</h6>' +
				'</div>' +
				'<div class="form-group form-inline">' +
					'<label for="date_fu_from_' + fuId + '_1">c</label>' +
					'<input id = "date_fu_from_' + fuId + '_1" class = "date_fu_penalty_from_' + fuId + ' date_court_froms ml-2 datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
					'<label for="date_fu_to_' + fuId + '_1" class="ml-2">по</label>' +
					'<input id = "date_fu_to_' + fuId + '_1" class = "date_fu_penalty_to_' + fuId + ' date_fu_tos ml-2 datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
					'<input id="fu_without_period_' + fuId + '_1" class="fu_without_period_' + fuId + ' fu_without_periods ml-2" type="checkbox" onclick="block_fu_date(' + fuId + ', 1)">' +
					'<label for="fu_without_period_' + fuId + '_1" class="ml-2 form-check-label">Период не указан</label>' +
				'</div>' +
			'</div><!-- add_court1_claim_info_1 -->' +
		'</div><!-- add_FU_info_1 -->' +
	'</div><!-- court_1 -->';

	$('#fus').append(str);
	$('#fu_date_' + fuId).datepicker();
	$('#fu_pay_date_' + fuId).datepicker();
	$('#date_fu_from_' + fuId + '_1').datepicker();
	$('#date_fu_to_' + fuId + '_1').datepicker();

  $('.datepicker-here').toArray().forEach(function(field){
    new Cleave(field, {
      date: true,
      delimiter: '.',
      datePattern: ['d', 'm', 'Y']
    })
  });

  //Форматирование суммы
  $('.input-numeral').toArray().forEach(function(field){
    new Cleave(field, {
        numeral: true,
        delimiter: ' ',
        //numeralThousandsGroupStyle: 'none',
        numeralPositiveOnly: true,
        numeralIntegerScale: 8
    })
  });

	//Форматирование номера решения ФУ
	$('.input-number-fu').toArray().forEach(function(field){
	  new Cleave(field, {
	      prefix: 'У-'
	  })
	});
}

function addFuClaim(id) {
	claimFuId++;
  var str = '<div id="add_fu_info_row_' + id + '_' + claimFuId + '" class="add_fu_info_' + id + ' add_fu_infos form-row">' +
		'<div class="form-group col-md-4 form-inline">' +
			'<select id="fu_claim_' + id + '_' + claimFuId + '" class="fu_claim_' + id + ' fu_claims custom-select col-md-12">' +
				'<option>Страховое возмещение</option>' +
				'<option>УТС</option>' +
				'<option>Эвакуатор</option>' +
				'<option>Хранение</option>' +
				'<option>Неустойка</option>' +
				'<option>Экспертиза</option>' +
				'<option>Юрист</option>' +
				'<option>Нотариус</option>' +
				'<option>Почта</option>' +
			'</select>' +
		'</div>' +
		'<div class="form-group col-md-3">' +
			'<div class="input-group">' +
				'<input id="fu_claim_summ_' + id + '_' + claimFuId + '" class = "fu_claim_summ_' + id + ' fu_claim_summs input-numeral form-control" placeholder="Сумма" type="text" size="10">' +
				'<div class="input-group-append">' +
					'<span class="input-group-text">&#8381;</span>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="form-group col-ms-1">' +
			'<button id="fu_claim_btn_' + id + '_' + claimFuId + '" class="fu_claim_btn_' + id + ' btn btn-outline-danger" onclick="removeFuClaim(' + id + ', ' + claimFuId + ')">×</button>' +
		'</div>' +
	'</div><!-- add_fu_info_row_1 -->' +
	'<div id="add_fu_claim_info_' + id + '_' + claimFuId + '" class="add_fu_claim_info_' + id + ' form-group ml-3" style="display:none">' +
		'<div class="form-group">' +
			'<h6>Период неустойки</h6>' +
		'</div>' +
		'<div class="form-group form-inline">' +
			'<label for="date_fu_from_' + id + '_' + claimFuId + '">c</label>' +
			'<input id = "date_fu_from_' + id + '_' + claimFuId + '" class = "date_fu_penalty_from_' + id + ' date_fu_froms ml-2 datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
			'<label for="date_fu_to_' + id + '_' + claimFuId + '" class="ml-2">по</label>' +
			'<input id = "date_fu_to_' + id + '_' + claimFuId + '" class = "date_fu_penalty_to_' + id + ' date_fu_tos ml-2 datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
			'<input id="fu_without_period_' + id + '_' + claimFuId + '" class="fu_without_period_' + id + ' fu_without_periods ml-2" type="checkbox" onclick="block_fu_date(' + id + ', ' + claimFuId + ')">' +
			'<label for="fu_without_period_' + id + '_' + claimFuId + '" class="ml-2 form-check-label">Период не указан</label>' +
		'</div>' +
	'</div><!-- add_fu1_claim_info_1 -->';



	$('#add_fu_info_' + id).append(str);
	$('#date_fu_from_' + id + '_' + claimFuId).datepicker();
	$('#date_fu_to_' + id + '_' + claimFuId).datepicker();

  $('.datepicker-here').toArray().forEach(function(field){
    new Cleave(field, {
      date: true,
      delimiter: '.',
      datePattern: ['d', 'm', 'Y']
    })
  });

  //Форматирование суммы
  $('.input-numeral').toArray().forEach(function(field){
    new Cleave(field, {
        numeral: true,
        delimiter: ' ',
        //numeralThousandsGroupStyle: 'none',
        numeralPositiveOnly: true,
        numeralIntegerScale: 8
    })
  });
}


function removeFu(id) {
	$('#fu_' + id).remove();

  if ($("#add_fu_info_btn_" + id).find(".toggle").hasClass("rotate")) {
    $("#add_fu_info_btn_" + id).find(".toggle").removeClass("rotate");
  }
}

function removeFuClaim(id, claimFuId) {
	$('#add_fu_info_row_' + id + '_' + claimFuId).remove();
  $('#add_fu_claim_info_' + id + '_' + claimFuId).remove();
}

//Показать дополнительную информацию по решению ФУ
$(document).on("click", ".add_fu_info_btns", function (event) {
	if (!($(this).find(".toggle").hasClass("rotate"))) {
    $(this).parent().parent().next().show('fast'); //Показывает .add_fu_info
    $(this).find(".toggle").addClass("rotate");
		if ($(this).parent().parent().next().children().first().find(':selected').text() == "Неустойка"){
			$(this).parent().parent().next().children().first().next().show('fast'); //Показывает .add_fu_claim_info
		}
  } else {
    $(this).parent().parent().next().hide('fast'); //Скрывает .add_fu_info
    $(this).find(".toggle").removeClass("rotate");
  }
});

//Добавляет период взыскания неустойки ФУ
$(document).on("change", ".fu_claims", function (event) {
	if ($(this).find(':selected').text() == "Неустойка") {
		$(this).parent().parent().next().show('fast');
	} else {
    $(this).parent().parent().next().hide('fast');
	}
});

//Блокировать даты неустойки,взысканной ФУ при проставленной галочке "Период не указан"
function block_fu_date(id, claimFuId){
  if ($("#fu_without_period_" + id + "_" + claimFuId).prop('checked')) {
    $("#date_fu_from_" + id + "_" + claimFuId).prop('disabled', true);
    $("#date_fu_to_" + id + "_" + claimFuId).prop('disabled', true);
    $("#date_fu_from_" + id + "_" + claimFuId).val('');
    $("#date_fu_to_" + id + "_" + claimFuId).val('');
  } else {
    $("#date_fu_from_" + id + "_" + claimFuId).prop('disabled', false);
    $("#date_fu_to_" + id + "_" + claimFuId).prop('disabled', false);
  }
}
