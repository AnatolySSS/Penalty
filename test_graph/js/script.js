import { AppDate } from './moduls/app_date.js';
import { PaymentVoluntary } from './moduls/payment_voluntary.js';
import { PaymentFu } from './moduls/payment_fu.js';
import { PaymentCourt } from './moduls/payment_court.js';
import { COLUMN_NAME_0, COLUMN_NAME_1, COLUMN_NAME_2, COLUMN_NAME_3, COLUMN_NAME_4 } from './moduls/variables.js';
import { COLUMN_NAME_5, COLUMN_NAME_6, COLUMN_NAME_7, COLUMN_NAME_8 } from './moduls/variables.js';
import { COLUMN_NAME_20, COLUMN_NAME_21 } from './moduls/variables.js';
import { DAY, STR_PAYMENT_DETALED_HEADER, STR_PAYMENT_DETALED, DATE_EURO_START } from './moduls/variables.js';
import { paymentVoluntary, paymentFu, paymentCourt } from './moduls/variables.js';
import { makeRubText_nominative } from './moduls/makeRubText_nominative.js';
import { makeRubText_genitive } from './moduls/makeRubText_genitive.js';
import { changeDateType } from './moduls/changeDateType.js';
import { declinationDays } from './moduls/declinationDays.js';
import { fillPenaltyGraph } from './moduls/graph.js';
import { makeTextDecision } from './moduls/makeTextDecision.js';
import { decision_analize } from './moduls/analyze_fu_decision.js';
import { autocomplete } from './moduls/autocomplete.js';
import { fo_data } from './moduls/objects/foData';
import { renderDOM } from "./moduls/react/react.js";
// import { makeDecisionFile } from './moduls/docx.js';
// import { total_penalty_summ_accrued, total_penalty_summ_paid } from './moduls/variables.js';

//Формируем DOM bp react файла
renderDOM()

var total_penalty_summ_accrued; //Общая сумма начисленной неустойки
var total_penalty_summ_paid; //Общая сумма выплаченной неустойки
var total_penalty_summ; //Общая сумма начисленной неустойки с учетом лимита 100 000 или 400 000
var total_penalty; //Общая подлежаащей взысканию неустойки
var max_penalty_period; // Максимальное количество периодов между периодами судебной неутсойки (количество элементов массива)
var number_of_penalty_periods; // Количество периодов для начисления неустойки
var max_days_delay; // максимальное количество дней просрочки
var swg_graph = SVG().addTo('#div_svg').size('100%', '100%');
var count_days = [];
var penalty_day = [];
var count_vol_days = [];
var payment_vol_types = [];
var count_fu_days = [];
var count_court_days = [];
var payment_vol_summs = [];
var payment_fu_summs = [];
var payment_fu_types = [];
var payment_court_summs = [];
var payment_court_types = [];
var date_sv, date_uts, date_ev, date_stor;
var number_of_payments, number_of_fus, number_of_courts;
var fu_claim_set = new Set();
var decision = '';
var europrotocol;
var date_dtp;
var max_summ;

$('#app_date_1').focusout(function(){
  date_sv = new AppDate($('#app_date_1'), $('#date_sv_last_day'), $('#date_sv_penalty_day'));
  date_sv.fillLastDate();
  count_days[0] = date_sv.count_days;
  penalty_day[0] = date_sv.getPenaltyDayFormatted();
});

$('#app_date_2').focusout(function(){
  date_uts = new AppDate($('#app_date_2'), $('#date_uts_last_day'), $('#date_uts_penalty_day'));
  date_uts.fillLastDate();
  count_days[1] = (date_uts.getPenaltyDay() - date_sv.getAppDate()) / DAY;
  penalty_day[1] = date_uts.getPenaltyDayFormatted();
});

$('#app_date_3').focusout(function(){
  date_ev = new AppDate($('#app_date_3'), $('#date_ev_last_day'), $('#date_ev_penalty_day'));
  date_ev.fillLastDate();
  count_days[2] = (date_ev.getPenaltyDay() - date_sv.getAppDate()) / DAY;
  penalty_day[2] = date_ev.getPenaltyDayFormatted();
});

