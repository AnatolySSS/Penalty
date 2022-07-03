var dtpParticipant = 1;
var carContractId = 1;

function addDtpParticipant() {
  dtpParticipant++
  var str = `
  <div id="dtp_participant_${dtpParticipant}">
    <hr>
    <div id="dtp_description_participant_${dtpParticipant}" class="form-row">
      <div class="form-group col-md-4">
        <input id = "car_brand_${dtpParticipant}" class="form-control" placeholder="Марка ТС" type="text" size="8" required>
      </div>
      <div class="form-group col-md-3">
        <input id = "car_model_${dtpParticipant}" class="form-control" placeholder="Модель ТС" type="text" size="8" required>
      </div>
      <div class="form-group col-md-3">
        <input id = "car_reg_number_${dtpParticipant}" class="form-control" placeholder="ГРН" type="text" size="8" required>
      </div>
      <div class="form-group col-ms-1">
        <button id="add_dtp_description_participant_info_btn_${dtpParticipant}" class="add_dtp_description_participant_info_btns btn btn-outline-warning add_info">
          <i class="fa fa-chevron-down toggle"></i>
        </button>
      </div>
      <div class="form-group col-ms-1">
        <button id="dtp_description_participantt_btn_${dtpParticipant}" class="dtp_description_participant_btns btn btn-outline-danger" onclick="removeDtpParticipant()">×</button>
      </div>
    </div>

    <!-- BEGIN dtp_description_participant_info -->

    <div id="dtp_description_participant_info_${dtpParticipant}" class="dtp_description_participant_infos" style="display:none">
      <div class="form-row">
        <div class="form-group col-md-4">
          <input id = "car_vin_number_${dtpParticipant}" class="form-control" placeholder="VIN" type="text" size="8" required>
        </div>
        <div class="form-group col-md-3">
          <input id = "car_year_${dtpParticipant}" class="form-control" placeholder="год выпуска" type="text" size="8" required>
        </div>
        <div class="form-group col-md-3">
          <select id="car_type_${dtpParticipant}" class="custom-select form-control" required>
            <option value="">тип ТС</option>
            <option>легковой</option>
            <option>грузовой</option>
            <option>автобус</option>
            <option>такси</option>
          </select>
        </div>
        <div class="form-group col-md-2">
          <input id = "car_veight_${dtpParticipant}" class="form-control" placeholder="масса" type="text" size="8" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <input id = "driver_name_${dtpParticipant}" class="form-control" placeholder="ФИО водителя" type="text" size="8" required>
        </div>
        <div class="form-group col-md-6">
          <input id = "owner_name_${dtpParticipant}" class="form-control" placeholder="ФИО собственника" type="text" size="8" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-3">
          <select id="car_type_${dtpParticipant}" class="custom-select form-control" required>
            <option value="">степень вины</option>
            <option>виновен</option>
            <option>не виновен</option>
          </select>
        </div>
      </div>

      <!-- BEGIN car_contracts -->

      <div id="car_contracts_${dtpParticipant}">
        <div id="car_contract_${dtpParticipant}_1">

          <!-- BEGIN contract_select -->
          <div id="car_contract_select_${dtpParticipant}_1" class="form-row">
            <div class="form-group col-md-5">
              <select id="car_contract_type_${dtpParticipant}_1" class="car_contract_type_${dtpParticipant} car_contract_types custom-select form-control col-md-12" required>
                <option value="">Выберите тип договора</option>
                <option>ОСАГО</option>
                <option>КАСКО</option>
                <option>ДСАГО</option>
                <option>Не застрахован</option>
              </select>
            </div>
            <div class="form-group col-ms-1">
              <button id="add_car_contract_info_btn_${dtpParticipant}_1" class="add_car_contract_info_btns btn btn-outline-warning add_info">
                <i class="fa fa-chevron-down toggle"></i>
              </button>
            </div>
            <div class="form-group col-ms-1">
              <button id="car_contract_btn_${dtpParticipant}_1" class="car_contract_btns btn btn-outline-warning" onclick="addCarContract(${dtpParticipant})">+</button>
            </div>
          </div>

          <!-- END contract_select -->
          <!-- BEGIN car_contract_osago -->

          <div id="car_contract_osago_info_${dtpParticipant}_1" class="car_contract_osago_infos" style="display:none">
            <div class="form-row">
              <div class="form-group col-md-9">
                <h6>Общие сведения о договоре страхования ОСАГО</h6>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <div class="autocomplete">
                  <input id="car_contract_osago_fo_name_${dtpParticipant}_1" class="form-control" type="text" placeholder="Введите наименование ФО" size="40" required>
                </div>
              </div>
              <div class="form-group col-md-6">
                <input id = "car_contract_osago_fo_number_${dtpParticipant}_1" class="form-control" placeholder="серия и № полиса" type="text" size="8" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-3">
                <input id = "car_contract_osago_fo_date_conclusion_${dtpParticipant}_1" class = "datepicker-here form-control" aria-describedby="car_contract_osago_fo_date_conclusion_help_block_1_1" placeholder="Дата" type="text" size="10" required>
                <small id="car_contract_osago_fo_date_conclusion_help_block_${dtpParticipant}_1" class="form-text">
                  Заключение договора
                </small>
              </div>
              <div class="form-group col-md-3">
                <input id = "car_contract_osago_fo_date_start_${dtpParticipant}_1" class = "datepicker-here form-control" aria-describedby="car_contract_osago_fo_date_start_help_block_1_1" placeholder="Дата" type="text" size="10" required>
                <small id="car_contract_osago_fo_date_start_help_block_${dtpParticipant}_1" class="form-text">
                  Начало срока действия
                </small>
              </div>
              <div class="form-group col-md-3">
                <input id = "car_contract_osago_fo_date_end_${dtpParticipant}_1" class = "datepicker-here form-control" aria-describedby="car_contract_osago_fo_date_end_help_block_1_1" placeholder="Дата" type="text" size="10" required>
                <small id="car_contract_osago_fo_date_end_help_block_${dtpParticipant}_1" class="form-text">
                  Окончание срока действия
                </small>
              </div>
            </div>
          </div>

          <!-- END car_contract_osago -->
          <!-- BEGIN car_contract_casco -->

          <div id="car_contract_casco_info_${dtpParticipant}_1" class="car_contract_casco_infos" style="display:none">

            <!-- BEGIN car_contract_casco_general_info -->

            <div id="car_contract_casco_general_info_${dtpParticipant}_1">
              <div class="form-row">
                <div class="form-group col-md-9">
                  <h6>Общие сведения о договоре страхования КАСКО</h6>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <div class="autocomplete">
                    <input id="car_contract_casco_fo_name_${dtpParticipant}_1" class="form-control" type="text" placeholder="Введите наименование ФО" size="40" required>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <input id = "car_contract_casco_fo_number_${dtpParticipant}_1" class="form-control" placeholder="серия и № полиса" type="text" size="8" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <input id = "car_contract_casco_fo_date_conclusion_${dtpParticipant}_1" class = "datepicker-here form-control" aria-describedby="car_contract_casco_fo_date_conclusion_help_block_1_1" placeholder="Дата" type="text" size="10" required>
                  <small id="car_contract_casco_fo_date_conclusion_help_block_${dtpParticipant}_1" class="form-text">
                    Заключение договора
                  </small>
                </div>
                <div class="form-group col-md-3">
                  <input id = "car_contract_casco_fo_date_start_${dtpParticipant}_1" class = "datepicker-here form-control" aria-describedby="car_contract_casco_fo_date_start_help_block_1_1" placeholder="Дата" type="text" size="10" required>
                  <small id="car_contract_casco_fo_date_start_help_block_${dtpParticipant}_1" class="form-text">
                    Начало срока действия
                  </small>
                </div>
                <div class="form-group col-md-3">
                  <input id = "car_contract_casco_fo_date_end_${dtpParticipant}_1" class = "datepicker-here form-control" aria-describedby="car_contract_casco_fo_date_end_help_block_1_1" placeholder="Дата" type="text" size="10" required>
                  <small id="car_contract_casco_fo_date_end_help_block_${dtpParticipant}_1" class="form-text">
                    Окончание срока действия
                  </small>
                </div>
              </div>
            </div>

            <!-- END car_contract_casco_general_info -->
            <!-- BEGIN car_contract_casco_insurance_rules -->

            <div id="car_contract_casco_insurance_rules_${dtpParticipant}_1">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <h6>Сведения о правилах страхования</h6>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <input id="car_contract_casco_insurance_rules_${dtpParticipant}_1" class="form-control" placeholder="Наименование правил страхования" type="text" size="8" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input id = "car_contract_casco_insurance_rules_approver_name_${dtpParticipant}_1" class="form-control" placeholder="ФИО утвердившего" type="text" size="8" required>
                </div>
                <div class="form-group col-md-6">
                  <input id = "car_contract_casco_insurance_rules_approver_post_${dtpParticipant}_1" class="form-control" placeholder="Должность утвердившего" type="text" size="8" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <input id = "car_contract_casco_insurance_rules_date_${dtpParticipant}_1" class = "datepicker-here form-control" placeholder="Дата" type="text" size="10" required>
                </div>
                <div class="form-group col-md-3">
                  <input id = "car_contract_casco_insurance_rules_number_${dtpParticipant}_1" class="form-control" placeholder="№" type="text" size="8" required>
                </div>
              </div>
            </div>

            <!-- END car_contract_casco_insurance_rules -->
            <!-- BEGIN car_contract_casco_insurance_inspection_information -->

            <div id="car_contract_casco_insurance_inspection_information_${dtpParticipant}_1">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <h6>Сведения о предстраховом осмотре</h6>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <select id="car_contract_casco_insurance_inspection_information_${dtpParticipant}_1" class="car_contract_casco_insurance_inspection_informations custom-select form-control" required>
                    <option value="">Наличие сведений</option>
                    <option>Сведения имеются</option>
                    <option>Сведений не имеется</option>
                  </select>
                </div>
                <div class="form-group col-md-3" style="display:none">
                  <input id = "car_contract_casco_insurance_inspection_date_${dtpParticipant}_1" class = "datepicker-here form-control" placeholder="Дата" type="text" size="10" required>
                </div>
              </div>
              <div class="form-row" style="display:none">
                <div class="form-group col-md-12">
                  <textarea id = "car_contract_casco_insurance_inspection_damaged_parts_${dtpParticipant}_1" class="form-control" aria-describedby="car_contract_casco_insurance_inspection_damaged_parts_help_block_${dtpParticipant}_1" placeholder="Перечень поврежденных деталей" type="text" size="8" required></textarea>
                  <small id="car_contract_casco_insurance_inspection_damaged_parts_help_block_${dtpParticipant}_1" class="form-text">
                    Введите через запятую наименования элементов и деталей, а также их повреждения
                  </small>
                </div>
              </div>
            </div>

            <!-- END car_contract_casco_insurance_inspection_information -->
            <!-- BEGIN car_contract_casco_insurance_summ -->

            <div id="car_contract_casco_insurance_summ_${dtpParticipant}_1">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <h6>Сведения о страховой сумме</h6>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <div class="input-group">
                    <input id="car_contract_casco_insurance_summ_summ_${dtpParticipant}_1" class = "input-numeral form-control" placeholder="Сумма" type="text" size="10" required>
                    <div class="input-group-append">
                      <span class="input-group-text">&#8381;</span>
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-3">
                  <select id="car_contract_casco_insurance_summ_index_${dtpParticipant}_1" class="car_contract_casco_insurance_summ_indexes custom-select form-control" required>
                    <option value="">Вид суммы</option>
                    <option>Индексируемая</option>
                    <option>Не индексируемая</option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <select id="car_contract_casco_insurance_summ_aggregate_${dtpParticipant}_1" class="car_contract_casco_insurance_summ_aggregates custom-select form-control" required>
                    <option value="">Тип суммы</option>
                    <option>Агрегатная</option>
                    <option>Не агрегатная</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <textarea id="car_contract_casco_insurance_summ_risks_${dtpParticipant}_1" class="form-control" aria-describedby="car_contract_casco_insurance_summ_risks_help_block_${dtpParticipant}_1" placeholder="Перечень рисков" type="text" size="8" required></textarea>
                  <small id="car_contract_casco_insurance_summ_risks_help_block_${dtpParticipant}_1" class="form-text">
                    Перечислите риски, покрываемые страховой суммой
                  </small>
                </div>
              </div>
            </div>

            <!-- END car_contract_casco_insurance_summ -->
            <!-- BEGIN car_contract_casco_insurance_premium -->

            <div id="car_contract_casco_insurance_premium_${dtpParticipant}_1">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <h6>Сведения о страховой премии</h6>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <select id="car_contract_casco_insurance_premium_information_${dtpParticipant}_1" class="car_contract_casco_insurance_premium_informations custom-select form-control" required>
                    <option value="">Наличие сведений</option>
                    <option>Сведения имеются</option>
                    <option>Сведений не имеется</option>
                    <option>Факт оплаты не оспаривается</option>
                  </select>
                </div>
              </div>
              <div class="form-row" style="display:none">
                <div class="form-group col-md-3">
                  <div class="input-group">
                    <input id="car_contract_casco_insurance_premium_summ_${dtpParticipant}_1" class = "input-numeral form-control" placeholder="Сумма" type="text" size="10" required>
                    <div class="input-group-append">
                      <span class="input-group-text">&#8381;</span>
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-3">
                  <input id = "car_contract_casco_insurance_premium_date_${dtpParticipant}_1" class = "datepicker-here form-control" aria-describedby="car_contract_casco_insurance_premium_date_help_block_${dtpParticipant}_1" placeholder="Дата" type="text" size="10" required>
                  <small id="car_contract_casco_insurance_premium_date_help_block_${dtpParticipant}_1" class="form-text">
                    Дата оплаты
                  </small>
                </div>
                <div class="form-group col-md-3">
                  <input id = "car_contract_casco_insurance_premium_number_${dtpParticipant}_1" class="form-control" aria-describedby="car_contract_casco_insurance_premium_number_help_block_${dtpParticipant}_1" placeholder="№" type="text" size="8" required>
                  <small id="car_contract_casco_insurance_premium_number_help_block_${dtpParticipant}_1" class="form-text">
                    № квитанции
                  </small>
                </div>
              </div>
              <div class="form-row" style="display:none">
                <div class="form-group col-md-12">
                  <textarea id="car_contract_casco_insurance_premium_risks_${dtpParticipant}_1" class="form-control" aria-describedby="car_contract_casco_insurance_premium_risks_help_block_${dtpParticipant}_1" placeholder="Перечень рисков" type="text" size="8" required></textarea>
                  <small id="car_contract_casco_insurance_premium_risks_help_block_${dtpParticipant}_1" class="form-text">
                    Перечислите риски, покрываемые страховой премией
                  </small>
                </div>
              </div>
            </div>
            <!-- END car_contract_casco_insurance_premium -->
            <!-- BEGIN car_contract_casco_beneficiary -->
            <div id="car_contract_casco_beneficiary_${dtpParticipant}_1">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <h6>Сведения о выгодоприобретателе</h6>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <select id="car_contract_casco_beneficiary_subject_${dtpParticipant}_1" class="car_contract_casco_beneficiary_subjects custom-select form-control" required>
                    <option value="">Укажите выгодоприобретателя</option>
                    <option>Заявитель</option>
                    <option>Банк</option>
                  </select>
                </div>
                <div class="form-group col-md-6" style="display:none">
                  <input id = "car_contract_casco_beneficiary_subject_bank_name_${dtpParticipant}_1" class="form-control" placeholder="Наименование банка" type="text" size="8" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <textarea id="car_contract_casco_beneficiary_risks_${dtpParticipant}_1" class="form-control" aria-describedby="car_contract_casco_beneficiary_risks_help_block_${dtpParticipant}_1" placeholder="Перечень рисков" type="text" size="8" required></textarea>
                  <small id="car_contract_casco_beneficiary_risks_help_block_${dtpParticipant}_1" class="form-text">
                    Перечислите риски, от которых застрахован выгодоприобретатель
                  </small>
                </div>
              </div>
            </div>
            <!-- END car_contract_casco_beneficiary -->
            <!-- BEGIN car_contract_casco_franchise -->
            <div id="car_contract_casco_franchise_${dtpParticipant}_1">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <h6>Сведения о франшизе</h6>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <select id="car_contract_casco_franchise_presence_${dtpParticipant}_1" class="car_contract_casco_beneficiary_presences custom-select form-control" required>
                    <option value="">Наличие франшизы</option>
                    <option>Франшиза установлена</option>
                    <option>Франшиза не установлена</option>
                  </select>
                </div>
                <div class="form-group col-md-3" style="display:none">
                  <select id="car_contract_casco_franchise_type_${dtpParticipant}_1" class="car_contract_casco_franchise_types custom-select form-control" required>
                    <option value="">Вид франшизы</option>
                    <option>Условная</option>
                    <option>Безусловная</option>
                  </select>
                </div>
                <div class="form-group col-md-3" style="display:none">
                  <div class="input-group">
                    <input id="car_contract_casco_franchise_summ_${dtpParticipant}_1" class = "input-numeral form-control" placeholder="Размер франшизы" type="text" size="10" required>
                    <div class="input-group-append">
                      <span class="input-group-text">&#8381;</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-row" style="display:none">
                <div class="form-group col-md-12">
                  <textarea id="car_contract_casco_franchise_risks_${dtpParticipant}_1" class="form-control" aria-describedby="car_contract_casco_franchise_risks_help_block_${dtpParticipant}_1" placeholder="Перечень рисков" type="text" size="8" required></textarea>
                  <small id="car_contract_casco_franchise_risks_help_block_${dtpParticipant}_1" class="form-text">
                    Перечислите риски, по которым установлена франшиза
                  </small>
                </div>
              </div>
            </div>
            <!-- END car_contract_casco_franchise -->
          </div>
          <!-- END car_contract_casco -->
        </div>
        <!-- END car_contract -->
      </div>
      <!-- END car_contracts -->
    </div>
    <!-- END dtp_description_participant_info -->
  </div>
  <!-- END dtp_participants -->`

  $(`#dtp_description_participants`).append(str);
  $(`#dtp_description_participants .datepicker-here`).datepicker()

  $('.datepicker-here').toArray().forEach(function(field){
    new Cleave(field, {
      date: true,
      delimiter: '.',
      datePattern: ['d', 'm', 'Y']
    })
  });

  //Форматирование суммы
  $('.input-numeral').toArray().forEach(function(field){
    new Cleave(field, {
        numeral: true,
        delimiter: ' ',
        //numeralThousandsGroupStyle: 'none',
        numeralPositiveOnly: true,
        numeralIntegerScale: 8
    })
  });

  //Вызывает функцию, изменяющую общую картинку валидации
  validationCheck('.dtp-description')
  validationCheckUpdate('.dtp-description')

}

