import { changeDateType } from './changeDateType.js';
import { makeRubText_genitive } from "./makeRubText_genitive";
import { formatDate } from "./formatDate";
import { inclineFirstname, inclineLastname, inclineMiddlename, getLastnameGender } from 'lvovich';

export class DtpParticipantContract {

    id

    type
    fo_name
    number
    date_conclusion
    date_start
    date_end

    contract_paragraph

    constructor (id, type, fo_name, number, date_conclusion, date_start, date_end){

        this.id = id
        this.type = type
        this.fo_name = fo_name
        this.number = number
        this.date_conclusion = date_conclusion
        this.date_start = date_start
        this.date_end = date_end

    }

    getConclusionDate() {return Date.parse(changeDateType(this.date_conclusion.value) + 'T00:00:00');}
    getConclusionDateFormatted() { return formatDate(new Date(this.getConclusionDate())); }
    getStartDate() {return Date.parse(changeDateType(this.date_start.value) + 'T00:00:00');}
    getStartDateFormatted() { return formatDate(new Date(this.getStartDate())); }
    getEndDate() {return Date.parse(changeDateType(this.date_end.value) + 'T00:00:00');}
    getEndDateFormatted() { return formatDate(new Date(this.getEndDate())); }
}

export class DtpParticipant {

    id

    car_brand
    car_model
    car_reg_number
    car_vin_number
    car_year
    car_type
    car_weight
    driver_name
    driver_name_genitive
    driver_gender
    driver_declination
    owner_name
    owner_name_genitive
    owner_gender
    owner_declination
    is_guilty

    full_car_name
    contract_paragraph_all

    car_contracts = []

    constructor (id, car_brand, car_model, car_reg_number, car_vin_number,
                 car_year, car_type, car_weight, driver_name, owner_name, is_guilty) {

        this.id = id;
        this.car_brand = car_brand
        this.car_model = car_model
        this.car_reg_number = car_reg_number
        this.car_vin_number = car_vin_number
        this.car_year = car_year
        this.car_type = car_type
        this.car_weight = car_weight
        this.driver_name = driver_name
        this.driver_gender = getLastnameGender(this.driver_name.value.split(" ")[0])
        this.driver_name_genitive = `${inclineLastname(this.driver_name.value.split(" ")[0], 'genitive')} 
                                ${this.driver_name.value.split(" ")[1]}`
        if (this.driver_gender == 'male') {
            this.driver_declination = "управлявшего"
        } else if (this.driver_gender == 'female') {
            this.driver_declination = "управлявшей"
        } else {
            this.driver_declination = "управлявшего"
        }
        this.owner_name = owner_name
        this.owner_gender = getLastnameGender(this.owner_name.value.split(" ")[0])
        this.owner_name_genitive = `${inclineLastname(this.owner_name.value.split(" ")[0], 'genitive')} 
                                ${this.owner_name.value.split(" ")[1]}`
        if (this.owner_gender == 'male') {
            this.owner_declination = "управлявшего"
        } else if (this.owner_gender == 'female') {
            this.owner_declination = "управлявшей"
        } else {
            this.owner_declination = "управлявшего"
        }
        this.is_guilty = is_guilty

        this.full_car_name = `${this.car_brand.value} ${this.car_model.value}, государственный регистрационный номер 
        ${this.car_reg_number.value}`
        
        if (this.id == 1) {
            this.full_car_name = `${this.car_brand.value} ${this.car_model.value}, государственный регистрационный номер 
            ${this.car_reg_number.value}, год выпуска ${this.car_year.value} (далее – Транспортное средство)`
        }

        this.contract_paragraph_all = ""

        var number_of_contracts = $('.car_contract_' + id).length;
        var types = $('.car_contract_type_' + id); //Получение массива требований
        var fo_name = $('.car_contract_osago_fo_name_' + id)
        var number = $('.car_contract_osago_fo_number_' + id)
        var date_conclusion = $('.car_contract_osago_fo_date_conclusion_' + id)
        var date_start = $('.car_contract_osago_fo_date_start_' + id)
        var date_end = $('.car_contract_osago_fo_date_end_' + id)

        for (let i = 0; i < number_of_contracts; i++) {

            this.car_contracts[i] = new DtpParticipantContract(i + 1,
                types[i],
                fo_name[i],
                number[i],
                date_conclusion[i],
                date_start[i],
                date_end[i])
            
            fo_name = document.querySelector("#fo_name").value
            var osago_def = ""
            var casco_def = ""
            if (fo_name == this.car_contracts[i].fo_name.value) {
                osago_def = " (далее – Договор ОСАГО)"
                casco_def = " (далее – Договор КАСКО)"
            }

            if (this.id == 1) {
                switch (this.car_contracts[i].type.options.selectedIndex) {
                    case 1:
                        this.car_contracts[i].contract_paragraph = `${this.car_contracts[i].getConclusionDateFormatted()} между Заявителем и ${this.car_contracts[i].fo_name.value} 
                        заключен договор ОСАГО серии ${this.car_contracts[i].number.value} со сроком страхования с ${this.car_contracts[i].getStartDateFormatted()} 
                        до ${this.car_contracts[i].getEndDateFormatted()}${osago_def}.<br>`
                        break
                    case 2:
        
                        break
                    default:
                        break
                }
            } else {
                switch (this.car_contracts[i].type.options.selectedIndex) {
                    case 1:
                        this.car_contracts[i].contract_paragraph = `Гражданская ответственность ${this.driver_name_genitive} 
                        застрахована в ${this.car_contracts[i].fo_name.value} в рамках договора ОСАГО серии 
                        ${this.car_contracts[i].number.value} со сроком страхования с ${this.car_contracts[i].getStartDateFormatted()}
                        до ${this.car_contracts[i].getEndDateFormatted()}${osago_def}.<br>`
                        break
                    case 2:
        
                        break
                    default:
                        break
                }
            }

            this.contract_paragraph_all = this.contract_paragraph_all + this.car_contracts[i].contract_paragraph

        }

        
    }
}