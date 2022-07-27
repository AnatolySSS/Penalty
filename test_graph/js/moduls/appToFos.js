import { changeDateType } from './changeDateType.js';
import { makeRubText_genitive } from "./makeRubText_genitive";
import { formatDate } from "./formatDate";
import { inclineFirstname, inclineLastname, inclineMiddlename, getLastnameGender } from 'lvovich';
import { PaymentVoluntary } from "./payment_voluntary";
import { allClaims } from './objects/allClaims';
import { ClaimsContract } from "./mainClaim";
import { DATE_FZ_123_START } from "./variables";
import { findLastClaimFoDay } from "./findLastClaimFoDay";

class ClaimToFo {

    id

    type
    type_text
    type_text_full
    summ
    summ_text
    from
    to
    without
    pdf

    constructor (id, type, summ, from, to, without, pdf){
        this.id = id
        this.type = type
        this.summ = Number(summ.value.replace(/\s+/g, ''))
        this.summ_text = makeRubText_genitive(this.summ)
        this.from = from
        this.to = to
        this.without = without
        this.pdf = pdf

        allClaims.claims.forEach(element => {
            
            if (this.type.value == element.claim) {
                this.type_text = element.short
            }
        })
    }

    getFromDate() {return Date.parse(changeDateType(this.from.value) + 'T00:00:00');}
    getFromDateFormatted() { return formatDate(new Date(this.getFromDate())); }
    getToDate() {return Date.parse(changeDateType(this.to.value) + 'T00:00:00');}
    getToDateFormatted() { return formatDate(new Date(this.getToDate())); }
}

class ClaimsContractToFo {

    app_id
    contract_id

    type
    claim = []
    claims_all

    constructor (app_id, contract_id, type) {

        this.app_id = app_id;
        this.contract_id = contract_id;
        this.type = type.value
        this.claims_all = ""

        var number_of_claims = $(`.apps_to_fo_claim_${app_id}_${contract_id}`).length;
        var types = $(`.apps_to_fo_claim_type_${app_id}_${contract_id}`)
        var summs = $(`.apps_to_fo_claim_summ_${app_id}_${contract_id}`)
        var froms = $(`.date_apps_to_fo_claim_from_${app_id}_${contract_id}`)
        var tos = $(`.date_apps_to_fo_claim_to_${app_id}_${contract_id}`)
        var without_periods = $(`.apps_to_fo_claim_without_period_${app_id}_${contract_id}`)
        var pdfs = $(`.apps_to_fo_claim_pdf_${app_id}_${contract_id}`)
        for (let i = 0; i < number_of_claims; i++) {
            this.claim[i] = new ClaimToFo(i + 1,
                                          types[i],
                                          summs[i],
                                          froms[i],
                                          tos[i],
                                          without_periods[i],
                                          pdfs[i])
            
            var current_claim_summ = ""
            if (this.claim[i].summ != 0) {
                current_claim_summ = " в размере " + this.claim[i].summ_text
            } else {
                current_claim_summ = ""
            }

            switch (this.claim[i].type.options.selectedIndex) {
                case 2:
                    this.claim[i].type_text_full = "страхового возмещения" + " по договору " + this.type + " " + this.claim[i].type_text + current_claim_summ
                    break;
                case 1:
                    this.claim[i].type_text_full = this.claim[i].type_text + " по договору " + this.type + current_claim_summ
                    break;
                case 5:
                    if (this.claim[i].without.checked) {
                        this.claim[i].type_text_full = this.claim[i].type_text + " по договору " + this.type + current_claim_summ
                    } else if (this.claim[i].pdf.checked) {
                        this.claim[i].type_text_full = this.claim[i].type_text + " по договору " + this.type + " за период с " + this.claim[i].getFromDateFormatted() + " по день фактического исполнения обязательств" + current_claim_summ
                    } else {
                        this.claim[i].type_text_full = this.claim[i].type_text + " по договору " + this.type + " за период с " + this.claim[i].getFromDateFormatted() + " по " + this.claim[i].getToDateFormatted() + current_claim_summ
                    }
                    break;
                default:
                    this.claim[i].type_text_full = this.claim[i].type_text + current_claim_summ
                    break;
            }
            this.claims_all = this.claims_all + " " + this.claim[i].type_text_full + ","
        }
    }
}

