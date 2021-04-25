import { AppDate } from './moduls/app_date.js';
let date_sv, date_sv_last_day, date_sv_penalty_day;

$('#app_date_1').focusout(function analizeDate(){

  const app_date = new AppDate($('#app_date_1'),
                                $('#date_sv_last_day'),
                                $('#date_sv_penalty_day'));

  alert(app_date.countDateLastDay());

});
