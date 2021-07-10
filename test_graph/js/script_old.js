//Импорт функций и переменных

import { off_days, holly_boolen, findLastDay } from './moduls/findLastDay.js';
// import { changeDateType } from './moduls/changeDateType.js';
import { declinationDays } from './moduls/declinationDays.js';
import { formatDate } from './moduls/formatDate.js';
import { makeRubText_nominative } from './moduls/makeRubText_nominative.js';
import { makeRubText_genitive } from './moduls/makeRubText_genitive.js';
import { Payment_voluntary } from './moduls/payment_voluntary.js';

//
// /* Объект для суда
//     * pay_court_name - наименование суда
//     * pay_court_number - № дела в суде
//     * pay_court_date_judgment - дата вынесения решения суда
//     * pay_court_date_effective - дата вступления в силу решения суда
//     * pay_court_date_execution - дата исполнения решения суда
// */
// let payment_court = {
//   pay_court_name,
//   pay_court_number,
//   pay_court_date_judgment,
//   pay_court_date_effective,
//   pay_court_date_execution,
//   payment_court_satisfied_claim,
// }
//
// /* Объект для одного требования, удовлетворенного судом
//     * pay_court_sat_claim_name - наименование требования
//     * pay_court_sat_claim_summ - сумма требования
//     * pay_court_sat_claim_penalty_from - дата начала судебного взыскания неустойки
//     * pay_court_sat_claim_penalty_to - дата окончания судебного взыскания неустойки
//     * pay_court_sat_claim_without_period - булево значение, если судом не установлен период взыскания неустойки
// */
// let payment_court_satisfied_claim = {
//   pay_court_sat_claim_name,
//   pay_court_sat_claim_summ,
//   pay_court_sat_claim_penalty_from,
//   pay_court_sat_claim_penalty_to,
//   pay_court_sat_claim_without_period,
// }

let pay = [];
let pay_date = [];
let pay_text = [];
let payment_order = [];
let pay_count = [];
let pay_summ = [];
let penalty_ndfl = [];
let penalty_ndfl_persent = [];
let penalty_ndfl_summ = [];

let court = [];
let court_number = [];
let court_date = [];
let court_pay_date = [];
let court_in_force_date = [];
let court_claim = [];
let court_claim_summ = [];
let date_court_penalty_from = [];
let date_court_penalty_to = [];
let court_without_period = [];
let str_court_claim = [];
let court_decision_N = [];

let date_court_penalty_day = [];
let date_court_sv_uts_ev_stor = [];
let date_court_sv_uts_ev_stor_last_day = [];
let claim_court_name = [];
let claim_court_name_short = [];
let claim_court_add_motivation = [];
let analize_court_period_paragraf = [];
let analize_court_period_paragraf_help_str;
let analize_period_paragraf_help_str;
let court_set = new Set();
court_set.add(1); //Добавляестя для того, чтобы первое строка не разбивалась на символы
let total_analize_court_period_paragraf = [];

let court_penalty_boolean;

let str_court_collect_test;
let str_court_collect;

let court_penalty_period_paragraph = [];
let court_claim_all = [];
let court_paragraph_main = [];
let court_paragraph_payment = [];

let date_court_from, date_court_to;

let str_payment_dataled;
let str_payment_dataled_header;

let court_period_before = [];
let court_period_after = [];
let court_summ_before = [];
let court_summ_after = [];

let date_sv, date_sv_last_day, date_sv_penalty_day;
let date_uts, date_uts_last_day, date_uts_penalty_day;
let date_ev, date_ev_last_day, date_ev_penalty_day;
let date_stor, date_stor_last_day, date_stor_penalty_day;
// let date_dtp;
// let max_summ;
// let europrotocol;
let total_count = 0;
let total_penalty = 0;
let total_ndfl = 0;
let total_count_paragraf = "";
let total_penalty_payments_paragraf = "";
let total_penalty_paragraf = "";
let total_courts_paragraph = "";
let total_count_string = "";
let total_penalty_string = "";
let date_sv_uts_ev_stor = [];
let date_sv_uts_ev_stor_last_day = [];
let date_penalty_day = [];

let days_string = [];
let rub_string_payment = [];
let rub_string_penalty = [];
let kop_string = [];

let standart_motivation, first_paragraf, ndfl_motivation = "", ndfl_motivation_on, summary_paragraf = "";
let max_summ_paragraf = "";
let analize_period_paragraf = [], payment_paragraf = [];
let payment_in_time_paragraf = [];
let payment_not_in_time_paragraf = [];
let payment_not_in_time_paragraf_court = [];
let total_analize_paragraf = "";
let court_period_text = [];
let court_without_period_text = [];
let claim_name = []; //название требований "с заявлением о наступлении страхового случая"/"УТС"/"эвакуатор"/"хранение"
let claim_name_short = [];
let claim_name_payment = [];
let claim_add_motivation = []; //дополнительный абзац для УТС, эвакуации, хранение
// let article_191 = 'Статьей 191 ГК РФ установлено, что течение срока, определённого периодом времени, '+
// 'начинается на следующий день после календарной даты или наступления события, '+
// 'которыми определено его начало.'+'<br>';
//
// standart_motivation = 'Согласно статье 12 ГК РФ '+
// 'взыскание неустойки является одним из способов защиты нарушенного гражданского права.'+'<br>'+
// 'По смыслу статьи 330 ГК РФ неустойкой (штрафом, пеней) признается определенная '+
// 'законом или договором денежная сумма, которую должник обязан уплатить кредитору '+
// 'в случае неисполнения или ненадлежащего исполнения обязательства, в частности '+
// 'в случае просрочки исполнения. По требованию об уплате неустойки кредитор не обязан '+
// 'доказывать причинение ему убытков.'+'<br>'+
// 'Пунктом 21 статьи 12 Закона № 40-ФЗ установлено, что в течение 20 календарных дней, '+
// 'за исключением нерабочих праздничных дней, а в случае, предусмотренном пунктом 15.3 '+
// 'статьи 12 Закона № 40-ФЗ, 30 календарных дней, за исключением нерабочих праздничных дней, '+
// 'со дня принятия к рассмотрению заявления потерпевшего о страховом возмещении или прямом '+
// 'возмещении убытков и приложенных к нему документов, предусмотренных Правилами ОСАГО, '+
// 'страховщик обязан произвести страховую выплату потерпевшему или после осмотра и (или) '+
// 'независимой технической экспертизы поврежденного транспортного средства выдать '+
// 'потерпевшему направление на ремонт транспортного средства с указанием станции '+
// 'технического обслуживания, на которой будет отремонтировано его транспортное '+
// 'средство и которой страховщик оплатит восстановительный ремонт поврежденного '+
// 'транспортного средства, и срока ремонта либо направить потерпевшему мотивированный '+
// 'отказ в страховом возмещении.'+'<br>'+
// 'При несоблюдении срока осуществления страховой выплаты или срока выдачи потерпевшему '+
// 'направления на ремонт транспортного средства страховщик за каждый день просрочки '+
// 'уплачивает потерпевшему неустойку (пеню) в размере одного процента от определенного '+
// 'в соответствии с Законом № 40-ФЗ размера страхового возмещения по виду причиненного '+
// 'вреда каждому потерпевшему.'+'<br>'+
// 'В пункте 78 постановления Пленума Верховного Суда Российской Федерации от 26.12.2017 '+
// '№ 58 «О применении судами законодательства об обязательном страховании гражданской '+
// 'ответственности владельцев транспортных средств» указано, что неустойка исчисляется '+
// 'со дня, следующего за днем, установленным для принятия решения о выплате страхового '+
// 'возмещения, то есть с 21-го дня после получения страховщиком заявления потерпевшего '+
// 'о страховой выплате и документов, предусмотренных Правилами ОСАГО, и до дня '+
// 'фактического исполнения страховщиком обязательства по договору включительно.'+'<br>';
//
// ndfl_motivation_on = 'Пунктом 1 статьи 210 Налогового кодекса Российской Федерации (далее – НК РФ) '+
// 'установлено, что при определении налоговой базы учитываются все доходы налогоплательщика, '+
// 'полученные им как в денежной, так и в натуральной формах или право на распоряжение которыми '+
// 'у него возникло, а также доходы в виде материальной выгоды.'+'<br>'+
// 'Согласно статье 41 НК РФ доходом признается экономическая выгода в денежной или натуральной '+
// 'форме, учитываемая в случае возможности ее оценки и в той мере, в которой такую выгоду можно '+
// 'оценить, и определяемая в соответствии с главой 23 НК РФ.'+'<br>'+
// 'В соответствии с подпунктом 10 пункта 1 статьи 208 НК РФ налогообложению подлежат иные доходы, '+
// 'получаемые налогоплательщиком в результате осуществления им деятельности в Российской Федерации.'+'<br>'+
// 'Сумма выплачиваемых штрафов, пени, неустоек не является компенсацией реального физического или '+
// 'морального вреда физического лица и не входит в перечень выплат, освобожденных от налогообложения '+
// 'на основании статьи 217 НК РФ.'+'<br>'+
// 'Указанная выше позиция содержится в Письме Минфина России от 28.10.2015 № 03-04-07/62079, а также '+
// 'в «Обзоре практики рассмотрения судами дел, связанных с применением главы 23 Налогового кодекса '+
// 'Российской Федерации» (утв. Президиумом Верховного Суда РФ 21.10.2015) (далее – Обзор практики).'+'<br>'+
// 'В частности, пункте 7 Обзора практики указано, что предусмотренные законодательством о защите прав '+
// 'потребителей санкции носят исключительно штрафной характер. Их взыскание не преследует цель компенсации '+
// 'потерь (реального ущерба) потребителя. Поскольку выплата сумм таких санкций приводит к образованию '+
// 'имущественной выгоды у потребителя, они включаются в доход гражданина на основании положений '+
// 'статей 41, 209 НК РФ вне зависимости от того, что получение данных сумм обусловлено нарушением '+
// 'прав физического лица.'+'<br>'+
// 'В связи с этим, сумма неустойки, выплаченная Страховщиком потерпевшему в случае нарушения '+
// 'предусмотренного договором ОСАГО срока выплаты страхового возмещения в соответствии '+
// 'с пунктом 21 статьи 12 Закона № 40-ФЗ, отвечает вышеуказанным признакам экономической '+
// 'выгоды и являются его доходом, подлежащим обложению налогом на доходы физических лиц.'+'<br>'+
// 'Пунктом 1 статьи 226 НК РФ установлено, что российские организации, от которых или '+
// 'в результате отношений с которыми налогоплательщик получил доходы, подлежащие налогообложению, '+
// 'обязаны исчислить, удержать у налогоплательщика и уплатить сумму налога на доходы физических лиц, '+
// 'исчисленную в соответствии со статьей 224 НК РФ с учетом особенностей, предусмотренных статьей 226 НК РФ.'+'<br>'+
// 'Указанные организации признаются налоговыми агентами и обязаны исполнять обязанности, '+
// 'предусмотренные для налоговых агентов, в частности, статьей 226 НК РФ.'+'<br>'+
// 'В соответствии с пунктом 4 статьи 226 НК РФ налоговые агенты обязаны удержать начисленную '+
// 'сумму налога непосредственно из доходов налогоплательщика при их фактической выплате.'+'<br>';