$('#app_date_4').focusout(function(){
  date_stor = new AppDate($('#app_date_4'), $('#date_stor_last_day'), $('#date_stor_penalty_day'));
  date_stor.fillLastDate();
  count_days[3] = (date_stor.getPenaltyDay() - date_sv.getAppDate()) / DAY;
  penalty_day[3] = date_stor.getPenaltyDayFormatted();
});

//Обработка события потери фокуса даты решения ФУ
$(document).on("focusout", ".fu_dates", function(){
  //Получение массива значений всех переменных решений ФУ
  number_of_fus = $('div.fus').length; //Получение количества строк с выплатами
  var fu_names = $('.fu_names'); //Получение массива ФУ
  var fu_types = $('.fu_types'); //Получение массива дат решений ФУ
  var fu_dates = $('.fu_dates'); //Получение массива дат решений ФУ
  var fu_numbers = $('.fu_numbers'); //Получение массива номеров решений ФУ
  var fu_pay_dates = $('.fu_pay_dates'); //Получение массива дат решений ФУ
  var fu_in_force_dates = $('.fu_in_force_dates'); //Получение массива дат решений ФУ
  var fu_last_day_for_pay_dates = $('.fu_last_day_for_pay_dates'); //Получение массива дат решений ФУ

  //Создание экземпляров решений ФУ
  for (var i = 0; i < number_of_fus; i++) {
    paymentFu[i] = new PaymentFu(i + 1,
                                 fu_names[i],
                                 fu_types[i],
                                 fu_dates[i],
                                 fu_numbers[i],
                                 fu_pay_dates[i],
                                 fu_in_force_dates[i],
                                 fu_last_day_for_pay_dates[i]);
    paymentFu[i].fillDates();
  }
  // paymentFu[$(this).index('.fu_dates')].fillDates();
});

