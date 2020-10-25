let day = 24*60*60*1000;
let fo_name;
let decision;

let COLUMN_NAME_4 = "Начало периода";
let COLUMN_NAME_5 = "Конец периода";
let COLUMN_NAME_6 = "Количество дней";
let COLUMN_NAME_7 = "Неустойка";

let COLUMN_NAME_8 = "Начало неустойки до суда";
let COLUMN_NAME_9 = "Конец неустойки до суда";
let COLUMN_NAME_10 = "Начало неустойки после суда";
let COLUMN_NAME_11 = "Конец неустойки после суда";

let pay = [];
let date_penalty_day = [];
let pay_date = [];
let pay_text = [];
let payment_order = [];
let pay_count = [];
let pay_summ = [];

let off_days = [];

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

let days_string = [];
let rub_string_payment = [];
let rub_string_penalty = [];
let kop_string = [];

let holly, holly_boolen, standart_motivation, first_paragraf, summary_paragraf;
let analize_period_paragraf = [], payment_paragraf = [];
let payment_in_time_paragraf = [];
let payment_not_in_time_paragraf = [];
let total_analize_paragraf = "";

standart_motivation = 'Согласно статье 12 ГК РФ '+
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
'которыми определено его начало.'+'<br>';

document.querySelector('button').onclick = function(){

  document.querySelector('#test_span').innerHTML = "";
  holly = "";
  holly_boolen = false;
  var q = 1;

  //Удаление всплывающей подсказки 193 ГК РФ
  document.querySelector('#date_sv_last_day').removeAttribute('tooltip');
  document.querySelector('#date_uts_last_day').removeAttribute('tooltip');
  document.querySelector('#date_ev_last_day').removeAttribute('tooltip');
  document.querySelector('#date_stor_last_day').removeAttribute('tooltip');

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

  document.querySelector('#date_sv_last_day').style.color = '#595b5e';
  document.querySelector('#date_uts_last_day').style.color = '#595b5e';
  document.querySelector('#date_ev_last_day').style.color = '#595b5e';
  document.querySelector('#date_stor_last_day').style.color = '#595b5e';

  //Получение значения наименования ФО
  //fo_name = document.getElementById("fo_name").options[document.getElementById("fo_name").options.selectedIndex].text;
  fo_name = document.querySelector("#fo_name").value;

  first_paragraf = 'Рассмотрев требования Заявителя о взыскании с ' + fo_name + ' неустойки '+
  'за несоблюдение срока выплаты страхового возмещения по договору ОСАГО, '+
  'Финансовый уполномоченный приходит к следующему.'+'<br>'

  //Получение значений даты обращений с требованиями и исчисление 20го дня
  date_sv = document.querySelector('#date_sv').value;
  date_sv = changeDateType(date_sv);
  date_sv = Date.parse(date_sv);
  date_sv_last_day = findLastDay(date_sv);
  if (holly_boolen) {
    document.querySelector('#date_sv_last_day').style.color = '#b00000';
    document.querySelector('#date_sv_last_day').setAttribute('tooltip', '193 ГК РФ');
  }
  date_sv_penalty_day = date_sv_last_day + day;

  date_uts = document.querySelector('#date_uts').value;
  date_uts = changeDateType(date_uts);
  date_uts = Date.parse(date_uts);
  date_uts_last_day = findLastDay(date_uts);
  if (holly_boolen) {
    document.querySelector('#date_uts_last_day').style.color = '#b00000';
    document.querySelector('#date_uts_last_day').setAttribute('tooltip', '193 ГК РФ');
  }
  date_uts_penalty_day = date_uts_last_day + day;

  date_ev = document.querySelector('#date_ev').value;
  date_ev = changeDateType(date_ev);
  date_ev = Date.parse(date_ev);
  date_ev_last_day = findLastDay(date_ev);
  if (holly_boolen) {
    document.querySelector('#date_ev_last_day').style.color = '#b00000';
    document.querySelector('#date_ev_last_day').setAttribute('tooltip', '193 ГК РФ');
  }
  date_ev_penalty_day = date_ev_last_day + day;

  date_stor = document.querySelector('#date_stor').value;
  date_stor = changeDateType(date_stor);
  date_stor = Date.parse(date_stor);
  date_stor_last_day = findLastDay(date_stor);
  if (holly_boolen) {
    document.querySelector('#date_stor_last_day').style.color = '#b00000';
    document.querySelector('#date_stor_last_day').setAttribute('tooltip', '193 ГК РФ');
  }
  date_stor_penalty_day = date_stor_last_day + day;

  //Получение значения даты судебного взыскания неустойки
    // date_court_from = document.querySelector('#date_court_from').value;
    // date_court_from = changeDateType(date_court_from);
    // date_court_from = Date.parse(date_court_from);
    // date_court_to = document.querySelector('#date_court_to').value;
    // date_court_to = changeDateType(date_court_to);
    // date_court_to = Date.parse(date_court_to);


  //выведение значений 20го дня на экран
  if (!isNaN(date_sv_last_day)) {
    document.querySelector('#date_sv_last_day').innerHTML = formatDate(new Date(date_sv_last_day));
    document.querySelector('#date_sv_penalty_day').innerHTML = formatDate(new Date(date_sv_penalty_day));
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
    pay_date[i] = changeDateType(pay_date[i]);
    pay_date[i] = Date.parse(pay_date[i]);
    pay_text[i] = document.querySelector('#pay' + i + '_text').value;
    pay_text[i] = pay_text[i].replace(/\s+/g, '');
    // payment_order[i] = document.querySelector('#payment_order_' + i).value;

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
      analize_period_paragraf[i] = "";
      payment_paragraf[i] = "";

      switch (pay[i]) {
        case 0:
          pay_count[i] = pay_date[i] - date_sv_last_day;

          analize_period_paragraf[i] = 'Заявитель обратился в ' + fo_name + ' с заявлением о наступлении страхового случая '+
          formatDate(new Date(date_sv)) + ', следовательно, последним днем срока осуществления '+
          'выплаты является ' + formatDate(new Date(date_sv_last_day)) + ', а неустойка подлежит начислению с '+
          formatDate(new Date(date_sv_penalty_day)) +'.<br>'

          payment_paragraf[i] = formatDate(new Date(pay_date[i])) + ' ' + fo_name + ' осуществило выплату страхового возмещения в размере '+
          makeRubText_1(pay_text[i]) +
          // ', что подтверждается платежным поручением от ' + formatDate(new Date(pay_date[i])) + ' № ' + payment_order[i] +
          '.<br>'
          break;
        case 1:
          pay_count[i] = pay_date[i] - date_uts_last_day;

          //TODO добавить в analize_period_paragraf мотивировку про УТС
          analize_period_paragraf[i] = 'Заявитель обратился в ' + fo_name + ' с заявлением о выплате УТС '+
          formatDate(new Date(date_uts)) + ', следовательно, последним днем срока осуществления '+
          'выплаты УТС является ' + formatDate(new Date(date_uts_last_day)) + ', а неустойка подлежит начислению с '+
          formatDate(new Date(date_uts_penalty_day)) +'.<br>'

          payment_paragraf[i] = formatDate(new Date(pay_date[i])) + ' ' + fo_name + ' осуществило выплату УТС в размере '+
          makeRubText_1(pay_text[i]) +
          // ', что подтверждается платежным поручением от ' + formatDate(new Date(pay_date[i])) + ' № ' + payment_order[i] +
          '.<br>'
          break;
        case 2:
          pay_count[i] = pay_date[i] - date_ev_last_day;

          analize_period_paragraf[i] = 'Согласно абзацу 2 пункта 4.12 Правил ОСАГО, '+
          'при причинении вреда имуществу потерпевшего возмещению в пределах страховой '+
          'суммы подлежат иные расходы, произведенные потерпевшим в связи с причиненным '+
          'вредом (в том числе эвакуация транспортного средства с места дорожно-транспортного '+
          'происшествия, хранение поврежденного транспортного средства, доставка пострадавших '+
          'в медицинскую организацию).'+ '<br>'+'Учитывая изложенное, Финансовый уполномоченный '+
          'приходит к выводу о том, что расходы на эвакуацию Транспортного средства относятся '+
          'к страховому возмещению, в силу чего неустойка за несоблюдение сроков выплаты расходов '+
          'на эвакуацию Транспортного средства подлежит взысканию.'+ '<br>'+
          'Заявитель обратился в ' + fo_name + ' с заявлением о выплате расходов на эвакуацию Транспортного средства '+
          formatDate(new Date(date_ev)) + ', следовательно, последним днем срока осуществления '+
          'выплаты расходов на эвакуацию Транспортного средства является ' + formatDate(new Date(date_ev_last_day)) + ', а неустойка подлежит начислению с '+
          formatDate(new Date(date_ev_penalty_day)) +'.<br>'

          payment_paragraf[i] = formatDate(new Date(pay_date[i])) + ' ' + fo_name + ' осуществило выплату расходов на эвакуацию Транспортного средства в размере '+
          makeRubText_1(pay_text[i]) +
          //', что подтверждается платежным поручением от ' + formatDate(new Date(pay_date[i])) + ' № ' + payment_order[i] +
          '.<br>'
          break;
        case 3:
          pay_count[i] = pay_date[i] - date_stor_last_day;

          //TODO добавить в analize_period_paragraf мотивировку про хранение
          analize_period_paragraf[i] = 'Заявитель обратился в ' + fo_name + ' с заявлением о выплате расходов на хранение Транспортного средства '+
          formatDate(new Date(date_stor)) + ', следовательно, последним днем срока осуществления '+
          'выплаты расходов на хранение Транспортного средства является ' + formatDate(new Date(date_stor_last_day)) + ', а неустойка подлежит начислению с '+
          formatDate(new Date(date_stor_penalty_day)) +'.<br>'

          payment_paragraf[i] = formatDate(new Date(pay_date[i])) + ' ' + fo_name + ' осуществило выплату расходов на хранение Транспортного средства в размере '+
          makeRubText_1(pay_text[i]) +
          // ', что подтверждается платежным поручением от ' + formatDate(new Date(pay_date[i])) + ' № ' + payment_order[i] +
          '.<br>'
          break;
      }

      for (var j = 1; j < i; j++) {
        if (!isNaN(pay_date[i]) && pay[i] == pay[j]) {
            analize_period_paragraf[i] = "";
        }
      }

      if (pay_count[i] < 0) {
        pay_count[i] = 0;
      }

      pay_summ[i] = pay_text[i] * (pay_count[i] / day) * 0.01;

      //Склонение дней/день/дня
      days_string[i] = pay_count[i] / day;
      let m = String(days_string[i]).length;
      m = String(days_string[i]).slice(m - 2, m);

      if (Number(m) >= 11 && Number(m) <= 19) {
        days_string[i] = " дней";
      } else {
        let m = String(days_string[i]).length - 1;
        m = String(days_string[i]).charAt(m);
        switch (m) {
          case "1":
            days_string[i] = " день";
            break;
          case "2":
          case "3":
          case "4":
            days_string[i] = " дня";
            break;
          default:
            days_string[i] = " дней";
        }
      }


      if (!isNaN(pay_count[i]) && pay_date[i] >= date_penalty_day[i]) {
        document.querySelector('#date_penalty_day_' + i).innerHTML = formatDate(new Date(date_penalty_day[i]));
        document.querySelector('#date_court_from_out_' + i).innerHTML = formatDate(new Date(pay_date[i]));
        document.querySelector('#pay' + i + '_count').innerHTML = pay_count[i] / day + days_string[i];
        document.querySelector('#pay' + i + '_summ').innerHTML = makeRubText_2(pay_summ[i]);
      }
      if (isNaN(pay_count[i])) {
        pay_count[i] = 0;
      }
      if (isNaN(pay_summ[i])) {
        pay_summ[i] = 0;
      }
      total_count = total_count + pay_summ[i];

      if (pay_date[i] < date_penalty_day[i]) {
        payment_in_time_paragraf[i] = 'Таким образом, выплата в размере ' + makeRubText_1(pay_text[i]) + ' произведена в установленный '+
        'Законом № 40-ФЗ срок, в силу чего неустойка на указанную сумму не начисляется.'+'<br>';
        payment_not_in_time_paragraf[i] = "";
      } else {
        payment_in_time_paragraf[i] = "";
        payment_not_in_time_paragraf[i] = 'Таким образом, неустойка на сумму ' + makeRubText_2(pay_text[i]) + ' подлежит расчету за период с ' +
        formatDate(new Date(date_penalty_day[i])) + ' по ' + formatDate(new Date(pay_date[i])) + ' (' + pay_count[i] / day + days_string[i] + ').' + '<br>' +
        'В соответствии с требованиями, установленными пунктом 21 статьи 12 Закона № 40-ФЗ, '+
        'размер неустойки, подлежащий выплате за период с ' + formatDate(new Date(date_penalty_day[i])) + ' по ' + formatDate(new Date(pay_date[i])) +
        ' составляет ' + makeRubText_2(pay_summ[i]) + ' (' + makeRubText_2(pay_text[i]) + ' × ' + pay_count[i] / day + days_string[i] +' × 1%).' + '<br>';
      }

      if (isNaN(pay_date[i])) {
        analize_period_paragraf[i] = "";
        payment_paragraf[i] = "";
        payment_in_time_paragraf[i] = "";
        payment_not_in_time_paragraf[i] = "";
      }

      total_analize_paragraf = total_analize_paragraf + analize_period_paragraf[i] + payment_paragraf[i] + payment_in_time_paragraf[i] +
      payment_not_in_time_paragraf[i];

    }

    if (total_count > 0) {
      summary_paragraf = 'Учитывая вышеизложенное, требование Заявителя о взыскании '+
      'неустойки за несоблюдение срока выплаты страхового возмещения подлежит удовлетворению в размере '+
      makeRubText_1(total_count) + '.' + '<br>';
    } else {
      summary_paragraf = 'Учитывая вышеизложенное, требование Заявителя о взыскании '+
      'неустойки за несоблюдение срока выплаты страхового возмещения не подлежит удовлетворению.' + '<br>';
    }


    decision = first_paragraf + standart_motivation + holly + total_analize_paragraf + summary_paragraf;


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
      if (pay_date[i] >= date_penalty_day[i] && pay_date[i] > date_court_to) {
        document.querySelector('#date_court_to_out_' + i).innerHTML = formatDate(new Date(date_court_to + day));
        document.querySelector('#pay_date_out_' + i).innerHTML = formatDate(new Date(pay_date[i]));
        document.querySelector('#court_period_after_' + i).innerHTML = court_period_after[i];
        document.querySelector('#court_summ_after_' + i).innerHTML = court_summ_after[i];
      }

      total_count = total_count + court_summ_before[i] + court_summ_after[i];
    }


    decision = "";

  }

    document.querySelector('#total_count').innerHTML = makeRubText_2(total_count);
    total_count = 0;

    if (!isNaN(pay_date[1])) {
      document.querySelector('#decision').innerHTML = decision;
      selectText('decision');
    }

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

    total_analize_paragraf = "";
    holly = "";
}

