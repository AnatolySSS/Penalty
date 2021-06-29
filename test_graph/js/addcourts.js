var courtId = 1;
var claimId = 1;

function addCourt() {
	courtId++;
  var str = '<div id="court_' + courtId + '" class="courts">' +
	'<hr>' +
	'<div id="court_form_row_' + courtId + '" class="form-row">' +
    '<div class="form-group col-md-6">' +
      '<input id="court_name_' + courtId + '" class="court_names form-control" type="text" placeholder="Наименование суда" size="40">' +
    '</div>' +
    '<div class="form-group col-md-3">' +
      '<div class="input-group">' +
        '<input id="court_number_' + courtId + '" class = "court_numbers form-control" placeholder="Номер" type="text" size="10">' +
        '<div class="input-group-append">' +
          '<span class="input-group-text">&#8470;</span>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="form-group col-ms-1">' +
      '<button id="add_court_info_btn_' + courtId + '" class="add_court_info_btns btn btn-outline-warning add_info">' +
        '<i class="fa fa-chevron-down toggle"></i>' +
      '</button>' +
    '</div>' +
    '<div class="form-group col-ms-1">' +
      '<button id="court_btn_' + courtId + '" class="court_btns btn btn-outline-danger" onclick="removeCourt(' + courtId + ')">×</button>' +
    '</div>' +
  '</div><!-- court_form_row_1 -->' +
	'<div id="add_court_info_' + courtId + '" class="ml-3" style="display:none">' +
		'<div class="add_court_info_dates">' +
			'<div class="form-row">' +
				'<div class="form-group col-md-3 form-inline justify-content-center">' +
					'<input id = "court_date_' + courtId + '" class = "court_dates datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
				'</div>' +
				'<div class="form-group col-md-3 form-inline">' +
					'<h6>Дата решения</h6>' +
				'</div>' +
			'</div>' +
			'<div class="form-row">' +
				'<div class="form-group col-md-3 form-inline justify-content-center">' +
					'<input id = "court_in_force_date_' + courtId + '" class = "court_in_force_dates datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
				'</div>' +
				'<div class="form-group col-md-4 form-inline">' +
					'<h6>Дата вступления в силу</h6>' +
				'</div>' +
			'</div>' +
			'<div class="form-row">' +
				'<div class="form-group col-md-3 form-inline justify-content-center">' +
					'<input id = "court_pay_date_' + courtId + '" class = "court_pay_dates datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
				'</div>' +
				'<div class="form-group col-md-3 form-inline">' +
					'<h6>Дата исполнения</h6>' +
				'</div>' +
			'</div>' +
		'</div><!-- add_court_info_dates -->' +
	'<div class="form-row">' +
		'<div class="form-group col-md-6">' +
			'<h6>Требования</h6>' +
		'</div>' +
	'</div>' +
	'<div id="add_court_info_row_' + courtId + '_1" class="add_court_info_' + courtId + ' add_court_infos form-row">' +
		'<div class="form-group col-md-4 form-inline">' +
			'<select id="court_claim_' + courtId + '_1" class="court_claim_' + courtId + ' court_claims custom-select col-md-12">' +
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
				'<select id="court_claim_type_' + courtId + '_1" class="court_claim_type_' + courtId + ' court_claim_types custom-select col-md-12">' +
					'<option>Удовлетворено</option>' +
					'<option>Отказано</option>' +
				'</select>' +
			'</div>' +
		'</div>' +
		'<div class="form-group col-md-3">' +
			'<div class="input-group">' +
				'<input id="court_claim_summ_' + courtId + '_1" class = "court_claim_summ_' + courtId + ' court_claim_summs input-numeral form-control" placeholder="Сумма" type="text" size="10">' +
				'<div class="input-group-append">' +
					'<span class="input-group-text">&#8381;</span>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="form-group col-ms-1">' +
			'<button id="court_claim_btn_' + courtId + '_1" class="court_claim_btn_' + courtId + ' court_claim_btns btn btn-outline-warning" onclick="addClaim(' + courtId + ')">+</button>' +
		'</div>' +
	'</div><!-- add_court_info_row_1 -->' +
	'<div id="add_court_claim_info_' + courtId + '_1" class="form-group  ml-3" style="display:none">' +
		'<div class="form-group">' +
			'<h6>Период неустойки</h6>' +
		'</div>' +
		'<div class="form-group form-inline ml-3">' +
			'<label for="date_court_from_' + courtId + '_1">c</label>' +
			'<input id = "date_court_from_' + courtId + '_1" class = "date_court_penalty_from_' + courtId + ' ml-2 datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
			'<label for="date_court_to_' + courtId + '_1" class="ml-2">по</label>' +
			'<input id = "date_court_to_' + courtId + '_1" class = "date_court_penalty_to_' + courtId + ' ml-2 datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
			'<input id="court_without_period_' + courtId + '_1" class="court_without_period_' + courtId + ' ml-2" type="checkbox" onclick="block_court_date(' + courtId + ', 1)">' +
			'<label for="court_without_period_' + courtId + '_1" class="ml-2 form-check-label">Период не указан</label>' +
		'</div>' +
	'</div><!-- add_court1_claim_info_1 -->' +
	'</div><!-- add_court_info_1 -->' +
	'</div><!-- court_1 -->';

	$('#courts').append(str);
	$('#court_date_' + courtId).datepicker();
	$('#court_pay_date_' + courtId).datepicker();
	$('#court_in_force_date_' + courtId).datepicker();
	$('#date_court_from_' + courtId + '_1').datepicker();
	$('#date_court_to_' + courtId + '_1').datepicker();

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

function addClaim(id) {
	claimId++;
  var str = '<div id="add_court_info_row_' + id + '_' + claimId + '" class="add_court_info_' + id + ' add_court_infos form-row">' +
		'<div class="form-group col-md-4 form-inline">' +
			'<select id="court_claim_' + id + '_' + claimId + '" class="court_claim_' + id + ' court_claims custom-select col-md-12">' +
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
				'<select id="court_claim_type_' + id + '_' + claimId + '" class="court_claim_type_' + id + ' court_claim_types custom-select col-md-12">' +
					'<option>Удовлетворено</option>' +
					'<option>Отказано</option>' +
				'</select>' +
			'</div>' +
		'</div>' +
		'<div class="form-group col-md-3">' +
			'<div class="input-group">' +
				'<input id="court_claim_summ_' + id + '_' + claimId + '" class = "court_claim_summ_' + id + ' court_claim_summs input-numeral form-control" placeholder="Сумма" type="text" size="10">' +
				'<div class="input-group-append">' +
					'<span class="input-group-text">&#8381;</span>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="form-group col-ms-1">' +
			'<button id="court_claim_btn_' + id + '_' + claimId + '" class="court_claim_btn_' + id + ' btn btn-outline-danger" onclick="removeClaim(' + id + ', ' + claimId + ')">×</button>' +
		'</div>' +
	'</div><!-- add_court_info_row_1 -->' +
	'<div id="add_court_claim_info_' + id + '_' + claimId + '" class="add_court_claim_info_' + id + ' form-group ml-3" style="display:none">' +
		'<div class="form-group">' +
			'<h6>Период неустойки</h6>' +
		'</div>' +
		'<div class="form-group form-inline">' +
			'<label for="date_court_from_' + id + '_' + claimId + '">c</label>' +
			'<input id = "date_court_from_' + id + '_' + claimId + '" class = "date_court_penalty_from_' + id + ' date_court_froms ml-2 datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
			'<label for="date_court_to_' + id + '_' + claimId + '" class="ml-2">по</label>' +
			'<input id = "date_court_to_' + id + '_' + claimId + '" class = "date_court_penalty_to_' + id + ' date_court_tos ml-2 datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
			'<input id="court_without_period_' + id + '_' + claimId + '" class="court_without_period_' + id + ' court_without_periods ml-2" type="checkbox" onclick="block_court_date(' + id + ', ' + claimId + ')">' +
			'<label for="court_without_period_' + id + '_' + claimId + '" class="ml-2 form-check-label">Период не указан</label>' +
		'</div>' +
	'</div><!-- add_court1_claim_info_1 -->';



	$('#add_court_info_' + id).append(str);
	$('#date_court_from_' + id + '_' + claimId).datepicker();
	$('#date_court_to_' + id + '_' + claimId).datepicker();

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


function removeCourt(id) {
	$('#court_' + id).remove();

  if ($("#add_court_info_btn_" + id).find(".toggle").hasClass("rotate")) {
    $("#add_court_info_btn_" + id).find(".toggle").removeClass("rotate");
  }
}

function removeClaim(id, claimId) {
	$('#add_court_info_row_' + id + '_' + claimId).remove();
  $('#add_court_claim_info_' + id + '_' + claimId).remove();
}

//Показать дополнительную информацию по суду
$(document).on("click", ".add_court_info_btns", function (event) {
	if (!($(this).find(".toggle").hasClass("rotate"))) {
    $(this).parent().parent().next().show('fast'); //Показывает .add_court_info
    $(this).find(".toggle").addClass("rotate");
		if ($(this).parent().parent().next().children().first().find(':selected').text() == "Неустойка"){
			$(this).parent().parent().next().children().first().next().show('fast'); //Показывает .add_court_claim_info
		}
  } else {
    $(this).parent().parent().next().hide('fast'); //Скрывает .add_court_info
		// $(this).parent().parent().next().children().first().next().hide('fast'); //Скрывает .add_court_claim_info
    $(this).find(".toggle").removeClass("rotate");
  }
});

//Добавляет период взыскания неустойки судом
$(document).on("change", ".court_claims", function (event) {
	if ($(this).find(':selected').text() == "Неустойка") {
		$(this).parent().parent().next().show('fast');
	} else {
    $(this).parent().parent().next().hide('fast');
	}
});

//Блокировать даты судебной неустойки при проставленной галочке "Период не указан"
function block_court_date(id, claimId){
  if ($("#court_without_period_" + id + "_" + claimId).prop('checked')) {
    $("#date_court_from_" + id + "_" + claimId).prop('disabled', true);
    $("#date_court_to_" + id + "_" + claimId).prop('disabled', true);
    $("#date_court_from_" + id + "_" + claimId).val('');
    $("#date_court_to_" + id + "_" + claimId).val('');
  } else {
    $("#date_court_from_" + id + "_" + claimId).prop('disabled', false);
    $("#date_court_to_" + id + "_" + claimId).prop('disabled', false);
  }
}

//Блокирует суммы, в случае отказа
$(document).on("change", ".court_claim_types", function (event) {
	if ($(this).find(':selected').text() == "Удовлетворено") {
		$(this).parent().parent().next().children().first().children().first().prop('disabled', false);
	} else {
    $(this).parent().parent().next().children().first().children().first().prop('disabled', true);
		$(this).parent().parent().next().children().first().children().first().val('');
	}
});