$('#btn_desicion').click(function() {

  //Очистка таблицы вывода результатов
  $('#str_payment_dataled').empty();
  $('#str_payment_dataled_header').empty();
  $('#str_payment_dataled_footer').empty();

  //Обнуление значений
  total_penalty_summ_accrued = 0;
  total_penalty_summ_paid = 0;
  total_penalty = 0;
  max_penalty_period = 0;
  max_days_delay = 0;
  count_vol_days.length = 0;
  payment_vol_types.length = 0;
  count_fu_days.length = 0;
  count_court_days.length = 0;
  payment_vol_summs.length = 0;
  payment_fu_summs.length = 0;
  payment_fu_types.length = 0;
  payment_court_summs.length = 0;
  payment_court_types.length = 0;
  fu_claim_set.clear();

  if ($('#app_date_1').val() == "") {
    count_days[0] = NaN;
  }
  if ($('#app_date_2').val() == "") {
    count_days[1] = NaN;
  }
  if ($('#app_date_3').val() == "") {
    count_days[2] = NaN;
  }
  if ($('#app_date_4').val() == "") {
    count_days[3] = NaN;
  }

  //Расчет страховой суммы
  europrotocol = document.querySelector('#europrotocol').checked;
  date_dtp = document.querySelector('#date_dtp').value;
  date_dtp = changeDateType(date_dtp);
  date_dtp = Date.parse(date_dtp + 'T00:00:00');

  if (date_dtp >= DATE_EURO_START && europrotocol) { // Если дата ДТП после 01.06.2018 И Европротокол
    max_summ = 100000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 100 000₽";
  } else if (date_dtp >= DATE_EURO_START && !europrotocol){ // Если дата ДТП после 01.06.2018 И НЕ Европротокол
    max_summ = 400000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 400 000₽";
  } else if (date_dtp < DATE_EURO_START && europrotocol) { // Если дата ДТП до 01.06.2018 И Европротокол
    max_summ = 50000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 50 000₽";
  } else if (date_dtp < DATE_EURO_START && !europrotocol) { // Если дата ДТП до 01.06.2018 И НЕ Европротокол
    max_summ = 400000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 400 000₽";
  } else if (europrotocol) { //Если Европротокол (без указания даты)
    max_summ = 100000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 100 000₽";
  } else { // остальные случаи
    max_summ = 400000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 400 000₽";
  }

  //Получение массива значений всех переменных добровольных выплат
  number_of_payments = $('div.payments').length; //Получение количества строк с выплатами
  var payments_names = $('.payments_names'); //Получение массива видов выплат
  var payments_dates = $('.payments_dates'); //Получение массива дат выплат
  var payments_summs = $('.payments_summs'); //Получение массива сумм выплат
  var penalty_ndfls = $('.penalty_ndfls'); //Получение массива выплат неустойки с НДФЛ
  var penalty_ndfl_summs = $('.penalty_ndfl_summs'); //Получение массива сумм удержанного НДФЛ
  var penalty_ndfl_persents = $('.penalty_ndfl_persents'); //Получение массива процентов НДФЛ
  //Создание экземпляров добровольных выплат
  for (var i = 0; i < number_of_payments; i++) {
    paymentVoluntary[i] = new PaymentVoluntary(i + 1,
                                               payments_names[i],
                                               payments_dates[i],
                                               payments_summs[i],
                                               penalty_ndfls[i],
                                               penalty_ndfl_summs[i]);
    count_vol_days[i] = paymentVoluntary[i].count_days;
    payment_vol_types[i] = paymentVoluntary[i].type.options.selectedIndex;
    payment_vol_summs[i] = paymentVoluntary[i].summ / 1000;
    if (paymentVoluntary[i].penalty_period.length > max_penalty_period) {
      max_penalty_period = paymentVoluntary[i].penalty_period.length
    }
    if (paymentVoluntary[i].days_delay > max_days_delay) {
      max_days_delay = paymentVoluntary[i].count_days; //Получение значения самой большой задержки
    }
  }

  //Получение массива значений всех переменных решений ФУ
  number_of_fus = $('.fus').length; //Получение количества строк с выплатами
  var fu_names = $('.fu_names'); //Получение массива ФУ
  var fu_types = $('.fu_types'); //Получение массива типов решений ФУ
  var fu_dates = $('.fu_dates'); //Получение массива дат решений ФУ
  var fu_numbers = $('.fu_numbers'); //Получение массива номеров решений ФУ
  var fu_pay_dates = $('.fu_pay_dates'); //Получение массива дат решений ФУ
  var fu_in_force_dates = $('.fu_in_force_dates'); //Получение массива дат решений ФУ
  var fu_last_day_for_pay_dates = $('.fu_last_day_for_pay_dates'); //Получение массива дат решений ФУ

  //Создание экземпляров решений ФУ
  for (var i = 0; i < number_of_fus; i++) {
    paymentFu[i] = new PaymentFu(i + 1,
                                 fu_names[i],
                                 fu_types[i],
                                 fu_dates[i],
                                 fu_numbers[i],
                                 fu_pay_dates[i],
                                 fu_in_force_dates[i],
                                 fu_last_day_for_pay_dates[i]);
    count_fu_days[i] = paymentFu[i].count_days;
    // payment_fu_last_days[i] = (paymentFu[i].getLastDayForPayFu() - date_sv.getAppDate()) / DAY;
    payment_fu_summs[i] = [];
    payment_fu_types[i] = [];
    for (var j = 0; j < paymentFu[i].claim.length; j++) {
      if (paymentFu[i].claim[j].name.options.selectedIndex == 0 ||
          paymentFu[i].claim[j].name.options.selectedIndex == 1 ||
          paymentFu[i].claim[j].name.options.selectedIndex == 2 ||
          paymentFu[i].claim[j].name.options.selectedIndex == 3) {
        payment_fu_summs[i][j] = paymentFu[i].claim[j].summ / 1000;
        payment_fu_types[i][j] = paymentFu[i].claim[j].name.options.selectedIndex;
      }
    }

    if (paymentFu[i].max_penalty_period > max_penalty_period) {
     max_penalty_period = paymentFu[i].max_penalty_period;
    }
    if (paymentFu[i].count_days > max_days_delay) {
      max_days_delay = paymentFu[i].count_days; //Получение значения самой большой задержки
    }
  }

  //Получение массива значений всех переменных решений судов
  number_of_courts = $('.courts').length; //Получение количества строк с выплатами
  var court_names = $('.court_names'); //Получение массива наименований судов
  var court_numbers = $('.court_numbers'); //Получение массива номеров решений судов
  var court_dates = $('.court_dates'); //Получение массива дат решений судов
  var court_in_force_dates = $('.court_in_force_dates'); //Получение массива дат решений судов
  var court_pay_dates = $('.court_pay_dates'); //Получение массива дат решений судов

  //Создание экземпляров решений ФУ
  for (var i = 0; i < number_of_courts; i++) {
    paymentCourt[i] = new PaymentCourt(i + 1,
                                 court_names[i],
                                 court_numbers[i],
                                 court_dates[i],
                                 court_in_force_dates[i],
                                 court_pay_dates[i]);
    count_court_days[i] = paymentCourt[i].count_days;
    // payment_court_in_force_dates[i] = (paymentCourt[i].getInForceDate() - date_sv.getAppDate()) / DAY;
    fu_claim_set = paymentCourt[i].fu_claim_set;
    payment_court_summs[i] = [];
    payment_court_types[i] = [];
    for (var j = 0; j < paymentCourt[i].claim.length; j++) {
      if (paymentCourt[i].claim[j].name.options.selectedIndex == 0 ||
          paymentCourt[i].claim[j].name.options.selectedIndex == 1 ||
          paymentCourt[i].claim[j].name.options.selectedIndex == 2 ||
          paymentCourt[i].claim[j].name.options.selectedIndex == 3) {
        payment_court_summs[i][j] = paymentCourt[i].claim[j].summ / 1000;
        payment_court_types[i][j] = paymentCourt[i].claim[j].name.options.selectedIndex;
      }
    }

    if (paymentCourt[i].max_penalty_period > max_penalty_period) {
      max_penalty_period = paymentCourt[i].max_penalty_period;
    }
    if (paymentCourt[i].count_days > max_days_delay) {
      max_days_delay = paymentCourt[i].count_days; //Получение значения самой большой задержки
    }

  }

  //Выведение заголовка таблицы на экран
  if (max_penalty_period > 0) {
    fillHeader(max_penalty_period);
  } else {
    $('#str_payment_dataled_header').append(STR_PAYMENT_DETALED_HEADER);
    max_penalty_period = 1;
  }

  for (var i = 0; i < number_of_payments; i++) {
    if (paymentVoluntary[i].type.options.selectedIndex != 4) {
      paymentVoluntary[i].fillPayments();
      total_penalty_summ_accrued = total_penalty_summ_accrued + paymentVoluntary[i].penalty_summ;
    }
  }

  for (var i = 0; i < number_of_fus; i++) {
    paymentFu[i].fillPayments();
    total_penalty_summ_accrued = total_penalty_summ_accrued + paymentFu[i].total_penalty_summ_fu;
  }

  for (var i = 0; i < number_of_courts; i++) {
    paymentCourt[i].fillPayments();
    total_penalty_summ_accrued = total_penalty_summ_accrued + paymentCourt[i].total_penalty_summ_court;
  }

  let total_penalty_summ_accrued_row = '<tr class="table-danger">' +
    '<th scope="row" colspan="' + (max_penalty_period * 4 + 2) + '"><span>Общий размер начисленной неустойки</span></th>' +
    '<td scope="row"><span><b>' + makeRubText_nominative(total_penalty_summ_accrued) + '</b></span></td>' +
  '</tr>';

  $('#str_payment_dataled').append(total_penalty_summ_accrued_row);

  for (var i = 0; i < number_of_payments; i++) {
    if (paymentVoluntary[i].type.options.selectedIndex == 4) {
      paymentVoluntary[i].fillPayments();
      total_penalty_summ_paid = total_penalty_summ_paid + paymentVoluntary[i].summ;
    }
  }

  let total_penalty_summ_paid_row = '<tr class="table-success">' +
    '<th scope="row" colspan="' + (max_penalty_period * 4 + 2) + '"><span>Общий размер выплаченной неустойки</span></th>' +
    '<td scope="row"><span><b>' + makeRubText_nominative(total_penalty_summ_paid) + '</b></span></td>' +
  '</tr>';

  $('#str_payment_dataled').append(total_penalty_summ_paid_row);

  if (total_penalty_summ_accrued > max_summ) {
    total_penalty_summ = max_summ;
  } else {
    total_penalty_summ = total_penalty_summ_accrued;
  }

  total_penalty = total_penalty_summ - total_penalty_summ_paid;

  let total_penalty_row = '<tr>' +
    '<th scope="row" colspan="' + (max_penalty_period * 4 + 2) + '"><span>Общий размер подлежащей взысканию неустойки (' + makeRubText_nominative(total_penalty_summ) + ' - ' + makeRubText_nominative(total_penalty_summ_paid) + ')</span></th>' +
    '<td scope="row"><span><b>' + makeRubText_nominative(total_penalty) + '</b></span></td>' +
  '</tr>';

  $('#str_payment_dataled_footer').append(total_penalty_row);

  // $('#exampleModal').one('shown.bs.modal', function (e) {
  //   $(this).find(".table_result").freezeTable({
  //     'container': '.modal-body',
  //   });
  // });
  // $('#scroll_table_body').fixedHeaderTable('show', 1000);
});

