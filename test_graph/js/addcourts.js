var payId = 1;

function addCourt() {
	payId++;
  var str = '<div id="court_form_row_' + payId + '" class="form-row courts">' +
    '<div class="form-group col-md-4">' +
      '<input id="court' + payId + '_name" class="courts_names form-control" type="text" placeholder="Наименование суда" size="40">' +
    '</div>' +
    '<div class="form-group col-md-3">' +
      '<div class="input-group">' +
        '<input id="court' + payId + '_number" class = "courts_numbers form-control" placeholder="Номер" type="text" size="10">' +
        '<div class="input-group-append">' +
          '<span class="input-group-text">&#8470;</span>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="form-group col-md-2">' +
      '<input id = "court' + payId + '_date" class = "courts_dates datepicker-here form-control" placeholder="Дата" type="text" size="8">' +
    '</div>' +
    '<div class="form-group col-ms-1">' +
      '<button id="add_court_info_btn_' + payId + '" class="btn btn-outline-warning add_info" onclick="addCourtInfo(' + payId + ')">' +
        '<i class="fa fa-chevron-down toggle"></i>' +
      '</button>' +
    '</div>' +
    '<div class="form-group col-ms-1">' +
      '<button id="court_btn_' + payId + '" class="btn btn-outline-danger" onclick="removeCourt(' + payId + ')">×</button>' +
    '</div>' +
  '</div><!-- court_form_row_1 -->';



	$('#courts').append(str);
	$('#court' + payId + '_date').datepicker();

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
	$('#court_form_row_' + id).remove();
  $('#add_info_pay_form_row_' + id).remove();
  $('#add_info_penalty_form_row_' + id).remove();
  if ($("#add_court_info_btn_" + id).find(".toggle").hasClass("rotate")) {
    $("#add_court_info_btn_" + id).find(".toggle").removeClass("rotate");
  }
}

//TODO
function addCourtInfo(id) {
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
