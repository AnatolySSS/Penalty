import { makeRubText_nominative } from './makeRubText_nominative.js';
import { makeRubText_genitive } from './makeRubText_genitive.js';
import { declinationDays } from './declinationDays.js';
import { changeDateType } from './changeDateType.js';
import { formatDate } from './formatDate.js';
import { findInForceFuDay, findLastDayForPayFu } from './findInForceFuDay.js';
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

class ClaimFu {
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

export class PaymentFu {

  id

  fu
  date
  number
  order

  pay_date
  in_force_date
  last_day_for_pay_date

  claim = [];

  total_penalty_summ_fu

  constructor(id, fu, date, number, pay_date, in_force_date, last_day_for_pay_date) {

    this.id = id;
    this.fu = fu;
    //обработка значения даты решения ФУ (преобразование в количество миллисекунд)
    this.date = date;
    //редактирвоание значений суммы выплаты (удаление пробелов, преобразование к числовому типу)
    this.number = number;
    //обработка значения даты исполнения решения ФУ (преобразование в количество миллисекунд)
    this.pay_date = pay_date;
    this.in_force_date = in_force_date;
    this.last_day_for_pay_date = last_day_for_pay_date;

    this.total_penalty_summ_fu = 0;
    //Получение количества удовлетворенных требований для каждого решения
    var number_of_payments = $('div.payments').length; //Получение количества строк с выплатами
    var number_of_claims = $('.fu_claim_' + id).length;
    var names = $('.fu_claim_' + id); //Получение массива требований
    var types = $('.fu_claim_type_' + id); //Получение массива требований
    var summs = $('.fu_claim_summ_' + id); //Получение массива дат решений
    var froms = $('.date_fu_penalty_from_' + id); //Получение массива дат начала периода судебных неустоек
    var tos = $('.date_fu_penalty_to_' + id); //Получение массива дат конца периода судебных неустоек
    var without_periods = $('.fu_without_period_' + id); //Получение массива неустоек без периода
    for (var i = 0; i < number_of_claims; i++) {
      this.claim[i] = new ClaimFu(i + 1,
                                  names[i],
                                  types[i],
                                  summs[i],
                                  froms[i],
                                  tos[i],
                                  without_periods[i]);
      //Если решение ФУ исполнено не в срок, то начисляется неустойка с 21го дня, если в срок, то неустойка равна 0
      if (this.getPayDate() > this.getLastDayForPayFu()) {
        this.claim[i].days_delay = (this.getPayDate() - this.claim[i].last_day) / DAY;
      } else {
        this.claim[i].days_delay = 0;
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
      this.total_penalty_summ_fu = this.total_penalty_summ_fu + this.claim[i].penalty_summ;
    }
  }

  getDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
  getDateFormatted() { return formatDate(new Date(this.getDate())); }
  getPayDate() {return Date.parse(changeDateType(this.pay_date.value) + 'T00:00:00');}
  getPayDateFormatted() { return formatDate(new Date(this.getPayDate())); }

  getInForceDate(){ return findInForceFuDay(this.getDate()); }
  getInForceDateFormatted(){ return formatDate(new Date(this.getInForceDate()));}
  getLastDayForPayFu(){ return findLastDayForPayFu(this.getInForceDate()); }
  getLastDayForPayFuFormatted(){ return formatDate(new Date(this.getLastDayForPayFu())); }

  //Вывод на экран значений дня вступления в силу и последнего дня для исполнения решения ФУ
  fillDates() {
    this.in_force_date.innerHTML = "";
    this.last_day_for_pay_date.innerHTML = "";

    if (!isNaN(findInForceFuDay(this.getDate()))) {
      this.in_force_date.innerHTML = this.getInForceDateFormatted();
      this.last_day_for_pay_date.innerHTML = this.getLastDayForPayFuFormatted();
    }
  }

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
            '<td><span>' + this.claim[i].name.value + ' (на основании решения ФУ № ' + this.id + ')</span></td>' +
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
