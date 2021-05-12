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
  summ
  from
  to
  without

  constructor(id, name, summ, from, to, without) {
    this.id = id;
    this.name = name;
    this.summ = summ;
    this.from = from;
    this.to = to;
    this.without = without;
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

  days_delay
  penalty_summ

  last_day
  penalty_day

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
    //Получение количества удовлетворенных требований для каждого решения
    var number_of_claims = $('.fu_claim_' + id).length;
    var names = $('.fu_claim_' + id); //Получение массива требований
    var summs = $('.fu_claim_summ_' + id); //Получение массива дат решений
    var froms = $('.date_fu_penalty_from_' + id); //Получение массива дат начала периода судебных неустоек
    var tos = $('.date_fu_penalty_to_' + id); //Получение массива дат конца периода судебных неустоек
    var without_periods = $('.fu_without_period_' + id); //Получение массива неустоек без периода
    for (var i = 0; i < number_of_claims; i++) {
      this.claim[i] = new ClaimFu(i + 1,
                                  names[i],
                                  summs[i],
                                  froms[i],
                                  tos[i],
                                  without_periods[i]);
    }
  }

    //Вычисление количества дней между датой выплаты и 20м днем
  //   switch (this.type.options.selectedIndex) {
  //     case 0:
  //       this.days_delay = (this.date - date_sv.getLastDay()) / DAY;
  //       this.last_day = date_sv.getLastDayFormatted();
  //       this.penalty_day = date_sv.getPenaltyDayFormatted();
  //       break;
  //     case 1:
  //       this.days_delay = (this.date - date_uts.getLastDay()) / DAY;
  //       this.last_day = date_uts.getLastDayFormatted();
  //       this.penalty_day = date_uts.getPenaltyDayFormatted();
  //       break;
  //     case 2:
  //       this.days_delay = (this.date - date_ev.getLastDay()) / DAY;
  //       this.last_day = date_ev.getLastDayFormatted();
  //       this.penalty_day = date_ev.getPenaltyDayFormatted();
  //       break;
  //     case 3:
  //       this.days_delay = (this.date - date_stor.getLastDay()) / DAY;
  //       this.last_day = date_stor.getLastDayFormatted();
  //       this.penalty_day = date_stor.getPenaltyDayFormatted();
  //       break;
  //   }
  //   //Если выплата была в срок, то изменение отрицательного значения на нулевое
  //   if (this.days_delay < 0 || isNaN(this.days_delay)) {
  //     this.days_delay = 0;
  //   }
  //   //Вычисление суммы неустойки
  //   this.penalty_summ = this.summ * this.days_delay * 0.01;
  //   if (isNaN(this.penalty_summ)) {
  //     this.penalty_summ = 0;
  //   }

  //
  // getDateFormatted() { return formatDate(new Date(this.date)); }
  //
  // fillPayments() {
  //   if (this.type.selectedIndex != 4) {
  //     let str_payment_dataled = '<tr>' +
  //       '<th scope="row"><span>' + this.id + '</span></th>' +
  //       '<td><span>' + this.type.value + ' (добровольно)</span></td>' +
  //       '<td><span>' + makeRubText_genitive(this.summ) + '</span></td>' +
  //       '<td><span>' + this.penalty_day + '</span></td>' +
  //       '<td><span>' + this.getDateFormatted() + '</span></td>' +
  //       '<td><span>' + declinationDays(this.days_delay) + '</span></td>' +
  //       '<td><span>' + makeRubText_nominative(this.penalty_summ) + '</span></td>' +
  //     '</tr>';
  //
  //     $('#str_payment_dataled').append(str_payment_dataled);
  //   } else {
  //     let str_payment_dataled = '<tr>' +
  //       '<th scope="row"><span>' + this.id + '</span></th>' +
  //       '<td><span>' + this.type.value + ' (добровольно)</span></td>' +
  //       '<td colspan="5"><span>' + makeRubText_nominative(this.summ) + '</span></td>' +
  //     '</tr>';
  //
  //     $('#str_payment_dataled').append(str_payment_dataled);
  //   }
  // }

  // getInForceDate() {return findInForceFuDay(this.date); }
  // getInForceDateFormatted() {return formatDate(new Date(this.getInForceDate())); }
  // getLastDateForPayFu() {return findLastDayForPayFu(this.getInForceDate()); }
  // getLastDateForPayFuFormatted() {return formatDate(new Date(this.getLastDateForPayFu())); }

  getDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
  getDateFormatted() { return formatDate(new Date(this.getDate())); }
  getInForceDate(){ return findInForceFuDay(this.getDate()); }
  getInForceDateFormatted(){ return formatDate(new Date(this.getInForceDate()));}
  getLastDayForPayFu(){ return findLastDayForPayFu(this.getInForceDate()); }
  getLastDayForPayFuFormatted(){ return formatDate(new Date(this.getLastDayForPayFu())); }

  fillDates() {
    this.in_force_date.innerHTML = "";
    this.last_day_for_pay_date.innerHTML = "";

    if (!isNaN(findInForceFuDay(this.getDate()))) {
      this.in_force_date.innerHTML = this.getInForceDateFormatted();
      this.last_day_for_pay_date.innerHTML = this.getLastDayForPayFuFormatted();
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
