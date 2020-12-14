let day = 24*60*60*1000;
let fo_name;
let decision;

let COLUMN_NAME_20 = "20-й день";
let COLUMN_NAME_21 = "21-й день";

let COLUMN_NAME_0 = "№";
let COLUMN_NAME_1 = "Вид выплаты";
let COLUMN_NAME_2 = "Дата выплаты";
let COLUMN_NAME_3 = "Сумма выплаты";

let COLUMN_NAME_4 = "Начало";
let COLUMN_NAME_5 = "Конец";
let COLUMN_NAME_6 = "Дней";
let COLUMN_NAME_7 = "Неустойка";

let COLUMN_NAME_8 = "Период ДО суда";
let COLUMN_NAME_9 = "Период ПОСЛЕ суда";
// let COLUMN_NAME_10 = "Начало неустойки после суда";
// let COLUMN_NAME_11 = "Конец неустойки после суда";

let pay = [];
let pay_date = [];
let pay_text = [];
let payment_order = [];
let pay_count = [];
let pay_summ = [];
let voluntary_if = [];
let fu_if = [];
let court_if = [];
let penalty_ndfl = [];
let penalty_ndfl_summ = [];

let str_payment_dataled;
let str_payment_dataled_header;

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
let total_penalty = 0;
let total_count_paragraf = "";
let total_penalty_payments_paragraf = "";
let total_penalty_paragraf = "";
let total_count_string = "";
let total_penalty_string = "";
let date_sv_uts_ev_stor = [];
let date_sv_uts_ev_stor_last_day = [];
let date_penalty_day = [];

let days_string = [];
let rub_string_payment = [];
let rub_string_penalty = [];
let kop_string = [];

let holly, holly_boolen, standart_motivation, first_paragraf, summary_paragraf = "";
let analize_period_paragraf = [], payment_paragraf = [];
let payment_in_time_paragraf = [];
let payment_not_in_time_paragraf = [];
let payment_not_in_time_paragraf_court = [];
let total_analize_paragraf = "";
let court_period_text = [];
let claim_name = []; //название требований "с заявлением о наступлении страхового случая"/"УТС"/"эвакуатор"/"хранение"
let claim_name_short = [];
let claim_name_payment = [];
let claim_add_motivation = []; //дополнительный абзац для УТС, эвакуации, хранение
let article_191 = 'Статьей 191 ГК РФ установлено, что течение срока, определённого периодом времени, '+
'начинается на следующий день после календарной даты или наступления события, '+
'которыми определено его начало.'+'<br>';

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
'фактического исполнения страховщиком обязательства по договору включительно.'+'<br>';

//Обработчик потери фокуса у поля с датой первоначального обращения о страховом случае
$('#app_date_1').focusout(function analizeDate(){

  document.querySelector('#date_sv_last_day').removeAttribute('tooltip');
  document.querySelector('#date_sv_last_day').innerHTML = "";
  document.querySelector('#date_sv_penalty_day').innerHTML = "";
  document.querySelector('#date_sv_last_day').style.color = '#595b5e';

  date_sv = document.querySelector('#app_date_1').value;
  date_sv = changeDateType(date_sv);
  date_sv = Date.parse(date_sv);
  date_sv_last_day = findLastDay(date_sv);
  if (holly_boolen) {
    document.querySelector('#date_sv_last_day').style.color = '#b00000';
    document.querySelector('#date_sv_last_day').setAttribute('tooltip', '193 ГК РФ');
  }
  date_sv_penalty_day = date_sv_last_day + day;

  if (!isNaN(date_sv_last_day)) {
    document.querySelector('#date_sv_last_day').innerHTML = formatDate(new Date(date_sv_last_day));
    document.querySelector('#date_sv_penalty_day').innerHTML = formatDate(new Date(date_sv_penalty_day));
    document.querySelector('#COLUMN_NAME_20').innerHTML = COLUMN_NAME_20;
    document.querySelector('#COLUMN_NAME_21').innerHTML = COLUMN_NAME_21;
  }
});

//Обработчик потери фокуса у поля с датой первоначального обращения с требованием о выплате УТС
$('#app_date_2').focusout(function analizeDate(){

  document.querySelector('#date_uts_last_day').removeAttribute('tooltip');
  document.querySelector('#date_uts_last_day').innerHTML = "";
  document.querySelector('#date_uts_penalty_day').innerHTML = "";
  document.querySelector('#date_uts_last_day').style.color = '#595b5e';

  date_uts = document.querySelector('#app_date_2').value;
  date_uts = changeDateType(date_uts);
  date_uts = Date.parse(date_uts);
  date_uts_last_day = findLastDay(date_uts);
  if (holly_boolen) {
    document.querySelector('#date_uts_last_day').style.color = '#b00000';
    document.querySelector('#date_uts_last_day').setAttribute('tooltip', '193 ГК РФ');
  }
  date_uts_penalty_day = date_uts_last_day + day;

  if (!isNaN(date_uts_last_day)) {
    document.querySelector('#date_uts_last_day').innerHTML = formatDate(new Date(date_uts_last_day));
    document.querySelector('#date_uts_penalty_day').innerHTML = formatDate(new Date(date_uts_penalty_day));
    document.querySelector('#COLUMN_NAME_20').innerHTML = COLUMN_NAME_20;
    document.querySelector('#COLUMN_NAME_21').innerHTML = COLUMN_NAME_21;
  }
});

