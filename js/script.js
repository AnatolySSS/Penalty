let day = 24*60*60*1000;
let fo_name;

let COLUMN_NAME_4 = "Начало периода";
let COLUMN_NAME_5 = "Конец периода";
let COLUMN_NAME_6 = "Количество дней";
let COLUMN_NAME_7 = "Сумма";

let COLUMN_NAME_8 = "Начало неустойки до суда";
let COLUMN_NAME_9 = "Конец неустойки до суда";
let COLUMN_NAME_10 = "Начало неустойки после суда";
let COLUMN_NAME_11 = "Конец неустойки после суда";

let pay = [];
let date_penalty_day = [];
let pay_date = [];
let pay_text = [];
let pay_count = [];
let pay_summ = [];

let court_period_before = [];
let court_period_after = [];
let court_summ_before = [];
let court_summ_after = [];

let date_sv, date_sv_last_day, date_sv_penalty_day;
let date_uts, date_uts_last_day, date_uts_penalty_day;
let date_ev, date_ev_last_day, date_ev_penalty_day;
let date_stor, date_stor_last_day, date_stor_penalty_day;
let date_court_from, date_court_to;
let total_count = 0;

document.querySelector('button').onclick = function(){

  //Стирание всех значений в таблице
  document.querySelector('#COLUMN_NAME_4').innerHTML = "";
  document.querySelector('#COLUMN_NAME_5').innerHTML = "";
  document.querySelector('#COLUMN_NAME_6').innerHTML = "";
  document.querySelector('#COLUMN_NAME_7').innerHTML = "";
  document.querySelector('#COLUMN_NAME_8').innerHTML = "";
  document.querySelector('#COLUMN_NAME_9').innerHTML = "";
  document.querySelector('#COLUMN_NAME_10').innerHTML = "";
  document.querySelector('#COLUMN_NAME_11').innerHTML = "";
  for (var i = 1; i < 6; i++) {
    document.querySelector('#date_penalty_day_' + i).innerHTML = "";
    document.querySelector('#date_court_from_out_' + i).innerHTML = "";
    document.querySelector('#pay' + i + '_count').innerHTML = "";
    document.querySelector('#pay' + i + '_summ').innerHTML = "";
    document.querySelector('#date_court_to_out_' + i).innerHTML = "";
    document.querySelector('#pay_date_out_' + i).innerHTML = "";
    document.querySelector('#court_period_after_' + i).innerHTML = "";
    document.querySelector('#court_summ_after_' + i).innerHTML = "";
  }

  //Получение значения наименования ФО
  fo_name = document.getElementById("fo_name").options[document.getElementById("fo_name").options.selectedIndex].text;

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

  //Получение значения даты судебного взыскания неустойки
  date_court_from = document.querySelector('#date_court_from').value;
  date_court_from = Date.parse(date_court_from);
  date_court_to = document.querySelector('#date_court_to').value;
  date_court_to = Date.parse(date_court_to);

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

  for (var i = 1; i <= 5; i++) {
    pay[i] = document.getElementById("pay" + i ).options.selectedIndex;
    pay_date[i] = document.querySelector('#pay' + i + '_date').value;
    pay_date[i] = Date.parse(pay_date[i]);
    pay_text[i] = document.querySelector('#pay' + i + '_text').value;

    switch (pay[i]) {
      case 0:
        date_penalty_day[i] = date_sv_penalty_day;
        break;
      case 1:
        date_penalty_day[i] = date_uts_penalty_day;
        break;
      case 2:
        date_penalty_day[i] = date_ev_penalty_day;
        break;
      case 3:
        date_penalty_day[i] = date_stor_penalty_day;
        break;
    }
  }

  if (isNaN(date_court_from)) {
    document.querySelector('#COLUMN_NAME_4').innerHTML = COLUMN_NAME_4;
    document.querySelector('#COLUMN_NAME_5').innerHTML = COLUMN_NAME_5;
    document.querySelector('#COLUMN_NAME_6').innerHTML = COLUMN_NAME_6;
    document.querySelector('#COLUMN_NAME_7').innerHTML = COLUMN_NAME_7;

    for (var i = 1; i <= 5; i++) {
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

      pay_summ[i] = pay_text[i] * (pay_count[i] / day) * 0.01;

      if (!isNaN(pay_count[i]) && pay_date[i] > date_penalty_day[i]) {
        document.querySelector('#date_penalty_day_' + i).innerHTML = formatDate(new Date(date_penalty_day[i]));
        document.querySelector('#date_court_from_out_' + i).innerHTML = formatDate(new Date(pay_date[i]));
        document.querySelector('#pay' + i + '_count').innerHTML = pay_count[i] / day + ' DAYS';
        document.querySelector('#pay' + i + '_summ').innerHTML = pay_summ[i] + ' RUB';
      }
      if (isNaN(pay_count[i])) {
        pay_count[i] = 0;
      }
      if (isNaN(pay_summ[i])) {
        pay_summ[i] = 0;
      }
      total_count = total_count + pay_summ[i];
    }
  } else {
    //Определение периода взыскания неустойки до начала судебного взыскания
    document.querySelector('#COLUMN_NAME_4').innerHTML = COLUMN_NAME_8;
    document.querySelector('#COLUMN_NAME_5').innerHTML = COLUMN_NAME_9;
    document.querySelector('#COLUMN_NAME_6').innerHTML = COLUMN_NAME_6;
    document.querySelector('#COLUMN_NAME_7').innerHTML = COLUMN_NAME_7;
    document.querySelector('#COLUMN_NAME_8').innerHTML = COLUMN_NAME_10;
    document.querySelector('#COLUMN_NAME_9').innerHTML = COLUMN_NAME_11;
    document.querySelector('#COLUMN_NAME_10').innerHTML = COLUMN_NAME_6;
    document.querySelector('#COLUMN_NAME_11').innerHTML = COLUMN_NAME_7;

    for (var i = 1; i <= 5; i++) {
      if (pay_date[i] > date_penalty_day[i]) {
        switch (pay[i]) {
          case 0:
          if (date_court_from > date_sv_penalty_day) {
              court_period_before[i] = date_court_from - date_sv_penalty_day;
              date_penalty_day[i] = date_sv_penalty_day;
              court_period_before[i] = court_period_before[i] / day;
              court_summ_before[i] = pay_text[i] * court_period_before[i] * 0.01;
              document.querySelector('#date_penalty_day_' + i).innerHTML = formatDate(new Date(date_penalty_day[i]));
              document.querySelector('#date_court_from_out_' + i).innerHTML = formatDate(new Date(date_court_from - day));
              document.querySelector('#pay' + i + '_count').innerHTML = court_period_before[i];
              document.querySelector('#pay' + i + '_summ').innerHTML = court_summ_before[i];
          } else {
            court_period_before[i] = 0;
          }
            break;
          case 1:
          if (date_court_from > date_uts_penalty_day) {
              court_period_before[i] = date_court_from - date_uts_penalty_day;
              date_penalty_day[i] = date_uts_penalty_day;
              court_period_before[i] = court_period_before[i] / day;
              court_summ_before[i] = pay_text[i] * court_period_before[i] * 0.01;
              document.querySelector('#date_penalty_day_' + i).innerHTML = formatDate(new Date(date_penalty_day[i]));
              document.querySelector('#date_court_from_out_' + i).innerHTML = formatDate(new Date(date_court_from - day));
              document.querySelector('#pay' + i + '_count').innerHTML = court_period_before[i];
              document.querySelector('#pay' + i + '_summ').innerHTML = court_summ_before[i];
          } else {
            court_period_before[i] = 0;
          }
            break;
          case 2:
          if (date_court_from > date_ev_penalty_day) {
              court_period_before[i] = date_court_from - date_ev_penalty_day;
              date_penalty_day[i] = date_ev_penalty_day;
              court_period_before[i] = court_period_before[i] / day;
              court_summ_before[i] = pay_text[i] * court_period_before[i] * 0.01;
              document.querySelector('#date_penalty_day_' + i).innerHTML = formatDate(new Date(date_penalty_day[i]));
              document.querySelector('#date_court_from_out_' + i).innerHTML = formatDate(new Date(date_court_from - day));
              document.querySelector('#pay' + i + '_count').innerHTML = court_period_before[i];
              document.querySelector('#pay' + i + '_summ').innerHTML = court_summ_before[i];
          } else {
            court_period_before[i] = 0;
          }
            break;
          case 3:
          if (date_court_from > date_stor_penalty_day) {
              court_period_before[i] = date_court_from - date_stor_penalty_day;
              date_penalty_day[i] = date_stor_penalty_day;
              court_period_before[i] = court_period_before[i] / day;
              court_summ_before[i] = pay_text[i] * court_period_before[i] * 0.01;
              document.querySelector('#date_penalty_day_' + i).innerHTML = formatDate(new Date(date_penalty_day[i]));
              document.querySelector('#date_court_from_out_' + i).innerHTML = formatDate(new Date(date_court_from - day));
              document.querySelector('#pay' + i + '_count').innerHTML = court_period_before[i];
              document.querySelector('#pay' + i + '_summ').innerHTML = court_summ_before[i];
          } else {
            court_period_before[i] = 0;
          }
            break;
        }
      }

      court_period_after[i] = (pay_date[i] - date_court_to) / day;
      if (court_period_after[i] < 0) {
        court_period_after[i] = 0;
      }

      court_summ_after[i] = pay_text[i] * court_period_after[i] * 0.01;

      if (isNaN(court_period_before[i])) {
        court_period_before[i] = 0;
      }
      if (isNaN(court_summ_before[i])) {
        court_summ_before[i] = 0;
      }
      if (isNaN(court_period_after[i])) {
        court_period_after[i] = 0;
      }
      if (isNaN(court_summ_after[i])) {
        court_summ_after[i] = 0;
      }
      if (pay_date[i] > date_penalty_day[i]) {
        document.querySelector('#date_court_to_out_' + i).innerHTML = formatDate(new Date(date_court_to + day));
        document.querySelector('#pay_date_out_' + i).innerHTML = formatDate(new Date(pay_date[i]));
        document.querySelector('#court_period_after_' + i).innerHTML = court_period_after[i];
        document.querySelector('#court_summ_after_' + i).innerHTML = court_summ_after[i];
      }

      total_count = total_count + court_summ_before[i] + court_summ_after[i];
    }
  }

    document.querySelector('#total_count').innerHTML = total_count + ' RUB';
    total_count = 0;

    let text;
    let holly = 'В соответствии со статьей 193 ГК РФ если последний день срока '+
    'приходится на нерабочий день, днем окончания срока считается ближайший следующий за ним рабочий день.'+'<br>';

    text = 'Рассмотрев требования Заявителя о взыскании с ' + fo_name + ' неустойки '+
    'за несоблюдение срока выплаты страхового возмещения по договору ОСАГО, '+
    'Финансовый уполномоченный приходит к следующему.'+'<br>'+
    'Согласно статье 12 ГК РФ '+
    'взыскание неустойки является одним из способов защиты нарушенного гражданского права.'+'<br>'+
    'По смыслу статьи 330 ГК РФ неустойкой (штрафом, пеней) признается определенная '+
    'законом или договором денежная сумма, которую должник обязан уплатить кредитору '+
    'в случае неисполнения или ненадлежащего исполнения обязательства, в частности '+
    'в случае просрочки исполнения. По требованию об уплате неустойки кредитор не обязан '+
    'доказывать причинение ему убытков.'+'<br>'+
    'Пунктом 21 статьи 12 Закона № 40-ФЗ установлено, что в течение 20 календарных дней, '+
    'за исключением нерабочих праздничных дней, а в случае, предусмотренном пунктом 15.3 '+
    'статьи 12 Закона № 40-ФЗ, 30 календарных дней, за исключением нерабочих праздничных дней, '+
    'со дня принятия к рассмотрению заявления потерпевшего о страховом возмещении или прямом '+
    'возмещении убытков и приложенных к нему документов, предусмотренных Правилами ОСАГО, '+
    'страховщик обязан произвести страховую выплату потерпевшему или после осмотра и (или) '+
    'независимой технической экспертизы поврежденного транспортного средства выдать '+
    'потерпевшему направление на ремонт транспортного средства с указанием станции '+
    'технического обслуживания, на которой будет отремонтировано его транспортное '+
    'средство и которой страховщик оплатит восстановительный ремонт поврежденного '+
    'транспортного средства, и срока ремонта либо направить потерпевшему мотивированный '+
    'отказ в страховом возмещении.'+'<br>'+
    'При несоблюдении срока осуществления страховой выплаты или срока выдачи потерпевшему '+
    'направления на ремонт транспортного средства страховщик за каждый день просрочки '+
    'уплачивает потерпевшему неустойку (пеню) в размере одного процента от определенного '+
    'в соответствии с Законом № 40-ФЗ размера страхового возмещения по виду причиненного '+
    'вреда каждому потерпевшему.'+'<br>'+
    'В пункте 78 постановления Пленума Верховного Суда Российской Федерации от 26.12.2017 '+
    '№ 58 «О применении судами законодательства об обязательном страховании гражданской '+
    'ответственности владельцев транспортных средств» указано, что неустойка исчисляется '+
    'со дня, следующего за днем, установленным для принятия решения о выплате страхового '+
    'возмещения, то есть с 21-го дня после получения страховщиком заявления потерпевшего '+
    'о страховой выплате и документов, предусмотренных Правилами ОСАГО, и до дня '+
    'фактического исполнения страховщиком обязательства по договору включительно.'+'<br>'+
    'Статьей 191 ГК РФ установлено, что течение срока, определённого периодом времени, '+
    'начинается на следующий день после календарной даты или наступления события, '+
    'которыми определено его начало.'+'<br>'+ holly +
    'Заявитель обратился в ' + fo_name + ' с заявлением о наступлении страхового случая '+
    formatDate(new Date(date_sv)) + ', следовательно, последним днем срока осуществления '+
    'выплаты является ' + formatDate(new Date(date_sv_last_day)) + ', а неустойка подлежит начислению с '+
    formatDate(new Date(date_sv_penalty_day)) +'<br>'+
    formatDate(new Date(pay_date[1])) + ' ' + fo_name + ' осуществило выплату страхового возмещения в размере '+
    pay_text[1] + ' рублей 00 копеек, что подтверждается платежным поручением от ' + formatDate(new Date(pay_date[1])) + ' № ________.'+'<br>'+
    'Таким образом, выплата в размере ' + pay_text[1] + ' произведена в установленный '+
    'Законом № 40-ФЗ срок, в силу чего неустойка на указанную сумму не начисляется.'+'<br>';

    document.querySelector('#decision').innerHTML = text;

    //Удаление всех значений

    for (var i = 0; i < 5; i++) {
      pay[i] = undefined;
      date_penalty_day[i] = undefined;
      pay_date[i] = undefined;
      pay_text[i] = undefined;
      pay_count[i] = undefined;
      pay_summ[i] = undefined;
      court_period_before[i] = undefined;
      court_period_after[i] = undefined;
      court_summ_before[i] = undefined;
      court_summ_after[i] = undefined;
      }

    date_sv = undefined;
    date_sv_last_day = undefined;
    date_sv_penalty_day = undefined;
    date_uts = undefined;
    date_uts_last_day = undefined;
    date_uts_penalty_day = undefined;
    date_ev = undefined;
    date_ev_last_day = undefined;
    date_ev_penalty_day = undefined;
    date_stor = undefined;
    date_stor_last_day = undefined;
    date_stor_penalty_day = undefined;
    date_court_from = undefined;
    date_court_to = undefined;

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
