import { makeRubText_nominative } from './makeRubText_nominative.js';
import { makeRubText_genitive } from './makeRubText_genitive.js';
import { declinationDays } from './declinationDays.js';
import { changeDateType } from './changeDateType.js';
import { formatDate } from './formatDate.js';
import { courtPenalty } from './variables.js';
import { CourtPenalty } from './court_penalty.js';
import { AppDate } from './app_date.js';
import { COLUMN_NAME_0, COLUMN_NAME_1, COLUMN_NAME_2, COLUMN_NAME_3, COLUMN_NAME_4 } from './variables.js';
import { COLUMN_NAME_5, COLUMN_NAME_6, COLUMN_NAME_7, COLUMN_NAME_8 } from './variables.js';
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

class PenaltyCourtPeriod {
  start_date
  end_date

  constructor(start_date, end_date){
    this.start_date = start_date;
    this.end_date = end_date;
  }
}

class PenaltyPeriod {
  start_date
  end_date
  days_delay
  penalty_summ

  constructor(start_date, end_date){
    this.start_date = start_date;
    this.end_date = end_date;
  }
  getStartDateFormatted() { return formatDate(new Date(this.start_date)); }
  getEndDateFormatted() { return formatDate(new Date(this.end_date)); }
}

export class PaymentVoluntary {

  id

  type
  date
  summ
  order

  ndfl
  ndfl_summ
  ndfl_percent

  app_day
  app_day_form
  last_day
  last_day_form
  penalty_day
  penalty_day_form

  days_delay
  penalty_summ

  penalty_period = [];
  penalty_court_period = [];

  count_days

  constructor(id, type, date, summ, ndfl, ndfl_summ){

    //Получение массива значений всех переменных решений судов
    var number_of_courts = $('.courts').length; //Получение количества строк с выплатами
    var court_dates = $('.court_dates'); //Получение массива дат решений судов
    var numberOfPenaltyCourtPeriod = 0;
    var numberOfPenaltyPeriod = 0;
    //Создание экземпляров решений ФУ
    for (var i = 0; i < number_of_courts; i++) {
      courtPenalty[i] = new CourtPenalty(i + 1,
                                   court_dates[i]);
     for (var j = 0; j < courtPenalty[i].claim.length; j++) {
       if (courtPenalty[i].claim[j].name.options.selectedIndex == 4) {
         this.penalty_court_period[numberOfPenaltyCourtPeriod] = new PenaltyCourtPeriod(courtPenalty[i].claim[j].from,
                                                                       courtPenalty[i].claim[j].to);
         numberOfPenaltyCourtPeriod++;
       }
     }
    }

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
        this.app_day = date_sv.getAppDate();
        this.app_day_form = date_sv.getAppDateFormatted();
        this.last_day = date_sv.getLastDay();
        this.last_day_form = date_sv.getLastDayFormatted();
        this.penalty_day = date_sv.getPenaltyDay();
        this.penalty_day_form = date_sv.getPenaltyDayFormatted();
        break;
      case 1:
        this.app_day = date_uts.getAppDate();
        this.app_day_form = date_uts.getAppDateFormatted();
        this.last_day = date_uts.getLastDay();
        this.last_day_form = date_uts.getLastDayFormatted();
        this.penalty_day = date_uts.getPenaltyDay();
        this.penalty_day_form = date_uts.getPenaltyDayFormatted();
        break;
      case 2:
        this.app_day = date_ev.getAppDate();
        this.app_day_form = date_ev.getAppDateFormatted();
        this.last_day = date_ev.getLastDay();
        this.last_day_form = date_ev.getLastDayFormatted();
        this.penalty_day = date_ev.getPenaltyDay();
        this.penalty_day_form = date_ev.getPenaltyDayFormatted();
        break;
      case 3:
        this.app_day = date_stor.getAppDate();
        this.app_day_form = date_stor.getAppDateFormatted();
        this.last_day = date_stor.getLastDay();
        this.last_day_form = date_stor.getLastDayFormatted();
        this.penalty_day = date_stor.getPenaltyDay();
        this.penalty_day_form = date_stor.getPenaltyDayFormatted();
        break;
    }
    //количество дней задержки выплаты
    this.days_delay = (this.date - this.last_day) / DAY;
    //количество дней со дня первоначального обращения с заявлением о страховой выплате (для графика)
    this.count_days = (this.date - date_sv.getAppDate()) / DAY;
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