//Обработчик потери фокуса у поля с датой первоначального обращения с требованием о выплате расходов на эвакуатор
$('#app_date_3').focusout(function analizeDate(){

  document.querySelector('#date_ev_last_day').removeAttribute('tooltip');
  document.querySelector('#date_ev_last_day').innerHTML = "";
  document.querySelector('#date_ev_penalty_day').innerHTML = "";
  document.querySelector('#date_ev_last_day').style.color = '#595b5e';

  date_ev = document.querySelector('#app_date_3').value;
  date_ev = changeDateType(date_ev);
  date_ev = Date.parse(date_ev);
  date_ev_last_day = findLastDay(date_ev);
  if (holly_boolen) {
    document.querySelector('#date_ev_last_day').style.color = '#b00000';
    document.querySelector('#date_ev_last_day').setAttribute('tooltip', '193 ГК РФ');
  }
  date_ev_penalty_day = date_ev_last_day + day;

  if (!isNaN(date_ev_last_day)) {
    document.querySelector('#date_ev_last_day').innerHTML = formatDate(new Date(date_ev_last_day));
    document.querySelector('#date_ev_penalty_day').innerHTML = formatDate(new Date(date_ev_penalty_day));
    document.querySelector('#COLUMN_NAME_20').innerHTML = COLUMN_NAME_20;
    document.querySelector('#COLUMN_NAME_21').innerHTML = COLUMN_NAME_21;
  }
});

//Обработчик потери фокуса у поля с датой первоначального обращения с требованием о выплате расходов на хранение
$('#app_date_4').focusout(function analizeDate(){

  document.querySelector('#date_stor_last_day').removeAttribute('tooltip');
  document.querySelector('#date_stor_last_day').innerHTML = "";
  document.querySelector('#date_stor_penalty_day').innerHTML = "";
  document.querySelector('#date_stor_last_day').style.color = '#595b5e';

  date_stor = document.querySelector('#app_date_4').value;
  date_stor = changeDateType(date_stor);
  date_stor = Date.parse(date_stor);
  date_stor_last_day = findLastDay(date_stor);
  if (holly_boolen) {
    document.querySelector('#date_stor_last_day').style.color = '#b00000';
    document.querySelector('#date_stor_last_day').setAttribute('tooltip', '193 ГК РФ');
  }
  date_stor_penalty_day = date_stor_last_day + day;

  if (!isNaN(date_stor_last_day)) {
    document.querySelector('#date_stor_last_day').innerHTML = formatDate(new Date(date_stor_last_day));
    document.querySelector('#date_stor_penalty_day').innerHTML = formatDate(new Date(date_stor_penalty_day));
    document.querySelector('#COLUMN_NAME_20').innerHTML = COLUMN_NAME_20;
    document.querySelector('#COLUMN_NAME_21').innerHTML = COLUMN_NAME_21;
  }
});

