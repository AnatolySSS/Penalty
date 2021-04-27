import { makeRubText_nominative } from './makeRubText_nominative.js';
import { makeRubText_genitive } from './makeRubText_genitive.js';
import { declinationDays } from './declinationDays.js';
import { changeDateType } from './changeDateType.js';
import { formatDate } from './formatDate.js';
import { AppDate } from './app_date.js';
import { DAY } from './variables.js';

/* Объект для добровольной выплаты
    * pay_vol_type - тип выплаты
    * pay_vol_date - дата выплаты
    * pay_vol_summ - сумма выплаты
    * pay_vol_order - № платежного поручения
    * pay_vol_with_ndfl - булево значение, если при выплате неустойки был удержан НДФЛ
    * pay_vol_ndfl_summ - сумма удержанного НДФЛ
    * pay_vol_ndfl_percent - процент удержанного НДФЛ
*/
const date_sv = new AppDate($('#app_date_1'), $('#date_sv_last_day'), $('#date_sv_penalty_day'));
const date_uts = new AppDate($('#app_date_2'), $('#date_uts_last_day'), $('#date_uts_penalty_day'));
const date_ev = new AppDate($('#app_date_3'), $('#date_ev_last_day'), $('#date_ev_penalty_day'));
const date_stor = new AppDate($('#app_date_4'), $('#date_stor_last_day'), $('#date_stor_penalty_day'));

export class PaymentVoluntary {

  id

  type
  date
  summ
  order

  ndfl
  ndfl_summ
  ndfl_percent

  days_delay
  penalty_summ

  last_day
  penalty_day

  constructor(id, type, date, summ, ndfl, ndfl_summ){

    this.id = id;
    this.type = type;
    //обработка значения даты выплаты (преобразование в количество миллисекунд)
    this.date = Date.parse(changeDateType(date.value) + 'T00:00:00');
    //редактирвоание значений суммы выплаты (удаление пробелов, преобразование к числовому типу)
    this.summ = Number(summ.value.replace(/\s+/g, ''));
    this.ndfl = ndfl;
    //редактирование значения суммы НДФЛ (удаление пробелов, преобразование к числовому типу)
    this.ndfl_summ = Number(ndfl_summ.value.replace(/\s+/g, ''));
    //Вычисление количества дней между датой выплаты и 20м днем
    switch (this.type.options.selectedIndex) {
      case 0:
        this.days_delay = (this.date - date_sv.getLastDay()) / DAY;
        this.last_day = date_sv.getLastDayFormatted();
        this.penalty_day = date_sv.getPenaltyDayFormatted();
        break;
      case 1:
        this.days_delay = (this.date - date_uts.getLastDay()) / DAY;
        this.last_day = date_uts.getLastDayFormatted();
        this.penalty_day = date_uts.getPenaltyDayFormatted();
        break;
      case 2:
        this.days_delay = (this.date - date_ev.getLastDay()) / DAY;
        this.last_day = date_ev.getLastDayFormatted();
        this.penalty_day = date_ev.getPenaltyDayFormatted();
        break;
      case 3:
        this.days_delay = (this.date - date_stor.getLastDay()) / DAY;
        this.last_day = date_stor.getLastDayFormatted();
        this.penalty_day = date_stor.getPenaltyDayFormatted();
        break;
    }
    //Если выплата была в срок, то изменение отрицательного значения на нулевое
    if (this.days_delay < 0 || isNaN(this.days_delay)) {
      this.days_delay = 0;
    }
    //Вычисление суммы неустойки
    this.penalty_summ = this.summ * this.days_delay * 0.01;
    if (isNaN(this.penalty_summ)) {
      this.penalty_summ = 0;
    }
  }

  getDateFormatted() { return formatDate(new Date(this.date)); }

  makeTable() {
    let str_payment_dataled = '<tr>' +
      '<th scope="row"><span>' + this.id + '</span></th>' +
      '<td><span>' + this.type.value + '</span></td>' +
      '<!-- <td><span>' + this.getDateFormatted() + '</span></td> -->' +
      '<td><span>' + makeRubText_genitive(this.summ) + '</span></td>' +
      '<td><span>' + this.penalty_day + '</span></td>' +
      '<td><span>' + this.getDateFormatted() + '</span></td>' +
      '<td><span>' + declinationDays(this.days_delay) + '</span></td>' +
      '<td><span>' + makeRubText_nominative(this.penalty_summ) + '</span></td>' +
    '</tr>';

    $('#str_payment_dataled').append(str_payment_dataled);
  }

  toString() {
    return "Тип: " + this.type +
           ".\nДата выплаты: " + this.getDateFormatted() +
           ".\nСумма выплаты: " + this.summ +
           ".\nКоличество дней просрочки: " + this.days_delay +
           ".\nСумма неустойки: " + this.penalty_summ;
  }
}
