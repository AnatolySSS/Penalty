import { makeRubText_nominative } from './makeRubText_nominative.js';
import { makeRubText_genitive } from './makeRubText_genitive.js';
import { declinationDays } from './declinationDays.js';
import { changeDateType } from './changeDateType.js';
import { formatDate } from './formatDate.js';
import { findInForceFuDay, findLastDayForPayFu } from './findInForceFuDay.js';
import { paymentFu } from './variables.js';
import { PaymentFu } from './payment_fu.js';
import { AppDate } from './app_date.js';
import { DAY } from './variables.js';

/* Объект для выплаты по решению ФУ

    * id - порядковый № выплаты
    * fu - Финансовый уполномоченный
    * date - дата решения
    * number - № решения
    * order - № платежного поручения
    // * days_delay - количество дней просрочки
    // * penalty_summ - сумма неустойки
    //
    // * last_day - последний день 20го срока
    // * penalty_day - первый день начисления неустойки (21й день)
*/
const date_sv = new AppDate($('#app_date_1'), $('#date_sv_last_day'), $('#date_sv_penalty_day'));
const date_uts = new AppDate($('#app_date_2'), $('#date_uts_last_day'), $('#date_uts_penalty_day'));
const date_ev = new AppDate($('#app_date_3'), $('#date_ev_last_day'), $('#date_ev_penalty_day'));
const date_stor = new AppDate($('#app_date_4'), $('#date_stor_last_day'), $('#date_stor_penalty_day'));

class ClaimCourt {
  id

  name
  type
  summ
  from
  to
  without

  last_day
  last_day_form
  penalty_day_form

  days_delay
  penalty_summ

  constructor(id, name, type, summ, from, to, without) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.summ = Number(summ.value.replace(/\s+/g, ''));
    this.from = from;
    this.to = to;
    this.without = without;

    //Вычисление количества дней между датой выплаты и 20м днем
    switch (this.name.options.selectedIndex) {
      case 0:
        this.last_day = date_sv.getLastDay();
        this.last_day_form = date_sv.getLastDayFormatted();
        this.penalty_day_form = date_sv.getPenaltyDayFormatted();
        break;
      case 1:
        this.last_day = date_uts.getLastDay();
        this.last_day_form = date_uts.getLastDayFormatted();
        this.penalty_day_form = date_uts.getPenaltyDayFormatted();
        break;
      case 2:
        this.last_day = date_ev.getLastDay();
        this.last_day_form = date_ev.getLastDayFormatted();
        this.penalty_day_form = date_ev.getPenaltyDayFormatted();
        break;
      case 3:
        this.last_day = date_stor.getLastDay();
        this.last_day_form = date_stor.getLastDayFormatted();
        this.penalty_day_form = date_stor.getPenaltyDayFormatted();
        break;
    }
  }
}

export class PaymentCourt {

  id

  court
  number
  order

  date
  in_force_date
  pay_date

  claim = [];

  total_penalty_summ_court