function fillHeader(length){
  var str_payment_dataled_header = '';
  var str_payment_dataled_header_1 = '';
  var str_payment_dataled_header_2 = '';
  for (var i = 0; i < length; i++) {
    str_payment_dataled_header_1 = str_payment_dataled_header_1 + '<th colspan="4" scope="col"><span id="COLUMN_NAME_3">' + COLUMN_NAME_8 + (i + 1) + '</span></th>'
    str_payment_dataled_header_2 = str_payment_dataled_header_2 +
    '<th scope="col"><span id="COLUMN_NAME_4">' + COLUMN_NAME_4 + '</span></th>' +
    '<th scope="col"><span id="COLUMN_NAME_5">' + COLUMN_NAME_5 + '</span></th>' +
    '<th scope="col"><span id="COLUMN_NAME_6">' + COLUMN_NAME_6 + '</span></th>' +
    '<th scope="col"><span id="COLUMN_NAME_7">' + COLUMN_NAME_7 + '</span></th>';
  }
  str_payment_dataled_header = '<tr align="center" class="table-bordered">' +
    '<th rowspan="2" scope="col" style="vertical-align: middle;"><span id="COLUMN_NAME_0">' + COLUMN_NAME_0 + '</span></th>' +
    '<th rowspan="2" scope="col" style="vertical-align: middle;"><span id="COLUMN_NAME_1">' + COLUMN_NAME_1 + '</span></th>' +
    '<th rowspan="2" scope="col" style="vertical-align: middle;"><span id="COLUMN_NAME_3">' + COLUMN_NAME_3 + '</span></th>' +
    str_payment_dataled_header_1 +
  '</tr>' +
  '<tr align="center" class="table-bordered">' +
    str_payment_dataled_header_2 +
  '</tr>';
  //Выведение заголовка таблицы на экран
  $('#str_payment_dataled_header').append(str_payment_dataled_header);
}

