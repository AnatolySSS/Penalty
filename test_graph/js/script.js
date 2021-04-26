import { AppDate } from './moduls/app_date.js';

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
