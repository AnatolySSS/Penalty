function addrows(e) {

  let target = e.target || e.srcElement;

  if (target == app_btn_1) {
    $("#app_form_row_2").show('fast');
    $("#app_form_row_3").show('fast');
    $("#app_form_row_4").show('fast');
  } else if (target == app_btn_2) {
    $("#app_form_row_2").hide('fast');
    document.getElementById('app_date_2').value = "";
    document.querySelector('#date_uts_last_day').removeAttribute('tooltip');
    document.querySelector('#date_uts_last_day').innerHTML = "";
    document.querySelector('#date_uts_penalty_day').innerHTML = "";
    document.querySelector('#date_uts_last_day').style.color = '#595b5e';
  } else if (target == app_btn_3) {
    $("#app_form_row_3").hide('fast');
    document.getElementById('app_date_3').value = "";
    document.querySelector('#date_ev_last_day').removeAttribute('tooltip');
    document.querySelector('#date_ev_last_day').innerHTML = "";
    document.querySelector('#date_ev_penalty_day').innerHTML = "";
    document.querySelector('#date_ev_last_day').style.color = '#595b5e';
  } else if (target == app_btn_4) {
    $("#app_form_row_4").hide('fast');
    document.getElementById('app_date_4').value = "";
    document.querySelector('#date_stor_last_day').removeAttribute('tooltip');
    document.querySelector('#date_stor_last_day').innerHTML = "";
    document.querySelector('#date_stor_penalty_day').innerHTML = "";
    document.querySelector('#date_stor_last_day').style.color = '#595b5e';
  }

  // if (target == court_if_1) {
  //   $("#div_date_court_1").show();
  //   $("#div_date_fu_1").hide();
  // } else if (target == voluntary_if_1) {
  //   $("#div_date_fu_1").hide();
  //   $("#div_date_court_1").hide();
  // } else if (target == fu_if_1) {
  //   $("#div_date_fu_1").show();
  //   $("#div_date_court_1").hide();
  // }
}

document.addEventListener('click', addrows);

var payId = 1;