//Форматирование даты
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

//Форматирование ИНН ФО
$('#fo_inn').toArray().forEach(function(field){
  new Cleave(field, {
      numeral: true,
      numeralThousandsGroupStyle: 'none',
      numeralPositiveOnly: true,
      numeralIntegerScale: 10
  })
});

//Форматирование номера решения ФУ
// $('.input-number-fu').toArray().forEach(function(field){
//   new Cleave(field, {
//       prefix: 'У-'
//   })
// });

//Функция добавление всплывающей подсказки 20-й и 21-й дни
$(function () { $('[data-toggle="tooltip"]').tooltip(); })

document.getElementById('show_decision').onclick = function show_decision(){
  if ($('#show_decision').html() == "Показать текст решения") {
    $('#decision').show();
    $('#show_decision').html("Скрыть текст решения");
    decision = makeTextDecision(paymentVoluntary,
                                paymentFu,
                                paymentCourt,
                                total_penalty_summ_accrued,
                                total_penalty_summ_paid,
                                max_summ,
                                fu_claim_set);
    // makeDecisionFile(decision);
    document.querySelector('#decision').innerHTML = decision;
    selectText('decision');
  } else {
    $('#decision').hide();
    $('#show_decision').html("Показать текст решения");
  }
}

document.getElementById('show_graph').onclick = function show_graph(){
  if ($('#show_graph').html() == "Показать график неустоек") {
    $('#div_svg').show();
    $('#show_graph').html("Скрыть график неустоек");
      fillPenaltyGraph(swg_graph,
                       max_days_delay,
                       count_days,
                       penalty_day,
                       count_vol_days,
                       payment_vol_types,
                       payment_vol_summs,
                       count_fu_days,
                       payment_fu_summs,
                       payment_fu_types,
                       count_court_days,
                       payment_court_summs,
                       payment_court_types,
                       fu_claim_set,
                       date_sv,
                       paymentVoluntary,
                       paymentFu,
                       paymentCourt);
  } else {
    $('#div_svg').hide();
    $('#show_graph').html("Показать график неустоек");
  }
}

