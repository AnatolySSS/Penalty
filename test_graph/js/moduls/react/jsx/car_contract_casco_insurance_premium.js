import React, { useState } from "react";

export const Car_contract_casco_insurance_premium = () => {
  const [count, setCount] = useState(1);

  return (
    <div className="car_contract_casco_insurance_premium">
      <div className="form-row">
        <div className="form-group col-md-6">
          <h6>Сведения о страховой премии</h6>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-4">
          <select id={"car_contract_casco_insurance_premium_information_" + count} className="car_contract_casco_insurance_premium_informations custom-select form-control" required>
            <option value="">Наличие сведений</option>
            <option>Сведения имеются</option>
            <option>Сведений не имеется</option>
            <option>Факт оплаты не оспаривается</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-3">
          <div className="input-group">
            <input id={"car_contract_casco_insurance_premium_summ_" + count} className = "input-numeral form-control" placeholder="Сумма" type="text" size="10" required />
            <div className="input-group-append">
              <span className="input-group-text">&#8381;</span>
            </div>
          </div>
        </div>
        <div className="form-group col-md-3">
          <input id={"car_contract_casco_insurance_premium_date_" + count} className = "datepicker-here form-control" aria-describedby={"car_contract_casco_insurance_premium_date_help_block_" + count} placeholder="Дата" type="text" size="10" required />
          <small id={"car_contract_casco_insurance_premium_date_help_block_" + count} className="form-text">
            Дата оплаты
          </small>
        </div>
        <div className="form-group col-md-3">
          <input id={"car_contract_casco_insurance_premium_number_" + count} className="form-control" aria-describedby={"car_contract_casco_insurance_premium_number_help_block_" + count} placeholder="№" type="text" size="8" required />
          <small id={"car_contract_casco_insurance_premium_number_help_block_" + count} className="form-text">
            № квитанции
          </small>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-12">
          <textarea id={"car_contract_casco_insurance_premium_risks_" + count} className="form-control" aria-describedby={"car_contract_casco_insurance_premium_risks_help_block_" + count} placeholder="Перечень рисков" type="text" size="8" required></textarea>
          <small id={"car_contract_casco_insurance_premium_risks_help_block_" + count} className="form-text">
            Перечислите риски, покрываемые страховой премией
          </small>
        </div>
      </div>
    </div>
  )
}