function removeDtpParticipant() {
  $(`#dtp_participant_${dtpParticipant}`).remove();
  if ($(`#add_dtp_description_participant_info_btn_${dtpParticipant}`).find(".toggle").hasClass("rotate")) {
    $(`#add_dtp_description_participant_info_btn_${dtpParticipant}`).find(".toggle").removeClass("rotate");
  }
  validationCheckUpdate('.dtp-description')
  dtpParticipant--;
}

//Показать дополнительную информацию по решению ФУ
$(document).on("click", ".add_dtp_description_participant_info_btns", function (event) {
	if (!($(this).find(".toggle").hasClass("rotate"))) {
    $(this).parent().parent().next().show('fast'); //Показывает .add_dtp_description_participant_info
    $(this).find(".toggle").addClass("rotate");
  } else {
    $(this).parent().parent().next().hide('fast'); //Скрывает .add_dtp_description_participant_info
    $(this).find(".toggle").removeClass("rotate");
  }
});

function addCarContract(id) {
	carContractId++;
  var str = `
  <div id="car_contract_${id}_${carContractId}">
    <div id="car_contract_select_${id}_${carContractId}" class="form-row">
      <div class="form-group col-md-5">
        <select id="car_contract_type_${id}_${carContractId}" class="car_contract_types custom-select form-control col-md-12" required>
            <option value="">Выберите тип договора</option>
            <option>ОСАГО</option>
            <option>КАСКО</option>
            <option>ДСАГО</option>
            <option>Не застрахован</option>
        </select>
      </div>
      <div class="form-group col-ms-1">
        <button id="add_car_contract_info_btn_${id}_${carContractId}" class="add_car_contract_info_btns btn btn-outline-warning add_info">
          <i class="fa fa-chevron-down toggle"></i>
        </button>
      </div>
      <div class="form-group col-ms-1">
        <button id="car_contract_btn_${id}_${carContractId}" class="car_contract_btns btn btn-outline-danger" onclick="removeCarContract(${id}, ${carContractId})">×</button>
      </div>
    </div>

    <!-- BEGIN car_contract_osago -->

    <div id="car_contract_osago_info_${id}_${carContractId}" class="car_contract_osago_infos" style="display:none">
      <div class="form-row">
        <div class="form-group col-md-9">
          <h6>Общие сведения о договоре страхования ОСАГО</h6>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <div class="autocomplete">
            <input id="car_contract_osago_fo_name_${id}_${carContractId}" class="form-control" type="text" placeholder="Введите наименование ФО" size="40" required>
          </div>
        </div>
        <div class="form-group col-md-6">
          <input id = "car_contract_osago_fo_number_${id}_${carContractId}" class="form-control" placeholder="серия и № полиса" type="text" size="8" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-3">
          <input id = "car_contract_osago_fo_date_conclusion_${id}_${carContractId}" class = "datepicker-here form-control" aria-describedby="car_contract_osago_fo_date_conclusion_help_block_${id}_${carContractId}" placeholder="Дата" type="text" size="10" required>
          <small id="car_contract_osago_fo_date_conclusion_help_block_${id}_${carContractId}" class="form-text">
              Заключение дговора
          </small>
        </div>
        <div class="form-group col-md-3">
          <input id = "car_contract_osago_fo_date_start_${id}_${carContractId}" class = "datepicker-here form-control" aria-describedby="car_contract_osago_fo_date_start_help_block_${id}_${carContractId}" placeholder="Дата" type="text" size="10" required>
          <small id="car_contract_osago_fo_date_start_help_block_${id}_${carContractId}" class="form-text">
              Начало срока действия
          </small>
        </div>
        <div class="form-group col-md-3">
          <input id = "car_contract_osago_fo_date_end_${id}_${carContractId}" class = "datepicker-here form-control" aria-describedby="car_contract_osago_fo_date_end_help_block_${id}_${carContractId}" placeholder="Дата" type="text" size="10" required>
          <small id="car_contract_osago_fo_date_end_help_block_${id}_${carContractId}" class="form-text">
              Окончание срока действия
          </small>
        </div>
      </div>
    </div>

    <!-- END car_contract_osago -->
    <!-- BEGIN car_contract_casco -->

    <div id="car_contract_casco_info_${id}_${carContractId}" class="car_contract_casco_infos" style="display:none">

      <!-- BEGIN car_contract_casco_general_info -->

      <div class="car_contract_casco_general_info">
        <div class="form-row">
            <div class="form-group col-md-9">
                <h6>Общие сведения о договоре страхования КАСКО</h6>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <div class="autocomplete">
                    <input id="car_contract_casco_fo_name_${id}_${carContractId}" class="form-control" type="text" placeholder="Введите наименование ФО" size="40" required>
                </div>
            </div>
            <div class="form-group col-md-6">
                <input id = "car_contract_casco_fo_number_${id}_${carContractId}" class="form-control" placeholder="серия и № полиса" type="text" size="8" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-3">
                <input id = "car_contract_casco_fo_date_conclusion_${id}_${carContractId}" class = "datepicker-here form-control" aria-describedby="car_contract_casco_fo_date_conclusion_help_block_${id}_${carContractId}" placeholder="Дата" type="text" size="10" required>
                <small id="car_contract_casco_fo_date_conclusion_help_block_${id}_${carContractId}" class="form-text">
                    Заключение договора
                </small>
            </div>
            <div class="form-group col-md-3">
                <input id = "car_contract_casco_fo_date_start_${id}_${carContractId}" class = "datepicker-here form-control" aria-describedby="car_contract_casco_fo_date_start_help_block_${id}_${carContractId}" placeholder="Дата" type="text" size="10" required>
                <small id="car_contract_casco_fo_date_start_help_block_${id}_${carContractId}" class="form-text">
                    Начало срока действия
                </small>
            </div>
            <div class="form-group col-md-3">
                <input id = "car_contract_casco_fo_date_end_${id}_${carContractId}" class = "datepicker-here form-control" aria-describedby="car_contract_casco_fo_date_end_help_block_${id}_${carContractId}" placeholder="Дата" type="text" size="10" required>
                <small id="car_contract_casco_fo_date_end_help_block_${id}_${carContractId}" class="form-text">
                    Окончание срока действия
                </small>
            </div>
        </div>
      </div>

      <!-- END car_contract_casco_general_info -->
      <!-- BEGIN car_contract_casco_insurance_rules -->

      <div class="car_contract_casco_insurance_rules">
        <div class="form-row">
          <div class="form-group col-md-6">
            <h6>Сведения о правилах страхования</h6>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <input id="car_contract_casco_insurance_rules_${id}_${carContractId}" class="form-control" placeholder="Наименование правил страхования" type="text" size="8" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <input id = "car_contract_casco_insurance_rules_approver_name_${id}_${carContractId}" class="form-control" placeholder="ФИО утвердившего" type="text" size="8" required>
          </div>
          <div class="form-group col-md-6">
            <input id = "car_contract_casco_insurance_rules_approver_post_${id}_${carContractId}" class="form-control" placeholder="Должность утвердившего" type="text" size="8" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-3">
            <input id = "car_contract_casco_insurance_rules_date_${id}_${carContractId}" class = "datepicker-here form-control" placeholder="Дата" type="text" size="10" required>
          </div>
          <div class="form-group col-md-3">
            <input id = "car_contract_casco_insurance_rules_number_${id}_${carContractId}" class="form-control" placeholder="№" type="text" size="8" required>
          </div>
        </div>
      </div>

      <!-- END car_contract_casco_insurance_rules -->
      <!-- BEGIN car_contract_casco_insurance_inspection_information -->

      <div class="car_contract_casco_insurance_inspection_information">
        <div class="form-row">
          <div class="form-group col-md-6">
            <h6>Сведения о предстраховом осмотре</h6>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <select id="car_contract_casco_insurance_inspection_information_${id}_${carContractId}" class="car_contract_casco_insurance_inspection_informations custom-select form-control" required>
              <option value="">Наличие сведений</option>
              <option>Сведения имеются</option>
              <option>Сведений не имеется</option>
            </select>
          </div>
          <div class="form-group col-md-3" style="display:none">
            <input id = "car_contract_casco_insurance_inspection_date_${id}_${carContractId}" class = "datepicker-here form-control" placeholder="Дата" type="text" size="10" required>
          </div>
        </div>
        <div class="form-row" style="display:none">
          <div class="form-group col-md-12">
            <textarea id = "car_contract_casco_insurance_inspection_damaged_parts_${id}_${carContractId}" class="form-control" aria-describedby="car_contract_casco_insurance_inspection_damaged_parts_help_block_${id}_${carContractId}" placeholder="Перечень поврежденных деталей" type="text" size="8" required></textarea>
            <small id="car_contract_casco_insurance_inspection_damaged_parts_help_block_${id}_${carContractId}" class="form-text">
              Введите через запятую наименования элементов и деталей, а также их повреждения
            </small>
          </div>
        </div>
      </div>

      <!-- END car_contract_casco_insurance_inspection_information -->
      <!-- BEGIN car_contract_casco_insurance_summ -->

      <div class="car_contract_casco_insurance_summ">
        <div class="form-row">
          <div class="form-group col-md-6">
            <h6>Сведения о страховой сумме</h6>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-3">
            <div class="input-group">
              <input id="car_contract_casco_insurance_summ_summ_${id}_${carContractId}" class = "input-numeral form-control" placeholder="Сумма" type="text" size="10" required>
              <div class="input-group-append">
                <span class="input-group-text">&#8381;</span>
              </div>
            </div>
          </div>
          <div class="form-group col-md-3">
            <select id="car_contract_casco_insurance_summ_index_${id}_${carContractId}" class="car_contract_casco_insurance_summ_indexes custom-select form-control" required>
              <option value="">Вид суммы</option>
              <option>Индексируемая</option>
              <option>Не индексируемая</option>
            </select>
          </div>
          <div class="form-group col-md-3">
            <select id="car_contract_casco_insurance_summ_aggregate_${id}_${carContractId}" class="car_contract_casco_insurance_summ_aggregates custom-select form-control" required>
              <option value="">Тип суммы</option>
              <option>Агрегатная</option>
              <option>Не агрегатная</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <textarea id="car_contract_casco_insurance_summ_risks_${id}_${carContractId}" class="form-control" aria-describedby="car_contract_casco_insurance_summ_risks_help_block_${id}_${carContractId}" placeholder="Перечень рисков" type="text" size="8" required></textarea>
            <small id="car_contract_casco_insurance_summ_risks_help_block_${id}_${carContractId}" class="form-text">
              Перечислите риски, покрываемые страховой суммой
            </small>
          </div>
        </div>
      </div>

      <!-- END car_contract_casco_insurance_summ -->
      <!-- BEGIN car_contract_casco_insurance_premium -->

      <div class="car_contract_casco_insurance_premium">
        <div class="form-row">
          <div class="form-group col-md-6">
            <h6>Сведения о страховой премии</h6>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-4">
            <select id="car_contract_casco_insurance_premium_information_${id}_${carContractId}" class="car_contract_casco_insurance_premium_informations custom-select form-control" required>
              <option value="">Наличие сведений</option>
              <option>Сведения имеются</option>
              <option>Сведений не имеется</option>
              <option>Факт оплаты не оспаривается</option>
            </select>
          </div>
        </div>
        <div class="form-row" style="display:none">
          <div class="form-group col-md-3">
            <div class="input-group">
              <input id="car_contract_casco_insurance_premium_summ_${id}_${carContractId}" class = "input-numeral form-control" placeholder="Сумма" type="text" size="10" required>
              <div class="input-group-append">
                <span class="input-group-text">&#8381;</span>
              </div>
            </div>
          </div>
          <div class="form-group col-md-3">
            <input id = "car_contract_casco_insurance_premium_date_${id}_${carContractId}" class = "datepicker-here form-control" aria-describedby="car_contract_casco_insurance_premium_date_help_block_${id}_${carContractId}" placeholder="Дата" type="text" size="10" required>
            <small id="car_contract_casco_insurance_premium_date_help_block_${id}_${carContractId}" class="form-text">
              Дата оплаты
            </small>
          </div>
          <div class="form-group col-md-3">
            <input id = "car_contract_casco_insurance_premium_number_${id}_${carContractId}" class="form-control" aria-describedby="car_contract_casco_insurance_premium_number_help_block_${id}_${carContractId}" placeholder="№" type="text" size="8" required>
            <small id="car_contract_casco_insurance_premium_number_help_block_${id}_${carContractId}" class="form-text">
              № квитанции
            </small>
          </div>
        </div>
        <div class="form-row" style="display:none">
          <div class="form-group col-md-12">
            <textarea id="car_contract_casco_insurance_premium_risks_${id}_${carContractId}" class="form-control" aria-describedby="car_contract_casco_insurance_premium_risks_help_block_${id}_${carContractId}" placeholder="Перечень рисков" type="text" size="8" required></textarea>
            <small id="car_contract_casco_insurance_premium_risks_help_block_${id}_${carContractId}" class="form-text">
              Перечислите риски, покрываемые страховой премией
            </small>
          </div>
        </div>
      </div>
      <!-- END car_contract_casco_insurance_premium -->
      <!-- BEGIN car_contract_casco_beneficiary -->
      <div id="car_contract_casco_beneficiary_${id}_${carContractId}">
        <div class="form-row">
          <div class="form-group col-md-6">
            <h6>Сведения о выгодоприобретателе</h6>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <select id="car_contract_casco_beneficiary_subject_${id}_${carContractId}" class="car_contract_casco_beneficiary_subjects custom-select form-control" required>
              <option value="">Укажите выгодоприобретателя</option>
              <option>Заявитель</option>
              <option>Банк</option>
            </select>
          </div>
          <div class="form-group col-md-6" style="display:none">
            <input id = "car_contract_casco_beneficiary_subject_bank_name_${id}_${carContractId}" class="form-control" placeholder="Наименование банка" type="text" size="8" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <textarea id="car_contract_casco_beneficiary_risks_${id}_${carContractId}" class="form-control" aria-describedby="car_contract_casco_beneficiary_risks_help_block_${id}_${carContractId}" placeholder="Перечень рисков" type="text" size="8" required></textarea>
            <small id="car_contract_casco_beneficiary_risks_help_block_${id}_${carContractId}" class="form-text">
              Перечислите риски, от которых застрахован выгодоприобретатель
            </small>
          </div>
        </div>
      </div>
      <!-- END car_contract_casco_beneficiary -->
      <!-- BEGIN car_contract_casco_franchise -->
      <div id="car_contract_casco_franchise_${id}_${carContractId}">
        <div class="form-row">
          <div class="form-group col-md-6">
            <h6>Сведения о франшизе</h6>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <select id="car_contract_casco_franchise_presence_${id}_${carContractId}" class="car_contract_casco_beneficiary_presences custom-select form-control" required>
              <option value="">Наличие франшизы</option>
              <option>Франшиза установлена</option>
              <option>Франшиза не установлена</option>
            </select>
          </div>
          <div class="form-group col-md-3" style="display:none">
            <select id="car_contract_casco_franchise_type_${id}_${carContractId}" class="car_contract_casco_franchise_types custom-select form-control" required>
              <option value="">Вид франшизы</option>
              <option>Условная</option>
              <option>Безусловная</option>
            </select>
          </div>
          <div class="form-group col-md-3" style="display:none">
            <div class="input-group">
              <input id="car_contract_casco_franchise_summ_${id}_${carContractId}" class = "input-numeral form-control" placeholder="Размер франшизы" type="text" size="10" required>
              <div class="input-group-append">
                <span class="input-group-text">&#8381;</span>
              </div>
            </div>
          </div>
        </div>
        <div class="form-row" style="display:none">
          <div class="form-group col-md-12">
            <textarea id="car_contract_casco_franchise_risks_${id}_${carContractId}" class="form-control" aria-describedby="car_contract_casco_franchise_risks_help_block_1_1" placeholder="Перечень рисков" type="text" size="8" required></textarea>
            <small id="car_contract_casco_franchise_risks_help_block_${id}_${carContractId}" class="form-text">
              Перечислите риски, по которым установлена франшиза
            </small>
          </div>
        </div>
      </div>
      <!-- END car_contract_casco_franchise -->
    </div>
    <!-- END car_contract_casco -->
  </div>`

  $(`#car_contracts_${id}`).append(str);
  $(`#car_contracts_${id} .datepicker-here`).datepicker()

  $('.datepicker-here').toArray().forEach(function(field){
    new Cleave(field, {
      date: true,
      delimiter: '.',
      datePattern: ['d', 'm', 'Y']
    })
  });

  //Форматирование суммы
  $('.input-numeral').toArray().forEach(function(field){
    new Cleave(field, {
        numeral: true,
        delimiter: ' ',
        //numeralThousandsGroupStyle: 'none',
        numeralPositiveOnly: true,
        numeralIntegerScale: 8
    })
  });

  //Вызывает функцию, изменяющую общую картинку валидации
  validationCheck('.main-claims-all')
  validationCheckUpdate('.main-claims-all')
}

