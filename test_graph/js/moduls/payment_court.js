import { makeRubText_nominative } from './makeRubText_nominative.js';
import { makeRubText_genitive } from './makeRubText_genitive.js';
import { declinationDays } from './declinationDays.js';
import { changeDateType } from './changeDateType.js';
import { formatDate } from './formatDate.js';
import { findInForceFuDay, findLastDayForPayFu } from './findInForceFuDay.js';
import { paymentFu } from './variables.js';
import { PaymentFu } from './payment_fu.js';
import { courtPenalty } from './variables.js';
import { CourtPenalty } from './court_penalty.js';
import { AppDate } from './app_date.js';
import { COLUMN_NAME_0, COLUMN_NAME_1, COLUMN_NAME_2, COLUMN_NAME_3, COLUMN_NAME_4 } from './variables.js';
import { COLUMN_NAME_5, COLUMN_NAME_6, COLUMN_NAME_7, COLUMN_NAME_8 } from './variables.js';
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
// let date_sv = new AppDate("date_sv")
// let date_uts = new AppDate("date_uts")
// let date_ev = new AppDate("date_ev")
// let date_stor = new AppDate("date_stor")

class PenaltyCourtPeriod {
  start_date
  end_date

  constructor(start_date, end_date){
    this.start_date = start_date;
    this.end_date = end_date;
  }
  getStartDateFormatted() { return formatDate(new Date(this.start_date)); }
  getEndDateFormatted() { return formatDate(new Date(this.end_date)); }
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

class ClaimCourt {
  id

  date_sv
  date_uts
  date_ev
  date_stor

  name
  type
  summ
  from
  to
  without

  last_day
  last_day_form
  penalty_day
  penalty_day_form

  days_delay
  penalty_summ

  penalty_period = [];