document.getElementById('btn_desicion').onclick = function(){

  holly = "";
  holly_boolen = false;
  var q = 1;
  total_count = 0;
  total_penalty = 0;

  //Получение количества строк с выплатами
  var number_of_payments = $('div.payments').length;
  var payments_names = $('.payments_names');
  var payments_dates = $('.payments_dates');
  var payments_summs = $('.payments_summs');
  var voluntary_ifs = $('.voluntary_ifs');
  var fu_ifs = $('.fu_ifs');
  var court_ifs = $('.court_ifs');
  var penalty_ndfls = $('.penalty_ndfls');
  var penalty_ndfl_summs = $('.penalty_ndfl_summs');

  //Удаление всплывающей подсказки 193 ГК РФ
  document.querySelector('#date_sv_last_day').removeAttribute('tooltip');
  document.querySelector('#date_uts_last_day').removeAttribute('tooltip');
  document.querySelector('#date_ev_last_day').removeAttribute('tooltip');
  document.querySelector('#date_stor_last_day').removeAttribute('tooltip');

  //стирание значений дат
  document.querySelector('#date_sv_last_day').innerHTML = "";
  document.querySelector('#date_sv_penalty_day').innerHTML = "";
  document.querySelector('#date_uts_last_day').innerHTML = "";
  document.querySelector('#date_uts_penalty_day').innerHTML = "";
  document.querySelector('#date_ev_last_day').innerHTML = "";
  document.querySelector('#date_ev_penalty_day').innerHTML = "";
  document.querySelector('#date_stor_last_day').innerHTML = "";
  document.querySelector('#date_stor_penalty_day').innerHTML = "";

  //Удаление значений в таблице результатов
  for (var i = 1; i <= number_of_payments; i++) {
    $('#str_payment_dataled').empty();
    $('#str_payment_dataled_header').empty();
    court_period_text[i] = "";
  }

  document.querySelector('#date_sv_last_day').style.color = '#595b5e';
  document.querySelector('#date_uts_last_day').style.color = '#595b5e';
  document.querySelector('#date_ev_last_day').style.color = '#595b5e';
  document.querySelector('#date_stor_last_day').style.color = '#595b5e';

  //Получение значения наименования ФО
  fo_name = document.querySelector("#fo_name").value;

  //Присваивание значения первому параграфу
  first_paragraf = 'Рассмотрев требования Заявителя о взыскании с ' + fo_name + ' неустойки '+
  'за несоблюдение срока выплаты страхового возмещения по договору ОСАГО, '+
  'Финансовый уполномоченный приходит к следующему.'+'<br>'

  //Получение значений даты обращений с требованиями и исчисление 20го дня
  date_sv = document.querySelector('#app_date_1').value;
  date_sv = changeDateType(date_sv);
  date_sv = Date.parse(date_sv);
  date_sv_last_day = findLastDay(date_sv);
  if (holly_boolen) {
    document.querySelector('#date_sv_last_day').style.color = '#b00000';
    document.querySelector('#date_sv_last_day').setAttribute('tooltip', '193 ГК РФ');
  }
  date_sv_penalty_day = date_sv_last_day + day;

  date_uts = document.querySelector('#app_date_2').value;
  date_uts = changeDateType(date_uts);
  date_uts = Date.parse(date_uts);
  date_uts_last_day = findLastDay(date_uts);
  if (holly_boolen) {
    document.querySelector('#date_uts_last_day').style.color = '#b00000';
    document.querySelector('#date_uts_last_day').setAttribute('tooltip', '193 ГК РФ');
  }
  date_uts_penalty_day = date_uts_last_day + day;

  date_ev = document.querySelector('#app_date_3').value;
  date_ev = changeDateType(date_ev);
  date_ev = Date.parse(date_ev);
  date_ev_last_day = findLastDay(date_ev);
  if (holly_boolen) {
    document.querySelector('#date_ev_last_day').style.color = '#b00000';
    document.querySelector('#date_ev_last_day').setAttribute('tooltip', '193 ГК РФ');
  }
  date_ev_penalty_day = date_ev_last_day + day;

  date_stor = document.querySelector('#app_date_4').value;
  date_stor = changeDateType(date_stor);
  date_stor = Date.parse(date_stor);
  date_stor_last_day = findLastDay(date_stor);
  if (holly_boolen) {
    document.querySelector('#date_stor_last_day').style.color = '#b00000';
    document.querySelector('#date_stor_last_day').setAttribute('tooltip', '193 ГК РФ');
  }
  date_stor_penalty_day = date_stor_last_day + day;

  //Получение значения даты судебного взыскания неустойки
    date_court_from = document.querySelector('#date_court_from').value;
    date_court_from = changeDateType(date_court_from);
    date_court_from = Date.parse(date_court_from);
    date_court_to = document.querySelector('#date_court_to').value;
    date_court_to = changeDateType(date_court_to);
    date_court_to = Date.parse(date_court_to);

    court_period_text[1] = 'Решением суда с ' + fo_name + ' взыскана неустойка за период с ' +
    formatDate(new Date(date_court_from)) + ' по ' + formatDate(new Date(date_court_to)) + '.<br>'


  //выведение значений 20го и 21го дня на экран
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

  //Цикл для присвоения общих значений
  for (var i = 1; i <= number_of_payments; i++) {
    payment_not_in_time_paragraf_court[i] = "";
    analize_period_paragraf[i] = "";
    payment_paragraf[i] = "";

    //Получение значений из полей index
    // pay[i] = document.getElementById("pay" + i ).options.selectedIndex;
    // pay_date[i] = document.querySelector('#pay' + i + '_date').value;
    // pay_text[i] = document.querySelector('#pay' + i + '_text').value;
    // court_if[i] = document.getElementById("court_if_" + i );
    pay[i] = payments_names[i - 1].options.selectedIndex; //получение значения наименования выплаты
    pay_date[i] = payments_dates[i - 1].value; // получение значения даты выплаты
    pay_text[i] = payments_summs[i - 1].value; // получение значения суммы выплаты
    court_if[i] = court_ifs[i - 1]; // получение значения "выплата на основании решения суда"
    fu_if[i] = fu_ifs[i - 1]; // получение значения "выплата на основании решения ФУ"
    voluntary_if[i] = voluntary_ifs[i - 1]; // получение значения "добровольная выплата"
    penalty_ndfl[i] = penalty_ndfls[i - 1]; // получение значения "удержан НДФЛ (checkbox)"
    if (!isNaN(penalty_ndfl_summ[i])) {
      penalty_ndfl_summ[i] = penalty_ndfl_summs[i - 1].value; // получение значения "удержан НДФЛ (сумма)"
    }

    //редактирвоание значений даты и суммы выплаты
    pay_date[i] = changeDateType(pay_date[i]);
    pay_date[i] = Date.parse(pay_date[i]);
    pay_text[i] = pay_text[i].replace(/\s+/g, '');
    if (!isNaN(penalty_ndfl_summ[i])) {
      penalty_ndfl_summ[i] = penalty_ndfl_summ[i].replace(/\s+/g, '');
    }

    // payment_order[i] = document.querySelector('#payment_order_' + i).value;

    // присваивание текстового значения для выплаты по суду
    if (court_if[i].checked) {
      court_if[i] = ', на основании Решения суда,';
    } else {
      court_if[i] = '';
    }

    switch (pay[i]) {
      case 0: //Страховое возмещение
        date_penalty_day[i] = date_sv_penalty_day;
        date_sv_uts_ev_stor[i] = date_sv;
        date_sv_uts_ev_stor_last_day[i] = date_sv_last_day;
        claim_name[i] = ' с заявлением о выплате страхового возмещения ';
        claim_name_short[i] = ' страхового возмещения ';
        claim_add_motivation[i] = '';
        break;
      case 1: //УТС
        date_penalty_day[i] = date_uts_penalty_day;
        date_sv_uts_ev_stor[i] = date_uts;
        date_sv_uts_ev_stor_last_day[i] = date_uts_last_day;
        claim_name[i] = ' с заявлением о выплате УТС ';
        claim_name_short[i] = ' УТС ';
        claim_add_motivation[i] = 'Согласно пункту 20 Постановление Пленума № ' +
        '58 при наступлении страхового случая потерпевший обязан не только уведомить ' +
        'страховщика о его наступлении в сроки, установленные Правилами ОСАГО, ' +
        'но и направить страховщику заявление о страховом возмещении и документы, ' +
        'предусмотренные Правилами ОСАГО. В заявлении о страховом возмещении потерпевший ' +
        'должен также сообщить о другом известном ему на момент подачи заявления ущербе, ' +
        'кроме расходов на восстановление поврежденного имущества, который подлежит ' +
        'возмещению  (например, об утрате товарной стоимости, о расходах на эвакуацию ' +
        'транспортного средства с места дорожно-транспортного происшествия и т.п.).<br>' +
        'Согласно пункту 37 Постановление Пленума № 58 к реальному ущербу, возникшему ' +
        'в результате дорожно-транспортного происшествия, наряду со стоимостью ремонта ' +
        'и запасных частей относится также утрата товарной стоимости, которая представляет ' +
        'собой уменьшение стоимости транспортного средства, вызванное преждевременным ' +
        'ухудшением товарного (внешнего) вида транспортного средства и его эксплуатационных ' +
        'качеств в результате снижения прочности и долговечности отдельных деталей, узлов ' +
        'и агрегатов, соединений и защитных покрытий вследствие дорожно-транспортного ' +
        'происшествия и последующего ремонта.<br>';
        break;
      case 2: //Эвакуация
        date_penalty_day[i] = date_ev_penalty_day;
        date_sv_uts_ev_stor[i] = date_ev;
        date_sv_uts_ev_stor_last_day[i] = date_ev_last_day;
        claim_name[i] = ' с заявлением о выплате расходов на эвакуацию Транспортного средства ';
        claim_name_short[i] = ' расходов на эвакуацию Транспортного средства ';
        claim_add_motivation[i] = 'Согласно абзацу 2 пункта 4.12 Правил ОСАГО, '+
        'при причинении вреда имуществу потерпевшего возмещению в пределах страховой '+
        'суммы подлежат иные расходы, произведенные потерпевшим в связи с причиненным '+
        'вредом (в том числе эвакуация транспортного средства с места дорожно-транспортного '+
        'происшествия, хранение поврежденного транспортного средства, доставка пострадавших '+
        'в медицинскую организацию).'+ '<br>'+'Учитывая изложенное, Финансовый уполномоченный '+
        'приходит к выводу о том, что расходы на эвакуацию Транспортного средства относятся '+
        'к страховому возмещению, в силу чего неустойка за несоблюдение сроков выплаты страхового '+
        'возмещения подлежит начислению на сумму расходов на эвакуацию Транспортного средства.'+ '<br>';
        break;
      case 3: // Хранение
        date_penalty_day[i] = date_stor_penalty_day;
        date_sv_uts_ev_stor[i] = date_stor;
        date_sv_uts_ev_stor_last_day[i] = date_stor_last_day;
        claim_name[i] = ' с заявлением о выплате расходов на хранение Транспортного средства ';
        claim_name_short[i] = ' расходов на хранение Транспортного средства ';
        claim_add_motivation[i] = 'Согласно абзацу 2 пункта 4.12 Правил ОСАГО, '+
        'при причинении вреда имуществу потерпевшего возмещению в пределах страховой '+
        'суммы подлежат иные расходы, произведенные потерпевшим в связи с причиненным '+
        'вредом (в том числе эвакуация транспортного средства с места дорожно-транспортного '+
        'происшествия, хранение поврежденного транспортного средства, доставка пострадавших '+
        'в медицинскую организацию).'+ '<br>'+'Учитывая изложенное, Финансовый уполномоченный '+
        'приходит к выводу о том, что расходы на хранение Транспортного средства относятся '+
        'к страховому возмещению, в силу чего неустойка за несоблюдение сроков выплаты страхового '+
        'возмещения подлежит начислению на сумму расходов на хранение Транспортного средства.'+ '<br>';
        break;
      case 4:
        claim_name_short[i] = ' неустойки за несоблюдение сроков выплаты страхового возмещения по Договору ОСАГО ';
        break;
    } // завершение switch

    //"Собираем" абзац про анализ сроков 20 и 21 дней
    analize_period_paragraf[i] = claim_add_motivation[i] + 'Заявитель обратился в ' + fo_name + claim_name[i] +
    formatDate(new Date(date_sv_uts_ev_stor[i])) + ', следовательно, последним днем срока осуществления '+
    'выплаты' + claim_name_short[i] + 'является ' + formatDate(new Date(date_sv_uts_ev_stor_last_day[i])) + ', а неустойка подлежит начислению с '+
    formatDate(new Date(date_penalty_day[i])) +'.<br>'

    //"Собираем" абзац про выплату
    payment_paragraf[i] = formatDate(new Date(pay_date[i])) + ' ' + fo_name + court_if[i] + ' осуществило выплату' + claim_name_short[i] + 'в размере '+
    makeRubText_1(pay_text[i]) +
    // ', что подтверждается платежным поручением от ' + formatDate(new Date(pay_date[i])) + ' № ' + payment_order[i] +
    '.<br>'

    //Удаление абзаца с анализом сроков 20 и 21 дней в случае его повторения
    for (var j = 1; j < i; j++) {
      if ((!isNaN(pay_date[i]) && pay[i] == pay[j])) {
          analize_period_paragraf[i] = "";
      }
    }
  } // завершение for

  //"Собираем" текст решения
  //Если суда не было
  if (isNaN(date_court_from)) {

    //Выведение заголовка таблицы на экран
    str_payment_dataled_header = '<tr>' +
      '<th scope="col"><span id="COLUMN_NAME_0">' + COLUMN_NAME_0 + '</span></th>' +
      '<th scope="col"><span id="COLUMN_NAME_1">' + COLUMN_NAME_1 + '</span></th>' +
      '<!-- <th scope="col"><span id="COLUMN_NAME_2"></span></th> -->' +
      '<th scope="col"><span id="COLUMN_NAME_3">' + COLUMN_NAME_3 + '</span></th>' +
      '<th scope="col"><span id="COLUMN_NAME_4">' + COLUMN_NAME_4 + '</span></th>' +
      '<th scope="col"><span id="COLUMN_NAME_5">' + COLUMN_NAME_5 + '</span></th>' +
      '<th scope="col"><span id="COLUMN_NAME_6">' + COLUMN_NAME_6 + '</span></th>' +
      '<th scope="col"><span id="COLUMN_NAME_7">' + COLUMN_NAME_7 + '</span></th>' +
    '</tr>';

    $('#str_payment_dataled_header').append(str_payment_dataled_header);

    for (var i = 1; i <= number_of_payments; i++) {

      //Вычисление количества дней между датой выплаты и 20м днем
      pay_count[i] = pay_date[i] - date_sv_uts_ev_stor_last_day[i];

      //Если выплата была в срок, то изменение отрицательного значения на нулевое
      if (pay_count[i] < 0) {
        pay_count[i] = 0;
      }

      //Вычисление суммы неустойки
      pay_summ[i] = pay_text[i] * (pay_count[i] / day) * 0.01;

      //Выведение выплат на экран
      if ((!isNaN(pay_count[i])) && pay[i] != 4) {
        str_payment_dataled = '<tr>' +
          '<th scope="row"><span>' + i + '</span></th>' +
          '<td><span>' + payments_names[i - 1].value + '</span></td>' +
          '<!-- <td><span>' + formatDate(new Date(pay_date[i])) + '</span></td> -->' +
          '<td><span>' + makeRubText_1(pay_text[i]) + '</span></td>' +
          '<td><span>' + formatDate(new Date(date_penalty_day[i])) + '</span></td>' +
          '<td><span>' + formatDate(new Date(pay_date[i])) + '</span></td>' +
          '<td><span>' + declinationDays(pay_count[i] / day) + '</span></td>' +
          '<td><span>' + makeRubText_2(pay_summ[i]) + '</span></td>' +
        '</tr>';

        $('#str_payment_dataled').append(str_payment_dataled);
      }

      //Установление для количества дней и суммы нулевого значения, в случае,
      //если они не рассчитываются, чтобы не было ошибки
      if (isNaN(pay_count[i])) {
        pay_count[i] = 0;
      }
      if (isNaN(pay_summ[i])) {
        pay_summ[i] = 0;
      }

      //Вычисление общего размера неустойки
      total_count = total_count + pay_summ[i];

      //Вычисление общего размера выплаченной неустойки
      if (pay[i] == 4) {
        total_penalty = total_penalty + pay_text[i] * 1;
      }

      //"Собираем" абзац с выводами по каждому платежу
      if (pay_date[i] < date_penalty_day[i]) {
        payment_in_time_paragraf[i] = 'Таким образом, выплата в размере ' + makeRubText_1(pay_text[i]) + ' произведена в установленный '+
        'Законом № 40-ФЗ срок, в силу чего неустойка на указанную сумму не начисляется.'+'<br>';
        payment_not_in_time_paragraf[i] = "";
      } else {
        payment_in_time_paragraf[i] = "";
        payment_not_in_time_paragraf[i] = 'Таким образом, неустойка на сумму ' + makeRubText_2(pay_text[i]) + ' подлежит расчету за период с ' +
        formatDate(new Date(date_penalty_day[i])) + ' по ' + formatDate(new Date(pay_date[i])) + ' (' + declinationDays(pay_count[i] / day) + ').' + '<br>' +
        'В соответствии с требованиями, установленными пунктом 21 статьи 12 Закона № 40-ФЗ, '+
        'размер неустойки, подлежащий выплате за период с ' + formatDate(new Date(date_penalty_day[i])) + ' по ' + formatDate(new Date(pay_date[i])) +
        ' составляет ' + makeRubText_2(pay_summ[i]) + ' (' + makeRubText_2(pay_text[i]) + ' × ' + declinationDays(pay_count[i] / day) +' × 1%).' + '<br>';
      }

      // удаляем абзацы, если выплаты не было (строки для ввода данных не заполнены)
      if (isNaN(pay_date[i])) {
        analize_period_paragraf[i] = "";
        payment_paragraf[i] = "";
        payment_in_time_paragraf[i] = "";
        payment_not_in_time_paragraf[i] = "";
      }

      //Удаление абзаца с анализом сроков 20 и 21 дней и сроков в случае, если выплата неустойки
      if (pay[i] == 4) {
          total_penalty_payments_paragraf = total_penalty_payments_paragraf + payment_paragraf[i];
          payment_paragraf[i] = "";
          analize_period_paragraf[i] = "";
          payment_in_time_paragraf[i] = "";
          payment_not_in_time_paragraf[i] = "";
      }

      // сложение абзацев в один
      total_analize_paragraf = total_analize_paragraf + analize_period_paragraf[i] + payment_paragraf[i] + payment_in_time_paragraf[i] +
      payment_not_in_time_paragraf[i];
    } // окончание цикла for (перебора выплат)

    //Формирование абзаца со сложением нескольких неустоек
    //добавление открывающейся скобки и первой выплаты, в случае, если количество выплат больше 1
    let stop_ind_1 = 1;
    let stop_ind_2 = false;
    for (var i = 1; i <= number_of_payments; i++) {
      if (pay_summ[i] > 0) {
        total_count_string = ' (' + makeRubText_2(pay_summ[i]);
        stop_ind_1 = i + 1;
        break
      }
    }

    // добавление выплат, в случае, если их было больше 1
    for (var i = stop_ind_1; i <= number_of_payments; i++) {
      if (pay_summ[i] > 0) {
        total_count_string = total_count_string + ' + ' + makeRubText_2(pay_summ[i]);
        stop_ind_2 = true;
      }
    }

    //добавление закрывающейся скобки, если количество выплат больше 1
    if (stop_ind_2) {
      total_count_string = total_count_string + ')'
    } else {
      total_count_string = '';
    }

    //Формирование абзаца со сложением нескольких ВЫПЛАЧЕННЫХ неустоек
    //добавление открывающейся скобки и первой выплаты, в случае, если количество выплат больше 1
    stop_ind_1 = 1;
    stop_ind_2 = false;
    for (var i = 1; i <= number_of_payments; i++) {
      if (pay[i] == 4) {
        total_penalty_string = ' (' + makeRubText_2(pay_text[i]);
        stop_ind_1 = i + 1;
        break
      }
    }

    // добавление выплат, в случае, если их было больше 1
    for (var i = stop_ind_1; i <= number_of_payments; i++) {
      if (pay[i] == 4) {
        total_penalty_string = total_penalty_string + ' + ' + makeRubText_2(pay_text[i]);
        stop_ind_2 = true;
      }
    }

    //добавление закрывающейся скобки, если количество выплат больше 1
    if (stop_ind_2) {
      total_penalty_string = total_penalty_string + ')'
    } else {
      total_penalty_string = '';
    }

  } else { //Определение периода взыскания неустойки до начала судебного взыскания

    //Выведение заголовка таблицы на экран
    if ($('#str_payment_dataled_header').children().length == 0) {
      str_payment_dataled_header = '<tr align="center" class="table-bordered">' +
        '<th rowspan="2" scope="col" style="vertical-align: middle;"><span id="COLUMN_NAME_0">' + COLUMN_NAME_0 + '</span></th>' +
        '<th rowspan="2" scope="col" style="vertical-align: middle;"><span id="COLUMN_NAME_1">' + COLUMN_NAME_1 + '</span></th>' +
        '<th rowspan="2" scope="col" style="vertical-align: middle;"><span id="COLUMN_NAME_3">' + COLUMN_NAME_3 + '</span></th>' +
        '<th colspan="4" scope="col"><span id="COLUMN_NAME_3">' + COLUMN_NAME_8 + '</span></th>' +
        '<th colspan="4" scope="col"><span id="COLUMN_NAME_3">' + COLUMN_NAME_9 + '</span></th>' +
      '</tr>' +
      '<tr class="table-bordered">' +
        '<th scope="col"><span id="COLUMN_NAME_4">' + COLUMN_NAME_4 + '</span></th>' +
        '<th scope="col"><span id="COLUMN_NAME_5">' + COLUMN_NAME_5 + '</span></th>' +
        '<th scope="col"><span id="COLUMN_NAME_6">' + COLUMN_NAME_6 + '</span></th>' +
        '<th scope="col"><span id="COLUMN_NAME_7">' + COLUMN_NAME_7 + '</span></th>' +
        '<th scope="col"><span id="COLUMN_NAME_4">' + COLUMN_NAME_4 + '</span></th>' +
        '<th scope="col"><span id="COLUMN_NAME_5">' + COLUMN_NAME_5 + '</span></th>' +
        '<th scope="col"><span id="COLUMN_NAME_6">' + COLUMN_NAME_6 + '</span></th>' +
        '<th scope="col"><span id="COLUMN_NAME_7">' + COLUMN_NAME_7 + '</span></th>' +
      '</tr>';

      $('#str_payment_dataled_header').append(str_payment_dataled_header);
      // $('#str_payment_dataled_header').parent().addClass('table-bordered');
    }

    for (var i = 1; i <= number_of_payments; i++) {
      //Если выплата с нарушением срока
      if (pay_date[i] > date_penalty_day[i]) {

        //Вычисление периода неустойки до судебного периода
        court_period_before[i] = date_court_from - date_penalty_day[i];
        //Если периода неустойки до судебного периода отрицательный, то изменение отрицательного значения на нулевое
        if (court_period_before[i] < 0) court_period_before[i] = 0;
        //Вычисляем сумму неустойки до судебного периода
        court_summ_before[i] = pay_text[i] * (court_period_before[i] / day) * 0.01;

        //Вычисление периода неустойки после судебного периода
        court_period_after[i] = pay_date[i] - date_court_to;
        //Если периода неустойки после судебного периода отрицательный, то изменение отрицательного значения на нулевое
        if (court_period_after[i] < 0) court_period_after[i] = 0;
        //Вычисляем сумму неустойки после судебного периода
        court_summ_after[i] = pay_text[i] * (court_period_after[i] / day) * 0.01;

        //"Собираем" абзац с выводами по каждому платежу
        //если были периоды ДО И ПОСЛЕ судебного периода вызскания неустойки
        if ((court_period_before[i] > 0) && (court_period_after[i] > 0)) {

          payment_not_in_time_paragraf_court[i] = 'Таким образом, неустойка на сумму ' + makeRubText_2(pay_text[i]) + ' подлежит расчету за период с ' +
          formatDate(new Date(date_penalty_day[i])) + ' по ' + formatDate(new Date(date_court_from - day)) + ' (' + declinationDays(court_period_before[i] / day) + ') ' +
          ' и за период с ' + formatDate(new Date(date_court_to + day)) + ' по ' + formatDate(new Date(pay_date[i])) + ' (' + declinationDays(court_period_after[i] / day) + ').' + '<br>' +
          'В соответствии с требованиями, установленными пунктом 21 статьи 12 Закона № 40-ФЗ, ' +
          'размер неустойки, подлежащий выплате за период с ' + formatDate(new Date(date_penalty_day[i])) + ' по ' +
          formatDate(new Date(date_court_from - day)) + ' составляет ' + makeRubText_2(court_summ_before[i]) + ' (' + makeRubText_2(pay_text[i]) +
          ' × ' + declinationDays(court_period_before[i] / day) +' × 1%)' + ', за период с ' + formatDate(new Date(date_court_to + day)) + ' по ' + formatDate(new Date(pay_date[i])) +
          ' составляет ' + makeRubText_2(court_summ_after[i]) + ' (' + makeRubText_2(pay_text[i]) + ' × ' + declinationDays(court_period_after[i] / day) +' × 1%).<br>';

        //если был только период ПОСЛЕ судебного периода вызскания неустойки
        } else if ((court_period_before[i] == 0) && (court_period_after[i] > 0)) {

          payment_not_in_time_paragraf_court[i] = 'Таким образом, неустойка на сумму ' + makeRubText_2(pay_text[i]) + ' подлежит расчету за период с ' +
          formatDate(new Date(date_court_to + day)) + ' по ' + formatDate(new Date(pay_date[i])) + ' (' + declinationDays(court_period_after[i] / day) + ').' + '<br>' +
          'В соответствии с требованиями, установленными пунктом 21 статьи 12 Закона № 40-ФЗ, ' +
          'размер неустойки, подлежащий выплате за период с ' + formatDate(new Date(date_court_to + day)) + ' по ' + formatDate(new Date(pay_date[i])) +
          ' составляет ' + makeRubText_2(court_summ_after[i]) + ' (' + makeRubText_2(pay_text[i]) + ' × ' + declinationDays(court_period_after[i] / day) +' × 1%).<br>';

        //если был только период ДО судебного периода вызскания неустойки
        } else if ((court_period_before[i] > 0) && (court_period_after[i] == 0)) {

          payment_not_in_time_paragraf_court[i] = 'Таким образом, неустойка на сумму ' + makeRubText_2(pay_text[i]) + ' подлежит расчету за период с ' +
          formatDate(new Date(date_penalty_day[i])) + ' по ' + formatDate(new Date(date_court_from - day)) + ' (' + declinationDays(court_period_before[i] / day) + ').' + '<br>' +
          'В соответствии с требованиями, установленными пунктом 21 статьи 12 Закона № 40-ФЗ, ' +
          'размер неустойки, подлежащий выплате за период с ' + formatDate(new Date(date_penalty_day[i])) + ' по ' + formatDate(new Date(date_court_from - day)) +
          ' составляет ' + makeRubText_2(court_summ_before[i]) + ' (' + makeRubText_2(pay_text[i]) + ' × ' + declinationDays(court_period_before[i] / day) +' × 1%).<br>';
        }

        payment_in_time_paragraf[i] = "";
        payment_not_in_time_paragraf[i] = "";

      // Если выплата осуществлена в срок
      } else {
        payment_in_time_paragraf[i] = 'Таким образом, выплата в размере ' + makeRubText_1(pay_text[i]) + ' произведена в установленный '+
        'Законом № 40-ФЗ срок, в силу чего неустойка на указанную сумму не начисляется.'+'<br>';
        payment_not_in_time_paragraf[i] = "";
        payment_not_in_time_paragraf_court[i] = "";
      }

      //обнуление значений, в случае, если периоды до или после суда меньше нуля
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

      //Выведение выплат на экран
      if ((!isNaN(pay_date[i])) && pay[i] != 4) {
        str_payment_dataled = '<tr>' +
          '<th scope="row"><span>' + i + '</span></th>' +
          '<td><span>' + payments_names[i - 1].value + '</span></td>' +
          '<td><span>' + makeRubText_1(pay_text[i]) + '</span></td>';

          // if (court_period_before[i] > 0) {
            str_payment_dataled = str_payment_dataled +
            '<td><span>' + formatDate(new Date(date_penalty_day[i])) + '</span></td>' +
            '<td><span>' + formatDate(new Date(date_court_from - day)) + '</span></td>' +
            '<td><span>' + declinationDays(court_period_before[i] / day) + '</span></td>' +
            '<td><span>' + makeRubText_2(court_summ_before[i]) + '</span></td>';
          // }

          // if (court_period_after[i] > 0) {
            str_payment_dataled = str_payment_dataled +
            '<td><span>' + formatDate(new Date(date_court_to + day)) + '</span></td>' +
            '<td><span>' + formatDate(new Date(pay_date[i])) + '</span></td>' +
            '<td><span>' + declinationDays(court_period_after[i] / day) + '</span></td>' +
            '<td><span>' + makeRubText_2(court_summ_after[i]) + '</span></td>';
          // }

          str_payment_dataled = str_payment_dataled + '</tr>'

        $('#str_payment_dataled').append(str_payment_dataled);
      }

      //добавление суммы неустойки до судебного вызскания и после к общему значению
      total_count = total_count + court_summ_before[i] + court_summ_after[i];

      //Вычисление общего размера выплаченной неустойки
      if (pay[i] == 4) {
        total_penalty = total_penalty + pay_text[i] * 1;
      }

      // удаление значений пустых параграфов
      if (isNaN(pay_date[i])) {
        analize_period_paragraf[i] = "";
        payment_paragraf[i] = "";
        payment_in_time_paragraf[i] = "";
        payment_not_in_time_paragraf[i] = "";
        payment_not_in_time_paragraf_court[i] = "";
      }

      //Удаление абзаца с анализом сроков 20 и 21 дней и сроков в случае, если выплата неустойки
      if (pay[i] == 4) {
        total_penalty_payments_paragraf = total_penalty_payments_paragraf + payment_paragraf[i];
        payment_paragraf[i] = "";
        analize_period_paragraf[i] = "";
        payment_in_time_paragraf[i] = "";
        payment_not_in_time_paragraf[i] = "";
        payment_not_in_time_paragraf_court[i] = "";
      }

      total_analize_paragraf = total_analize_paragraf + analize_period_paragraf[i] + court_period_text[i] + payment_paragraf[i] + payment_in_time_paragraf[i] +
      payment_not_in_time_paragraf[i] + payment_not_in_time_paragraf_court[i];
    } //конец цикла for

    //TODO: добавить сложение сумм
    //Формирование абзаца со сложением нескольких неустоек
    //добавление открывающейся скобки и первой выплаты, в случае, если количество выплат больше 1
    let stop_ind_1 = 1;
    let stop_ind_2 = false;
    for (var i = 1; i <= number_of_payments; i++) {
      if (court_summ_before[i] > 0) {
        total_count_string = ' (' + makeRubText_2(court_summ_before[i]);
        if (court_summ_after[i] > 0) {
          total_count_string = total_count_string + ' + ' + makeRubText_2(court_summ_after[i]);
        }
        stop_ind_1 = i + 1;
        break
      } else if (court_summ_after[i] > 0) {
        total_count_string = ' (' + makeRubText_2(court_summ_after[i]);
        stop_ind_1 = i + 1;
        break
      }
    }

    // добавление выплат, в случае, если их было больше 1
    for (var i = stop_ind_1; i <= number_of_payments; i++) {
      if (court_summ_before[i] > 0) {
        total_count_string = total_count_string + ' + ' + makeRubText_2(court_summ_before[i]);
        stop_ind_2 = true;
      }
      if (court_summ_after[i] > 0) {
        total_count_string = total_count_string + ' + ' + makeRubText_2(court_summ_after[i]);
        stop_ind_2 = true;
      }
    }

    //добавление закрывающейся скобки, если количество выплат больше 1
    if (stop_ind_2) {
      total_count_string = total_count_string + ')'
    } else {
      total_count_string = '';
    }

    //Формирование абзаца со сложением нескольких ВЫПЛАЧЕННЫХ неустоек
    //добавление открывающейся скобки и первой выплаты, в случае, если количество выплат больше 1
    stop_ind_1 = 1;
    stop_ind_2 = false;
    for (var i = 1; i <= number_of_payments; i++) {
      if (pay[i] == 4) {
        total_penalty_string = ' (' + makeRubText_2(pay_text[i]);
        stop_ind_1 = i + 1;
        break
      }
    }

    // добавление выплат, в случае, если их было больше 1
    for (var i = stop_ind_1; i <= number_of_payments; i++) {
      if (pay[i] == 4) {
        total_penalty_string = total_penalty_string + ' + ' + makeRubText_2(pay_text[i]);
        stop_ind_2 = true;
      }
    }

    //добавление закрывающейся скобки, если количество выплат больше 1
    if (stop_ind_2) {
      total_penalty_string = total_penalty_string + ')'
    } else {
      total_penalty_string = '';
    }

  } //конец ветки судебного взыскания неустойки

  //Абзац про общий размер начисленной неустойки
  if (total_count > 0) {
    total_count_paragraf = 'Таким образом, общий размер начисленной неустойки составляет ' +
    makeRubText_1(total_count) + total_count_string + '.' + '<br>';
  } else {
    total_count_paragraf = '';
  }

    //Абзац про общий размер выплаченной неустойки
  if (total_penalty > 0) {
    total_penalty_paragraf = 'Таким образом, общий размер неустойки, добровольно выплаченной ' + fo_name + ' составляет ' +
    makeRubText_1(total_penalty) + total_penalty_string + '.' + '<br>';
  } else {
    total_penalty_paragraf = '';
  }

  if ((total_count > total_penalty) && (total_penalty > 0)) {
    summary_paragraf = 'Учитывая вышеизложенное, требование Заявителя о взыскании '+
    'неустойки за несоблюдение срока выплаты страхового возмещения подлежит удовлетворению в размере '+
    makeRubText_1(total_count - total_penalty) + ' (' + makeRubText_1(total_count) + ' - ' + makeRubText_1(total_penalty) + ').' + '<br>';
  } else if (total_count > total_penalty) {
    summary_paragraf = 'Учитывая вышеизложенное, требование Заявителя о взыскании '+
    'неустойки за несоблюдение срока выплаты страхового возмещения подлежит удовлетворению в размере '+
    makeRubText_1(total_count) +'.' + '<br>';
  } else {
    summary_paragraf = 'Учитывая вышеизложенное, требование Заявителя о взыскании '+
    'неустойки за несоблюдение срока выплаты страхового возмещения не подлежит удовлетворению.' + '<br>';
  }

  decision = first_paragraf + standart_motivation + article_191 + holly + total_analize_paragraf + total_count_paragraf + total_penalty_payments_paragraf + total_penalty_paragraf + summary_paragraf;

  total_count = total_count - total_penalty;
    document.querySelector('#total_count').innerHTML = "Общий размер неустойки: " + makeRubText_2(total_count);
    total_count = 0;

    //Формирование Word файла
    // const doc = new docx.Document();
    //   doc.addSection({
    //       properties: {},
    //       children: [
    //           new docx.Paragraph({
    //               children: [
    //                   new docx.TextRun({
    //                       text: decision,
    //                       font: "Times New Roman",
    //                   }),
    //               ],
    //           }),
    //       ],
    //   });
    //
    //   docx.Packer.toBlob(doc).then(blob => {
    //       console.log(blob);
    //       saveAs(blob, "example.docx");
    //       console.log("Document created successfully");
    //   });


    //Удаление всех значений

    for (var i = 1; i <= number_of_payments; i++) {
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
    total_penalty_payments_paragraf = "";
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
   date == Date.parse(new Date(2020, 5, 24, 3)) ||
   date == Date.parse(new Date(2020, 6, 1, 3)) ||
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

//родительный падеж
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


  //Склонение копеек/копейки
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

//склонение дней
function declinationDays (count_days) {
  let m = String(count_days).length;
  m = String(count_days).slice(m - 2, m);

  if (Number(m) >= 11 && Number(m) <= 19) {
    count_days = count_days + " дней";
  } else {
    let m = String(count_days).length - 1;
    m = String(count_days).charAt(m);
    switch (m) {
      case "1":
        count_days = count_days + " день";
        break;
      case "2":
      case "3":
      case "4":
        count_days = count_days + " дня";
        break;
      default:
        count_days = count_days + " дней";
    }
  }
  return count_days;
}

//именительный падеж
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

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
})

function show_decision(){
  if ($('#show_decision').html() == "Показать текст решения") {
    $('#decision').show();
    $('#show_decision').html("Скрыть текст решения");
    document.querySelector('#decision').innerHTML = decision;
    selectText('decision');
  } else {
    $('#decision').hide();
    $('#show_decision').html("Показать текст решения");
  }
}