document.getElementById('close_modal').onclick = function (){
  $('#div_svg').hide();
  $('#show_graph').html("Показать график неустоек");
  $('#decision').hide();
  $('#show_decision').html("Показать текст решения");
}

document.getElementById('btn_fu_decision_analyze').onclick = function (){
    let files = document.getElementById("fu_decision_file").files;
    decision_analize(files);
}

function selectText(containerid) {
		if (document.selection) { // IE
			var range = document.body.createTextRange();
			range.moveToElementText(document.getElementById(containerid));
			range.select();
		} else if (window.getSelection) {
			var range = document.createRange();
			range.selectNode(document.getElementById(containerid));
			window.getSelection().removeAllRanges();
			window.getSelection().addRange(range);
		}
    document.execCommand('copy');

    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else { // старый IE
      document.selection.empty();
    }

    iziToast.show({
        timeout: 3000,
        color: '#F5E1A6',
        //title: 'Hey',
        message: 'Текст решения скопирован',
    });
	}

  var fo = []

  fo_data.fo_data.forEach(element => {
    fo.push(element.fo_name)
  });

  // autocomplete(document.getElementById("fo_name"), fo);

  $('.autocomplete input').toArray().forEach(element => {
    autocomplete(element, fo)
  });

  // autocomplete($('#fo_name').toArray()[0], fo)

  function validationCheck(className) {
    setTimeout(() => {
      $(`${className} .form-control`).focusout(function(){
        var isOk = true
        $(`${className} .form-control`).each(function() {
          if ($(this).css('border-color') == 'rgb(220, 53, 69)') {
            isOk = false
          }
        })
        if (isOk) {
          $(`${className}`).children().first().next().html(`<i class="fa fa-check-square-o fa-2x" aria-hidden="true" style="color: #28a745;"></i>`)
        } else {
          $(`${className}`).children().first().next().html(`<i class="fa fa-exclamation-circle fa-2x" aria-hidden="true" style="color: #dc3545;"></i>`)
        }
      })
    }, 200)
  }
  
    validationCheck('.preambula')
    validationCheck('.main-claims-all')
    validationCheck('.main-request')