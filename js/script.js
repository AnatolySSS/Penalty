let day = 24*60*60*1000;

let date_sv, date_sv_last_day, date_sv_penalty_day;
let date_uts, date_uts_last_day, date_uts_penalty_day;
let date_ev, date_ev_last_day, date_ev_penalty_day;
let date_stor, date_stor_last_day, date_stor_penalty_day;
let total_count = 0;

document.querySelector('button').onclick = function(){
  //Получение значений даты обращений с требованиями и исчисление 20го дня
  date_sv = document.querySelector('#date_sv').value;
  date_sv = Date.parse(date_sv);
  date_sv_last_day = findLastDay(date_sv);
  date_sv_penalty_day = date_sv_last_day + day;

  date_uts = document.querySelector('#date_uts').value;
  date_uts = Date.parse(date_uts);
  date_uts_last_day = findLastDay(date_uts);
  date_uts_penalty_day = date_uts_last_day + day;

  date_ev = document.querySelector('#date_ev').value;
  date_ev = Date.parse(date_ev);
  date_ev_last_day = findLastDay(date_ev);
  date_ev_penalty_day = date_ev_last_day + day;

  date_stor = document.querySelector('#date_stor').value;
  date_stor = Date.parse(date_stor);
  date_stor_last_day = findLastDay(date_stor);
  date_stor_penalty_day = date_stor_last_day + day;

  //выведение значений 20го дня на экран
  if (!isNaN(date_sv_last_day)) {
    document.querySelector('#date_sv_last_day').innerHTML = '20й день: ' + formatDate(new Date(date_sv_last_day));
    document.querySelector('#date_sv_penalty_day').innerHTML = 'Начало неустойки: ' + formatDate(new Date(date_sv_penalty_day));
  }
  if (!isNaN(date_uts_last_day)) {
    document.querySelector('#date_uts_last_day').innerHTML = formatDate(new Date(date_uts_last_day));
    document.querySelector('#date_uts_penalty_day').innerHTML = formatDate(new Date(date_uts_penalty_day));
  }
  if (!isNaN(date_ev_last_day)) {
    document.querySelector('#date_ev_last_day').innerHTML = formatDate(new Date(date_ev_last_day));
    document.querySelector('#date_ev_penalty_day').innerHTML = formatDate(new Date(date_ev_penalty_day));
  }
  if (!isNaN(date_stor_last_day)) {
    document.querySelector('#date_stor_last_day').innerHTML = formatDate(new Date(date_stor_last_day));
    document.querySelector('#date_stor_penalty_day').innerHTML = formatDate(new Date(date_stor_penalty_day));
  }


  let pay = [];
  let pay_date = [];
  let pay_count = [];
  let pay_text = [];
  let pay_summ = [];

  for (var i = 1; i <= 5; i++) {
    pay[i] = document.getElementById("pay" + i ).options.selectedIndex;
    pay_date[i] = document.querySelector('#pay' + i + '_date').value;
    pay_date[i] = Date.parse(pay_date[i]);

    switch (pay[i]) {
      case 0:
        pay_count[i] = pay_date[i] - date_sv_last_day;
        break;
      case 1:
        pay_count[i] = pay_date[i] - date_uts_last_day;
        break;
      case 2:
        pay_count[i] = pay_date[i] - date_ev_last_day;
        break;
      case 3:
        pay_count[i] = pay_date[i] - date_stor_last_day;
        break;
    }

    if (pay_count[i] < 0) {
      pay_count[i] = 0;
    }

    pay_text[i] = document.querySelector('#pay' + i + '_text').value;
    pay_summ[i] = pay_text[i] * (pay_count[i] / day) * 0.01;

    if (!isNaN(pay_count[i])) {
      document.querySelector('#pay' + i + '_count').innerHTML = pay_count[i] / day + ' DAYS / ';
      document.querySelector('#pay' + i + '_summ').innerHTML = pay_summ[i] + ' RUB';
    }
    if (isNaN(pay_count[i])) {
      pay_count[i] =0;
    }
    if (isNaN(pay_summ[i])) {
      pay_summ[i] =0;
    }

    total_count = total_count + pay_summ[i];

  }
    document.querySelector('#total_count').innerHTML = total_count + ' RUB';
    total_count = 0;
}


//Function for find 20th day from start day without hollidays (14 days from 112 labor code article)
function findLastDay(date) {
  let j = 0;
  let misteryDays = 0;

  while (j != 20) {
    misteryDays++;
     if (date + day * misteryDays != Date.parse(new Date(2020, 0, 1, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2020, 0, 2, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2020, 0, 3, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2020, 0, 4, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2020, 0, 5, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2020, 0, 6, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2020, 0, 7, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2020, 0, 8, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2020, 1, 23, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2020, 2, 8, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2020, 4, 1, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2020, 4, 9, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2020, 5, 12, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2020, 10, 4, 3))) {
          j++;
    }
  }
  date = date + day * misteryDays;

switch (new Date(date).getDay()) {
  case 6:
    date = date + day * 2;
    break;
  case 0:
    date = date + day;
    break;
  default:
}

while (date == Date.parse(new Date(2020, 0, 1, 3)) ||
   date == Date.parse(new Date(2020, 0, 2, 3)) ||
   date == Date.parse(new Date(2020, 0, 3, 3)) ||
   date == Date.parse(new Date(2020, 0, 4, 3)) ||
   date == Date.parse(new Date(2020, 0, 5, 3)) ||
   date == Date.parse(new Date(2020, 0, 6, 3)) ||
   date == Date.parse(new Date(2020, 0, 7, 3)) ||
   date == Date.parse(new Date(2020, 0, 8, 3)) ||
   date == Date.parse(new Date(2020, 1, 23, 3)) ||
   date == Date.parse(new Date(2020, 2, 8, 3)) ||
   date == Date.parse(new Date(2020, 4, 1, 3)) ||
   date == Date.parse(new Date(2020, 4, 9, 3)) ||
   date == Date.parse(new Date(2020, 5, 12, 3)) ||
   date == Date.parse(new Date(2020, 10, 4, 3))) {
     date = date + day;
}
  j = 0;
  misteryDays = 0;
  return date;
}


//Function for format Date as dd.mm.yyyy
function formatDate(date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yyyy = date.getFullYear();

  return dd + '.' + mm + '.' + yyyy;
}