function removeCarContract(id, claimContractId) {
    $(`#car_contract_${id}_${claimContractId}`).remove();
    validationCheckUpdate('.main-claims-all')
}

//Показать дополнительную информацию по решению ФУ
$(document).on("click", ".add_car_contract_info_btns", function (event) {
  if (!($(this).find(".toggle").hasClass("rotate"))) {
    $(this).find(".toggle").addClass("rotate");
    if ($(this).parent().parent().children().first().children().first().find(':selected').text() == "ОСАГО") {
      //Показываем сведения по полису ОСАГО
      $(this).parent().parent().next().show('fast')
      $(this).parent().parent().next().find('input').addClass('form-control')

      //Скрываем сведения по полису КАСКО
      $(this).parent().parent().next().next().hide('fast')
      setTimeout(() => {
          $(this).parent().parent().next().next().find('input').removeClass('form-control')
          $(this).parent().parent().next().next().find('textarea').removeClass('form-control')
      }, 200);
    } else if ($(this).parent().parent().children().first().children().first().find(':selected').text() == "КАСКО") {
        //Показываем сведения по полису КАСКО
        $(this).parent().parent().next().next().show('fast')
        $(this).parent().parent().next().next().find('input').addClass('form-control')
        $(this).parent().parent().next().next().find('textarea').addClass('form-control')

        //Скрываем сведения по полису ОСАГО
        $(this).parent().parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().find('input').removeClass('form-control')
        }, 200);
    } else if ($(this).parent().parent().children().first().children().first().find(':selected').text() == "ДСАГО") {
        //Скрываем сведения по полису ОСАГО
        $(this).parent().parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().find('input').removeClass('form-control')
        }, 200);

        //Скрываем сведения по полису КАСКО
        $(this).parent().parent().next().next().hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().next().find('input').removeClass('form-control')
            $(this).parent().parent().next().next().find('textarea').removeClass('form-control')
        }, 200);
    } else {
        //Скрываем сведения по полису ОСАГО
        $(this).parent().parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().find('input').removeClass('form-control')
        }, 200);

        //Скрываем сведения по полису КАСКО
        $(this).parent().parent().next().next().hide('fast')
        setTimeout(() => {
            $(this).parent().parent().next().next().find('input').removeClass('form-control')
            $(this).parent().parent().next().next().find('textarea').removeClass('form-control')
        }, 200);
    }

    validationCheckUpdate('.dtp-description')
  } else {
    $(this).find(".toggle").removeClass("rotate");
     //Скрываем сведения по полису ОСАГО
     $(this).parent().parent().next().hide('fast')
     setTimeout(() => {
         $(this).parent().parent().next().find('input').removeClass('form-control')
     }, 200);

     //Скрываем сведения по полису КАСКО
     $(this).parent().parent().next().next().hide('fast')
     setTimeout(() => {
         $(this).parent().parent().next().next().find('input').removeClass('form-control')
         $(this).parent().parent().next().next().find('textarea').removeClass('form-control')
     }, 200);

  }
});

