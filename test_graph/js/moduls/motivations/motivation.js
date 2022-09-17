import { changeDateType } from '../changeDateType';
import { DATE_NEW_OSAGO_METHODOKOGY, DATE_FZ_123_START } from "../variables";
import { findMaxSumm } from "../findMaxSumm.js";
import { findLastDay } from '../findLastDay.js';
import { expertiseQuestions } from "../objects/allExpertiseQuestions"
import { makePercentageText_genitive } from "../makePercentageText_genitive"
import { makeRubText_genitive } from '../makeRubText_genitive.js';
import { osagoPenaltyParagraph } from "./osago/osagoPenalty";

export function check_signs(totalData, signs) {
    let signs_filled = signs
    signs_filled['Форма страхового возмещения, выбранная Заявителем'] = totalData.appToFoData.appToFoAll[0].form
    signs_filled['Тип Заявителя'] = totalData.preambulaData.app_type
    signs_filled['Статус Заявителя'] = totalData.preambulaData.app_status

    let dpt_number_of_culpits = 0
    for (let i = 0; i < totalData.dtpData.dtpParticipants.length; i++) {
        if (totalData.dtpData.dtpParticipants[i].is_guilty == "виновен") {
            dpt_number_of_culpits++

            if (totalData.dtpData.dtpParticipants[i].car_contractsObjects[0].type == "ОСАГО") {
                signs_filled['ГО виновника застрахована'] = "ДА"
            } else if (totalData.dtpData.dtpParticipants[i].car_contractsObjects[0].type == "Не застрахован") {
                signs_filled['ГО виновника застрахована'] = "НЕТ"
            }
        }
    }
    if (dpt_number_of_culpits == 1) {
        signs_filled['Единственный виновник ДТП'] = "ДА"
    } else if (dpt_number_of_culpits > 1) {
        signs_filled['Единственный виновник ДТП'] = "НЕТ"
    }

    if (dpt_number_of_culpits > 0) {
        signs_filled['Виновник ДТП установлен'] = "ДА"
    } else {
        signs_filled['Виновник ДТП установлен'] = "НЕТ"
    }

    if (totalData.dtpData.dtpParticipants[0].is_guilty != "") {
        if (totalData.dtpData.dtpParticipants[0].is_guilty == "виновен") {
            signs_filled['Заявитель является виновником ДТП'] = "ДА"
        } else {
            signs_filled['Заявитель является виновником ДТП'] = "НЕТ"
        }
    }
    
    if (totalData.dtpData.dtpParticipants[0].car_type != "") {
        if (totalData.dtpData.dtpParticipants[0].car_type == "грузовой") {
            signs_filled['ТС является грузовым'] = "ДА"
        } else {
            signs_filled['ТС является грузовым'] = "НЕТ"
        }
    }
    
    if (totalData.dtpData.dtpParticipants[0].car_type != "") {
        if (totalData.dtpData.dtpParticipants[0].car_type == "такси") {
            signs_filled['ТС является такси'] = "ДА"
        } else {
            signs_filled['ТС является такси'] = "НЕТ"
        }
    }
    if (totalData.dtpData.date_dtp != "") {
        if (totalData.dtpData.europrotocol) {
            signs_filled['ДТП оформлено путем составления европротокола'] = "ДА"
        } else {
            signs_filled['ДТП оформлено путем составления европротокола'] = "НЕТ"
        }
    }

    if (Date.parse(changeDateType(totalData.dtpData.date_dtp) + 'T00:00:00') > DATE_NEW_OSAGO_METHODOKOGY) {
        signs_filled['ДТП произошло после 20/09/2021'] = "ДА"
    } else if (Date.parse(changeDateType(totalData.dtpData.date_dtp) + 'T00:00:00') <= DATE_NEW_OSAGO_METHODOKOGY) {
        signs_filled['ДТП произошло после 20/09/2021'] = "НЕТ"
    }

    if (document.getElementById('owner_name_deactivate_1').checked) {
        signs_filled['Заявитель является собственником ТС'] = "ДА"
    } else {
        signs_filled['Заявитель является собственником ТС'] = "НЕТ"
    }
    

    if (totalData.mainRequestData.main_answer_type == "Ответ получен") {
        signs_filled['ФО предоставлены документы по запросу ФУ'] = "ДА"
    } else {
        signs_filled['ФО предоставлены документы по запросу ФУ'] = "НЕТ"
    }
    
    signs_filled['Соблюдение претензионного порядка Заявителем'] = "НЕТ"
    for (let i = 1; i < totalData.appToFoData.appToFoAll.length; i++) {
        if (Date.parse(changeDateType(totalData.appToFoData.appToFoAll[i].appDate) + 'T00:00:00') >= DATE_FZ_123_START &&
            totalData.appToFoData.appToFoAll[i].type == "Претензия") {
                signs_filled['Соблюдение претензионного порядка Заявителем'] = "ДА"
        }
    }

    signs_filled['Ответ ФО на первоначальное заявление'] = totalData.appToFoData.appToFoAll[0].answerFo

    if (totalData.appToFoData.appToFoAll[0].inspectionInfo == "Сведения имеются") {
        signs_filled['Проведение осмотра ТС ФО'] = "ДА"
    } else {
        signs_filled['Проведение осмотра ТС ФО'] = "НЕТ"
    }
    
    signs_filled['Договор страхования'] = []
    for (const contract of totalData.claimsToFuData.claimsContractAll) {
        signs_filled['Договор страхования'].push(contract.type)
    }

    signs_filled['Требование к ФУ'] = []
    for (let i = 0; i < totalData.claimsToFuData.claimsContractAll.length; i++) {
        signs_filled['Требование к ФУ'][i] = []
        for (let j = 0; j < totalData.claimsToFuData.claimsContractAll[i].claim.length; j++) {
            signs_filled['Требование к ФУ'][i][j] = totalData.claimsToFuData.claimsContractAll[i].claim[j].type
        }
    }

    //Определение общей суммы выплаты ФО
    let total_summ_payment = 0
    for (let i = 0; i < totalData.paymentVoluntaryData.paymentVoluntaryAll.length; i++) {
        if (totalData.paymentVoluntaryData.paymentVoluntaryAll[i].type == "Страховое возмещение") {
            total_summ_payment = total_summ_payment + totalData.paymentVoluntaryData.paymentVoluntaryAll[i].summ
        }
    }

    //Определение суммы страхового возмещения на основании НТЭ ФУ
    let satisfaction_summ = 0
    if (totalData.fuExpertiseData.fuExpertiseAll[0].date != "") {
        //Если полной гибели не было
        signs_filled['Контруктивная гибель ТС Заявителя наступила'] = "НЕТ"
        satisfaction_summ = totalData.fuExpertiseData.fuExpertiseAll[0].summ_with
        //Если произошла тотальная гибель ТС
        if (totalData.fuExpertiseData.fuExpertiseAll[0].summ_without > totalData.fuExpertiseData.fuExpertiseAll[0].summ_market && 
            totalData.fuExpertiseData.fuExpertiseAll[0].summ_market != 0) {
            satisfaction_summ = totalData.fuExpertiseData.fuExpertiseAll[0].summ_market - totalData.fuExpertiseData.fuExpertiseAll[0].summ_leftovers
            signs_filled['Контруктивная гибель ТС Заявителя наступила'] = "ДА"
        }
    }
    

    //Определение процента
    let percentage = 0
    percentage = Math.round((satisfaction_summ - total_summ_payment) / total_summ_payment * 100)
    if (percentage < 0) {
        percentage = 0
    }

    if (totalData.fuExpertiseData.fuExpertiseAll[0].date != "") {
        if (percentage > 10) {
            signs_filled['Разница превышает 10%'] = "ДА"
        } else {
            signs_filled['Разница превышает 10%'] = "НЕТ"
        }
    }
    
    //Определение максимальной суммы по ОСАГО
    let max_summ = findMaxSumm()
    if (totalData.fuExpertiseData.fuExpertiseAll[0].date != "") {
        if (totalData.fuExpertiseData.fuExpertiseAll[0].summ_without > max_summ) {
            signs_filled['Ущерб превышает установленную Законом № 40-ФЗ страховую сумму'] = "ДА"
        } else {
            signs_filled['Ущерб превышает установленную Законом № 40-ФЗ страховую сумму'] = "НЕТ"
        }
    }

    if (totalData.fuExpertiseData.fuExpertiseAll[0].date != "") {
        if (satisfaction_summ > total_summ_payment) {
            signs_filled['По экспертизе ФУ больше, чем по экспертизе ФО'] = "ДА"
        } else if (satisfaction_summ <= total_summ_payment) {
            signs_filled['По экспертизе ФУ больше, чем по экспертизе ФО'] = "НЕТ"
        }
    }

    //Проверка 3-летнего срока на обращения к ФУ
    let date_appeal = $('#date_appeal').val()
    date_appeal = changeDateType(date_appeal)
    date_appeal = Date.parse(date_appeal + 'T00:00:00')
    let last_day_for_pay_fu = new Date(findLastDay(totalData.appToFoData.appToFoAll[0].appDate))
    let year = last_day_for_pay_fu.getFullYear()
    let month = last_day_for_pay_fu.getMonth()
    let day = last_day_for_pay_fu.getDate()
    let last_day_for_fu_app = new Date(year + 3, month, day + 1, 0);
    last_day_for_fu_app = Date.parse(last_day_for_fu_app)
    if (date_appeal > last_day_for_fu_app) {
        signs_filled['Срок для обращения к ФУ пропущен'] = "ДА"
    } else if (date_appeal <= last_day_for_fu_app) {
        signs_filled['Срок для обращения к ФУ пропущен'] = "НЕТ"
    }

    // console.log(totalData);
    // console.log(signs_filled);

    return signs_filled
}