  constructor(id, name, type, summ, from, to, without) {

    this.date_sv = new AppDate("date_sv")
    this.date_uts = new AppDate("date_uts")
    this.date_ev = new AppDate("date_ev")
    this.date_stor = new AppDate("date_stor")

    this.id = id;
    this.name = name;
    this.type = type;
    this.summ = Number(summ.value.replace(/\s+/g, ''));
    this.from = Date.parse(changeDateType(from.value) + 'T00:00:00');
    this.to = Date.parse(changeDateType(to.value) + 'T00:00:00');
    this.without = without;

    //Вычисление количества дней между датой выплаты и 20м днем
    switch (this.name.options.selectedIndex) {
      case 1:
      case 5:
        this.app_day = this.date_sv.getAppDate();
        this.app_day_form = this.date_sv.getAppDateFormatted();
        this.last_day = this.date_sv.getLastDay();
        this.last_day_form = this.date_sv.getLastDayFormatted();
        this.penalty_day = this.date_sv.getPenaltyDay();
        this.penalty_day_form = this.date_sv.getPenaltyDayFormatted();
        break;
      case 2:
        this.app_day = this.date_uts.getAppDate();
        this.app_day_form = this.date_uts.getAppDateFormatted();
        this.last_day = this.date_uts.getLastDay();
        this.last_day_form = this.date_uts.getLastDayFormatted();
        this.penalty_day = this.date_uts.getPenaltyDay();
        this.penalty_day_form = this.date_uts.getPenaltyDayFormatted();
        break;
      case 3:
        this.app_day = this.date_ev.getAppDate();
        this.app_day_form = this.date_ev.getAppDateFormatted();
        this.last_day = this.date_ev.getLastDay();
        this.last_day_form = this.date_ev.getLastDayFormatted();
        this.penalty_day = this.date_ev.getPenaltyDay();
        this.penalty_day_form = this.date_ev.getPenaltyDayFormatted();
        break;
      case 4:
        this.app_day = this.date_stor.getAppDate();
        this.app_day_form = this.date_stor.getAppDateFormatted();
        this.last_day = this.date_stor.getLastDay();
        this.last_day_form = this.date_stor.getLastDayFormatted();
        this.penalty_day = this.date_stor.getPenaltyDay();
        this.penalty_day_form = this.date_stor.getPenaltyDayFormatted();
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
  penalty_court_period = [];
  max_penalty_period
  max_days_delay
  count_days
  fu_claim_set
  fu_claim_set_type

  constructor(id, court, number, date, in_force_date, pay_date) {

    //Получение массива значений всех переменных решений ФУ
    var number_of_fus = $('.fus').length; //Получение количества строк с выплатами
    var fu_names = $('.fu_names'); //Получение массива ФУ
    var fu_types = $('.fu_types'); //Получение массива дат решений ФУ
    var fu_dates = $('.fu_dates'); //Получение массива дат решений ФУ
    var fu_numbers = $('.fu_numbers'); //Получение массива номеров решений ФУ

    var fu_app_dates = $('.fu_app_dates'); //Получение массива номеров решений ФУ
    var fu_orders = $('.fu_orders'); //Получение массива номеров решений ФУ

    var fu_pay_dates = $('.fu_pay_dates'); //Получение массива дат решений ФУ
    var fu_in_force_dates = $('.fu_in_force_dates'); //Получение массива дат решений ФУ
    var fu_last_day_for_pay_dates = $('.fu_last_day_for_pay_dates'); //Получение массива дат решений ФУ

    var add_fu_info_suspension_types = $('.add_fu_info_suspension_types'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_dates = $('.add_fu_info_suspension_dates'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_numbers = $('.add_fu_info_suspension_numbers'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_court_names = $('.add_fu_info_suspension_court_names'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_court_numbers = $('.add_fu_info_suspension_court_numbers'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_court_results = $('.add_fu_info_suspension_court_results'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_court_dates = $('.add_fu_info_suspension_court_dates'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_court_date_end_forms = $('.add_fu_info_suspension_court_date_end_forms'); //Получение массива номеров решений ФУ
    var add_fu_info_suspension_court_date_in_forces = $('.add_fu_info_suspension_court_date_in_forces'); //Получение массива номеров решений ФУ

    this.fu_claim_set = new Set();
    this.fu_claim_set.clear();

    //Создание экземпляров решений ФУ
    for (var i = 0; i < number_of_fus; i++) {
      paymentFu[i] = new PaymentFu(i + 1,
                                 fu_names[i],
                                 fu_types[i],
                                 fu_dates[i],
                                 fu_numbers[i],
                                 fu_app_dates[i],
                                 fu_orders[i],
                                 fu_pay_dates[i],
                                 fu_in_force_dates[i],
                                 fu_last_day_for_pay_dates[i],
                                 add_fu_info_suspension_types[i],
                                 add_fu_info_suspension_dates[i],
                                 add_fu_info_suspension_numbers[i],
                                 add_fu_info_suspension_court_names[i],
                                 add_fu_info_suspension_court_numbers[i],
                                 add_fu_info_suspension_court_results[i],
                                 add_fu_info_suspension_court_dates[i],
                                 add_fu_info_suspension_court_date_end_forms[i],
                                 add_fu_info_suspension_court_date_in_forces[i]);
      for (var j = 0; j < paymentFu[i].claim.length; j++) {
        if (paymentFu[i].claim[j].summ != "" ||
            paymentFu[i].claim[j].type.options.selectedIndex == 2 ||
            (paymentFu[i].type.options.selectedIndex == 2 && paymentFu[i].date != "")) {
          this.fu_claim_set.add(paymentFu[i].claim[j].name.options.selectedIndex);
        }
      }
    }

    //Получение массива значений всех переменных решений судов
    var number_of_courts = $('.courts').length; //Получение количества строк с выплатами
    var court_dates = $('.court_dates'); //Получение массива дат решений судов
    var numberOfPenaltyCourtPeriod = 0;
    var numberOfPenaltyPeriod;
    //Создание экземпляров решений ФУ
    for (var i = 0; i < number_of_courts; i++) {
      courtPenalty[i] = new CourtPenalty(i + 1,
                                   court_dates[i]);
     for (var j = 0; j < courtPenalty[i].claim.length; j++) {
       if (courtPenalty[i].claim[j].name.options.selectedIndex == 5) {
         this.penalty_court_period[numberOfPenaltyCourtPeriod] = new PenaltyCourtPeriod(courtPenalty[i].claim[j].from,
                                                                       courtPenalty[i].claim[j].to);
         numberOfPenaltyCourtPeriod++;
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
    this.max_penalty_period = 0;
    this.max_days_delay = 0;
    this.fu_claim_set_type = 0;
    
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
      numberOfPenaltyPeriod = 0;
      this.claim[i] = new ClaimCourt(i + 1,
                                  names[i],
                                  types[i],
                                  summs[i],
                                  froms[i],
                                  tos[i],
                                  without_periods[i]);

      //количество дней со дня первоначального обращения с заявлением о страховой выплате (для графика)
      this.count_days = (this.getPayDate() - this.claim[i].date_sv.getAppDate()) / DAY;
      
      //Вычисление периода задержки
      if (this.fu_claim_set.has(this.claim[i].name.options.selectedIndex)) {
        this.claim[i].days_delay = (this.getPayDate() - this.getInForceDate() + DAY) / DAY;
        this.claim[i].penalty_day = this.getInForceDate();
        this.claim[i].penalty_day_form = this.getInForceDateFormatted();
        this.fu_claim_set_type = 1;
      } else {
        this.claim[i].days_delay = (this.getPayDate() - this.claim[i].last_day) / DAY;
      }

      //Если выплата была в срок, то изменение отрицательного значения на нулевое
      if (this.claim[i].days_delay < 0 || isNaN(this.claim[i].days_delay)) {
        this.claim[i].days_delay = 0;
      }

      //Вычисление максимального периода задержки
      if (this.claim[i].days_delay > this.max_days_delay) {
        this.max_days_delay = this.claim[i].days_delay; //Получение значения самой большой задержки
      }

      //Вычисление суммы неустойки
      this.claim[i].penalty_summ = this.claim[i].summ * this.claim[i].days_delay * 0.01;
      if (isNaN(this.claim[i].penalty_summ)) {
        this.claim[i].penalty_summ = 0;
      }

      //Алгоритм для определения периодов судебного взыскания неустойки
      if (this.penalty_court_period.length > 0  && this.claim[i].days_delay > 0) {
        this.claim[i].penalty_summ = 0;
        for (var j = 0; j < this.penalty_court_period.length; j++) {
          //алгоритм для первого судебного периода вызскания неустойки
          if (j == 0) {
            //Вычисление самого первого периода невзысканной судом неустойки (с 21го дня)
            if (this.penalty_court_period[j].start_date > this.claim[i].penalty_day) {
              this.claim[i].penalty_period[numberOfPenaltyPeriod] = new PenaltyPeriod(this.claim[i].penalty_day,
                                                                            this.penalty_court_period[j].start_date - DAY);
              //Определение самого раннего начала судебного периода взыскания неустойки
              for (var k = j + 1; k < this.penalty_court_period.length; k++) {
                if (this.penalty_court_period[k].start_date <= this.claim[i].penalty_period[numberOfPenaltyPeriod].end_date) {
                  this.claim[i].penalty_period[numberOfPenaltyPeriod].end_date = this.penalty_court_period[k].start_date - DAY;
                }
              }
              //Определение количества дней просрочки
              this.claim[i].penalty_period[numberOfPenaltyPeriod].days_delay =
              (this.claim[i].penalty_period[numberOfPenaltyPeriod].end_date - this.claim[i].penalty_period[numberOfPenaltyPeriod].start_date + DAY) / DAY;
              //Если количество дней просрочки равно или больше 0,
              //то происводится расчет суммы неустойки,
              //в противном случае элемент массива с невзысканным периодом неустойки удаляется
              if (this.claim[i].penalty_period[numberOfPenaltyPeriod].days_delay > 0) {
                this.claim[i].penalty_period[numberOfPenaltyPeriod].penalty_summ =
                this.claim[i].summ * this.claim[i].penalty_period[numberOfPenaltyPeriod].days_delay * 0.01;
                numberOfPenaltyPeriod++;
              } else {
                this.claim[i].penalty_period.splice(numberOfPenaltyPeriod, 1);
              }
            }
          }
          //Вычисление второго и последующих периодов невзысканной судом неустойки
          if (this.penalty_court_period[j].end_date < this.getPayDate()) {
            if (this.penalty_court_period[j].end_date < this.claim[i].penalty_day) {
              this.claim[i].penalty_period[numberOfPenaltyPeriod] = new PenaltyPeriod(this.claim[i].penalty_day,
                                                                            this.getPayDate());
            } else {
              this.claim[i].penalty_period[numberOfPenaltyPeriod] = new PenaltyPeriod(this.penalty_court_period[j].end_date + DAY,
                                                                            this.getPayDate());
            }
            //Определение самого раннего начала следующего за первым судебного периода взыскания неустойки
            for (var k = j + 1; k < this.penalty_court_period.length; k++) {
              if (this.penalty_court_period[k].start_date <= this.claim[i].penalty_period[numberOfPenaltyPeriod].end_date) {
                this.claim[i].penalty_period[numberOfPenaltyPeriod].end_date = this.penalty_court_period[k].start_date - DAY;
              }
            }
            //Определение количества дней просрочки
            this.claim[i].penalty_period[numberOfPenaltyPeriod].days_delay =
            (this.claim[i].penalty_period[numberOfPenaltyPeriod].end_date - this.claim[i].penalty_period[numberOfPenaltyPeriod].start_date + DAY) / DAY;
            //Если количество дней просрочки равно или больше 0,
            //то происводится расчет суммы неустойки,
            //в противном случае элемент массива с невзысканным периодом неустойки удаляется
            if (this.claim[i].penalty_period[numberOfPenaltyPeriod].days_delay > 0) {
              this.claim[i].penalty_period[numberOfPenaltyPeriod].penalty_summ =
              this.claim[i].summ * this.claim[i].penalty_period[numberOfPenaltyPeriod].days_delay * 0.01;
              numberOfPenaltyPeriod++;
            } else {
              delete this.claim[i].penalty_period[numberOfPenaltyPeriod]
            }
          }
        }
        //Сложение всех сумма неустоек по одному решению суда
        for (var j = 0; j < this.claim[i].penalty_period.length; j++) {
          this.claim[i].penalty_summ = this.claim[i].penalty_summ + this.claim[i].penalty_period[j].penalty_summ;
        }
        //Определение максимального количества периодов для начисления неустойки
        if (this.claim[i].penalty_period.length > this.max_penalty_period) {
         this.max_penalty_period = this.claim[i].penalty_period.length
        }
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
    var str_payment_dataled_helper;
    var str_payment_dataled = '';
    for (var i = 0; i < this.claim.length; i++) {
      str_payment_dataled_helper = '';
      if (this.date.value != "" &&
          this.claim[i].type.selectedIndex == 1) {
        if (this.claim[i].name.selectedIndex == 1 ||
            this.claim[i].name.selectedIndex == 2 ||
            this.claim[i].name.selectedIndex == 3 ||
            this.claim[i].name.selectedIndex == 4) {
          let number_of_payment_rows = $('.payment_row').length; //Получение количества строк с выплатами

          if (this.claim[i].penalty_period.length > 0 && this.claim[i].days_delay > 0) {
            for (var j = 0; j < this.claim[i].penalty_period.length; j++) {
              str_payment_dataled_helper = str_payment_dataled_helper +
              '<td><span>' + formatDate(new Date(this.claim[i].penalty_period[j].start_date)) + '</span></td>' +
              '<td><span>' + formatDate(new Date(this.claim[i].penalty_period[j].end_date)) + '</span></td>' +
              '<td><span>' + declinationDays(this.claim[i].penalty_period[j].days_delay) + '</span></td>' +
              '<td><span><b>' + makeRubText_nominative(this.claim[i].penalty_period[j].penalty_summ) + '</b></span></td>';
            }
            str_payment_dataled = '<tr role="button" class = "payment_row">' +
              '<th scope="row"><span>' + (number_of_payment_rows + 1) + '</span></th>' +
              '<td><span>' + this.claim[i].name.value + ' <b>(на основании решения суда № ' + this.id + ')</b></span></td>' +
              '<td><span>' + makeRubText_nominative(this.claim[i].summ) + '</span></td>' +
              str_payment_dataled_helper +
            '</tr>';

            $('#str_payment_dataled').append(str_payment_dataled);

           //Добавление подсказки для даты и количества днея просрочки
            $('#str_payment_dataled').children().last().css({"color" : "#dc3545"});
            for (var j = 0; j < this.claim[i].penalty_period.length; j++) {
              $('#str_payment_dataled').children().last().children().eq(3 + j * 4).attr('tooltip', 'Начало периода № ' + (j + 1));
              $('#str_payment_dataled').children().last().children().eq(4 + j * 4).attr('tooltip', 'Конец периода № ' + (j + 1));
              $('#str_payment_dataled').children().last().children().eq(5 + j * 4).attr('tooltip', 'Количество дней просрочки');
            }
          } else {
            str_payment_dataled = '<tr role="button" class = "payment_row">' +
              '<th scope="row"><span>' + (number_of_payment_rows + 1) + '</span></th>' +
              '<td><span>' + this.claim[i].name.value + ' <b>(на основании решения суда № ' + this.id + ')</b></span></td>' +
              '<td><span>' + makeRubText_nominative(this.claim[i].summ) + '</span></td>' +
              '<td><span>' + this.claim[i].penalty_day_form + '</span></td>' +
              '<td><span>' + this.getPayDateFormatted() + '</span></td>' +
              '<td><span>' + declinationDays(this.claim[i].days_delay) + '</span></td>' +
              '<td><span><b>' + makeRubText_nominative(this.claim[i].penalty_summ) + '</b></span></td>' +
            '</tr>';

            $('#str_payment_dataled').append(str_payment_dataled);

            //Добавление подсказки для даты и количества днея просрочки
            $('#str_payment_dataled').children().last().css({"color" : "#dc3545"});
            $('#str_payment_dataled').children().last().children().eq(4).attr('tooltip', 'Дата исполнения решения суда');
            $('#str_payment_dataled').children().last().children().eq(5).attr('tooltip', 'Количество дней просрочки');
            if (this.claim[i].penalty_day_form == this.getInForceDateFormatted()) {
              $('#str_payment_dataled').children().last().children().eq(3).attr('tooltip', 'Дата вступления в силу решения суда');
            } else {
              $('#str_payment_dataled').children().last().children().eq(3).attr('tooltip', '21й день');
            }
          }
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