//Показывает информацию по соответствующему полису (ОСАГО, КАСКО. ДСАГО)
$(document).on("change", ".car_contract_types", function (event) {

  if (!($(this).parent().next().find(".toggle").hasClass("rotate"))) {
    $(this).parent().next().find(".toggle").addClass("rotate");
  }

  if ($(this).find(':selected').text() == "ОСАГО") {
      //Показываем сведения по полису ОСАГО
    $(this).parent().parent().next().show('fast')
    $(this).parent().parent().next().find('input').addClass('form-control')

    //Скрываем сведения по полису КАСКО
    $(this).parent().parent().next().next().hide('fast')
    setTimeout(() => {
        $(this).parent().parent().next().next().find('input').removeClass('form-control')
        $(this).parent().parent().next().next().find('textarea').removeClass('form-control')
    }, 200);
  } else if ($(this).find(':selected').text() == "КАСКО") {
    //Показываем сведения по полису КАСКО
    $(this).parent().parent().next().next().show('fast')
    $(this).parent().parent().next().next().find('input').addClass('form-control')
    $(this).parent().parent().next().next().find('textarea').addClass('form-control')

    //Скрываем сведения по полису ОСАГО
    $(this).parent().parent().next().hide('fast')
    setTimeout(() => {
        $(this).parent().parent().next().find('input').removeClass('form-control')
    }, 200);
  } else if ($(this).find(':selected').text() == "ДСАГО") {
    //Скрываем сведения по полису ОСАГО
    $(this).parent().parent().next().hide('fast')
    setTimeout(() => {
        $(this).parent().parent().next().find('input').removeClass('form-control')
    }, 200);

    //Скрываем сведения по полису КАСКО
    $(this).parent().parent().next().next().hide('fast')
    setTimeout(() => {
        $(this).parent().parent().next().next().find('input').removeClass('form-control')
        $(this).parent().parent().next().next().find('textarea').removeClass('form-control')
    }, 200);
  } else {
    $(this).parent().next().find(".toggle").removeClass("rotate");
    //Скрываем сведения по полису ОСАГО
    $(this).parent().parent().next().hide('fast')
    setTimeout(() => {
        $(this).parent().parent().next().find('input').removeClass('form-control')
    }, 200);

    //Скрываем сведения по полису КАСКО
    $(this).parent().parent().next().next().hide('fast')
    setTimeout(() => {
        $(this).parent().parent().next().next().find('input').removeClass('form-control')
        $(this).parent().parent().next().next().find('textarea').removeClass('form-control')
    }, 200);
  }

  validationCheckUpdate('.dtp-description')

});

