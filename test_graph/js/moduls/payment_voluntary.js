import { changeDateType } from './changeDateType.js';

/* Объект для добровольной выплаты
    * pay_vol_type - тип выплаты
    * pay_vol_date - дата выплаты
    * pay_vol_summ - сумма выплаты
    * pay_vol_order - № платежного поручения
    * pay_vol_with_ndfl - булево значение, если при выплате неустойки был удержан НДФЛ
    * pay_vol_ndfl_summ - сумма удержанного НДФЛ
    * pay_vol_ndfl_percent - процент удержанного НДФЛ
*/


class Payment_voluntary {
  pay_vol_type
  pay_vol_date
  pay_vol_summ
  pay_vol_order
  pay_vol_days_delay
  pay_vol_penalty_summ
  pay_vol_with_ndfl
  pay_vol_ndfl_summ
  pay_vol_ndfl_percent

  constructor(pay_vol_type,
              pay_vol_date,
              pay_vol_summ,
              pay_vol_with_ndfl,
              pay_vol_ndfl_summ){
    this.pay_vol_type = pay_vol_type;

    //редактирвоание значений даты выплаты
    pay_vol_date = changeDateType(pay_vol_date);
    pay_vol_date = Date.parse(pay_vol_date + 'T00:00:00');
    this.pay_vol_date = pay_vol_date;

    //редактирвоание значений суммы выплаты
    pay_vol_summ = pay_vol_summ.replace(/\s+/g, '');
    pay_vol_summ = Number(pay_vol_summ);
    this.pay_vol_summ = pay_vol_summ;

    this.pay_vol_with_ndfl = pay_vol_with_ndfl;

    //редактирование значения суммы НДФЛ
    pay_vol_ndfl_summ = pay_vol_ndfl_summ.replace(/\s+/g, '');
    pay_vol_ndfl_summ = Number(pay_vol_ndfl_summ);
    this.pay_vol_ndfl_summ = pay_vol_ndfl_summ;
  }
}

export { Payment_voluntary };