class ExpertiseApp {

    app_id
    expertise_id
    date
    number
    orgainzation

    summ_without
    summ_with
    summ_market
    summ_leftovers
    summ_uts

    summ_without_text
    summ_with_text
    summ_market_text
    summ_leftovers_text
    summ_uts_text

    constructor (app_id, expertise_id, date, number, orgainzation, summ_without, summ_with, summ_market, summ_leftovers, summ_uts) {
        this.app_id = app_id
        this.expertise_id = expertise_id
        this.date = date
        this.number = number
        this.orgainzation = orgainzation
        this.summ_without = Number(summ_without.value.replace(/\s+/g, ''))
        this.summ_without_text = makeRubText_genitive(this.summ_without)
        this.summ_with = Number(summ_with.value.replace(/\s+/g, ''))
        this.summ_with_text = makeRubText_genitive(this.summ_with)
        this.summ_market = Number(summ_market.value.replace(/\s+/g, ''))
        this.summ_market_text = makeRubText_genitive(this.summ_market)
        this.summ_leftovers = Number(summ_leftovers.value.replace(/\s+/g, ''))
        this.summ_leftovers_text = makeRubText_genitive(this.summ_leftovers)
        this.summ_uts = Number(summ_uts.value.replace(/\s+/g, ''))
        this.summ_uts_text = makeRubText_genitive(this.summ_uts)
    }

    getExpertiseDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
    getExpertiseDateFormatted() { return formatDate(new Date(this.getExpertiseDate())); }
}

class Agreement {

    app_id
    agreement_phone
    phone_number

    constructor (app_id, agreement_phone, phone_number) {
        this.app_id = app_id
        this.agreement_phone = agreement_phone
        this.phone_number = phone_number
    }
}

class Request {

    app_id
    inspection_id
    date
    number
    documents

    constructor (app_id, inspection_id, date, number, documents) {
        this.app_id = app_id
        this.inspection_id = inspection_id
        this.date = date
        this.number = number
        this.documents = documents
    }

    getRequestDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
    getRequestDateFormatted() { return formatDate(new Date(this.getRequestDate())); }
}

class Inspection {

    app_id
    inspection_id
    date
    number
    orgainzation

    constructor (app_id, inspection_id, date, number, orgainzation) {
        this.app_id = app_id
        this.inspection_id = inspection_id
        this.date = date
        this.number = number
        this.orgainzation = orgainzation
    }

    getInspectionDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
    getInspectionDateFormatted() { return formatDate(new Date(this.getInspectionDate())); }
}

class Expertise {

    app_id
    expertise_id
    date
    number
    orgainzation

    summ_without
    summ_with
    summ_market
    summ_leftovers
    summ_uts

    summ_without_text
    summ_with_text
    summ_market_text
    summ_leftovers_text
    summ_uts_text

    constructor (app_id, expertise_id, date, number, orgainzation, summ_without, summ_with, summ_market, summ_leftovers, summ_uts) {
        this.app_id = app_id
        this.expertise_id = expertise_id
        this.date = date
        this.number = number
        this.orgainzation = orgainzation
        this.summ_without = Number(summ_without.value.replace(/\s+/g, ''))
        this.summ_without_text = makeRubText_genitive(this.summ_without)
        this.summ_with = Number(summ_with.value.replace(/\s+/g, ''))
        this.summ_with_text = makeRubText_genitive(this.summ_with)
        this.summ_market = Number(summ_market.value.replace(/\s+/g, ''))
        this.summ_market_text = makeRubText_genitive(this.summ_market)
        this.summ_leftovers = Number(summ_leftovers.value.replace(/\s+/g, ''))
        this.summ_leftovers_text = makeRubText_genitive(this.summ_leftovers)
        this.summ_uts = Number(summ_uts.value.replace(/\s+/g, ''))
        this.summ_uts_text = makeRubText_genitive(this.summ_uts)
    }

    getExpertiseDate() {return Date.parse(changeDateType(this.date.value) + 'T00:00:00');}
    getExpertiseDateFormatted() { return formatDate(new Date(this.getExpertiseDate())); }
}

export class AppToFo {