//Добавляет информацию о проведении предстрахового осмотра
$(document).on("change", ".car_contract_casco_insurance_inspection_informations", function (event) {
	if ($(this).find(':selected').text() == "Сведения имеются") {
		$(this).parent().next().show('fast')
        $(this).parent().parent().next().show('fast')
        $(this).parent().next().find('input').addClass('form-control')
        $(this).parent().parent().next().find('textarea').addClass('form-control')
	} else {
        $(this).parent().next().hide('fast')
        $(this).parent().parent().next().hide('fast')
        setTimeout(() => {
            $(this).parent().next().find('input').removeClass('')
            $(this).parent().parent().next().find('textarea').removeClass('form-control')
        }, 200);
        
	}

    validationCheckUpdate('.dtp-description')

});

//Добавляет информацию о страховой премии
$(document).on("change", ".car_contract_casco_insurance_premium_informations", function (event) {
	if ($(this).find(':selected').text() == "Сведения имеются") {
		$(this).parent().parent().next().show('fast')
    $(this).parent().parent().next().next().show('fast')
    $(this).parent().parent().next().find('input').addClass('form-control')
    $(this).parent().parent().next().next().find('textarea').addClass('form-control')
	} else {
    $(this).parent().parent().next().hide('fast')
    $(this).parent().parent().next().next().hide('fast')
    setTimeout(() => {
      $(this).parent().parent().next().find('input').removeClass('form-control')
      $(this).parent().parent().next().next().find('textarea').removeClass('form-control')
    }, 200);
	}

    validationCheckUpdate('.dtp-description')

});

