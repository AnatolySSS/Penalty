import { makeRubText_nominative } from './makeRubText_nominative.js';
import { makeRubText_genitive } from './makeRubText_genitive.js';
import { declinationDays } from './declinationDays.js';
import { changeDateType } from './changeDateType.js';
import { formatDate } from './formatDate.js';
import { AppDate } from './app_date.js';
import { DAY } from './variables.js';

/* Объект для добровольной выплаты

    * id - порядковый № выплаты
    * type - тип выплаты
    * date - дата выплаты
    * summ - сумма выплаты
    * order - № платежного поручения
    * ndfl - булево значение, если при выплате неустойки был удержан НДФЛ
    * ndfl_summ - сумма удержанного НДФЛ
    * ndfl_percent - процент удержанного НДФЛ
    * days_delay - количество дней просрочки
    * penalty_summ - сумма неустойки

    * last_day - последний день 20го срока
    * penalty_day - первый день начисления неустойки (21й день)
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
    //Если при выплате неустойки был удержан НДФЛ
    if (this.ndfl) {
      this.summ = this.summ + this.ndfl_summ;
    }

  }

  getDateFormatted() { return formatDate(new Date(this.date)); }

  fillPayments() {
    if (!isNaN(this.date)) {
      if (this.type.selectedIndex != 4) {
        let number_of_payment_rows = $('.payment_row').length; //Получение количества строк с выплатами
        let str_payment_dataled = '<tr role="button" class = "payment_row">' +
          '<th scope="row"><span>' + (number_of_payment_rows + 1) + '</span></th>' +
          '<td><span>' + this.type.value + ' (добровольно)</span></td>' +
          '<td><span>' + makeRubText_nominative(this.summ) + '</span></td>' +
          '<td><span>' + this.penalty_day + '</span></td>' +
          '<td><span>' + this.getDateFormatted() + '</span></td>' +
          '<td><span>' + declinationDays(this.days_delay) + '</span></td>' +
          '<td><span>' + makeRubText_nominative(this.penalty_summ) + '</span></td>' +
        '</tr>';

        $('#str_payment_dataled').append(str_payment_dataled);

        //Добавление подсказки для даты и количества днея просрочки
        if (this.days_delay <= 0) {
          $('#str_payment_dataled').children().last().css({"color" : "#28a745"});
          $('#str_payment_dataled').children().last().children().eq(3).attr('tooltip-green', '21й день');
          $('#str_payment_dataled').children().last().children().eq(4).attr('tooltip-green', 'Дата осуществления выплаты');
          $('#str_payment_dataled').children().last().children().eq(5).attr('tooltip-green', 'Выплата осуществлена в срок');
        } else {
          $('#str_payment_dataled').children().last().css({"color" : "#dc3545"});
          $('#str_payment_dataled').children().last().children().eq(3).attr('tooltip', '21й день');
          $('#str_payment_dataled').children().last().children().eq(4).attr('tooltip', 'Дата осуществления выплаты');
          $('#str_payment_dataled').children().last().children().eq(5).attr('tooltip', 'Количество дней просрочки');
        }
      } else {
        let number_of_payment_rows = $('.payment_row').length; //Получение количества строк с выплатами
        let str_payment_dataled = '<tr role="button" class = "payment_row">' +
          '<th scope="row"><span>' + (number_of_payment_rows + 1) + '</span></th>' +
          '<td><span>' + this.type.value + ' (добровольно)</span></td>' +
          '<td colspan="5"><span>' + makeRubText_nominative(this.summ) + '</span></td>' +
        '</tr>';

        $('#str_payment_dataled').append(str_payment_dataled);
      }
    }
  }

  toString() {
    return "Тип: " + this.type +
           ".\nДата выплаты: " + this.getDateFormatted() +
           ".\nСумма выплаты: " + this.summ +
           ".\nКоличество дней просрочки: " + this.days_delay +
           ".\nСумма неустойки: " + this.penalty_summ;
  }
}