//Основная функция для анализа введенных значений и собирания текста решения
document.getElementById('btn_desicion').onclick = function(){

  // if (holly_boolen) {
  //   holly = 'В соответствии со статьей 193 ГК РФ если последний день срока ' +
  //   'приходится на нерабочий день, днем окончания срока считается ближайший следующий за ним рабочий день.' + '<br>';
  // } else {
  //   holly = '';
  // }
  // decision = "";
  total_courts_paragraph = "";
  // court_penalty_boolean = false;
  // total_count = 0;
  // total_penalty = 0;
  // total_ndfl = 0;
  // pay_summ_y_all = 0;
  // max_days_delay = 0;
  // court_set.clear();

  //Получение массива значений всех переменных добровольных выплат
  // var number_of_payments = $('div.payments').length; //Получение количества строк с выплатами
  // var payments_names = $('.payments_names'); //Получение массива видов выплат
  // var payments_dates = $('.payments_dates'); //Получение массива дат выплат
  // var payments_summs = $('.payments_summs'); //Получение массива сумм выплат
  // var penalty_ndfls = $('.penalty_ndfls'); //Получение массива выплат неустойки с НДФЛ
  // var penalty_ndfl_summs = $('.penalty_ndfl_summs'); //Получение массива сумм удержанного НДФЛ
  // var penalty_ndfl_persents = $('.penalty_ndfl_persents'); //Получение массива процентов НДФЛ
  //
  // //Получение массива значений всех переменных выплат по решению суда
  // var number_of_courts = $('div.courts').length; //Получение количества строк с судами
  // var court_names = $('.court_names'); //Получение массива наименвоаний судов
  // var court_numbers = $('.court_numbers'); //Получение массива нмоеров дел
  // var court_dates = $('.court_dates'); //Получение массива дат решений
  // var court_pay_dates = $('.court_pay_dates'); //Получение массива дат исполнений решений
  // var court_in_force_dates = $('.court_in_force_dates'); //Получение массива дат вступления в силу решений
  // let number_of_claims = []; //Массив для количества удовлетворенных требвоаний для каждого решения
  // let court_claims = []; //Массив для требований
  // let court_claim_summs = []; //Массив для вызсканных сумм
  // let date_court_penalty_froms = []; //Массив для дат начала периода судебных неустоек
  // let date_court_penalty_tos = []; //Массив для дат конца периода судебных неустоек
  // let court_without_periods = []; //Массив для неустоек без периода
  // for (var i = 1; i <= number_of_courts; i++) {
  //   number_of_claims[i - 1] = $('.court_claim_' + i).length; //Получение количества удовлетворенных требований для каждого решения
  //   court_claims[i - 1] = $('.court_claim_' + i); //Получение массива требований
  //   court_claim_summs[i - 1] = $('.court_claim_summ_' + i); //Получение массива дат решений
  //   date_court_penalty_froms[i - 1] = $('.date_court_penalty_from_' + i); //Получение массива дат начала периода судебных неустоек
  //   date_court_penalty_tos[i - 1] = $('.date_court_penalty_to_' + i); //Получение массива дат конца периода судебных неустоек
  //   court_without_periods[i - 1] = $('.court_without_period_' + i); //Получение массива неустоек без периода
  // }

  // //Удаление всплывающей подсказки 193 ГК РФ
  // document.querySelector('#date_sv_last_day').removeAttribute('tooltip');
  // document.querySelector('#date_uts_last_day').removeAttribute('tooltip');
  // document.querySelector('#date_ev_last_day').removeAttribute('tooltip');
  // document.querySelector('#date_stor_last_day').removeAttribute('tooltip');

  // //стирание значений дат
  // document.querySelector('#date_sv_last_day').innerHTML = "";
  // document.querySelector('#date_sv_penalty_day').innerHTML = "";
  // document.querySelector('#date_uts_last_day').innerHTML = "";
  // document.querySelector('#date_uts_penalty_day').innerHTML = "";
  // document.querySelector('#date_ev_last_day').innerHTML = "";
  // document.querySelector('#date_ev_penalty_day').innerHTML = "";
  // document.querySelector('#date_stor_last_day').innerHTML = "";
  // document.querySelector('#date_stor_penalty_day').innerHTML = "";

  //Удаление значений в таблице результатов
  // for (var i = 1; i <= number_of_payments; i++) {
  //   $('#str_payment_dataled').empty();
  //   $('#str_payment_dataled_header').empty();
  //   court_period_text[i] = "";
  // }

  // //Перекрашивание 21го дня в серый цвет
  // document.querySelector('#date_sv_last_day').style.color = '#595b5e';
  // document.querySelector('#date_uts_last_day').style.color = '#595b5e';
  // document.querySelector('#date_ev_last_day').style.color = '#595b5e';
  // document.querySelector('#date_stor_last_day').style.color = '#595b5e';

  //Получение значения наименования ФО
  // fo_name = document.querySelector("#fo_name").value;

  //Если поле Финансовая организация не заполнено, то в текст решения
  //добавляется термин "Финансовая организация" в соответствующем падеже
  // if (fo_name != "") {
  //   fo_name = document.querySelector("#fo_name").value;
  //   fo_name_nominative = fo_name;
  //   fo_name_genitive = fo_name;
  //   fo_name_accusative = fo_name;
  //   fo_name_instrumental = fo_name;
  //   make_a_payment = " осуществило";
  //   fulfill = " исполнило";
  //   keep = " удержало";
  // } else {
  //   fo_name_nominative = "Финансовая организация";
  //   fo_name_genitive = "Финансовой организации";
  //   fo_name_accusative = "Финансовую организацию";
  //   fo_name_instrumental = "Финансовой организацией";
  //   make_a_payment = " осуществила";
  //   fulfill = " исполнила";
  //   keep = " удержала";
  // }

  //Присваивание значения первому параграфу
  // first_paragraf = 'Рассмотрев требования Заявителя о взыскании с ' + fo_name_genitive + ' неустойки '+
  // 'за несоблюдение срока выплаты страхового возмещения по договору ОСАГО, '+
  // 'Финансовый уполномоченный приходит к следующему.'+'<br>'

  //Расчет страховой суммы
  europrotocol = document.querySelector('#europrotocol').checked;
  date_dtp = document.querySelector('#date_dtp').value;
  date_dtp = changeDateType(date_dtp);
  date_dtp = Date.parse(date_dtp + 'T00:00:00');

  if (date_dtp >= date_euro_start && europrotocol) { // Если дата ДТП после 01.06.2018 И Европротокол
    max_summ = 100000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 100 000₽";
  } else if (date_dtp >= date_euro_start && !europrotocol){ // Если дата ДТП после 01.06.2018 И НЕ Европротокол
    max_summ = 400000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 400 000₽";
  } else if (date_dtp < date_euro_start && europrotocol) { // Если дата ДТП до 01.06.2018 И Европротокол
    max_summ = 50000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 50 000₽";
  } else if (date_dtp < date_euro_start && !europrotocol) { // Если дата ДТП до 01.06.2018 И НЕ Европротокол
    max_summ = 400000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 400 000₽";
  } else if (europrotocol) { //Если Европротокол (без указания даты)
    max_summ = 100000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 100 000₽";
  } else { // остальные случаи
    max_summ = 400000;
    document.querySelector('#max_summ').innerHTML = "Страховая сумма: 400 000₽";
  }

  // //Получение значений даты обращений с требованиями и исчисление 20го дня
  // date_sv = document.querySelector('#app_date_1').value;
  // date_sv = changeDateType(date_sv);
  // date_sv = Date.parse(date_sv + 'T00:00:00');
  // date_sv_last_day = findLastDay(date_sv);
  // if (holly_boolen) {
  //   document.querySelector('#date_sv_last_day').style.color = '#b00000';
  //   document.querySelector('#date_sv_last_day').setAttribute('tooltip', '193 ГК РФ');
  // }
  // date_sv_penalty_day = date_sv_last_day + day;
  //
  // date_uts = document.querySelector('#app_date_2').value;
  // date_uts = changeDateType(date_uts);
  // date_uts = Date.parse(date_uts + 'T00:00:00');
  // date_uts_last_day = findLastDay(date_uts);
  // if (holly_boolen) {
  //   document.querySelector('#date_uts_last_day').style.color = '#b00000';
  //   document.querySelector('#date_uts_last_day').setAttribute('tooltip', '193 ГК РФ');
  // }
  // date_uts_penalty_day = date_uts_last_day + day;
  //
  // date_ev = document.querySelector('#app_date_3').value;
  // date_ev = changeDateType(date_ev);
  // date_ev = Date.parse(date_ev + 'T00:00:00');
  // date_ev_last_day = findLastDay(date_ev);
  // if (holly_boolen) {
  //   document.querySelector('#date_ev_last_day').style.color = '#b00000';
  //   document.querySelector('#date_ev_last_day').setAttribute('tooltip', '193 ГК РФ');
  // }
  // date_ev_penalty_day = date_ev_last_day + day;
  //
  // date_stor = document.querySelector('#app_date_4').value;
  // date_stor = changeDateType(date_stor);
  // date_stor = Date.parse(date_stor + 'T00:00:00');
  // date_stor_last_day = findLastDay(date_stor);
  // if (holly_boolen) {
  //   document.querySelector('#date_stor_last_day').style.color = '#b00000';
  //   document.querySelector('#date_stor_last_day').setAttribute('tooltip', '193 ГК РФ');
  // }
  // date_stor_penalty_day = date_stor_last_day + day;

  //выведение значений 20го и 21го дня на экран
  // if (!isNaN(date_sv_last_day)) {
  //   document.querySelector('#date_sv_last_day').innerHTML = formatDate(new Date(date_sv_last_day));
  //   document.querySelector('#date_sv_penalty_day').innerHTML = formatDate(new Date(date_sv_penalty_day));
  // }
  // if (!isNaN(date_uts_last_day)) {
  //   document.querySelector('#date_uts_last_day').innerHTML = formatDate(new Date(date_uts_last_day));
  //   document.querySelector('#date_uts_penalty_day').innerHTML = formatDate(new Date(date_uts_penalty_day));
  // }
  // if (!isNaN(date_ev_last_day)) {
  //   document.querySelector('#date_ev_last_day').innerHTML = formatDate(new Date(date_ev_last_day));
  //   document.querySelector('#date_ev_penalty_day').innerHTML = formatDate(new Date(date_ev_penalty_day));
  // }
  // if (!isNaN(date_stor_last_day)) {
  //   document.querySelector('#date_stor_last_day').innerHTML = formatDate(new Date(date_stor_last_day));
  //   document.querySelector('#date_stor_penalty_day').innerHTML = formatDate(new Date(date_stor_penalty_day));
  // }

  //Цикл для присваивание общих значений добровольных выплат
  for (var i = 1; i <= number_of_payments; i++) {
    payment_not_in_time_paragraf_court[i] = "";
    analize_period_paragraf[i] = "";
    payment_paragraf[i] = "";

    //Получение значений из полей index
    pay[i] = payments_names[i - 1].options.selectedIndex; //получение значения наименования выплаты
    pay_date[i] = payments_dates[i - 1].value; // получение значения даты выплаты
    pay_text[i] = payments_summs[i - 1].value; // получение значения суммы выплаты
    penalty_ndfl[i] = penalty_ndfls[i - 1]; // получение значения "удержан НДФЛ (checkbox)"
    penalty_ndfl_summ[i] = penalty_ndfl_summs[i - 1].value; // получение значения "удержан НДФЛ (сумма)"

    // //редактирвоание значений даты выплаты
    // pay_date[i] = changeDateType(pay_date[i]);
    // pay_date[i] = Date.parse(pay_date[i] + 'T00:00:00');
    // //редактирвоание значений суммы выплаты
    // pay_text[i] = pay_text[i].replace(/\s+/g, '');
    // pay_text[i] = Number(pay_text[i]);
    // //редактирование значения суммы НДФЛ
    // penalty_ndfl_summ[i] = penalty_ndfl_summ[i].replace(/\s+/g, '');
    // penalty_ndfl_summ[i] = Number(penalty_ndfl_summ[i]);

    //Присваивание переменных для абзаца с анализом сроков 21го дня
    // switch (payment_voluntary[i].pay_vol_type) {
    //   case 0: //Страховое возмещение
    //     date_penalty_day[i] = date_sv_penalty_day;
    //     date_sv_uts_ev_stor[i] = date_sv;
    //     date_sv_uts_ev_stor_last_day[i] = date_sv_last_day;
    //     claim_name[i] = ' с заявлением о выплате страхового возмещения ';
    //     claim_name_short[i] = ' страхового возмещения ';
    //     claim_add_motivation[i] = '';
    //     break;
    //   case 1: //УТС
    //     date_penalty_day[i] = date_uts_penalty_day;
    //     date_sv_uts_ev_stor[i] = date_uts;
    //     date_sv_uts_ev_stor_last_day[i] = date_uts_last_day;
    //     claim_name[i] = ' с заявлением о выплате УТС ';
    //     claim_name_short[i] = ' УТС ';
    //     claim_add_motivation[i] = 'Согласно пункту 20 Постановление Пленума № ' +
    //     '58 при наступлении страхового случая потерпевший обязан не только уведомить ' +
    //     'страховщика о его наступлении в сроки, установленные Правилами ОСАГО, ' +
    //     'но и направить страховщику заявление о страховом возмещении и документы, ' +
    //     'предусмотренные Правилами ОСАГО. В заявлении о страховом возмещении потерпевший ' +
    //     'должен также сообщить о другом известном ему на момент подачи заявления ущербе, ' +
    //     'кроме расходов на восстановление поврежденного имущества, который подлежит ' +
    //     'возмещению  (например, об утрате товарной стоимости, о расходах на эвакуацию ' +
    //     'транспортного средства с места дорожно-транспортного происшествия и т.п.).<br>' +
    //     'Согласно пункту 37 Постановление Пленума № 58 к реальному ущербу, возникшему ' +
    //     'в результате дорожно-транспортного происшествия, наряду со стоимостью ремонта ' +
    //     'и запасных частей относится также утрата товарной стоимости, которая представляет ' +
    //     'собой уменьшение стоимости транспортного средства, вызванное преждевременным ' +
    //     'ухудшением товарного (внешнего) вида транспортного средства и его эксплуатационных ' +
    //     'качеств в результате снижения прочности и долговечности отдельных деталей, узлов ' +
    //     'и агрегатов, соединений и защитных покрытий вследствие дорожно-транспортного ' +
    //     'происшествия и последующего ремонта.<br>';
    //     break;
    //   case 2: //Эвакуация
    //     date_penalty_day[i] = date_ev_penalty_day;
    //     date_sv_uts_ev_stor[i] = date_ev;
    //     date_sv_uts_ev_stor_last_day[i] = date_ev_last_day;
    //     claim_name[i] = ' с заявлением о выплате расходов на эвакуацию Транспортного средства ';
    //     claim_name_short[i] = ' расходов на эвакуацию Транспортного средства ';
    //     claim_add_motivation[i] = 'Согласно абзацу 2 пункта 4.12 Правил ОСАГО, '+
    //     'при причинении вреда имуществу потерпевшего возмещению в пределах страховой '+
    //     'суммы подлежат иные расходы, произведенные потерпевшим в связи с причиненным '+
    //     'вредом (в том числе эвакуация транспортного средства с места дорожно-транспортного '+
    //     'происшествия, хранение поврежденного транспортного средства, доставка пострадавших '+
    //     'в медицинскую организацию).'+ '<br>'+'Учитывая изложенное, Финансовый уполномоченный '+
    //     'приходит к выводу о том, что расходы на эвакуацию Транспортного средства относятся '+
    //     'к страховому возмещению, в силу чего неустойка за несоблюдение сроков выплаты страхового '+
    //     'возмещения подлежит начислению на сумму расходов на эвакуацию Транспортного средства.'+ '<br>';
    //     break;
    //   case 3: // Хранение
    //     date_penalty_day[i] = date_stor_penalty_day;
    //     date_sv_uts_ev_stor[i] = date_stor;
    //     date_sv_uts_ev_stor_last_day[i] = date_stor_last_day;
    //     claim_name[i] = ' с заявлением о выплате расходов на хранение Транспортного средства ';
    //     claim_name_short[i] = ' расходов на хранение Транспортного средства ';
    //     claim_add_motivation[i] = 'Согласно абзацу 2 пункта 4.12 Правил ОСАГО, '+
    //     'при причинении вреда имуществу потерпевшего возмещению в пределах страховой '+
    //     'суммы подлежат иные расходы, произведенные потерпевшим в связи с причиненным '+
    //     'вредом (в том числе эвакуация транспортного средства с места дорожно-транспортного '+
    //     'происшествия, хранение поврежденного транспортного средства, доставка пострадавших '+
    //     'в медицинскую организацию).'+ '<br>'+'Учитывая изложенное, Финансовый уполномоченный '+
    //     'приходит к выводу о том, что расходы на хранение Транспортного средства относятся '+
    //     'к страховому возмещению, в силу чего неустойка за несоблюдение сроков выплаты страхового '+
    //     'возмещения подлежит начислению на сумму расходов на хранение Транспортного средства.'+ '<br>';
    //     break;
    //   case 4:
    //     claim_name_short[i] = ' неустойки за несоблюдение сроков выплаты страхового возмещения по договору ОСАГО ';
    //     break;
    // } // завершение switch
    //
    // //"Собираем" абзац про анализ сроков 20 и 21 дней
    // analize_period_paragraf_help_str = claim_add_motivation[i] + 'Заявитель обратился в ' + fo_name_accusative + claim_name[i] +
    // formatDate(new Date(date_sv_uts_ev_stor[i])) + ', следовательно, последним днем срока осуществления '+
    // 'выплаты' + claim_name_short[i] + 'является ' + formatDate(new Date(date_sv_uts_ev_stor_last_day[i])) + ', а неустойка подлежит начислению с '+
    // formatDate(new Date(date_penalty_day[i])) +'.<br>'
    //
    // if (!court_set.has(analize_period_paragraf_help_str)) {
    //   court_set.add(analize_period_paragraf_help_str);
    //   analize_period_paragraf[i] = analize_period_paragraf_help_str;
    // } else {
    //   analize_period_paragraf[i] = "";
    // }
    //
    // //"Собираем" абзац про выплату
    // payment_paragraf[i] = formatDate(new Date(pay_date[i])) + ' ' + fo_name_nominative + make_a_payment + ' выплату' + claim_name_short[i] + 'в размере '+
    // makeRubText_genitive(payment_voluntary[i].pay_vol_summ) +
    // // ', что подтверждается платежным поручением от ' + formatDate(new Date(pay_date[i])) + ' № ' + payment_order[i] +
    // '.<br>'

    //Если при выплате неустойки был удержан НДФЛ
    if (payment_voluntary[i].pay_vol_type == 4 && payment_voluntary[i].pay_vol_with_ndfl.checked) {
      payment_paragraf[i] = formatDate(new Date(payment_voluntary[i].pay_vol_date) + ' ' + fo_name_nominative + make_a_payment + ' выплату' + claim_name_short[i] + 'исходя из суммы '+
      makeRubText_genitive(payment_voluntary[i].pay_vol_summ + payment_voluntary[i].pay_vol_ndfl_summ) + ' (с учетом удержания 13% НДФЛ), в связи с чем Заявителю было перечислено ' +
      makeRubText_genitive(payment_voluntary[i].pay_vol_summ) + '.<br>' +
      formatDate(new Date(payment_voluntary[i].pay_vol_date) + ' ' + fo_name_nominative + fulfill + ' свою обязанность как налогового агента по перечислению налога на доход физического лица (НДФЛ) в размере ' +
      makeRubText_genitive(payment_voluntary[i].pay_vol_ndfl_summ) + '.<br>';
      payment_voluntary[i].pay_vol_summ = payment_voluntary[i].pay_vol_summ + payment_voluntary[i].pay_vol_ndfl_summ;
      total_ndfl = total_ndfl + payment_voluntary[i].pay_vol_ndfl_summ;
      payment_voluntary[i].pay_vol_ndfl_percent = Math.round(payment_voluntary[i].pay_vol_ndfl_summ * 100 / payment_voluntary[i].pay_vol_summ);
      penalty_ndfl_persents[i - 1].innerHTML = payment_voluntary[i].pay_vol_ndfl_percent + " %";
    }
    //
    // //Удаление абзаца с анализом сроков 20 и 21 дней в случае его повторения
    // for (var j = 1; j < i; j++) {
    //   if ((!isNaN(pay_date[i]) && pay[i] == pay[j])) {
    //       analize_period_paragraf[i] = "";
    //   }
    // }

  } // завершение цикла для присваивание общих значений добровольных выплат








  //Цикл для присваивание общих значений выплат по решению суда
  for (var i = 1; i <= number_of_courts; i++) {

    total_analize_court_period_paragraf[i] = "";
    court_paragraph_main[i] = "";
    court_paragraph_payment[i] = "";
    court_without_period_text[i] = "";
    court_decision_N[i] = "";

    if (number_of_courts > 1) {
      court_decision_N[i] = " № " + i;
    }

    court[i] = court_names[i - 1].value; //получение значения наименования суда
    court_number[i] = court_numbers[i - 1].value; // получение значения номера дела
    court_date[i] = court_dates[i - 1].value; // получение значения даты решения суда
    court_pay_date[i] = court_pay_dates[i - 1].value; // получение значения даты исполнения решения
    court_in_force_date[i] = court_in_force_dates[i - 1].value; // получение значения даты вступления в силу решения
    court_claim[i] = [];
    court_claim_summ[i] = [];
    date_court_penalty_from[i] = [];
    date_court_penalty_to[i] = [];
    court_without_period[i] = [];
    court_penalty_period_paragraph[i] = [];
    str_court_claim[i] = [];

    date_court_penalty_day[i] = [];
    date_court_sv_uts_ev_stor[i] = [];
    date_court_sv_uts_ev_stor_last_day[i] = [];
    claim_court_name[i] = [];
    claim_court_name_short[i] = [];
    claim_court_add_motivation[i] = [];
    analize_court_period_paragraf[i] = [];

    //редактирование значений даты решения суда
    court_date[i] = changeDateType(court_date[i]);
    court_date[i] = Date.parse(court_date[i] + 'T00:00:00');
    //редактирование значений даты исполнения решения
    court_pay_date[i] = changeDateType(court_pay_date[i]);
    court_pay_date[i] = Date.parse(court_pay_date[i] + 'T00:00:00');
    //редактирование значений даты вступления в силу решения
    court_in_force_date[i] = changeDateType(court_in_force_date[i]);
    court_in_force_date[i] = Date.parse(court_in_force_date[i] + 'T00:00:00');

    //Присваивание значений форм переменным
    for (var j = 1; j <= number_of_claims[i - 1]; j++) {

      court_claim[i][j] = court_claims[i - 1][j - 1].options.selectedIndex; // получение значения требования
      court_claim_summ[i][j] = court_claim_summs[i - 1][j - 1].value; // получение значения взысканных сумм
      date_court_penalty_from[i][j] = date_court_penalty_froms[i - 1][j - 1].value; // получение значения даты начала периода судебных неустоек
      date_court_penalty_to[i][j] = date_court_penalty_tos[i - 1][j - 1].value; // получение значения даты конца периода судебных неустоек
      court_without_period[i][j] = court_without_periods[i - 1][j - 1].checked; // получение значения неустоек без периода

      //редактирование значений взысканных сумм
      court_claim_summ[i][j] = court_claim_summ[i][j].replace(/\s+/g, '');
      court_claim_summ[i][j] = Number(court_claim_summ[i][j]);
      //редактирование значений даты начала периода судебных неустоек
      date_court_penalty_from[i][j] = changeDateType(date_court_penalty_from[i][j]);
      date_court_penalty_from[i][j] = Date.parse(date_court_penalty_from[i][j] + 'T00:00:00');
      //редактирование значений даты начала периода судебных неустоек
      date_court_penalty_to[i][j] = changeDateType(date_court_penalty_to[i][j]);
      date_court_penalty_to[i][j] = Date.parse(date_court_penalty_to[i][j] + 'T00:00:00');

    }

    //Собирание абзаца со всеми требованиями, взысканными судом
    for (var j = 1; j <= number_of_claims[i - 1]; j++) {

      court_penalty_period_paragraph[i][j] = "";
      analize_court_period_paragraf[i][j] = "";

      switch (court_claim[i][j]) {
        case 0: //Страховое возмещение
          str_court_claim[i][j] = "страховое возмещение по Договору ОСАГО";
          str_court_collect_test = "взыскано ";
          date_court_penalty_day[i][j] = date_sv_penalty_day;
          date_court_sv_uts_ev_stor[i][j] = date_sv;
          date_court_sv_uts_ev_stor_last_day[i][j] = date_sv_last_day;
          claim_court_name[i][j] = ' с заявлением о выплате страхового возмещения ';
          claim_court_name_short[i][j] = ' страхового возмещения ';
          claim_court_add_motivation[i][j] = '';
          break;
        case 1: //УТС
          str_court_claim[i][j] = "страховое возмещение по Договору ОСАГО в части УТС";
          str_court_collect_test = "взыскано ";
          date_court_penalty_day[i][j] = date_uts_penalty_day;
          date_court_sv_uts_ev_stor[i][j] = date_uts;
          date_court_sv_uts_ev_stor_last_day[i][j] = date_uts_last_day;
          claim_court_name[i][j] = ' с заявлением о выплате УТС ';
          claim_court_name_short[i][j] = ' УТС ';
          claim_court_add_motivation[i][j] = 'Согласно пункту 20 Постановление Пленума № ' +
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
        case 2: //Эвакуатор
          str_court_claim[i][j] = "расходы на эвакуацию Транспортного средства";
          str_court_collect_test = "взысканы ";
          date_court_penalty_day[i][j] = date_ev_penalty_day;
          date_court_sv_uts_ev_stor[i][j] = date_ev;
          date_court_sv_uts_ev_stor_last_day[i][j] = date_ev_last_day;
          claim_court_name[i][j] = ' с заявлением о выплате расходов на эвакуацию Транспортного средства ';
          claim_court_name_short[i][j] = ' расходов на эвакуацию Транспортного средства ';
          claim_court_add_motivation[i][j] = 'Согласно абзацу 2 пункта 4.12 Правил ОСАГО, '+
          'при причинении вреда имуществу потерпевшего возмещению в пределах страховой '+
          'суммы подлежат иные расходы, произведенные потерпевшим в связи с причиненным '+
          'вредом (в том числе эвакуация транспортного средства с места дорожно-транспортного '+
          'происшествия, хранение поврежденного транспортного средства, доставка пострадавших '+
          'в медицинскую организацию).'+ '<br>'+'Учитывая изложенное, Финансовый уполномоченный '+
          'приходит к выводу о том, что расходы на эвакуацию Транспортного средства относятся '+
          'к страховому возмещению, в силу чего неустойка за несоблюдение сроков выплаты страхового '+
          'возмещения подлежит начислению на сумму расходов на эвакуацию Транспортного средства.'+ '<br>';
          break;
        case 3: //Хранение
          str_court_claim[i][j] = "расходы на хранение Транспортного средства";
          str_court_collect_test = "взысканы ";
          date_court_penalty_day[i][j] = date_stor_penalty_day;
          date_court_sv_uts_ev_stor[i][j] = date_stor;
          date_court_sv_uts_ev_stor_last_day[i][j] = date_stor_last_day;
          claim_court_name[i][j] = ' с заявлением о выплате расходов на хранение Транспортного средства ';
          claim_court_name_short[i][j] = ' расходов на хранение Транспортного средства ';
          claim_court_add_motivation[i][j] = 'Согласно абзацу 2 пункта 4.12 Правил ОСАГО, '+
          'при причинении вреда имуществу потерпевшего возмещению в пределах страховой '+
          'суммы подлежат иные расходы, произведенные потерпевшим в связи с причиненным '+
          'вредом (в том числе эвакуация транспортного средства с места дорожно-транспортного '+
          'происшествия, хранение поврежденного транспортного средства, доставка пострадавших '+
          'в медицинскую организацию).'+ '<br>'+'Учитывая изложенное, Финансовый уполномоченный '+
          'приходит к выводу о том, что расходы на хранение Транспортного средства относятся '+
          'к страховому возмещению, в силу чего неустойка за несоблюдение сроков выплаты страхового '+
          'возмещения подлежит начислению на сумму расходов на хранение Транспортного средства.'+ '<br>';
          break;
        case 4: //Неустойка
          str_court_claim[i][j] = "неустойка за несоблюдение сроков выплаты страхового возмещения по Договору ОСАГО";
          str_court_collect_test = "взыскана ";
          if (court_without_period[i][j]) {
            court_penalty_period_paragraph[i][j] = "";
            court_without_period_text[i] = "Заявителем и Финансовой организацией не предоставлены сведения, " +
            "содержащие данные о периоде, за который взыскана неустойка по Решению суда" + court_decision_N[i] + ", в связи с чем, " +
            "Финансовый уполномоченный приходит к выводу о наличии оснований для взыскания неустойки за " +
            "несоблюдение срока выплаты страхового возмещения по Договору ОСАГО за период со дня, следующего " +
            "за днем вынесения Решения суда" + court_decision_N[i] + ", по дату исполнения Финансовой организацией обязательства." + "<br>";
          } else {
            court_penalty_period_paragraph[i][j] = " за период с " + formatDate(new Date(date_court_penalty_from[i][j])) +
            " по " + formatDate(new Date(date_court_penalty_to[i][j]));
          }
          court_penalty_boolean = true;
          break;
        case 5: //Экспертиза
          str_court_claim[i][j] = "расходы на экспертизу";
          str_court_collect_test = "взысканы ";
          break;
        case 6: //Юрист
          str_court_claim[i][j] = "юридические расходы";
          str_court_collect_test = "взысканы ";
          break;
        case 7: //Нотариус
          str_court_claim[i][j] = "расходы на нотариальные услуги";
          str_court_collect_test = "взысканы ";
          break;
        case 8: //Почта
          str_court_claim[i][j] = "почтовые расходы";
          str_court_collect_test = "взысканы ";
          break;
      }

      //"Собираем" абзац про анализ сроков 20 и 21 дней
      if (court_claim[i][j] == 0 || court_claim[i][j] == 1 || court_claim[i][j] == 2 || court_claim[i][j] == 3) {

        analize_court_period_paragraf_help_str = claim_court_add_motivation[i][j] + 'Заявитель обратился в ' + fo_name_accusative + claim_court_name[i][j] +
        formatDate(new Date(date_court_sv_uts_ev_stor[i][j])) + ', следовательно, последним днем срока осуществления ' +
        'выплаты' + claim_court_name_short[i][j] + 'является ' + formatDate(new Date(date_court_sv_uts_ev_stor_last_day[i][j])) + ', а неустойка подлежит начислению с ' +
        formatDate(new Date(date_court_penalty_day[i][j])) + '.<br>';

        if (!court_set.has(analize_court_period_paragraf_help_str)) {
          court_set.add(analize_court_period_paragraf_help_str);
          analize_court_period_paragraf[i][j] = analize_court_period_paragraf_help_str;
        } else {
          analize_court_period_paragraf[i][j] = "";
        }
      } else {
        analize_court_period_paragraf[i][j] = "";
      }

      if (j == 1) {
        court_claim_all[i] = str_court_claim[i][j] + court_penalty_period_paragraph[i][j] + " в размере " + makeRubText_genitive(court_claim_summ[i][j]);
        str_court_collect = str_court_collect_test;
      } else if (j > 1) {
        court_claim_all[i] = court_claim_all[i] + ", " + str_court_claim[i][j] + court_penalty_period_paragraph[i][j] + " в размере " + makeRubText_genitive(court_claim_summ[i][j]);
      }
    }

    for (var j = 1; j <= number_of_claims[i - 1]; j++) {
      total_analize_court_period_paragraf[i] = total_analize_court_period_paragraf[i] + analize_court_period_paragraf[i][j];
    }

    court_paragraph_main[i] = formatDate(new Date(court_date[i])) + " Решением суда" + court_decision_N[i] + " с Финансовой организации " +
    "в пользу Заявителя " + str_court_collect + court_claim_all[i] + ".<br>";

    court_paragraph_payment[i] = "Решение Суда" + court_decision_N[i] + " было исполнено в полном объеме " + formatDate(new Date(court_pay_date[i])) + ".<br>";

    if (isNaN(court_date[i])) {
      total_analize_court_period_paragraf[i] = "";
      court_paragraph_main[i] = "";
      court_paragraph_payment[i] = "";
    }

    total_courts_paragraph = total_courts_paragraph + total_analize_court_period_paragraf[i] + court_paragraph_main[i] + court_paragraph_payment[i];

  }//Завершение цикла для присваивание общих значений выплат по решению суда






  //"Собираем" текст решения
  //Если судом неустйоки не взысканы
  if (!court_penalty_boolean) {

    //Выведение заголовка таблицы на экран
    // str_payment_dataled_header = '<tr>' +
    //   '<th scope="col"><span id="COLUMN_NAME_0">' + COLUMN_NAME_0 + '</span></th>' +
    //   '<th scope="col"><span id="COLUMN_NAME_1">' + COLUMN_NAME_1 + '</span></th>' +
    //   '<!-- <th scope="col"><span id="COLUMN_NAME_2"></span></th> -->' +
    //   '<th scope="col"><span id="COLUMN_NAME_3">' + COLUMN_NAME_3 + '</span></th>' +
    //   '<th scope="col"><span id="COLUMN_NAME_4">' + COLUMN_NAME_4 + '</span></th>' +
    //   '<th scope="col"><span id="COLUMN_NAME_5">' + COLUMN_NAME_5 + '</span></th>' +
    //   '<th scope="col"><span id="COLUMN_NAME_6">' + COLUMN_NAME_6 + '</span></th>' +
    //   '<th scope="col"><span id="COLUMN_NAME_7">' + COLUMN_NAME_7 + '</span></th>' +
    // '</tr>';
    //
    // $('#str_payment_dataled_header').append(str_payment_dataled_header);

    // for (var i = 1; i <= number_of_payments; i++) {
    //
    //   //Вычисление количества дней между датой выплаты и 20м днем
    //   pay_count[i] = pay_date[i] - date_sv_uts_ev_stor_last_day[i];
    //
    //   //Если выплата была в срок, то изменение отрицательного значения на нулевое
    //   if (pay_count[i] < 0) {
    //     pay_count[i] = 0;
    //   }
    //
    //   //Вычисление суммы неустойки
    //   pay_summ[i] = pay_text[i] * (pay_count[i] / day) * 0.01;

      //canvas.width = max_days_delay + 50;

      //Выведение выплат на экран
      if ((!isNaN(pay_count[i])) && pay[i] != 4) {
        str_payment_dataled = '<tr>' +
          '<th scope="row"><span>' + i + '</span></th>' +
          '<td><span>' + payments_names[i - 1].value + '</span></td>' +
          '<!-- <td><span>' + formatDate(new Date(pay_date[i])) + '</span></td> -->' +
          '<td><span>' + makeRubText_genitive(pay_text[i]) + '</span></td>' +
          '<td><span>' + formatDate(new Date(date_penalty_day[i])) + '</span></td>' +
          '<td><span>' + formatDate(new Date(pay_date[i])) + '</span></td>' +
          '<td><span>' + declinationDays(pay_count[i] / day) + '</span></td>' +
          '<td><span>' + makeRubText_nominative(pay_summ[i]) + '</span></td>' +
        '</tr>';

        $('#str_payment_dataled').append(str_payment_dataled);
      }

      //Установление для количества дней и суммы нулевого значения, в случае,
      //если они не рассчитываются, чтобы не было ошибки
      // if (isNaN(pay_count[i])) {
      //   pay_count[i] = 0;
      // }
      // if (isNaN(pay_summ[i])) {
      //   pay_summ[i] = 0;
      // }

      //Вычисление общего размера неустойки
      total_count = total_count + pay_summ[i];

      //Вычисление общего размера выплаченной неустойки
      if (pay[i] == 4) {
        total_penalty = total_penalty + pay_text[i] * 1;
      }

      // //"Собираем" абзац с выводами по каждому платежу
      // if (pay_date[i] < date_penalty_day[i]) {
      //   payment_in_time_paragraf[i] = 'Таким образом, выплата в размере ' + makeRubText_genitive(pay_text[i]) + ' произведена в установленный '+
      //   'Законом № 40-ФЗ срок, в силу чего неустойка на указанную сумму не начисляется.'+'<br>';
      //   payment_not_in_time_paragraf[i] = "";
      // } else {
      //   payment_in_time_paragraf[i] = "";
      //   payment_not_in_time_paragraf[i] = 'Таким образом, неустойка на сумму ' + makeRubText_nominative(pay_text[i]) + ' подлежит расчету за период с ' +
      //   formatDate(new Date(date_penalty_day[i])) + ' по ' + formatDate(new Date(pay_date[i])) + ' (' + declinationDays(pay_count[i] / day) + ').' + '<br>' +
      //   'В соответствии с требованиями, установленными пунктом 21 статьи 12 Закона № 40-ФЗ, '+
      //   'размер неустойки, подлежащий выплате за период с ' + formatDate(new Date(date_penalty_day[i])) + ' по ' + formatDate(new Date(pay_date[i])) +
      //   ' составляет ' + makeRubText_nominative(pay_summ[i]) + ' (' + makeRubText_nominative(pay_text[i]) + ' × ' + declinationDays(pay_count[i] / day) +' × 1%).' + '<br>';
      // }

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
        total_count_string = ' (' + makeRubText_nominative(pay_summ[i]);
        stop_ind_1 = i + 1;
        break
      }
    }

    // добавление выплат, в случае, если их было больше 1
    for (var i = stop_ind_1; i <= number_of_payments; i++) {
      if (pay_summ[i] > 0) {
        total_count_string = total_count_string + ' + ' + makeRubText_nominative(pay_summ[i]);
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
        total_penalty_string = ' (' + makeRubText_nominative(pay_text[i]);
        stop_ind_1 = i + 1;
        break
      }
    }

    // добавление выплат, в случае, если их было больше 1
    for (var i = stop_ind_1; i <= number_of_payments; i++) {
      if (pay[i] == 4) {
        total_penalty_string = total_penalty_string + ' + ' + makeRubText_nominative(pay_text[i]);
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

      //Вычисление количества дней между датой выплаты и 20м днем
      pay_count[i] = pay_date[i] - date_sv_uts_ev_stor_last_day[i];

      //Если выплата была в срок, то изменение отрицательного значения на нулевое
      if (pay_count[i] < 0) {
        pay_count[i] = 0;
      }

      //Вычисление суммы неустойки
      pay_summ[i] = pay_text[i] * (pay_count[i] / day) * 0.01;

      //Рисование графика
      pay_count[0] = 0;
      if (pay_count[i] > pay_count[i - 1]) {
        max_days_delay = (pay_count[i] + 21 * day) / day; //Получение значения самой большой задержки
      }

      court_period_text[1] = 'Решением суда с ' + fo_name_genitive + ' в пользу Заявителя взыскана неустойка за период с ' +
      formatDate(new Date(date_court_from)) + ' по ' + formatDate(new Date(date_court_to)) + '.<br>'

      //Если из решения суда невозможно установить период неустойки,
      //то переопределяем значения дат и добавляем новый абзац
      if (court_without_period) {
        date_court_from = date_penalty_day[i];
        // date_court_to = court_date;
        court_period_text[1] = 'Решением суда с ' + fo_name_genitive + ' в пользу Заявителя взыскана неустойка'  + '.<br>'
        court_period_text[1] = court_period_text[1] + court_without_period_text;
      }

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

          payment_not_in_time_paragraf_court[i] = 'Таким образом, неустойка на сумму ' + makeRubText_nominative(pay_text[i]) + ' подлежит расчету за период с ' +
          formatDate(new Date(date_penalty_day[i])) + ' по ' + formatDate(new Date(date_court_from - day)) + ' (' + declinationDays(court_period_before[i] / day) + ') ' +
          ' и за период с ' + formatDate(new Date(date_court_to + day)) + ' по ' + formatDate(new Date(pay_date[i])) + ' (' + declinationDays(court_period_after[i] / day) + ').' + '<br>' +
          'В соответствии с требованиями, установленными пунктом 21 статьи 12 Закона № 40-ФЗ, ' +
          'размер неустойки, подлежащий выплате за период с ' + formatDate(new Date(date_penalty_day[i])) + ' по ' +
          formatDate(new Date(date_court_from - day)) + ' составляет ' + makeRubText_nominative(court_summ_before[i]) + ' (' + makeRubText_nominative(pay_text[i]) +
          ' × ' + declinationDays(court_period_before[i] / day) +' × 1%)' + ', за период с ' + formatDate(new Date(date_court_to + day)) + ' по ' + formatDate(new Date(pay_date[i])) +
          ' составляет ' + makeRubText_nominative(court_summ_after[i]) + ' (' + makeRubText_nominative(pay_text[i]) + ' × ' + declinationDays(court_period_after[i] / day) +' × 1%).<br>';

        //если был только период ПОСЛЕ судебного периода вызскания неустойки
        } else if ((court_period_before[i] == 0) && (court_period_after[i] > 0)) {

          payment_not_in_time_paragraf_court[i] = 'Таким образом, неустойка на сумму ' + makeRubText_nominative(pay_text[i]) + ' подлежит расчету за период с ' +
          formatDate(new Date(date_court_to + day)) + ' по ' + formatDate(new Date(pay_date[i])) + ' (' + declinationDays(court_period_after[i] / day) + ').' + '<br>' +
          'В соответствии с требованиями, установленными пунктом 21 статьи 12 Закона № 40-ФЗ, ' +
          'размер неустойки, подлежащий выплате за период с ' + formatDate(new Date(date_court_to + day)) + ' по ' + formatDate(new Date(pay_date[i])) +
          ' составляет ' + makeRubText_nominative(court_summ_after[i]) + ' (' + makeRubText_nominative(pay_text[i]) + ' × ' + declinationDays(court_period_after[i] / day) +' × 1%).<br>';

        //если был только период ДО судебного периода вызскания неустойки
        } else if ((court_period_before[i] > 0) && (court_period_after[i] == 0)) {

          payment_not_in_time_paragraf_court[i] = 'Таким образом, неустойка на сумму ' + makeRubText_nominative(pay_text[i]) + ' подлежит расчету за период с ' +
          formatDate(new Date(date_penalty_day[i])) + ' по ' + formatDate(new Date(date_court_from - day)) + ' (' + declinationDays(court_period_before[i] / day) + ').' + '<br>' +
          'В соответствии с требованиями, установленными пунктом 21 статьи 12 Закона № 40-ФЗ, ' +
          'размер неустойки, подлежащий выплате за период с ' + formatDate(new Date(date_penalty_day[i])) + ' по ' + formatDate(new Date(date_court_from - day)) +
          ' составляет ' + makeRubText_nominative(court_summ_before[i]) + ' (' + makeRubText_nominative(pay_text[i]) + ' × ' + declinationDays(court_period_before[i] / day) +' × 1%).<br>';
        } else {
          payment_not_in_time_paragraf_court[i] = 'Учитывая, что Решением суда c Финансовой организации в пользу Заявителя '+
          'взыскана неустойка за несоблюдение срока выплаты страхового возмещения по Договору ОСАГО за период с ' +
          formatDate(new Date(date_court_from)) + ' по ' + formatDate(new Date(date_court_to)) +
          ', неустойка на сумму ' + makeRubText_nominative(pay_text[i]) + ' расчету не подлежит.' + '<br>';

          if (court_without_period) {
            payment_not_in_time_paragraf_court[i] = 'Учитывая, что ранее Финансовый уполномоченный пришел к выводу о ' +
            'наличии оснований для взыскания неустойки за несоблюдение срока выплаты страхового возмещения по Договору ОСАГО ' +
            'за период со дня, следующего за днем вынесения Решения суда (' + formatDate(new Date(date_court_to)) + '), по дату исполнения Финансовой организацией обязательства' +
            ', неустойка на сумму ' + makeRubText_nominative(pay_text[i]) + ' расчету не подлежит.' + '<br>';
          }
        }

        payment_in_time_paragraf[i] = "";
        payment_not_in_time_paragraf[i] = "";

      // Если выплата осуществлена в срок
      } else {
        payment_in_time_paragraf[i] = 'Таким образом, выплата в размере ' + makeRubText_genitive(pay_text[i]) + ' произведена в установленный '+
        'Законом № 40-ФЗ срок, в силу чего неустойка на указанную сумму не начисляется.'+'<br>';
        payment_not_in_time_paragraf[i] = "";
        payment_not_in_time_paragraf_court[i] = "";
      }

      //обнуление значений, в случае, если периоды до или после суда меньше нуля
      // if (isNaN(court_period_before[i])) {
      //   court_period_before[i] = 0;
      // }
      // if (isNaN(court_summ_before[i])) {
      //   court_summ_before[i] = 0;
      // }
      // if (isNaN(court_period_after[i])) {
      //   court_period_after[i] = 0;
      // }
      // if (isNaN(court_summ_after[i])) {
      //   court_summ_after[i] = 0;
      // }

      //Выведение выплат на экран
      // if ((!isNaN(pay_date[i])) && pay[i] != 4) {
      //   str_payment_dataled = '<tr>' +
      //     '<th scope="row"><span>' + i + '</span></th>' +
      //     '<td><span>' + payments_names[i - 1].value + '</span></td>' +
      //     '<td><span>' + makeRubText_genitive(pay_text[i]) + '</span></td>';
      //
      //     // if (court_period_before[i] > 0) {
      //       str_payment_dataled = str_payment_dataled +
      //       '<td><span>' + formatDate(new Date(date_penalty_day[i])) + '</span></td>' +
      //       '<td><span>' + formatDate(new Date(date_court_from - day)) + '</span></td>' +
      //       '<td><span>' + declinationDays(court_period_before[i] / day) + '</span></td>' +
      //       '<td><span>' + makeRubText_nominative(court_summ_before[i]) + '</span></td>';
      //     // }
      //
      //     // if (court_period_after[i] > 0) {
      //       str_payment_dataled = str_payment_dataled +
      //       '<td><span>' + formatDate(new Date(date_court_to + day)) + '</span></td>' +
      //       '<td><span>' + formatDate(new Date(pay_date[i])) + '</span></td>' +
      //       '<td><span>' + declinationDays(court_period_after[i] / day) + '</span></td>' +
      //       '<td><span>' + makeRubText_nominative(court_summ_after[i]) + '</span></td>';
      //     // }
      //
      //     str_payment_dataled = str_payment_dataled + '</tr>';
      //
      //   $('#str_payment_dataled').append(str_payment_dataled);
      // }

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

    //Формирование абзаца со сложением нескольких неустоек
    //добавление открывающейся скобки и первой выплаты, в случае, если количество выплат больше 1
    let stop_ind_1 = 1;
    let stop_ind_2 = false;
    for (var i = 1; i <= number_of_payments; i++) {
      if (court_summ_before[i] > 0) {
        total_count_string = ' (' + makeRubText_nominative(court_summ_before[i]);
        if (court_summ_after[i] > 0) {
          total_count_string = total_count_string + ' + ' + makeRubText_nominative(court_summ_after[i]);
        }
        stop_ind_1 = i + 1;
        break
      } else if (court_summ_after[i] > 0) {
        total_count_string = ' (' + makeRubText_nominative(court_summ_after[i]);
        stop_ind_1 = i + 1;
        break
      }
    }

    // добавление выплат, в случае, если их было больше 1
    for (var i = stop_ind_1; i <= number_of_payments; i++) {
      if (court_summ_before[i] > 0) {
        total_count_string = total_count_string + ' + ' + makeRubText_nominative(court_summ_before[i]);
        stop_ind_2 = true;
      }
      if (court_summ_after[i] > 0) {
        total_count_string = total_count_string + ' + ' + makeRubText_nominative(court_summ_after[i]);
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
        total_penalty_string = ' (' + makeRubText_nominative(pay_text[i]);
        stop_ind_1 = i + 1;
        break
      }
    }

    // добавление выплат, в случае, если их было больше 1
    for (var i = stop_ind_1; i <= number_of_payments; i++) {
      if (pay[i] == 4) {
        total_penalty_string = total_penalty_string + ' + ' + makeRubText_nominative(pay_text[i]);
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

  // //Абзац про общий размер начисленной неустойки
  // if (total_count > 0) {
  //   total_count_paragraf = 'Таким образом, общий размер начисленной неустойки составляет ' +
  //   makeRubText_genitive(total_count) + total_count_string + '.' + '<br>';
  // } else {
  //   total_count_paragraf = '';
  // }
  //
  //   //Абзац про общий размер выплаченной неустойки
  // if (total_penalty > 0) {
  //   total_penalty_paragraf = 'Таким образом, общий размер неустойки, добровольно выплаченной ' + fo_name_instrumental + ', составляет ' +
  //   makeRubText_genitive(total_penalty) + total_penalty_string + '.' + '<br>';
  // } else {
  //   total_penalty_paragraf = '';
  // }

  // if (total_count > max_summ) {
  //   total_count = max_summ;
  //   if (max_summ == 400000) {
  //     max_summ_paragraf = 'В силу пункта 6 статьи 16.1 Закона № 40-ФЗ общий размер неустойки (пени), '+
  //     'суммы финансовой санкции, которые подлежат выплате потерпевшему - физическому лицу, не может '+
  //     'превышать размер страховой суммы по виду причиненного вреда, установленный Законом № 40-ФЗ.' +'<br>'+
  //     'Согласно статье 7 Закона № 40-ФЗ страховая сумма, в пределах которой страховщик при наступлении '+
  //     'каждого страхового случая (независимо от их числа в течение срока действия договора обязательного '+
  //     'страховая) обязуется возместить потерпевшим причиненный вред, составляет: в части возмещения вреда, '+
  //     'причиненного имуществу каждого потерпевшего, ' + makeRubText_nominative(max_summ) + '.'+'<br>';
  //   } else {
  //     max_summ_paragraf = 'В силу пункта 6 статьи 16.1 Закона № 40-ФЗ общий размер неустойки (пени), '+
  //     'суммы финансовой санкции, которые подлежат выплате потерпевшему - физическому лицу, не может '+
  //     'превышать размер страховой суммы по виду причиненного вреда, установленный Законом № 40-ФЗ.' +'<br>'+
  //     'Согласно статье 7 Закона № 40-ФЗ страховая сумма, в пределах которой страховщик при наступлении '+
  //     'каждого страхового случая (независимо от их числа в течение срока действия договора обязательного '+
  //     'страховая) обязуется возместить потерпевшим причиненный вред, составляет: в части возмещения вреда, '+
  //     'причиненного имуществу каждого потерпевшего, 400 000 рублей 00 копеек.' +'<br>'+
  //     'В соответствии с пунктом 4 статьи 11.1 Закона № 40-ФЗ в случае оформления документов '+
  //     'о дорожно-транспортном происшествии без участия уполномоченных на то сотрудников полиции '+
  //     'размер страхового возмещения, причитающегося потерпевшему в счет возмещения вреда, '+
  //     'причиненного его транспортному средству, не может превышать ' + makeRubText_nominative(max_summ) + '.'+'<br>';
  //   }
  // }

  if ((total_count > total_penalty) && (total_penalty > 0)) {
    summary_paragraf = 'Учитывая вышеизложенное, требование Заявителя о взыскании '+
    'неустойки за несоблюдение срока выплаты страхового возмещения подлежит удовлетворению в размере '+
    makeRubText_genitive(total_count - total_penalty) + ' (' + makeRubText_genitive(total_count) + ' - ' + makeRubText_genitive(total_penalty) + ').' + '<br>';
  } else if (total_count > total_penalty) {
    summary_paragraf = 'Учитывая вышеизложенное, требование Заявителя о взыскании '+
    'неустойки за несоблюдение срока выплаты страхового возмещения подлежит удовлетворению в размере '+
    makeRubText_genitive(total_count) +'.' + '<br>';
  } else {
    summary_paragraf = 'Учитывая вышеизложенное, требование Заявителя о взыскании '+
    'неустойки за несоблюдение срока выплаты страхового возмещения не подлежит удовлетворению.' + '<br>';
  }

  if (total_ndfl > 0) {
    ndfl_motivation = ndfl_motivation_on + 'Следовательно, ' + fo_name_nominative + ' при выплате '+
    'неустойки в связи с нарушением срока выплаты страхового возмещения в рамках договора ОСАГО '+
    'обосновано' + keep + ' сумму НДФЛ в размере ' + makeRubText_genitive(total_ndfl) +
    ', рассчитанную следующим образом: (' + makeRubText_genitive(total_penalty) +
    ' × 13%)' + '.<br>';
  }

  decision = first_paragraf + standart_motivation + article_191 + holly + total_analize_paragraf + total_courts_paragraph + total_count_paragraf + max_summ_paragraf + total_penalty_payments_paragraf + ndfl_motivation + total_penalty_paragraf + summary_paragraf;

  total_count = total_count - total_penalty;
  document.querySelector('#total_count').innerHTML = "Общий размер неустойки: " + makeRubText_nominative(total_count);
  total_count = 0;

  // //Формирование Word файла
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

  //Получение количества календарных дней с даты заявления до 21го дня

  // date_sv_penalty_day_x = (date_sv_penalty_day - date_sv) / day;

  //Отрисовка графика
  //SVG
  //Отрисовка системы координат
  // var div_svg_width = $('#div_svg').width();
  // var div_svg_height = $('#div_svg').height();
  // if (max_days_delay == 0) {
  //   max_days_delay = 500;
  // }

  // swg_graph.clear();
  // var coordinate_system = swg_graph.polyline([0, 0, 0, div_svg_height, div_svg_width,div_svg_height])
  //                                  .fill('none')
  //                                  .stroke({ color: 'black', width: 7, linecap: 'round', linejoin: 'round' });
  // //Отрисовка пунктирной прямой (21й день)
  // var line_21_day = swg_graph.line(date_sv_penalty_day_x * div_svg_width * 0.9 / max_days_delay,
  //                                  0,
  //                                  date_sv_penalty_day_x * div_svg_width * 0.9 / max_days_delay,
  //                                  div_svg_height)
  //                            .stroke({color: 'red', width: 1 })
  //                            .css({border: 'dashed'});
  //
  // for (var i = 1; i <= number_of_payments; i++) {
  //   pay_summ_y[0] = 0;
  //   pay_date_x[i] = pay_count[i] / day;
  //   pay_summ_y[i] = pay_text[i] / 1000;
  //   pay_summ_y_all = pay_summ_y_all + pay_summ_y[i - 1];
  //
  //   //Отрисовска прямоугольников с неустойками
  //   if (pay_count[i] == 0) {
  //     line_svg_payment[i] = swg_graph.line(((pay_date[i] - date_sv) / day) * div_svg_width * 0.9 / max_days_delay - 3,
  //                                         div_svg_height - pay_summ_y_all,
  //                                         ((pay_date[i] - date_sv) / day) * div_svg_width * 0.9 / max_days_delay - 3,
  //                                         div_svg_height - pay_summ_y_all - pay_summ_y[i])
  //                                    .stroke({color: 'green', width: 6 });
  //   } else {
  //     line_svg_payment[i] = swg_graph.line((date_sv_penalty_day_x + pay_date_x[i]) * div_svg_width * 0.9 / max_days_delay - 3,
  //                                         div_svg_height - pay_summ_y_all,
  //                                         (date_sv_penalty_day_x + pay_date_x[i]) * div_svg_width * 0.9 / max_days_delay - 3,
  //                                         div_svg_height - pay_summ_y_all - pay_summ_y[i])
  //                                    .stroke({color: 'red', width: 6 });
  //     rect_svg_payment[i] = swg_graph.rect((pay_date_x[i]) * div_svg_width * 0.9 / max_days_delay,
  //                                           pay_summ_y[i])
  //                                    .move((date_sv_penalty_day_x) * div_svg_width * 0.9 / max_days_delay,
  //                                           div_svg_height - pay_summ_y_all - pay_summ_y[i])
  //                                    .stroke({color: 'red', width: 1, opacity: 1})
  //                                    .fill({color: 'red', opacity: 0.2});
  //
  //    rect_svg_payment[i].mouseover(function() {
  //      this.animate({when: 'now'}).fill({opacity: 1});
  //    });
  //    rect_svg_payment[i].mouseout(function() {
  //      this.animate({when: 'now'}).fill({opacity: 0.2});
  //    });
  //   }
  // }
  //
  // if (!isNaN(date_court_from) || court_without_period) {
  //   var court_swg_rect = swg_graph.rect(((date_court_to - date_court_from) / day + 1) * div_svg_width * 0.9 / max_days_delay,
  //                                         div_svg_height)
  //                                  .move(((date_court_from - date_sv) / day) * div_svg_width * 0.9 / max_days_delay,
  //                                         0)
  //                                 // .stroke({color: 'red', width: 1, opacity: 1})
  //                                  .fill({color: 'grey', opacity: 0.6});
  // }
  //
  // court_swg_rect.mouseover(function() {
  //   this.animate({when: 'now'}).fill({opacity: 1});
  //   for (var i = 1; i <= number_of_payments; i++) {
  //     rect_svg_payment[i].animate({when: 'now'}).fill({opacity: 0.6});
  //   }
  // });
  // court_swg_rect.mouseout(function() {
  //   this.animate({when: 'now'}).fill({opacity: 0.6});
  //   for (var i = 1; i <= number_of_payments; i++) {
  //     rect_svg_payment[i].animate({when: 'now'}).fill({opacity: 0.2});
  //   }
  // });





  // //CANVAS
  // //Отрисовка пунктирной прямой (21й день)
  // penalty_graph.strokeStyle = "black";
  // penalty_graph.setLineDash([6, 2]);
  // penalty_graph.beginPath();
  // penalty_graph.moveTo(space + date_sv_penalty_day_x * canvas.width * 0.9 / max_days_delay, space);
  // penalty_graph.lineTo(space + date_sv_penalty_day_x * canvas.width * 0.9 / max_days_delay, canvas.height);
  // penalty_graph.stroke();
  // penalty_graph.setLineDash([6, 0]);
  //
  // for (var i = 1; i <= number_of_payments; i++) {
  //   pay_summ_y[0] = 0;
  //   pay_date_x[i] = pay_count[i] / day;
  //   pay_summ_y[i] = pay_text[i] / 1000;
  //   pay_summ_y_all = pay_summ_y_all + pay_summ_y[i - 1];
  //
  //   //Отрисовска прямоугольников с неустойками
  //   if (pay_count[i] == 0) {
  //     penalty_graph.strokeStyle = "#28a745";
  //     penalty_graph.lineWidth = 10;
  //     penalty_graph.beginPath();
  //     penalty_graph.moveTo(space + ((pay_date[i] - date_sv) / day) * canvas.width * 0.9 / max_days_delay, space);
  //     penalty_graph.lineTo(space + ((pay_date[i] - date_sv) / day) * canvas.width * 0.9 / max_days_delay, space + pay_summ_y_all + pay_summ_y[i]);
  //     penalty_graph.stroke();
  //     penalty_graph.lineWidth = 1;
  //     penalty_graph.strokeStyle = "black";
  //     // penalty_graph.beginPath();
  //     // penalty_graph.rect(space + (pay_date[i] - date_sv) / day, space + pay_summ_y_all, pay_date_x[i], pay_summ_y[i]);
  //     // penalty_graph.stroke();
  //   } else {
  //     //Отрисовка линии выплаты
  //     penalty_graph.strokeStyle = "#dc3545";
  //     penalty_graph.lineWidth = 10;
  //     penalty_graph.beginPath();
  //     penalty_graph.moveTo(space + ((pay_date[i] - date_sv) / day + 1) * canvas.width * 0.9 / max_days_delay, space + pay_summ_y_all - 1);
  //     penalty_graph.lineTo(space + ((pay_date[i] - date_sv) / day + 1) * canvas.width * 0.9 / max_days_delay, space + pay_summ_y_all + pay_summ_y[i] + 1);
  //     penalty_graph.stroke();
  //     //Отрисовка прямоугольника выплаты
  //     penalty_graph.lineWidth = 1;
  //     penalty_graph.beginPath();
  //     penalty_graph.rect(space + (date_sv_penalty_day_x) * canvas.width * 0.9 / max_days_delay, space + pay_summ_y_all, (pay_date_x[i]) * canvas.width * 0.9 / max_days_delay, pay_summ_y[i]);
  //     penalty_graph.stroke(); //контур прямоугольника
  //
  //     penalty_rect[i] = new Path2D();
  //     penalty_graph.fillStyle = "#dc3545";
  //     penalty_graph.globalAlpha = 0.2;
  //     penalty_graph.beginPath();
  //     penalty_rect[i].rect(space + (date_sv_penalty_day_x) * canvas.width * 0.9 / max_days_delay, space + pay_summ_y_all, (pay_date_x[i]) * canvas.width * 0.9 / max_days_delay, pay_summ_y[i]);
  //     penalty_graph.fill(penalty_rect[i]); //заливка прямоугольника
  //     penalty_graph.fillStyle = "black";
  //     penalty_graph.globalAlpha = 1;
  //   }

    // canvas.addEventListener('mousemove', function(event) {
    //   // Check whether point is inside circle
    //   if (penalty_graph.isPointInPath(penalty_rect[1], event.offsetX, event.offsetY)) {
    //     penalty_graph.fillStyle = "#fb4365";
    //     penalty_graph.globalAlpha = 1;
    //
    //   }
    //   else {
    //     penalty_graph.fillStyle = "#fb4365";
    //     penalty_graph.globalAlpha = 0.2;
    //   }
    //
    //   // Draw rectangle
    //   penalty_graph.strokeStyle = "#fb4365";
    //   penalty_graph.clearRect(space + 1 + (date_sv_penalty_day_x) * canvas.width * 0.9 / max_days_delay, space + 1 + pay_summ_y_all, (pay_date_x[1]) * canvas.width * 0.9 / max_days_delay - 6, pay_summ_y[1] - 1);
    //   penalty_graph.fill(penalty_rect[1]);
    //   penalty_graph.stroke(penalty_rect[1]);
    //   penalty_graph.strokeStyle = "black";
    //   penalty_graph.stroke(penalty_coordinate_system);
    // });

      //Очистка прямоугольников
      // for (var i = 1; i <= number_of_payments; i++) {
      //   penalty_graph.clearRect(space + (date_court_from - date_sv) / day * canvas.width * 0.9 / max_days_delay, space + pay_summ_y_all, (pay_date_x[i]) * canvas.width * 0.9 / max_days_delay, pay_summ_y[i]);
      // }
  //  }

  //   //Если был суд
  //   if (!isNaN(date_court_from) || court_without_period) {
  //     //Очистка прямоугольника судебного периода
  //     //penalty_graph.clearRect(space + (date_court_from - date_sv) / day * canvas.width * 0.9 / max_days_delay, space, (date_court_to - date_court_from) / day * canvas.width * 0.9 / max_days_delay, canvas.height);
  //     //Отрисовка пунктирной прямой (судебное взыскание неустойки)
  //     penalty_graph.strokeStyle = "#dc3545";
  //     penalty_graph.setLineDash([6, 2]);
  //     penalty_graph.beginPath();
  //     //Начало периода
  //     penalty_graph.moveTo(space + (date_court_from - date_sv) / day * canvas.width * 0.9 / max_days_delay, space);
  //     penalty_graph.lineTo(space + (date_court_from - date_sv) / day * canvas.width * 0.9 / max_days_delay, canvas.height);
  //     //Конец периода
  //     penalty_graph.moveTo(space + (date_court_to - date_sv) / day * canvas.width * 0.9 / max_days_delay, space);
  //     penalty_graph.lineTo(space + (date_court_to - date_sv) / day * canvas.width * 0.9 / max_days_delay, canvas.height);
  //     penalty_graph.stroke();
  //
  //     //Прямоугольник на весь период взыскания неустойки
  //     penalty_graph.fillStyle = "grey";
  //     penalty_graph.globalAlpha = 0.6;
  //     penalty_graph.rect(space + (date_court_from - date_sv) / day * canvas.width * 0.9 / max_days_delay, space, (date_court_to - date_court_from) / day * canvas.width * 0.9 / max_days_delay, canvas.height);
  //     penalty_graph.fill();
  //     penalty_graph.setLineDash([6, 0]);
  //     penalty_graph.fillStyle = "black";
  //     penalty_graph.globalAlpha = 1;
  //
  // }
  //
  // //Отрисовка системы координат
  // const penalty_coordinate_system = new Path2D();
  // penalty_graph.strokeStyle = "black";
  // penalty_coordinate_system.moveTo(space, canvas.height);
  // penalty_coordinate_system.lineTo(space, space);
  // penalty_coordinate_system.lineTo(canvas.width, space);
  // penalty_graph.stroke(penalty_coordinate_system);
  //
  // penalty_graph.beginPath();
  // penalty_graph.moveTo(space - 5, canvas.height - 20);
  // penalty_graph.lineTo(space, canvas.height);
  // penalty_graph.lineTo(space + 5, canvas.height - 20);
  // penalty_graph.arc(space, canvas.height - 20, 5, 0, Math.PI, false);
  // penalty_graph.fill();
  //
  // penalty_graph.beginPath();
  // penalty_graph.moveTo(canvas.width - 20, space - 5);
  // penalty_graph.lineTo(canvas.width, space);
  // penalty_graph.lineTo(canvas.width - 20, space + 5);
  // penalty_graph.arc(canvas.width - 20, space, 5, Math.PI * 0,5, Math.PI * 1,5, true);
  // penalty_graph.fill();


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
    for (var i = 1; i <= number_of_courts; i++) {
      for (var j = 1; j <= number_of_claims; j++) {
        analize_court_period_paragraf[i][j] = "";
      }
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
  total_penalty_paragraf = "";
  total_courts_paragraph = "";
  holly = "";
  ndfl_motivation = "";
  max_summ_paragraf = "";
  str_test = "";
  total_analize_court_period_paragraf = "";
  analize_court_period_paragraf_help_str = "";
  analize_period_paragraf_help_str = "";

  court_set.clear();
}

// function selectText(containerid) {
// 		if (document.selection) { // IE
// 			var range = document.body.createTextRange();
// 			range.moveToElementText(document.getElementById(containerid));
// 			range.select();
// 		} else if (window.getSelection) {
// 			var range = document.createRange();
// 			range.selectNode(document.getElementById(containerid));
// 			window.getSelection().removeAllRanges();
// 			window.getSelection().addRange(range);
// 		}
//     document.execCommand('copy');
//
//     if (window.getSelection) {
//       window.getSelection().removeAllRanges();
//     } else { // старый IE
//       document.selection.empty();
//     }
//
//     iziToast.show({
//         timeout: 3000,
//         color: '#F5E1A6',
//         //title: 'Hey',
//         message: 'Текст решения скопирован',
//     });
// 	}

//Форматирование даты
// $('.datepicker-here').toArray().forEach(function(field){
//   new Cleave(field, {
//     date: true,
//     delimiter: '.',
//     datePattern: ['d', 'm', 'Y']
//   })
// });
//
// //Форматирование суммы
// $('.input-numeral').toArray().forEach(function(field){
//   new Cleave(field, {
//       numeral: true,
//       delimiter: ' ',
//       //numeralThousandsGroupStyle: 'none',
//       numeralPositiveOnly: true,
//       numeralIntegerScale: 8
//   })
// });

// $(function () {
//   $('[data-toggle="tooltip"]').tooltip();
// })
//
document.getElementById('show_decision').onclick = function show_decision(){
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

// document.getElementById('show_graph').onclick = function show_graph(){
//   if ($('#show_graph').html() == "Показать график неустоек") {
//     $('#div_svg').show();
//     $('#show_graph').html("Скрыть график неустоек");
//   } else {
//     $('#div_svg').hide();
//     $('#show_graph').html("Показать график неустоек");
//   }
// }