//Function for find 20th day from start day without hollidays (14 days from 112 labor code article)
function findLastDay(date) {
  off_days.length = 0;
  let j = 0;
  let k = 0;
  let misteryDays = 0;
  holly_boolen = false;

  while (j != 20) {
    misteryDays++;
     if (date + day * misteryDays != Date.parse(new Date(2015, 0, 1, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2015, 0, 2, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2015, 0, 3, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2015, 0, 4, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2015, 0, 5, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2015, 0, 6, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2015, 0, 7, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2015, 0, 8, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2015, 1, 23, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2015, 2, 8, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2015, 4, 1, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2015, 4, 9, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2015, 5, 12, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2015, 10, 4, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2016, 0, 1, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2016, 0, 2, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2016, 0, 3, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2016, 0, 4, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2016, 0, 5, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2016, 0, 6, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2016, 0, 7, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2016, 0, 8, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2016, 1, 23, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2016, 2, 8, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2016, 4, 1, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2016, 4, 9, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2016, 5, 12, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2016, 10, 4, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2017, 0, 1, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2017, 0, 2, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2017, 0, 3, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2017, 0, 4, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2017, 0, 5, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2017, 0, 6, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2017, 0, 7, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2017, 0, 8, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2017, 1, 23, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2017, 2, 8, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2017, 4, 1, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2017, 4, 9, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2017, 5, 12, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2017, 10, 4, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2018, 0, 1, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2018, 0, 2, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2018, 0, 3, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2018, 0, 4, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2018, 0, 5, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2018, 0, 6, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2018, 0, 7, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2018, 0, 8, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2018, 1, 23, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2018, 2, 8, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2018, 4, 1, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2018, 4, 9, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2018, 5, 12, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2018, 10, 4, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2019, 0, 1, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2019, 0, 2, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2019, 0, 3, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2019, 0, 4, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2019, 0, 5, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2019, 0, 6, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2019, 0, 7, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2019, 0, 8, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2019, 1, 23, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2019, 2, 8, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2019, 4, 1, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2019, 4, 9, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2019, 5, 12, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2019, 10, 4, 3)) &&
        date + day * misteryDays != Date.parse(new Date(2020, 0, 1, 3)) &&
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
    } else {
      off_days[k] = date + day * misteryDays;
      k++;
    }
  }
  date = date + day * misteryDays;

switch (new Date(date).getDay()) {
  case 6:
    if (date != Date.parse(new Date(2016, 1, 20, 3)) &&
        date != Date.parse(new Date(2018, 3, 28, 3)) &&
        date != Date.parse(new Date(2018, 5, 9, 3)) &&
        date != Date.parse(new Date(2018, 11  , 29, 3))) {

      off_days[k] = date;
      k++;
      off_days[k] = date + day;
      k++;

      date = date + day * 2;
      holly = 'В соответствии со статьей 193 ГК РФ если последний день срока '+
      'приходится на нерабочий день, днем окончания срока считается ближайший следующий за ним рабочий день.'+'<br>';
      holly_boolen = true;
      break;
    }
    break;
  case 0:
    off_days[k] = date;
    k++;

    date = date + day;
    holly = 'В соответствии со статьей 193 ГК РФ если последний день срока '+
    'приходится на нерабочий день, днем окончания срока считается ближайший следующий за ним рабочий день.'+'<br>';
    holly_boolen = true;
    break;
  default:
}

while (date == Date.parse(new Date(2015, 0, 1, 3)) ||
   date == Date.parse(new Date(2015, 0, 2, 3)) ||
   date == Date.parse(new Date(2015, 0, 3, 3)) ||
   date == Date.parse(new Date(2015, 0, 4, 3)) ||
   date == Date.parse(new Date(2015, 0, 5, 3)) ||
   date == Date.parse(new Date(2015, 0, 6, 3)) ||
   date == Date.parse(new Date(2015, 0, 7, 3)) ||
   date == Date.parse(new Date(2015, 0, 8, 3)) ||
   date == Date.parse(new Date(2015, 0, 9, 3)) ||
   date == Date.parse(new Date(2015, 1, 23, 3)) ||
   date == Date.parse(new Date(2015, 2, 9, 3)) ||
   date == Date.parse(new Date(2015, 4, 1, 3)) ||
   date == Date.parse(new Date(2015, 4, 4, 3)) ||
   date == Date.parse(new Date(2015, 4, 11, 3)) ||
   date == Date.parse(new Date(2015, 5, 12, 3)) ||
   date == Date.parse(new Date(2015, 10, 4, 3)) ||
   date == Date.parse(new Date(2016, 0, 1, 3)) ||
   date == Date.parse(new Date(2016, 0, 2, 3)) ||
   date == Date.parse(new Date(2016, 0, 3, 3)) ||
   date == Date.parse(new Date(2016, 0, 4, 3)) ||
   date == Date.parse(new Date(2016, 0, 5, 3)) ||
   date == Date.parse(new Date(2016, 0, 6, 3)) ||
   date == Date.parse(new Date(2016, 0, 7, 3)) ||
   date == Date.parse(new Date(2016, 0, 8, 3)) ||
   date == Date.parse(new Date(2016, 1, 22, 3)) ||
   date == Date.parse(new Date(2016, 1, 23, 3)) ||
   date == Date.parse(new Date(2016, 2, 7, 3)) ||
   date == Date.parse(new Date(2016, 2, 8, 3)) ||
   date == Date.parse(new Date(2016, 4, 2, 3)) ||
   date == Date.parse(new Date(2016, 4, 3, 3)) ||
   date == Date.parse(new Date(2016, 4, 9, 3)) ||
   date == Date.parse(new Date(2016, 5, 13, 3)) ||
   date == Date.parse(new Date(2016, 10, 4, 3)) ||
   date == Date.parse(new Date(2017, 0, 1, 3)) ||
   date == Date.parse(new Date(2017, 0, 2, 3)) ||
   date == Date.parse(new Date(2017, 0, 3, 3)) ||
   date == Date.parse(new Date(2017, 0, 4, 3)) ||
   date == Date.parse(new Date(2017, 0, 5, 3)) ||
   date == Date.parse(new Date(2017, 0, 6, 3)) ||
   date == Date.parse(new Date(2017, 0, 7, 3)) ||
   date == Date.parse(new Date(2017, 0, 8, 3)) ||
   date == Date.parse(new Date(2017, 1, 23, 3)) ||
   date == Date.parse(new Date(2017, 1, 24, 3)) ||
   date == Date.parse(new Date(2017, 2, 8, 3)) ||
   date == Date.parse(new Date(2017, 4, 1, 3)) ||
   date == Date.parse(new Date(2017, 4, 8, 3)) ||
   date == Date.parse(new Date(2017, 4, 9, 3)) ||
   date == Date.parse(new Date(2017, 5, 12, 3)) ||
   date == Date.parse(new Date(2017, 10, 6, 3)) ||
   date == Date.parse(new Date(2018, 0, 1, 3)) ||
   date == Date.parse(new Date(2018, 0, 2, 3)) ||
   date == Date.parse(new Date(2018, 0, 3, 3)) ||
   date == Date.parse(new Date(2018, 0, 4, 3)) ||
   date == Date.parse(new Date(2018, 0, 5, 3)) ||
   date == Date.parse(new Date(2018, 0, 6, 3)) ||
   date == Date.parse(new Date(2018, 0, 7, 3)) ||
   date == Date.parse(new Date(2018, 0, 8, 3)) ||
   date == Date.parse(new Date(2018, 1, 23, 3)) ||
   date == Date.parse(new Date(2018, 2, 8, 3)) ||
   date == Date.parse(new Date(2018, 2, 9, 3)) ||
   date == Date.parse(new Date(2018, 3, 30, 3)) ||
   date == Date.parse(new Date(2018, 4, 1, 3)) ||
   date == Date.parse(new Date(2018, 4, 2, 3)) ||
   date == Date.parse(new Date(2018, 4, 9, 3)) ||
   date == Date.parse(new Date(2018, 5, 11, 3)) ||
   date == Date.parse(new Date(2018, 5, 12, 3)) ||
   date == Date.parse(new Date(2018, 10, 5, 3)) ||
   date == Date.parse(new Date(2018, 11, 31, 3)) ||
   date == Date.parse(new Date(2019, 0, 1, 3)) ||
   date == Date.parse(new Date(2019, 0, 2, 3)) ||
   date == Date.parse(new Date(2019, 0, 3, 3)) ||
   date == Date.parse(new Date(2019, 0, 4, 3)) ||
   date == Date.parse(new Date(2019, 0, 5, 3)) ||
   date == Date.parse(new Date(2019, 0, 6, 3)) ||
   date == Date.parse(new Date(2019, 0, 7, 3)) ||
   date == Date.parse(new Date(2019, 0, 8, 3)) ||
   date == Date.parse(new Date(2019, 2, 8, 3)) ||
   date == Date.parse(new Date(2019, 4, 1, 3)) ||
   date == Date.parse(new Date(2019, 4, 2, 3)) ||
   date == Date.parse(new Date(2019, 4, 3, 3)) ||
   date == Date.parse(new Date(2019, 4, 9, 3)) ||
   date == Date.parse(new Date(2019, 4, 10, 3)) ||
   date == Date.parse(new Date(2019, 5, 12, 3)) ||
   date == Date.parse(new Date(2019, 10, 4, 3)) ||
   date == Date.parse(new Date(2020, 0, 1, 3)) ||
   date == Date.parse(new Date(2020, 0, 2, 3)) ||
   date == Date.parse(new Date(2020, 0, 3, 3)) ||
   date == Date.parse(new Date(2020, 0, 4, 3)) ||
   date == Date.parse(new Date(2020, 0, 5, 3)) ||
   date == Date.parse(new Date(2020, 0, 6, 3)) ||
   date == Date.parse(new Date(2020, 0, 7, 3)) ||
   date == Date.parse(new Date(2020, 0, 8, 3)) ||
   date == Date.parse(new Date(2020, 1, 24, 3)) ||
   date == Date.parse(new Date(2020, 2, 9, 3)) ||
   date == Date.parse(new Date(2020, 4, 1, 3)) ||
   date == Date.parse(new Date(2020, 4, 4, 3)) ||
   date == Date.parse(new Date(2020, 4, 5, 3)) ||
   date == Date.parse(new Date(2020, 4, 11, 3)) ||
   date == Date.parse(new Date(2020, 5, 12, 3)) ||
   date == Date.parse(new Date(2020, 10, 4, 3))) {
     off_days[k] = date;
     k++;
     date = date + day;
     holly = 'В соответствии со статьей 193 ГК РФ если последний день срока '+
     'приходится на нерабочий день, днем окончания срока считается ближайший следующий за ним рабочий день.'+'<br>';
     holly_boolen = true;
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

//Change date type from 01.02.2019 to 2019-02-01
function changeDateType(date){
  date = date.slice(6, 10) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2);
  return date;
}

function makeRubText_1(sum){
  let sumText;
  let rub, kop;
  let rub_string_payment, kop_string_payment;

  rub = Math.floor(sum);
  kop = sum - rub;
  kop = Math.round(kop * 100);
  if (kop == 0) {
    kop = "00";
  } else if (kop < 10) {
    kop = "0" + kop;
  }

  //Склонение рублей/рубля
  let m = String(rub).length;
  m = String(rub).slice(m - 2, m);
  if (m  == "11") {
    rub_string_payment = " рублей ";
  } else {
    let m = String(rub).length - 1;
    m = String(rub).charAt(m);
    switch (m) {
      case "1":
        rub_string_payment = " рубля ";
        break;
      default:
        rub_string_payment = " рублей ";
    }
  }


  //Склонение рублей/рубля
  if (kop == "11") {
    kop_string_payment = " копеек";
  } else {
    m = String(kop).length - 1;
    m = String(kop).charAt(m);
    switch (m) {
      case "1":
        kop_string_payment = " копейки";
        break;
      default:
        kop_string_payment = " копеек";
    }
  }

  sumText = new Intl.NumberFormat('ru-RU').format(rub) + rub_string_payment + kop + kop_string_payment;

  return sumText;
}

function makeRubText_2(sum){
  let sumText;
  let rub, kop;
  let rub_string_payment, kop_string_payment;

  rub = Math.floor(sum);
  kop = sum - rub;
  kop = Math.round(kop * 100);
  if (kop == 0) {
    kop = "00";
  } else if (kop < 10) {
    kop = "0" + kop;
  }

  //Склонение рублей/рубль
  let m = String(rub).length;
  m = String(rub).slice(m - 2, m);
  if (Number(m) >= 11 && Number(m) <= 19) {
    rub_string_payment = " рублей ";
  } else {
    let m = String(rub).length - 1;
    m = String(rub).charAt(m);
    switch (m) {
      case "1":
        rub_string_payment = " рубль ";
        break;
      case "2":
      case "3":
      case "4":
        rub_string_payment = " рубля ";
        break;
      default:
        rub_string_payment = " рублей  ";
    }
  }


  //Склонение копеек/копейка/копейки
  if (Number(kop) >= 11 && Number(kop) <= 19) {
    kop_string_payment = " копеек";
  } else {
    m = String(kop).length - 1;
    m = String(kop).charAt(m);
    switch (m) {
      case "1":
        kop_string_payment = " копейка";
        break;
      case "2":
      case "3":
      case "4":
        kop_string_payment = " копейки";
        break;
      default:
        kop_string_payment = " копеек";
    }
  }

  sumText = new Intl.NumberFormat('ru-RU').format(rub) + rub_string_payment + kop + kop_string_payment;

  return sumText;
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
