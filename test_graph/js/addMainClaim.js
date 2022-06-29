var ContractId = 1;
var claimContractId = 1;

function addClaimsContract() {
  ContractId++;
  var str = `<div id="main_claims_contract_${ContractId}" class="main_claims_contracts">
                <hr>
                <div id="claims_contract_${ContractId}" class="form-row">
                  <div class="form-group col-md-5">
                    <select id="claims_contract_type_${ContractId}" class="claims_contract_types custom-select form-control col-md-12" required>
                      <option value="">Выберите тип договора</option>
                      <option>ОСАГО</option>
                      <option>КАСКО</option>
                      <option>ДСАГО</option>
                    </select>
                  </div>
                  <div class="form-group col-ms-1">
                    <button id="add_main_claims_info_btn_${ContractId}" class="add_main_claims_info_btns btn btn-outline-warning add_info">
                      <i class="fa fa-chevron-down toggle"></i>
                    </button>
                  </div>
                  <div class="form-group col-ms-1">
                    <button id="claims_contract_btn_${ContractId}" class="claims_contract_btns btn btn-outline-danger" onclick="removeClaimsContract()">×</button>
                  </div>
                </div>
                <div id="main_claims_${ContractId}" style="display:none">
                  <div class="form-row ml-2">
                    <div class="form-group col-md-5 ml-2">
                      <h6>Требование</h6>
                    </div>
                    <div class="form-group col-md-3">
                      <h6>Сумма</h6>
                    </div>
                  </div>
                  <div id="main_claim_${ContractId}_1" class="main_claim_${ContractId} main_claims form-row ml-2">
                    <div class="form-group col-md-5">
                      <select id="main_claim_type_${ContractId}_1" class="main_claim_type_${ContractId} main_claim_types custom-select form-control col-md-12" required>
                        <option value="">Выберите требование</option>
                        <option>Страховое возмещение</option>
                        <option>УТС</option>
                        <option>Эвакуатор</option>
                        <option>Хранение</option>
                        <option>Неустойка</option>
                        <option>Финансовая санкция</option>
                        <option>Экспертиза</option>
                        <option>Юрист</option>
                        <option>Составление претензии</option>
                        <option>Нотариус</option>
                        <option>Почта</option>
                        <option>Курьер</option>
                        <option>Телеграмма</option>
                        <option>Дефектовка</option>
                        <option>Диагностика</option>
                        <option>Моральный вред</option>
                        <option>Штраф</option>
                        <option>Аварком</option>
                        <option>Здоровье</option>
                        <option>Жизнь</option>
                        <option>Иные расходы</option>
                      </select>
                    </div>
                    <div class="form-group col-md-3">
                      <div class="input-group">
                        <input id="main_claim_summ_${ContractId}_1" class = "main_claim_summ_${ContractId} main_claim_summs input-numeral form-control" placeholder="Сумма" type="text" size="10" required>
                        <div class="input-group-append">
                          <span class="input-group-text">&#8381;</span>
                        </div>
                      </div>
                    </div>
                    <div class="form-group col-ms-1">
                      <button id="main_claim_btn_${ContractId}_1" class="main_claim_btn_${ContractId} main_claim_btns btn btn-outline-warning" onclick="addFuMainClaim(${ContractId})">+</button>
                    </div>
                  </div>
                  <div id="add_main_claim_info_${ContractId}_1" class="add_main_claim_info_${ContractId} add_main_claim_infos form-group ml-3" style="display:none">
                    <div class="form-group">
                      <h6>Период неустойки</h6>
                    </div>
                    <div class="form-group form-inline">
                      <label for="date_main_claim_from_${ContractId}_1">c</label>
                      <input id = "date_main_claim_from_${ContractId}_1" class = "date_main_claim_from_${ContractId} date_fu_main_claim_froms ml-2 datepicker-here form-control col-md-3" placeholder="Дата" type="text" size="10" required>
                      <label for="date_main_claim_to_${ContractId}_1" class="ml-2">по</label>
                      <input id = "date_main_claim_to_${ContractId}_1" class = "date_main_claim_to_${ContractId} date_fu_main_claim_tos ml-2 datepicker-here form-control col-md-3" placeholder="Дата" type="text" size="10" required>
                      <input id="main_claim_without_period_${ContractId}_1" class="main_claim_without_period_${ContractId} main_claim_without_periods ml-2" type="checkbox" onclick="block_main_claim_date(${ContractId}, 1)">
                      <label for="main_claim_without_period_${ContractId}_1" class="ml-2 form-check-label">Период не указан</label>
                    </div>
                  </div>
                </div>
              </div>`

  $('#main_claims_contracts').append(str);
  $(`#date_main_claim_from_${ContractId}_1`).datepicker();
  $(`#date_main_claim_to_${ContractId}_1`).datepicker();

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

function removeClaimsContract(id) {
	$(`#main_claims_contract_${ContractId}`).remove();
  if ($(`#add_main_claims_info_btn_${ContractId}`).find(".toggle").hasClass("rotate")) {
    $(`#add_main_claims_info_btn_${ContractId}`).find(".toggle").removeClass("rotate");
  }
  validationCheckUpdate('.main-claims-all')
  ContractId--;
}

//Показать дополнительную информацию по решению ФУ
$(document).on("click", ".add_main_claims_info_btns", function (event) {
	if (!($(this).find(".toggle").hasClass("rotate"))) {
    $(this).parent().parent().next().show('fast'); //Показывает .add_main_claims_info
    $(this).find(".toggle").addClass("rotate");

		if ($(this).parent().parent().next().children().first().find(':selected').text() == "Неустойка"){
			$(this).parent().parent().next().children().first().next().show('fast'); //Показывает .add_main_claims_info
		}
  } else {
    $(this).parent().parent().next().hide('fast'); //Скрывает .add_main_claims_info
    $(this).find(".toggle").removeClass("rotate");
  }
});

function addFuMainClaim(id) {
	claimContractId++;
  var str = `<div id="main_claim_${id}_${claimContractId}" class="fu-name form-row ml-2">
                <div class="form-group col-md-5">
                    <select id="main_claim_type_${id}_${claimContractId}" class="main_claim_type_${id} main_claim_types custom-select form-control col-md-12" required>
                      <option value="">Выберите требование</option>  
                      <option>Страховое возмещение</option>
                      <option>УТС</option>
                      <option>Эвакуатор</option>
                      <option>Хранение</option>
                      <option>Неустойка</option>
                      <option>Финансовая санкция</option>
                      <option>Экспертиза</option>
                      <option>Юрист</option>
                      <option>Составление претензии</option>
                      <option>Нотариус</option>
                      <option>Почта</option>
                      <option>Курьер</option>
                      <option>Телеграмма</option>
                      <option>Дефектовка</option>
                      <option>Диагностика</option>
                      <option>Моральный вред</option>
                      <option>Штраф</option>
                      <option>Аварком</option>
                      <option>Здоровье</option>
                      <option>Жизнь</option>
                      <option>Иные расходы</option>
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <div class="input-group">
                    <input id="main_claim_summ_${id}_${claimContractId}" class = "main_claim_summ_${id} main_claim_summs input-numeral form-control" placeholder="Сумма" type="text" size="10" required>
                    <div class="input-group-append">
                        <span class="input-group-text">&#8381;</span>
                    </div>
                    </div>
                </div>
                <div class="form-group col-ms-1">
                    <button id="main_claim_btn_${id}_${claimContractId}" class="main_claim_btn_${id} main_claim_btns btn btn-outline-danger" onclick="removeFuMainClaim(${id}, ${claimContractId})">×</button>
                </div>
            </div>
            <div id="add_main_claim_info_${id}_${claimContractId}" class="add_main_claim_info_${id} add_main_claim_infos form-group ml-3" style="display:none">
                <div class="form-group">
                    <h6>Период неустойки</h6>
                </div>
                <div class="form-group form-inline">
                    <label for="date_main_claim_from_${id}_${claimContractId}">c</label>
                    <input id="date_main_claim_from_${id}_${claimContractId}" class = "date_main_claim_from_${id} date_main_claim_froms ml-2 datepicker-here col-md-3" placeholder="Дата" type="text" size="8" required>
                    <label for="date_main_claim_to_${id}_${claimContractId}" class="ml-2">по</label>
                    <input id="date_main_claim_to_${id}_${claimContractId}" class = "date_main_claim_to_${id} date_main_claim_tos ml-2 datepicker-here col-md-3" placeholder="Дата" type="text" size="8" required>
                    <input id="main_claim_without_period_${id}_${claimContractId}" class="main_claim_without_period_${id} main_claim_without_periods ml-2" type="checkbox" onclick="block_main_claim_date(${id}, ${claimContractId})">
                    <label for="main_claim_without_period_${id}_${claimContractId}" class="ml-2 form-check-label">Период не указан</label>
                </div>
            </div>`



	$(`#main_claims_${id}`).append(str);
	$(`#date_main_claim_from_${id}_${claimContractId}`).datepicker();
	$(`#date_main_claim_to_${id}_${claimContractId}`).datepicker();

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

function removeFuMainClaim(id, claimContractId) {
    $(`#main_claim_${id}_${claimContractId}`).remove();
    $(`#add_main_claim_info_${id}_${claimContractId}`).remove();
    validationCheckUpdate('.main-claims-all')
}

//Добавляет период взыскания неустойки судом
$(document).on("change", ".main_claim_types", function (event) {
	if ($(this).find(':selected').text() == "Неустойка") {
		$(this).parent().parent().next().show('fast');
    $(this).parent().parent().next().find('.date_main_claim_froms').addClass('form-control')
    $(this).parent().parent().next().find('.date_main_claim_tos').addClass('form-control')
	} else {
    $(this).parent().parent().next().hide('fast');
    $(this).parent().parent().next().find('.date_main_claim_froms').removeClass('form-control')
    $(this).parent().parent().next().find('.date_main_claim_tos').removeClass('form-control')
	}
  validationCheck('.main-claims-all')
  setTimeout(() => {
    validationCheckUpdate('.main-claims-all')
  }, 200); 
});

//Блокировать даты судебной неустойки при проставленной галочке "Период не указан"
function block_main_claim_date(id, claimContractId){
  if ($(`#main_claim_without_period_${id}_${claimContractId}`).prop('checked')) {
    $(`#date_main_claim_from_${id}_${claimContractId}`).prop('disabled', true);
    $(`#date_main_claim_to_${id}_${claimContractId}`).prop('disabled', true);
    $(`#date_main_claim_from_${id}_${claimContractId}`).val('');
    $(`#date_main_claim_to_${id}_${claimContractId}`).val('');
  } else {
    $(`#date_main_claim_from_${id}_${claimContractId}`).prop('disabled', false);
    $(`#date_main_claim_to_${id}_${claimContractId}`).prop('disabled', false);
  }
  setTimeout(() => {
    validationCheckUpdate('.main-claims-all')
  }, 200); 
}
//Изменяет картинку валидации
function validationCheck(className) {
  $(`${className} .form-control`).focusout(function(){
    validationCheckUpdate(className)
  })
}

//Обновлет сведения о валидации инпутов
function validationCheckUpdate(className) {
  var isOk = true
  console.log($(this));
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
}