//Добавляет информацию о наименовании банка выгодоприобретателе
$(document).on("change", ".car_contract_casco_beneficiary_subjects", function (event) {
	if ($(this).find(':selected').text() == "Банк") {
		$(this).parent().next().show('fast')
    $(this).parent().next().find('input').addClass('form-control')
	} else {
    $(this).parent().next().hide('fast')
    setTimeout(() => {
        $(this).parent().next().find('input').removeClass('form-control')
    }, 200);
        
	}

    validationCheckUpdate('.dtp-description')

});

//Добавляет информацию о франшизе
$(document).on("change", ".car_contract_casco_beneficiary_presences", function (event) {
	if ($(this).find(':selected').text() == "Франшиза установлена") {
		$(this).parent().next().show('fast')
    $(this).parent().next().next().show('fast')
    $(this).parent().parent().next().show('fast')
    $(this).parent().parent().find('input').addClass('form-control')
	} else {
    $(this).parent().next().hide('fast')
    $(this).parent().next().next().hide('fast')
    $(this).parent().parent().next().hide('fast')
    setTimeout(() => {
        $(this).parent().parent().find('input').removeClass('form-control')
    }, 200);
        
	}

    validationCheckUpdate('.dtp-description')

});

//Изменяет картинку валидации
function validationCheck(className) {
  $(`${className} .form-control`).focusout(function(){
      validationCheckUpdate(className)
  })
  }
    
    //Обновлет сведения о валидации инпутов
function validationCheckUpdate(className) {
  setTimeout(() => {
      var isOk = true
      $(`${className} .form-control`).each(function() {
      if ($(this).css('border-color') == 'rgb(220, 53, 69)') {
          isOk = false
      }
      })
      if (isOk) {
      $(`${className}`).children().first().next().html(`<i class="fa fa-check-square-o fa-2x" aria-hidden="true" style="color: #28a745;"></i>`)
      } else {
      $(`${className}`).children().first().next().html(`<i class="fa fa-exclamation-circle fa-2x" aria-hidden="true" style="color: #dc3545;"></i>`)
      }
  }, 200); 
  }