    //Алгоритм для определения периодов судебного взыскания неустойки
    if (this.penalty_court_period.length > 0 && this.days_delay > 0) {
      this.penalty_summ = 0;
      for (var i = 0; i < this.penalty_court_period.length; i++) {
        //алгоритм для первого судебного периода взыскания неустойки
        if (i == 0) {
          //Вычисление самого первого периода невзысканной судом неустойки (с 21го дня)
          if (this.penalty_court_period[i].start_date > this.penalty_day) {
            this.penalty_period[numberOfPenaltyPeriod] = new PenaltyPeriod(this.penalty_day,
                                                                          this.penalty_court_period[i].start_date - DAY);
            //Определение самого раннего начала судебного периода взыскания неустойки
            for (var j = i + 1; j < this.penalty_court_period.length; j++) {
              if (this.penalty_court_period[j].start_date <= this.penalty_period[numberOfPenaltyPeriod].end_date) {
                this.penalty_period[numberOfPenaltyPeriod].end_date = this.penalty_court_period[j].start_date - DAY;
              }
            }
            //Определение количества дней просрочки
            this.penalty_period[numberOfPenaltyPeriod].days_delay =
            (this.penalty_period[numberOfPenaltyPeriod].end_date - this.penalty_period[numberOfPenaltyPeriod].start_date + DAY) / DAY;
            //Если количество дней просрочки равно или больше 0,
            //то происводится расчет суммы неустойки,
            //в противном случае элемент массива с невзысканным периодом неустойки удаляется
            if (this.penalty_period[numberOfPenaltyPeriod].days_delay > 0) {
              this.penalty_period[numberOfPenaltyPeriod].penalty_summ =
              this.summ * this.penalty_period[numberOfPenaltyPeriod].days_delay * 0.01;
              numberOfPenaltyPeriod++;
            } else {
              delete this.penalty_period[numberOfPenaltyPeriod]
            }
          }
        }
        //Вычисление второго и последующих периодов невзысканной судом неустойки
        if (this.penalty_court_period[i].end_date < this.date) {
          if (this.penalty_court_period[i].end_date < this.penalty_day) {
            this.penalty_period[numberOfPenaltyPeriod] = new PenaltyPeriod(this.penalty_day,
                                                                          this.date);
          } else {
            this.penalty_period[numberOfPenaltyPeriod] = new PenaltyPeriod(this.penalty_court_period[i].end_date + DAY,
                                                                          this.date);
          }

          //Определение самого раннего начала следующего за первым судебного периода взыскания неустойки
          for (var j = i + 1; j < this.penalty_court_period.length; j++) {
            if (this.penalty_court_period[j].start_date <= this.penalty_period[numberOfPenaltyPeriod].end_date) {
              this.penalty_period[numberOfPenaltyPeriod].end_date = this.penalty_court_period[j].start_date - DAY;
            }
          }
          //Определение количества дней просрочки
          this.penalty_period[numberOfPenaltyPeriod].days_delay =
          (this.penalty_period[numberOfPenaltyPeriod].end_date - this.penalty_period[numberOfPenaltyPeriod].start_date + DAY) / DAY;
          //Если количество дней просрочки равно или больше 0,
          //то происводится расчет суммы неустойки,
          //в противном случае элемент массива с невзысканным периодом неустойки удаляется
          if (this.penalty_period[numberOfPenaltyPeriod].days_delay > 0) {
            this.penalty_period[numberOfPenaltyPeriod].penalty_summ =
            this.summ * this.penalty_period[numberOfPenaltyPeriod].days_delay * 0.01;
            numberOfPenaltyPeriod++;
          } else {
            this.penalty_period.splice(numberOfPenaltyPeriod, 1);
          }
        }
      }
      for (var i = 0; i < this.penalty_period.length; i++) {
        this.penalty_summ = this.penalty_summ + this.penalty_period[i].penalty_summ;
      }
    }
  }

  getDateFormatted() { return formatDate(new Date(this.date)); }

  fillPayments() {
    var str_payment_dataled_helper = '';
    var str_payment_dataled = '';
    var number_of_payment_rows;
    if (!isNaN(this.date)) {
      if (this.type.selectedIndex != 4) {
        number_of_payment_rows = $('.payment_row').length; //Получение количества строк с выплатами
        if (this.penalty_period.length > 0 && this.days_delay > 0) {
          for (var i = 0; i < this.penalty_period.length; i++) {
            str_payment_dataled_helper = str_payment_dataled_helper +
            '<td><span>' + formatDate(new Date(this.penalty_period[i].start_date)) + '</span></td>' +
            '<td><span>' + formatDate(new Date(this.penalty_period[i].end_date)) + '</span></td>' +
            '<td><span>' + declinationDays(this.penalty_period[i].days_delay) + '</span></td>' +
            '<td><span><b>' + makeRubText_nominative(this.penalty_period[i].penalty_summ) + '</b></span></td>';
          }
          str_payment_dataled = '<tr role="button" class = "payment_row">' +
            '<th scope="row"><span>' + (number_of_payment_rows + 1) + '</span></th>' +
            '<td><span>' + this.type.value + ' <b>(добровольно)</b></span></td>' +
            '<td><span>' + makeRubText_nominative(this.summ) + '</span></td>' +
            str_payment_dataled_helper +
          '</tr>';

          $('#str_payment_dataled').append(str_payment_dataled);

         //Добавление подсказки для даты и количества днея просрочки
          $('#str_payment_dataled').children().last().css({"color" : "#dc3545"});
          for (var i = 0; i < this.penalty_period.length; i++) {
            $('#str_payment_dataled').children().last().children().eq(3 + i * 4).attr('tooltip', 'Начало периода № ' + (i + 1));
            $('#str_payment_dataled').children().last().children().eq(4 + i * 4).attr('tooltip', 'Конец периода № ' + (i + 1));
            $('#str_payment_dataled').children().last().children().eq(5 + i * 4).attr('tooltip', 'Количество дней просрочки');
          }
        } else {
          str_payment_dataled = '<tr role="button" class = "payment_row">' +
            '<th scope="row"><span>' + (number_of_payment_rows + 1) + '</span></th>' +
            '<td><span>' + this.type.value + ' <b>(добровольно)</b></span></td>' +
            '<td><span>' + makeRubText_nominative(this.summ) + '</span></td>' +
            '<td><span>' + this.penalty_day_form + '</span></td>' +
            '<td><span>' + this.getDateFormatted() + '</span></td>' +
            '<td><span>' + declinationDays(this.days_delay) + '</span></td>' +
            '<td><span><b>' + makeRubText_nominative(this.penalty_summ) + '</b></span></td>' +
          '</tr>';

          $('#str_payment_dataled').append(str_payment_dataled);

          //Добавление подсказки для даты и количества дней просрочки
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
        }
      } else {
        number_of_payment_rows = $('.payment_row').length; //Получение количества строк с выплатами
        str_payment_dataled = '<tr role="button" class = "payment_row">' +
          '<th scope="row"><span>' + (number_of_payment_rows + 1) + '</span></th>' +
          '<td><span>' + this.type.value + ' <b>(добровольно)</b></span></td>' +
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
