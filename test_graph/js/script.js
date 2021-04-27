import { AppDate } from './moduls/app_date.js';
import { PaymentVoluntary } from './moduls/payment_voluntary.js';
import { COLUMN_NAME_0, COLUMN_NAME_1, COLUMN_NAME_2, COLUMN_NAME_3, COLUMN_NAME_4 } from './moduls/variables.js';
import { COLUMN_NAME_5, COLUMN_NAME_6, COLUMN_NAME_7, COLUMN_NAME_8, COLUMN_NAME_9 } from './moduls/variables.js';
import { COLUMN_NAME_20, COLUMN_NAME_21 } from './moduls/variables.js';
import { STR_PAYMENT_DETALED_HEADER, STR_PAYMENT_DETALED } from './moduls/variables.js';

let paymentVoluntary = [];

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
    paymentVoluntary[i].makeTable();
    // alert(paymentVoluntary[i].toString());
  }
});
