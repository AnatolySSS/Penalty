import { findLastDay } from './findLastDay.js';
import { formatDate } from './formatDate.js';
import { DAY, COLUMN_NAME_20, COLUMN_NAME_21} from './variables.js';
import { holly_boolen } from './findLastDay.js';

export class AppDate {

  date
  date_last_day
  date_penalty_day
  
  date_id
  date_last_day_id
  date_penalty_day_id

  constructor(date_id,
              date_last_day_id,
              date_penalty_day_id){
    date_id = date_id;
    date_last_day_id = date_last_day_id;
    date_penalty_day_id = date_penalty_day_id;
  }

  countDateLastDay(){
    date = date_id.val();
    return date_last_day = findLastDay(date);
  }

  fillLastDate(){
    date_last_day_id.removeAttr('tooltip');
    date_last_day_id.html("");
    date_penalty_day_id.html("");
    date_last_day_id.css({"color" : "#595b5e"});

    countDateLastDay();
    if (holly_boolen) {
      date_last_day_id.css({"color" : "#b00000"});
      date_last_day_id.attr('tooltip', '193 ГК РФ');
    }
    date_penalty_day = date_last_day + DAY;

    if (!isNaN(date_last_day_id)) {
      date_last_day_id.html(formatDate(new Date(date_last_day)));
      date_penalty_day_id.html(formatDate(new Date(date_penalty_day)));
      $('#COLUMN_NAME_20').html(COLUMN_NAME_20);
      $('#COLUMN_NAME_21').html(COLUMN_NAME_21);
    }
  }
}