function addPay() {
	payId++;
  var str = '<div id="pay_form_row_' + payId + '" class="form-row payments">' +
    '<div class="form-group col-md-4 form-inline">' +
      '<select id="pay' + payId + '" class="payments_names custom-select col-md-12">' +
        '<option>Страховое возмещение</option>' +
        '<option>УТС</option>' +
        '<option>Эвакуатор</option>' +
        '<option>Хранение</option>' +
        '<option>Неустойка</option>' +
      '</select>' +
    '</div>' +
    '<div class="form-group col-md-2">' +
      '<input id = "pay' + payId + '_date" class = "payments_dates datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
    '</div>' +
    '<div class="form-group col-md-3">' +
      '<div class="input-group">' +
        '<input id="pay' + payId + '_text" class = "payments_summs input-numeral form-control" placeholder="Сумма" type="text" size="10">' +
        '<div class="input-group-append">' +
          '<span class="input-group-text">&#8381;</span>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="form-group col-ms-1">' +
      '<button id="add_info_btn_' + payId + '" class="btn btn-outline-warning add_info" onclick="addInfo(' + payId + ')">' +
        '<i class="fa fa-chevron-down toggle"></i>' +
      '</button>' +
    '</div>' +
    '<div class="form-group col-ms-1">' +
      '<button id="pay_btn_' + payId + '" class="btn btn-outline-danger" onclick="removePay(' + payId + ')">×</button>' +
    '</div>' +
  '</div><!-- pay_form_row -->' +

  '<div id="add_info_pay_form_row_' + payId + '" class="add_info_pay_form form-row ml-2 mb-4" style="display:none">' +
  '<div class="col">' +
    '<div class="form-check">' +
      '<input id="voluntary_if_' + payId + '" class="voluntary_ifs form-check-input" type="radio" name="payment_option_' + payId + '" value="option1" >' +
      '<label for="voluntary_if_' + payId + '" class="form-check-label">Добровольная выплата</label>' +
    '</div><!-- div_voluntary -->' +
    '<div class="form-check">' +
      '<input id="fu_if_' + payId + '" class="fu_ifs form-check-input" type="radio" name="payment_option_' + payId + '" value="option2" onclick="show_court_fu_date(' + payId + ')">' +
      '<label for="fu_if_' + payId + '" class="form-check-label">Выплата на основании решения ФУ</label>' +
    '</div><!-- div_FU -->' +
    '<div class="form-check">' +
      '<input id="court_if_' + payId + '" class="court_ifs form-check-input" type="radio" name="payment_option_' + payId + '" value="option3" onclick="show_court_fu_date(' + payId + ')">' +
      '<label for="court_if_' + payId + '" class="form-check-label">Выплата на основании решения суда</label>' +
    '</div><!-- div_court -->' +
    '</div>' +
    '<div id="div_date_court_' + payId + '" class="form-group col-md-6 form-inline mt-2" style="display:none">' +
      '<label for="date_court_' + payId + '" class="mr-2">Дата решения суда</label>' +
      '<input id = "date_court_' + payId + '" class = "datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
    '</div><!-- div_date_court -->' +
    '<div id="div_date_fu_' + payId + '" class="form-group col-md-6 form-inline mt-2" style="display:none">' +
      '<label for="date_fu_' + payId + '" class="mr-2">Дата решения ФУ</label>' +
      '<input id = "date_fu_' + payId + '" class = "datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
    '</div><!-- div_date_court -->' +
  '</div><!-- add_info_pay_form_row -->' +
  '<div id="add_info_penalty_form_row_' + payId + '" class="form-row" style="display:none">' +
      '<div class="form-group col-md-4 form-inline">' +
        '<div class="form-check">' +
          '<input id="penalty_ndfl_' + payId + '" class="penalty_ndfls form-check-input" type="checkbox" onclick="addPenalty_ndfl_summ_form(' + payId + ')">' +
          '<label for="penalty_ndfl_' + payId + '" class="ml-2  form-check-label">удержан НДФЛ в размере</label>' +
        '</div>' +
      '</div>' +
      '<div id="penalty_ndfl_summ_form_' + payId + '" class="form-group col-md-3" style="display:none">' +
        '<div class="input-group">' +
          '<input id="penalty_ndfl_summ_' + payId + '" class = "penalty_ndfl_summs input-numeral form-control" placeholder="Сумма НДФЛ" type="text" size="10">' +
          '<div class="input-group-append">' +
            '<span class="input-group-text">&#8381;</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="form-group col-md-3 form-inline">' +
        '<span id="penalty_ndfl_persent_' + payId + '" class="penalty_ndfl_persents"></span>' +
      '</div>' +
  '</div><!-- add_info_penalty_form_row_1 -->'

	$('#pays').append(str);
	$('#pay' + payId + '_date').datepicker();

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

function removePay(id) {
	$('#pay_form_row_' + id).remove();
  $('#add_info_pay_form_row_' + id).remove();
  $('#add_info_penalty_form_row_' + id).remove();
  if ($("#add_info_btn_" + id).find(".toggle").hasClass("rotate")) {
    $("#add_info_btn_" + id).find(".toggle").removeClass("rotate");
  }
}

function addInfo(id) {
  if (document.getElementById("pay" + id).options.selectedIndex == 4) {
    if (!($('#add_info_btn_' + id).find(".toggle").hasClass("rotate"))) {
      $('#add_info_penalty_form_row_' + id).show('fast');
      $('#add_info_btn_' + id).find(".toggle").addClass("rotate");
    } else {
      $('#add_info_btn_' + id).parent().parent().next().next().hide('fast');
      $('#add_info_btn_' + id).find(".toggle").removeClass("rotate");
    }
  } else {
    if (!($('#add_info_btn_' + id).find(".toggle").hasClass("rotate"))) {
      $('#add_info_pay_form_row_' + id).show('fast');
      $('#add_info_btn_' + id).find(".toggle").addClass("rotate");
    } else {
      $('#add_info_btn_' + id).parent().parent().next().hide('fast');
      $('#add_info_btn_' + id).find(".toggle").removeClass("rotate");
    }
  }
}

function addPenalty_ndfl_summ_form(id) {
  if ($('#penalty_ndfl_' + id).is(':checked')) {
    $('#penalty_ndfl_summ_form_' + id).show();
  } else {
    $('#penalty_ndfl_summ_form_' + id).hide();
  }
}

//TODO доделать
function show_court_fu_date(id) {
  if ($(this) == $('court_if_' + id)) {
    $("#div_date_court_" + id).show();
    $("#div_date_fu_" + id).hide();
  } else if ($(this) == $('voluntary_if_' + id)) {
    $("#div_date_fu_" + id).hide();
    $("#div_date_court_" + id).hide();
  } else if ($(this) == $('fu_if_' + id)) {
    $("#div_date_fu_" + id).show();
    $("#div_date_court_" + id).hide();
  }
}
