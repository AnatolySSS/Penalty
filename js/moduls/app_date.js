import { findLastDay } from './findLastDay.js';
import { changeDateType } from './changeDateType.js';
import { formatDate } from './formatDate.js';
import { DAY, COLUMN_NAME_20, COLUMN_NAME_21} from './variables.js';
import { holly_boolen } from './findLastDay.js';

export class AppDate {

  date_id
  date_last_day_id
  date_penalty_day_id
  count_days

  constructor(date_id, date_last_day_id, date_penalty_day_id){
    this.date_id = date_id;
    this.date_last_day_id = date_last_day_id;
    this.date_penalty_day_id = date_penalty_day_id;
    this.count_days = (this.getPenaltyDay() - this.getAppDate()) / DAY;
  }

  getAppDate() {return Date.parse(changeDateType(this.date_id.val()) + 'T00:00:00') }
  getAppDateFormatted() { return formatDate(new Date(this.getAppDate())); }
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
  }
}