  constructor(id, court, number, date, in_force_date, pay_date) {

    //Получение массива значений всех переменных решений ФУ
    var number_of_fus = $('.fus').length; //Получение количества строк с выплатами
    var fu_names = $('.fu_names'); //Получение массива ФУ
    var fu_dates = $('.fu_dates'); //Получение массива дат решений ФУ
    var fu_numbers = $('.fu_numbers'); //Получение массива номеров решений ФУ
    var fu_pay_dates = $('.fu_pay_dates'); //Получение массива дат решений ФУ
    var fu_in_force_dates = $('.fu_in_force_dates'); //Получение массива дат решений ФУ
    var fu_last_day_for_pay_dates = $('.fu_last_day_for_pay_dates'); //Получение массива дат решений ФУ
    var fu_claim_set = new Set();
    fu_claim_set.clear();

    //Создание экземпляров решений ФУ
    for (var i = 0; i < number_of_fus; i++) {
      paymentFu[i] = new PaymentFu(i + 1,
                                   fu_names[i],
                                   fu_dates[i],
                                   fu_numbers[i],
                                   fu_pay_dates[i],
                                   fu_in_force_dates[i],
                                   fu_last_day_for_pay_dates[i]);
      for (var j = 0; j < paymentFu[i].claim.length; j++) {
        if ((!fu_claim_set.has(paymentFu[i].claim[j].name.options.selectedIndex) && paymentFu[i].claim[j].summ != "") ||
              paymentFu[i].claim[j].type.options.selectedIndex == 1) {
          fu_claim_set.add(paymentFu[i].claim[j].name.options.selectedIndex);
        }
      }
    }

    this.id = id;
    this.court = court;
    this.number = number;
    this.date = date;
    this.in_force_date = in_force_date;
    this.pay_date = pay_date;

    this.total_penalty_summ_court = 0;
    //Получение количества удовлетворенных требований для каждого решения
    var number_of_payments = $('div.payments').length; //Получение количества строк с выплатами
    var number_of_fus = $('div.fus').length; //Получение количества строк с выплатами
    var number_of_claims = $('.court_claim_' + id).length;
    var names = $('.court_claim_' + id); //Получение массива требований
    var types = $('.court_claim_type_' + id); //Получение массива требований
    var summs = $('.court_claim_summ_' + id); //Получение массива дат решений
    var froms = $('.date_court_penalty_from_' + id); //Получение массива дат начала периода судебных неустоек
    var tos = $('.date_court_penalty_to_' + id); //Получение массива дат конца периода судебных неустоек
    var without_periods = $('.court_without_period_' + id); //Получение массива неустоек без периода
    for (var i = 0; i < number_of_claims; i++) {
      this.claim[i] = new ClaimCourt(i + 1,
                                  names[i],
                                  types[i],
                                  summs[i],
                                  froms[i],
                                  tos[i],
                                  without_periods[i]);
      //Вычисление периода задержки
      if (fu_claim_set.has(this.claim[i].name.options.selectedIndex)) {
        this.claim[i].days_delay = (this.getPayDate() - this.getInForceDate()) / DAY;
        this.claim[i].penalty_day_form = this.getInForceDateFormatted();
      } else {
        this.claim[i].days_delay = (this.getPayDate() - this.claim[i].last_day) / DAY;
      }

      //Если выплата была в срок, то изменение отрицательного значения на нулевое
      if (this.claim[i].days_delay < 0 || isNaN(this.claim[i].days_delay)) {
        this.claim[i].days_delay = 0;
      }

      //Вычисление суммы неустойки
      this.claim[i].penalty_summ = this.claim[i].summ * this.claim[i].days_delay * 0.01;
      if (isNaN(this.claim[i].penalty_summ)) {
        this.claim[i].penalty_summ = 0;
      }
      this.total_penalty_summ_court = this.total_penalty_summ_court + this.claim[i].penalty_summ;
    }
  }

  getDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
  getDateFormatted() { return formatDate(new Date(this.getDate())); }
  getInForceDate() {return Date.parse(changeDateType(this.in_force_date.value) + 'T00:00:00');}
  getInForceDateFormatted() { return formatDate(new Date(this.getInForceDate())); }
  getPayDate() {return Date.parse(changeDateType(this.pay_date.value) + 'T00:00:00');}
  getPayDateFormatted() { return formatDate(new Date(this.getPayDate())); }

  fillPayments() {
    for (var i = 0; i < this.claim.length; i++) {
      if (this.date.value != "") {
        if (this.claim[i].name.selectedIndex == 0 ||
            this.claim[i].name.selectedIndex == 1 ||
            this.claim[i].name.selectedIndex == 2 ||
            this.claim[i].name.selectedIndex == 3) {
          let number_of_payment_rows = $('.payment_row').length; //Получение количества строк с выплатами
          let str_payment_dataled = '<tr role="button" class = "payment_row">' +
            '<th scope="row"><span>' + (number_of_payment_rows + 1) + '</span></th>' +
            '<td><span>' + this.claim[i].name.value + ' (на основании решения суда № ' + this.id + ')</span></td>' +
            '<td><span>' + makeRubText_nominative(this.claim[i].summ) + '</span></td>' +
            '<td><span>' + this.claim[i].penalty_day_form + '</span></td>' +
            '<td><span>' + this.getPayDateFormatted() + '</span></td>' +
            '<td><span>' + declinationDays(this.claim[i].days_delay) + '</span></td>' +
            '<td><span>' + makeRubText_nominative(this.claim[i].penalty_summ) + '</span></td>' +
          '</tr>';

          $('#str_payment_dataled').append(str_payment_dataled);
        }
      }
    }
  }

  toString() {
    return this.id +
           "\nФУ: " + this.fu +
           "\nДата решения: " + formatDate(new Date(this.date)) +
           ".\nНомер решения: " + this.number +
           ".\nДата исполнения: " + formatDate(new Date(this.pay_date)) +
           ".\nТребование 1: " + this.claim[0].name +
           ".\nТребование 1: " + makeRubText_nominative(this.claim[0].summ);
  }
}