    id
    appDate
    type //Заявление о страховом случае, претензия
    procedure //По ПВУ, в ФО виновника
    type_of_claim //Несогласие с размером, несогласие с отказом в выплате
    method //Лично, по почте
    claim_answer_time_count_days

    app_paragraph
    expertise_apps_paragraph
    app_claim_answer_time_paragraph
    agreement_paragraph
    requests_paragraph
    inspections_paragraph
    expertises_paragraph

    main_paragraph

    claimsContractToFoInfo
    claimsContractToFo = []

    expertiseAppInfo
    expertiseApps = []

    agreementInfo
    agreement

    requestInfo
    requests = []

    inspectionInfo
    inspections = []

    expertiseInfo
    expertises = []

    answerFoInfo
    paymentVoluntary = []

    claimsContract = []

    constructor (id, 
                appDate,
                type,
                procedure,
                type_of_claim,
                method,
                claimsContractToFoInfo,
                expertiseAppInfo,
                agreementInfo,
                requestInfo,
                inspectionInfo, 
                expertiseInfo, 
                answerFoInfo) {

        this.id = id
        this.appDate = appDate

        this.type = type
        this.procedure = procedure
        this.type_of_claim = type_of_claim
        this.method = method

        this.app_paragraph = ""
        this.expertise_apps_paragraph = ""
        this.app_claim_answer_time_paragraph = ""
        this.agreement_paragraph = ""
        this.requests_paragraph = ""
        this.inspections_paragraph = ""
        this.expertises_paragraph = ""
        this.main_paragraph = ""

        this.claimsContractToFoInfo = claimsContractToFoInfo
        this.expertiseAppInfo = expertiseAppInfo
        this.agreementInfo = agreementInfo
        this.requestInfo = requestInfo
        this.inspectionInfo = inspectionInfo
        this.expertiseInfo = expertiseInfo
        this.answerFoInfo = answerFoInfo
        
        //Создание экземпляров класса Требований, заявленных в данном уведомлении
        var number_of_apps_to_fo_claims_contracts = $(`.apps_to_fo_claims_contract_${id}`).length
        var apps_to_fo_claims_contract_type = $(`.apps_to_fo_claims_contract_type_${id}`)

        for (var i = 0; i < number_of_apps_to_fo_claims_contracts; i++) {
            this.claimsContractToFo[i] = new ClaimsContractToFo(id,
                                                           i + 1,
                                                           apps_to_fo_claims_contract_type[i])
        }

        //Создание экземпляров класса Экспертиз Заявителя
        var number_of_apps_to_fo_expertise_apps = $(`.apps_to_fo_expertise_apps_${id}`).length
        var apps_to_fo_expertise_app_dates = $(`.apps_to_fo_expertise_app_date_${id}`)
        var apps_to_fo_expertise_app_numbers = $(`.apps_to_fo_expertise_app_number_${id}`)
        var apps_to_fo_expertise_app_orgainzations = $(`.apps_to_fo_expertise_app_orgainzation_${id}`)
        var apps_to_fo_expertise_app_summ_withouts = $(`.apps_to_fo_expertise_app_summ_without_${id}`)
        var apps_to_fo_expertise_app_summ_withs = $(`.apps_to_fo_expertise_app_summ_with_${id}`)
        var apps_to_fo_expertise_app_summ_markets = $(`.apps_to_fo_expertise_app_summ_market_${id}`)
        var apps_to_fo_expertise_app_summ_leftovers = $(`.apps_to_fo_expertise_app_summ_leftovers_${id}`)
        var apps_to_fo_expertise_app_summ_uts = $(`.apps_to_fo_expertise_app_summ_uts_${id}`)

        for (let i = 0; i < number_of_apps_to_fo_expertise_apps; i++) {
            this.expertiseApps[i] = new ExpertiseApp(id,
                                            i + 1,
                                            apps_to_fo_expertise_app_dates[i],
                                            apps_to_fo_expertise_app_numbers[i],
                                            apps_to_fo_expertise_app_orgainzations[i],
                                            apps_to_fo_expertise_app_summ_withouts[i],
                                            apps_to_fo_expertise_app_summ_withs[i],
                                            apps_to_fo_expertise_app_summ_markets[i],
                                            apps_to_fo_expertise_app_summ_leftovers[i],
                                            apps_to_fo_expertise_app_summ_uts[i])
        }

        //Создание экземпляра класса Согласия на уведомление по СМС
        var apps_to_fo_agreement_phone = $(`.apps_to_fo_agreement_phone_${id}`)
        var apps_to_fo_phone_number = $(`.apps_to_fo_phone_number_${id}`)

        this.agreement = new Agreement(id,
                                       apps_to_fo_agreement_phone[0],
                                       apps_to_fo_phone_number[0])


        //Создание экземпляров класса Осмотров
        var number_of_apps_to_fo_request = $(`.apps_to_fo_requests_${id}`).length
        var apps_to_fo_request_dates = $(`.apps_to_fo_request_date_${id}`)
        var apps_to_fo_request_numbers = $(`.apps_to_fo_request_number_${id}`)
        var apps_to_fo_request_orgainzations = $(`.apps_to_fo_request_documents_${id}`)

        for (let i = 0; i < number_of_apps_to_fo_request; i++) {
            this.requests[i] = new Request(id,
                                            i + 1,
                                            apps_to_fo_request_dates[i],
                                            apps_to_fo_request_numbers[i],
                                            apps_to_fo_request_orgainzations[i])
        }

        //Создание экземпляров класса Осмотров
        var number_of_apps_to_fo_inspection = $(`.apps_to_fo_inspections_${id}`).length
        var apps_to_fo_inspection_dates = $(`.apps_to_fo_inspection_date_${id}`)
        var apps_to_fo_inspection_numbers = $(`.apps_to_fo_inspection_number_${id}`)
        var apps_to_fo_inspection_orgainzations = $(`.apps_to_fo_inspection_orgainzation_${id}`)

        for (let i = 0; i < number_of_apps_to_fo_inspection; i++) {
            this.inspections[i] = new Inspection(id,
                                            i + 1,
                                            apps_to_fo_inspection_dates[i],
                                            apps_to_fo_inspection_numbers[i],
                                            apps_to_fo_inspection_orgainzations[i])
        }
        
        //Создание экземпляров класса Экспертиз
        var number_of_apps_to_fo_expertises = $(`.apps_to_fo_expertises_${id}`).length
        var apps_to_fo_expertise_dates = $(`.apps_to_fo_expertise_date_${id}`)
        var apps_to_fo_expertise_numbers = $(`.apps_to_fo_expertise_number_${id}`)
        var apps_to_fo_expertise_orgainzations = $(`.apps_to_fo_expertise_orgainzation_${id}`)
        var apps_to_fo_expertise_summ_withouts = $(`.apps_to_fo_expertise_summ_without_${id}`)
        var apps_to_fo_expertise_summ_withs = $(`.apps_to_fo_expertise_summ_with_${id}`)
        var apps_to_fo_expertise_summ_markets = $(`.apps_to_fo_expertise_summ_market_${id}`)
        var apps_to_fo_expertise_summ_leftovers = $(`.apps_to_fo_expertise_summ_leftovers_${id}`)
        var apps_to_fo_expertise_summ_uts = $(`.apps_to_fo_expertise_summ_uts_${id}`)

        for (let i = 0; i < number_of_apps_to_fo_expertises; i++) {
            this.expertises[i] = new Expertise(id,
                                            i + 1,
                                            apps_to_fo_expertise_dates[i],
                                            apps_to_fo_expertise_numbers[i],
                                            apps_to_fo_expertise_orgainzations[i],
                                            apps_to_fo_expertise_summ_withouts[i],
                                            apps_to_fo_expertise_summ_withs[i],
                                            apps_to_fo_expertise_summ_markets[i],
                                            apps_to_fo_expertise_summ_leftovers[i],
                                            apps_to_fo_expertise_summ_uts[i])
        }

        //Получение массива значений всех переменных добровольных выплат
        var number_of_payments = $(`.payment_${id}`).length; //Получение количества строк с выплатами
        var payments_names = $(`.payments_name_${id}`); //Получение массива видов выплат
        var payments_dates = $(`.payments_date_${id}`); //Получение массива дат выплат
        var payments_orders = $(`.payments_order_${id}`); //Получение массива номеров ПП
        var payments_summs = $(`.payments_summ_${id}`); //Получение массива сумм выплат
        var penalty_ndfls = $(`.penalty_ndfl_${id}`); //Получение массива выплат неустойки с НДФЛ
        var penalty_ndfl_summs = $(`.penalty_ndfl_summ_${id}`); //Получение массива сумм удержанного НДФЛ
        var penalty_ndfl_persents = $(`.penalty_ndfl_persent_${id}`); //Получение массива процентов НДФЛ
        //Создание экземпляров добровольных выплат
        for (var i = 0; i < number_of_payments; i++) {
            this.paymentVoluntary[i] = new PaymentVoluntary(id,
                                                            i + 1,
                                                            payments_names[i],
                                                            payments_dates[i],
                                                            payments_orders[i],
                                                            payments_summs[i],
                                                            penalty_ndfls[i],
                                                            penalty_ndfl_summs[i])
        }

        //Получение массива значений всех требований к ФУ
        var number_of_main_claims_contracts = $('.main_claims_contracts').length
        var claims_contract_types = $('.claims_contract_types')

        for (var i = 0; i < number_of_main_claims_contracts; i++) {
            this.claimsContract[i] = new ClaimsContract(i + 1,
                                                claims_contract_types[i])
            
        }

        var main_fo_name = document.querySelector("#fo_name").value

        //Если ФУ заявлено требований только по одному договору
        if (number_of_main_claims_contracts == 1) {
            //Если ФУ заявлено требований по договору ОСАГО
            if (this.claimsContract[0].type.options.selectedIndex == 1) {
                //Если заявитель обратился с заявлением о страховом возмещении
                if (this.type.options.selectedIndex == 1) {
                    //Формирование процедуры обращения в ФО
                    var procedure_helper = ""
                    if (this.procedure.options.selectedIndex == 1) {
                        procedure_helper = "о прямом возмещении убытков"
                    } else if (this.procedure.options.selectedIndex == 2) {
                        procedure_helper = "о страховом возмещении по Договору ОСАГО"
                    }
                    //Формирование первого параграфа заявления в ФО
                    this.app_paragraph = `${this.getAppDateFormatted()} Заявитель обратился в ${main_fo_name} с заявлением 
                    ${procedure_helper}, предоставив все документы, предусмотренные Правилами обязательного 
                    страхования гражданской ответственности владельцев транспортных средств, утвержденными 
                    Положением Банка России от 19.09.2014 № 431-П (далее – Правила ОСАГО).<br>`

                    //Формирование параграфа с согласием на уведомление по СМС
                    if (this.agreementInfo.options.selectedIndex == 1) {
                        if (this.agreement.agreement_phone.options.selectedIndex == 1) {
                            this.agreement_paragraph = `В заявлении ${procedure_helper} Заявитель дал свое согласие 
                            на получение уведомлений о ходе рассмотрения заявления путем смс-сообщений на номер 
                            телефона ${this.agreement.phone_number.value}.<br>`
                        } else {
                            
                        }
                    }

                    //Формирование параграфа о запросе документов
                    if (this.requestInfo.options.selectedIndex == 1) {
                        var request_helper = ` письмом от ${this.requests[0].getRequestDateFormatted()} № ${this.requests[0].number.value}`
                        this.requests_paragraph = `${this.requests[0].getRequestDateFormatted()} 
                        ${main_fo_name} в ответ на заявление от ${this.getAppDateFormatted()} ${request_helper} 
                        запросило у Заявителя ${this.requests[0].documents.value}.<br>`
                    }

                    //Формирование параграфа о проведении осмотра ТС
                    if (this.inspectionInfo.options.selectedIndex == 1) {
                        var inspections_orgainzation_helper = ""
                        if (this.inspections[0].orgainzation.value != "") {
                            inspections_orgainzation_helper = `с привлечением независимой экспертной организации ${this.inspections[0].orgainzation.value}`
                        }
                        var inspections_number_helper = ""
                        if (this.inspections[0].number.value != "") {
                            inspections_number_helper = `, о чем составлен акт осмотра № ${this.inspections[0].number.value} от ${this.inspections[0].getInspectionDateFormatted()}`
                        }
                        this.inspections_paragraph = `${this.inspections[0].getInspectionDateFormatted()} 
                        ${main_fo_name} проведен осмотр принадлежащего Заявителю Транспортного средства 
                        ${inspections_orgainzation_helper}${inspections_number_helper}.<br>`
                    }

                    //Формирование параграфа о проведении экспертиз ТС
                    if (this.expertiseInfo.options.selectedIndex == 1) {
                        var expertises_paragraph_one = ""
                        var expertises_paragraph_helper = ""
                        var expertises_summ_paragraph
                        if (this.inspectionInfo.options.selectedIndex == 1) {
                            expertises_paragraph_helper = `На основании результатов осмотра от ${this.inspections[0].getInspectionDateFormatted()}`
                        } else {
                            expertises_paragraph_helper = `По инициативе ${main_fo_name}`
                        }
                        for (let i = 0; i < this.expertises.length; i++) {
                            expertises_summ_paragraph = ""
                            if (this.expertises[i].summ_without != 0) {
                                expertises_summ_paragraph = expertises_summ_paragraph + `стоимость восстановительного ремонта 
                                Транспортного средства без учета износа составила ${this.expertises[i].summ_without_text}, `
                            }
                            if (this.expertises[i].summ_with != 0) {
                                expertises_summ_paragraph = expertises_summ_paragraph + `стоимость восстановительного ремонта 
                                Транспортного средства с учетом износа составила ${this.expertises[i].summ_with_text}, `
                            }
                            if (this.expertises[i].summ_market != 0) {
                                expertises_summ_paragraph = expertises_summ_paragraph + `средняя рыночная стоимость 
                                Транспортного средства до повреждения по состоянию на дату ДТП составляла ${this.expertises[i].summ_market_text}, `
                            }
                            if (this.expertises[i].summ_leftovers != 0) {
                                expertises_summ_paragraph = expertises_summ_paragraph + `стоимость годных остатков поврежденного 
                                Транспортного средства составила ${this.expertises[i].summ_leftovers_text}, `
                            }
                            if (this.expertises[i].summ_uts != 0) {
                                expertises_summ_paragraph = expertises_summ_paragraph + `сумма УТС составила ${this.expertises[i].summ_uts_text}, `
                            }
                            expertises_summ_paragraph = expertises_summ_paragraph.slice(0, -2)
                            expertises_paragraph_one = `${expertises_paragraph_helper} независимой экспертной организацией 
                            ${this.expertises[i].orgainzation.value} подготовлено экспертное заключение от ${this.expertises[i].getExpertiseDateFormatted()} 
                            № ${this.expertises[i].number.value}, согласно которому ${expertises_summ_paragraph}.<br>`

                            this.expertises_paragraph = this.expertises_paragraph + expertises_paragraph_one
                        }
                    }
                //Если заявитель обратился с претензией
                } else if (this.type.options.selectedIndex == 2) {
                    //Формирование процедуры обращения в ФО
                    var procedure_helper = ""
                    var procedure_helper_2 = ""
                    if (this.getAppDate() >= DATE_FZ_123_START) {
                        procedure_helper = "заявлением (претензией)"
                        procedure_helper_2 = "содержащим"
                    } else {
                        procedure_helper = "претензией"
                        procedure_helper_2 = "содержащей"
                    }
                    var type_of_claim_helper_1 = ""
                    var type_of_claim_helper_2 = ""
                    if (this.type_of_claim.options.selectedIndex == 1) {
                        type_of_claim_helper_1 = `размером выплаченного ${main_fo_name}`
                        type_of_claim_helper_2 = "доплате"
                    } else {
                        type_of_claim_helper_1 = `отказом ${main_fo_name} в выплате`
                        type_of_claim_helper_2 = "выплате"
                    }
                    var app_claims_paragraph_helper = ""
                    for (let i = 0; i < this.claimsContractToFo.length; i++) {
                        app_claims_paragraph_helper = app_claims_paragraph_helper + this.claimsContractToFo[i].claims_all
                    }
                    app_claims_paragraph_helper = app_claims_paragraph_helper.slice(0, -1)
                    //Формирование первого параграфа заявления в ФО
                    this.app_paragraph = `${this.getAppDateFormatted()} Заявитель обратился в ${main_fo_name} с 
                    ${procedure_helper} о несогласии с ${type_of_claim_helper_1} страхового возмещения, ${procedure_helper_2} требование о 
                    ${type_of_claim_helper_2} ${app_claims_paragraph_helper}.<br>`

                    //Формирование параграфа о проведении экспертиз ТС Заявителя
                    if (this.expertiseAppInfo.options.selectedIndex == 1) {
                        var expertiseApps_paragraph_one = ""
                        var expertiseApps_paragraph_helper = ""
                        var expertiseApps_summ_paragraph
                        for (let i = 0; i < this.expertiseApps.length; i++) {
                            if (i == 0) {
                                expertiseApps_paragraph_helper = `В обоснование заявленных требований Заявитель предоставил`
                            } else if (i == 1) {
                                expertiseApps_paragraph_helper = `Кроме того, Заявитель предоставил`
                            } else {
                                expertiseApps_paragraph_helper = `Также Заявителем предоставлено`
                            }
                            expertiseApps_summ_paragraph = ""
                            if (this.expertiseApps[i].summ_without != 0) {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `стоимость восстановительного ремонта 
                                Транспортного средства без учета износа составила ${this.expertiseApps[i].summ_without_text}, `
                            }
                            if (this.expertiseApps[i].summ_with != 0) {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `стоимость восстановительного ремонта 
                                Транспортного средства с учетом износа составила ${this.expertiseApps[i].summ_with_text}, `
                            }
                            if (this.expertiseApps[i].summ_market != 0) {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `средняя рыночная стоимость 
                                Транспортного средства до повреждения по состоянию на дату ДТП составляла ${this.expertiseApps[i].summ_market_text}, `
                            }
                            if (this.expertiseApps[i].summ_leftovers != 0) {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `стоимость годных остатков поврежденного 
                                Транспортного средства составила ${this.expertiseApps[i].summ_leftovers_text}, `
                            }
                            if (this.expertiseApps[i].summ_uts != 0) {
                                expertiseApps_summ_paragraph = expertiseApps_summ_paragraph + `сумма УТС составила ${this.expertiseApps[i].summ_uts_text}, `
                            }
                            expertiseApps_summ_paragraph = expertiseApps_summ_paragraph.slice(0, -2)
                            expertiseApps_paragraph_one = `${expertiseApps_paragraph_helper} экспертное заключение  
                            ${this.expertiseApps[i].orgainzation.value} от ${this.expertiseApps[i].getExpertiseDateFormatted()} 
                            № ${this.expertiseApps[i].number.value}, в соответствии с которым ${expertiseApps_summ_paragraph}.<br>`

                            this.expertise_apps_paragraph = this.expertise_apps_paragraph + expertiseApps_paragraph_one
                        }
                    }
                    //Формирование параграфа со сроком ответа на претензию
                    if (this.method.options.selectedIndex == 3) {
                        this.claim_answer_time_count_days = 15
                    } else {
                        this.claim_answer_time_count_days = 30
                    }
                    if (this.getAppDate() >= DATE_FZ_123_START) {
                        this.app_claim_answer_time_paragraph = `В соответствии со статьей 16 Закона № 123-ФЗ ${main_fo_name} 
                        должно рассмотреть заявление (претензию) и направить Заявителю ответ не позднее ${this.getLastClaimFoDayFormatted()}.<br>`
                    }
                    
                }
            } else {
                
            }
            
        } else {
            
        }
        this.main_paragraph = this.app_paragraph + 
                              this.expertise_apps_paragraph +
                              this.app_claim_answer_time_paragraph +
                              this.agreement_paragraph + 
                              this.requests_paragraph + 
                              this.inspections_paragraph + 
                              this.expertises_paragraph

    }

    getAppDate() {return Date.parse(changeDateType(this.appDate.value) + 'T00:00:00');}
    getAppDateFormatted() { return formatDate(new Date(this.getAppDate())); }
    getLastClaimFoDay() { return findLastClaimFoDay(this.getAppDate(), this.claim_answer_time_count_days) }
    getLastClaimFoDayFormatted() { return formatDate(new Date(this.getLastClaimFoDay())); }

}