import { findLastDay } from './findLastDay.js';
import { formatDate } from './formatDate.js';
import { DAY, COLUMN_NAME_20, COLUMN_NAME_21} from './variables.js';
import { holly_boolen } from './findLastDay.js';

export class AppDate {

  date_id
  date_last_day_id
  date_penalty_day_id

  constructor(date_id, date_last_day_id, date_penalty_day_id){
    this.date_id = date_id;
    this.date_last_day_id = date_last_day_id;
    this.date_penalty_day_id = date_penalty_day_id;
  }

  getLastDay() { return findLastDay(this.date_id.val()); }
  getLastDayFormatted() { return formatDate(new Date(this.getLastDay())); }
  getPenaltyDay() { return this.getLastDay() + DAY; }
  getPenaltyDayFormatted() { return formatDate(new Date(this.getPenaltyDay())); }

  fillLastDate() {
    this.date_last_day_id.removeAttr('tooltip');
    this.date_last_day_id.html("");
    this.date_penalty_day_id.html("");
    this.date_last_day_id.css({"color" : "#212529"});

    if (!isNaN(findLastDay(this.date_id.val()))) {
      $('#COLUMN_NAME_20').html(COLUMN_NAME_20);
      $('#COLUMN_NAME_21').html(COLUMN_NAME_21);
      this.date_last_day_id.html(this.getLastDayFormatted());
      this.date_penalty_day_id.html(this.getPenaltyDayFormatted());
      if (holly_boolen) {
        this.date_last_day_id.css({"color" : "#b00000"});
        this.date_last_day_id.attr('tooltip', '193 ГК РФ');
      }
    }

    //Функция добавление всплывающей подсказки 20-й и 21-й дни
    $(function () { $('[data-toggle="tooltip"]').tooltip(); })
  }
}
