import { AppDate } from './moduls/app_date.js';
import { PaymentVoluntary } from './moduls/payment_voluntary.js';
import { COLUMN_NAME_0, COLUMN_NAME_1, COLUMN_NAME_2, COLUMN_NAME_3, COLUMN_NAME_4 } from './moduls/variables.js';
import { COLUMN_NAME_5, COLUMN_NAME_6, COLUMN_NAME_7, COLUMN_NAME_8, COLUMN_NAME_9 } from './moduls/variables.js';
import { COLUMN_NAME_20, COLUMN_NAME_21 } from './moduls/variables.js';
import { STR_PAYMENT_DETALED_HEADER, STR_PAYMENT_DETALED } from './moduls/variables.js';
import { paymentVoluntary } from './moduls/variables.js';
import { makeRubText_nominative } from './moduls/makeRubText_nominative.js';
import { makeRubText_genitive } from './moduls/makeRubText_genitive.js';
import { declinationDays } from './moduls/declinationDays.js';
// import { total_penalty_summ_accrued, total_penalty_summ_paid } from './moduls/variables.js';

var total_penalty_summ_accrued; //Общая сумма начисленной неустойки
var total_penalty_summ_paid; //Общая сумма выплаченной неустойки
var total_penalty; //Общая подлежаащей взысканию неустойки

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

$('#btn_desicion').click(function() {

  //Очистка таблицы вывода результатов
  $('#str_payment_dataled').empty();
  $('#str_payment_dataled_header').empty();
  $('#str_payment_dataled_footer').empty();

  //Обнуление значений
  total_penalty_summ_accrued = 0;
  total_penalty_summ_paid = 0;
  total_penalty = 0;

  //Получение массива значений всех переменных добровольных выплат
  var number_of_payments = $('div.payments').length; //Получение количества строк с выплатами
  var payments_names = $('.payments_names'); //Получение массива видов выплат
  var payments_dates = $('.payments_dates'); //Получение массива дат выплат
  var payments_summs = $('.payments_summs'); //Получение массива сумм выплат
  var penalty_ndfls = $('.penalty_ndfls'); //Получение массива выплат неустойки с НДФЛ
  var penalty_ndfl_summs = $('.penalty_ndfl_summs'); //Получение массива сумм удержанного НДФЛ
  var penalty_ndfl_persents = $('.penalty_ndfl_persents'); //Получение массива процентов НДФЛ

  //Выведение заголовка таблицы на экран
  $('#str_payment_dataled_header').append(STR_PAYMENT_DETALED_HEADER);

  //Создание экземпляров добровольных выплат
  for (var i = 0; i < number_of_payments; i++) {
    paymentVoluntary[i] = new PaymentVoluntary(i + 1,
                                               payments_names[i],
                                               payments_dates[i],
                                               payments_summs[i],
                                               penalty_ndfls[i],
                                               penalty_ndfl_summs[i]);
  }
  for (var i = 0; i < number_of_payments; i++) {
    if (paymentVoluntary[i].type.options.selectedIndex != 4) {
      paymentVoluntary[i].fillPayments();
      total_penalty_summ_accrued = total_penalty_summ_accrued + paymentVoluntary[i].penalty_summ;
    }
  }

  let total_penalty_summ_accrued_row = '<tr class="table-danger">' +
    '<th scope="row" colspan="6"><span>Общий размер начисленной неустойки</span></th>' +
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
    '<th scope="row" colspan="6"><span>Общий размер выплаченной неустойки</span></th>' +
    '<td scope="row"><span><b>' + makeRubText_nominative(total_penalty_summ_paid) + '</b></span></td>' +
  '</tr>';

  $('#str_payment_dataled').append(total_penalty_summ_paid_row);

  total_penalty = total_penalty_summ_accrued - total_penalty_summ_paid;

  let total_penalty_row = '<tr>' +
    '<th scope="row" colspan="6"><span>Общий размер подлежащей взысканию неустойки (' + makeRubText_nominative(total_penalty_summ_accrued) + ' - ' + makeRubText_nominative(total_penalty_summ_paid) + ')</span></th>' +
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

//Форматирование суммы
$('.input-number-fu').toArray().forEach(function(field){
  new Cleave(field, {
      prefix: 'У-'
  })
});

//Функция добавление всплывающей подсказки 20-й и 21-й дни
$(function () { $('[data-toggle="tooltip"]').tooltip(); })
