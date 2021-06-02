import { AppDate } from './moduls/app_date.js';
import { PaymentVoluntary } from './moduls/payment_voluntary.js';
import { PaymentFu } from './moduls/payment_fu.js';
import { PaymentCourt } from './moduls/payment_court.js';
import { COLUMN_NAME_0, COLUMN_NAME_1, COLUMN_NAME_2, COLUMN_NAME_3, COLUMN_NAME_4 } from './moduls/variables.js';
import { COLUMN_NAME_5, COLUMN_NAME_6, COLUMN_NAME_7, COLUMN_NAME_8 } from './moduls/variables.js';
import { COLUMN_NAME_20, COLUMN_NAME_21 } from './moduls/variables.js';
import { STR_PAYMENT_DETALED_HEADER, STR_PAYMENT_DETALED } from './moduls/variables.js';
import { paymentVoluntary, paymentFu, paymentCourt } from './moduls/variables.js';
import { makeRubText_nominative } from './moduls/makeRubText_nominative.js';
import { makeRubText_genitive } from './moduls/makeRubText_genitive.js';
import { declinationDays } from './moduls/declinationDays.js';
// import { total_penalty_summ_accrued, total_penalty_summ_paid } from './moduls/variables.js';

var total_penalty_summ_accrued; //Общая сумма начисленной неустойки
var total_penalty_summ_paid; //Общая сумма выплаченной неустойки
var total_penalty; //Общая подлежаащей взысканию неустойки
var max_penalty_period_length; // Максимальное количество периодов между периодами судебной неутсойки (индекс добровольной выплаты)
var max_penalty_period; // Максимальное количество периодов между периодами судебной неутсойки (количество элементов массива)
$('#app_date_1').focusout(function(){
  const date_sv = new AppDate($('#app_date_1'), $('#date_sv_last_day'), $('#date_sv_penalty_day'));
  date_sv.fillLastDate();
});

$('#app_date_2').focusout(function(){
  const date_uts = new AppDate($('#app_date_2'), $('#date_uts_last_day'), $('#date_uts_penalty_day'));
  date_uts.fillLastDate();
});

$('#app_date_3').focusout(function(){
  const date_ev = new AppDate($('#app_date_3'), $('#date_ev_last_day'), $('#date_ev_penalty_day'));
  date_ev.fillLastDate();
});

$('#app_date_4').focusout(function(){
  const date_stor = new AppDate($('#app_date_4'), $('#date_stor_last_day'), $('#date_stor_penalty_day'));
  date_stor.fillLastDate();
});

//Обработка события потери фокуса даты решения ФУ
$(document).on("focusout", ".fu_dates", function(){
  //Получение массива значений всех переменных решений ФУ
  var number_of_fus = $('div.fus').length; //Получение количества строк с выплатами
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
  max_penalty_period_length = 0;
  max_penalty_period = 0;

  //Получение массива значений всех переменных добровольных выплат
  var number_of_payments = $('div.payments').length; //Получение количества строк с выплатами
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
    if (paymentVoluntary[i].penalty_period.length > max_penalty_period) {
      max_penalty_period_length = i
      max_penalty_period = paymentVoluntary[i].penalty_period.length
    }
  }

  //Выведение заголовка таблицы на экран
  if (max_penalty_period > 0) {
    paymentVoluntary[max_penalty_period_length].fillHeader();
  } else {
    $('#str_payment_dataled_header').append(STR_PAYMENT_DETALED_HEADER);
    max_penalty_period = 1;
  }

  //Получение массива значений всех переменных решений ФУ
  var number_of_fus = $('.fus').length; //Получение количества строк с выплатами
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
  }

  //Получение массива значений всех переменных решений судов
  var number_of_courts = $('.courts').length; //Получение количества строк с выплатами
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

  total_penalty = total_penalty_summ_accrued - total_penalty_summ_paid;

  let total_penalty_row = '<tr>' +
    '<th scope="row" colspan="' + (max_penalty_period * 4 + 2) + '"><span>Общий размер подлежащей взысканию неустойки (' + makeRubText_nominative(total_penalty_summ_accrued) + ' - ' + makeRubText_nominative(total_penalty_summ_paid) + ')</span></th>' +
    '<td scope="row"><span><b>' + makeRubText_nominative(total_penalty) + '</b></span></td>' +
  '</tr>';

  $('#str_payment_dataled_footer').append(total_penalty_row);

});

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

//Форматирование номера решения ФУ
$('.input-number-fu').toArray().forEach(function(field){
  new Cleave(field, {
      prefix: 'У-'
  })
});

//Функция добавление всплывающей подсказки 20-й и 21-й дни
$(function () { $('[data-toggle="tooltip"]').tooltip(); })