export function make_motivation_paragraph(claimsContract,
                                          dtpParticipant,
                                          appToFo,
                                          paymentVoluntary,
                                          paymentFu,
                                          paymentCourt,
                                          fuExpertise,
                                          total_penalty_summ_accrued,
                                          total_penalty_summ_paid,
                                          max_summ,
                                          data_from_db) {
    let out_data = {}
    let all_found_claims = []
    let all_found_claims_result_helper = []
    let all_found_claims_helper = {}
    let osago_penalty_paragraph = {}
    
    let total_result = ""
    let motivation_part = ""
    //Алгоритм поиска подходящей мотивировки
    //Получение общего количества признаков, занесенных в таблицу Мотивировки
    let total_sign_count = Object.keys(data_from_db.fact_signs).length

    //Текущее значение количества совпадающих признаков
    let right_sign_count
    //Индекс строки, подходящей под все признаки
    let right_motive_index
    //Перебор договоров
    for (let contract_number = 0; contract_number < claimsContract.length; contract_number++) {
        //Перебор требований к ФУ
        for (let claim_number = 0; claim_number < claimsContract[contract_number].claim.length; claim_number++) {
            right_motive_index = 0
            //Перебор все строк из таблицы Мотивировки (варианты со всеми возможными комбинациями признаков)
            for (let i = 1; i < data_from_db.total_data.length; i++) {
                right_sign_count = 0
                //Перебор всех ключей в таблице Мотивировки
                for (let j = 0; j < Object.keys(data_from_db.total_data[i]).length; j++) {
                    //Если в ключ является признаком
                    if (Object.keys(data_from_db.total_data[i])[j].indexOf("sign") >= 0) {
                        //Перебор всех данных, заполненных сотрудником
                        for (let k = 0; k < Object.keys(data_from_db.fact_signs).length; k++) {
                            //Нахождение соответствия между ключами из таблицы Мотивировки и ключами, заполненными сотрудниками
                            if (Object.values(data_from_db.total_data[0])[j] == Object.keys(data_from_db.fact_signs)[k]) {
                                //Если соответствуют ключи "Договор страхования" (тогда проверяется каждый договор)
                                if (Object.keys(data_from_db.fact_signs)[k] == 'Договор страхования') {
                                    if (Object.values(data_from_db.total_data[i])[j] == claimsContract[contract_number].type.value) {
                                        right_sign_count++
                                    }
                                    // console.log("Таблица : " + Object.values(data_from_db.total_data[0])[j] + " : " + Object.values(data_from_db.total_data[i])[j]);
                                    // console.log("Факт : " + Object.keys(data_from_db.fact_signs)[k] + " : " + Object.values(data_from_db.fact_signs)[k][l] + "\n\n");
                                //Если соответствуют ключи "Требование к ФУ" (тогда проверяется каждое требование)
                                } else if (Object.keys(data_from_db.fact_signs)[k] == 'Требование к ФУ') {
                                    if (Object.values(data_from_db.total_data[i])[j] == claimsContract[contract_number].claim[claim_number].type.value) {
                                        right_sign_count++
                                    }
                                    // console.log("Таблица : " + Object.values(data_from_db.total_data[0])[j] + " : " + Object.values(data_from_db.total_data[i])[j]);
                                    // console.log("Факт : " + Object.keys(data_from_db.fact_signs)[k] + " : " + Object.values(data_from_db.fact_signs)[k][l] + "\n\n");
                                } else {
                                    //Проверка значения одинакого ключа
                                    if (Object.values(data_from_db.total_data[i])[j] == Object.values(data_from_db.fact_signs)[k] ||
                                        Object.values(data_from_db.total_data[i])[j] == "НЕ ПРИМЕНИМО") {
                                        right_sign_count++
                                        // console.log("Таблица : " + Object.values(data_from_db.total_data[0])[j] + " : " + Object.values(data_from_db.total_data[i])[j]);
                                        // console.log("Факт : " + Object.keys(data_from_db.fact_signs)[k] + " : " + Object.values(data_from_db.fact_signs)[k] + "\n\n");
                                    }
                                }
                            }
                        }
                    }
                }
                //Определение номера строки совпадения в случае если количество верных ключей совпадает в общим количеством ключей
                if (total_sign_count == right_sign_count) {
                    right_motive_index = i
                    break
                }
            }

            //Формирование вспомогальных логов
            if (right_motive_index == 0) {
                console.log("Договор " + (contract_number + 1) + ". Требование " + (claim_number + 1) + ". Совпадения не найдены");
            } else {
                console.log("Договор " + (contract_number + 1) + ". Требование " + (claim_number + 1) + ". Совпадение найдено в строке " + right_motive_index);
            }

            //Формирование текста мотивировочной части
            if (right_motive_index != 0) {
                for (let i = 0; i < Object.values(data_from_db.total_data[right_motive_index]).length; i++) {
                    if (Object.keys(data_from_db.total_data[right_motive_index])[i].indexOf("motiv") >= 0) {
                        if (Object.values(data_from_db.total_data[right_motive_index])[i] != null) {
                            let paragraphs = Object.values(data_from_db.total_data[right_motive_index])[i].split(String.fromCharCode(10));
                            for (const iterator of paragraphs) {
                                motivation_part = `${motivation_part}<p>${iterator}</p>`
                            }
                        }
                    }
                }

                //Формирование мотивировки по неустойке по ОСАГО
                let osago_penalty_result = ""
                if (claimsContract[contract_number].type.value == "ОСАГО") {
                    if (claimsContract[contract_number].claim[claim_number].type.value == "Неустойка") {
                        osago_penalty_paragraph = osagoPenaltyParagraph(paymentVoluntary,
                                                                        paymentFu,
                                                                        paymentCourt,
                                                                        total_penalty_summ_accrued,
                                                                        total_penalty_summ_paid,
                                                                        max_summ)

                        
                        if (osago_penalty_paragraph.total_penalty_summ > 0) {
                            osago_penalty_result = "УДОВЛЕТВОРИТЬ"
                        } else {
                            osago_penalty_result = "ОТКАЗАТЬ"
                        }

                        motivation_part = motivation_part + osago_penalty_paragraph.main_penalty_paragraph
                    }
                }
                //Формирование массива объектов найденных требвоаний в таблице Мотивировок
                all_found_claims.push({
                    result : osago_penalty_result != "" ? osago_penalty_result : data_from_db.total_data[right_motive_index].Result,
                    contract : claimsContract[contract_number].type.value,
                    name : claimsContract[contract_number].claim[claim_number].type.value,
                    summ: osago_penalty_paragraph.total_penalty_summ,
                })
            }
        }
    }

    //Редактирование изменяемых частей мотивировочной части
    //Определение вопросов эксперту ФУ
    let question_paragraph = ""
    expertiseQuestions.questions.forEach(element => {
        if (fuExpertise[0].typical_question.value == element.type) {
            question_paragraph = element.question
        }
    })
    
    //Изменение данных по НТЭ ФУ
    motivation_part = motivation_part.replaceAll("question", question_paragraph)
    let organization = fuExpertise[0].organization.value
    motivation_part = motivation_part.replaceAll("organization", organization)
    let technician = fuExpertise[0].technician.value
    motivation_part = motivation_part.replaceAll("technician", technician)
    let date = fuExpertise[0].date.value
    motivation_part = motivation_part.replaceAll("date", date)
    let number = fuExpertise[0].number.value
    motivation_part = motivation_part.replaceAll("number", number)

    //Определение выводов эксперта ФУ
    let expertises_summ_paragraph_helper = ""
    if (fuExpertise[0].trasa.value != "") {
        expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `${fuExpertise[0].trasa.value}, `
    }
    if (fuExpertise[0].summ_without != 0) {
        expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `стоимость восстановительного ремонта 
        Транспортного средства Заявителя без учета износа составила ${fuExpertise[0].summ_without_text}, `
    }
    if (fuExpertise[0].summ_without != 0) {
        if (fuExpertise[0].summ_with != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `c учетом износа – ${fuExpertise[0].summ_with_text}, `
        }
    } else {
        if (fuExpertise[0].summ_with != 0) {
            expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `стоимость восстановительного ремонта 
            Транспортного средства Заявителя с учетом износа составила ${fuExpertise[0].summ_with_text}, `
        }
    }
    if (fuExpertise[0].summ_market != 0) {
        expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `средняя рыночная стоимость 
        Транспортного средства до повреждения по состоянию на дату ДТП составляла ${fuExpertise[0].summ_market_text}, `
    }
    if (fuExpertise[0].summ_leftovers != 0) {
        expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `стоимость годных остатков – ${fuExpertise[0].summ_leftovers_text}, `
    }
    if (fuExpertise[0].summ_uts != 0) {
        expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + `сумма УТС составила ${fuExpertise[0].summ_uts_text}, `
    }
    expertises_summ_paragraph_helper = expertises_summ_paragraph_helper.slice(0, -2)
    expertises_summ_paragraph_helper = expertises_summ_paragraph_helper + "."
    motivation_part = motivation_part.replaceAll("result", expertises_summ_paragraph_helper)
    let summ_market_text = fuExpertise[0].summ_market_text
    motivation_part = motivation_part.replaceAll("summ_market", summ_market_text)
    let summ_leftovers_text = fuExpertise[0].summ_leftovers_text
    motivation_part = motivation_part.replaceAll("summ_leftovers", summ_leftovers_text)

    //Определение общей суммы выплаты ФО
    let total_summ_payment = 0
    for (let i = 0; i < paymentVoluntary.length; i++) {
        if (paymentVoluntary[i].type.options.selectedIndex == 1) {
            total_summ_payment = total_summ_payment + paymentVoluntary[i].summ
        }
    }

    //Определение суммы страхового возмещения на основании НТЭ ФУ
    let satisfaction_summ = 0
    if (fuExpertise[0].date.value != "") {
        //Если полной гибели не было
        satisfaction_summ = fuExpertise[0].summ_with
        //Если произошла тотальная гибель ТС
        if (fuExpertise[0].summ_without > fuExpertise[0].summ_market && 
            fuExpertise[0].summ_market != 0) {
                satisfaction_summ = fuExpertise[0].summ_market - fuExpertise[0].summ_leftovers
        }
    }

    //Определение процентов
    let percentage = 0
    percentage = Math.round((satisfaction_summ - total_summ_payment) / total_summ_payment * 100)
    if (percentage < 0) {
        percentage = 0
    }
    //Если размер ущерба превышает страховую сумму
    if (satisfaction_summ > max_summ) {
        satisfaction_summ = max_summ
    }

    //Формирование объекта найденных требований и удовлетворенных сумм для рехолютивной части
    for (let i = 0; i < all_found_claims.length; i++) {
        if (all_found_claims[i].name == "Страховое возмещение") {
            if (all_found_claims[i].result == "УДОВЛЕТВОРИТЬ") {
                all_found_claims[i].summ = (satisfaction_summ - total_summ_payment)
            } else {
                all_found_claims[i].summ = 0
            }
        }
        all_found_claims_result_helper.push(all_found_claims[i].result)
    }

    //Определение общего результата рассмотрения Обращения
    if (all_found_claims_result_helper.length > 0) {
        if (all_found_claims_result_helper.includes("УДОВЛЕТВОРИТЬ")) {
            total_result = "УДОВЛЕТВОРИТЬ"
        } else if (all_found_claims_result_helper.includes("ОТКАЗАТЬ")) {
            total_result = "ОТКАЗАТЬ"
        } else {
            total_result = "ПРЕКРАТИТЬ"
        }
    }

    motivation_part = motivation_part.replaceAll("percent", makePercentageText_genitive(percentage))
    motivation_part = motivation_part.replaceAll("satisfaction_summ", makeRubText_genitive(satisfaction_summ))
    motivation_part = motivation_part.replaceAll("total_summ_payment", makeRubText_genitive(total_summ_payment))
    let total_summ = satisfaction_summ - total_summ_payment
    motivation_part = motivation_part.replaceAll("total_summ", makeRubText_genitive(total_summ))

    motivation_part = motivation_part.replaceAll("<p></p>", "")
    motivation_part = motivation_part.replaceAll("</p></p>", "")

    motivation_part = motivation_part.replaceAll("\r\n", "")
    motivation_part = motivation_part.replaceAll("\r", "")
    motivation_part = motivation_part.replaceAll("\n", "")
    motivation_part = motivation_part.replaceAll("  ", " ")
    
    out_data = {
        motivation_part : motivation_part,
        result : total_result,
        all_found_claims : all_found_claims,
        osago_penalty_paragraph : osago_penalty_paragraph
    }
    console.log(out_data);
    return out_data
}