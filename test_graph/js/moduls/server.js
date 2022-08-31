const XLSX = require('xlsx')
var enterprise = require("@ag-grid-enterprise/core");
import { check_signs } from "./motivations/motivation";
// let data_from_db_main = {}
export function objToJSON (totalData) {
    return new Promise(function(resolve, reject) {
        let data_from_db_main = {}
        let request = new XMLHttpRequest();
        request.open("POST", "/total_data", true)
        request.setRequestHeader("Content-Type", "application/json")
        
        request.send(JSON.stringify(totalData))
        
        request.addEventListener("load", function () {
        // получаем и парсим ответ сервера
            let result = JSON.parse(request.response);
            
            let signs = {}
            for (let i = 0; i < Object.keys(result[0]).length; i++) {
                if (Object.keys(result[0])[i].indexOf("sign") >= 0) {
                    signs[Object.values(result[0])[i]] = ""
                }
            }
            let fact_signs = check_signs(totalData, signs)
            data_from_db_main = {
                fact_signs : fact_signs,
                total_data : result,
            }
            resolve(data_from_db_main)
        });
    })
}

export function appDataToJSON (object) {

    let request = new XMLHttpRequest();
    request.open("POST", "/app_data", true)
    request.setRequestHeader("Content-Type", "application/json")
    
    request.send(JSON.stringify(object))
    request.addEventListener("load", function () {
        // получаем и парсим ответ сервера
        let receivedData = JSON.parse(request.response);
        $("#fu_name").val(receivedData.fu_name)
        $("#date_appeal").val(receivedData.date_appeal)
        $("#fo_name").val(receivedData.fo_name)
        $("#app_type").val(receivedData.app_type)
        $("#app_status").val(receivedData.app_status)
    });
}

export function motive_download(data) {
    let request = new XMLHttpRequest();
    request.open("POST", "/motive_download", true)
    request.setRequestHeader("Content-Type", "application/json")

    const workbook = XLSX.read(data, {type : "binary"})
    let worksheet = {}
    worksheet = XLSX.utils.sheet_to_json(workbook.Sheets['Мотивировки'])
    
    //Посылаем запрос на сервер
    request.send(JSON.stringify(worksheet))
}

export function show_motivations() {
    let request = new XMLHttpRequest();
    request.open("POST", "/show_motivations", true)
    request.setRequestHeader("Content-Type", "application/json")

    request.send()

    request.addEventListener("load", function () {

        // получаем и парсим ответ сервера
        let receivedData = JSON.parse(request.response)

        //Если таблица motivations имеется в базе данных
        if (receivedData.result != "Таблица с мотивировками отсутствует в базе данных") {

            const gridDiv = document.querySelector('#decision_test')

            if (!gridDiv.childNodes.length) {

                let checkboxSelection = function (params) {
                    // we put checkbox on the name if we are not doing grouping
                    return params.columnApi.getRowGroupColumns().length === 0;
                };
                let headerCheckboxSelection = function (params) {
                    // we put checkbox on the name if we are not doing grouping
                    return params.columnApi.getRowGroupColumns().length === 0;
                };
    
                const columnDefs = [{ field: "id",
                                      checkboxSelection: checkboxSelection,
                                      headerCheckboxSelection: headerCheckboxSelection, }]
    
                for (let i = 1; i < Object.values(receivedData[0]).length; i++) {
                    columnDefs.push({ field: String(Object.values(receivedData[0])[i]), })
                }
                    
                const rowData = []
    
                for (let i = 1; i < receivedData.length; i++) {
                    let obj = {}
                    obj["id"] = i
                    for (let j = 1; j < columnDefs.length; j++) {
    
                        let key = columnDefs[j].field
                        let value = Object.values(receivedData[i])[j]
                        obj[key] = value
                    }
                    rowData.push(obj)
                }
    
                const gridOptions = {
                    columnDefs: columnDefs,
                    rowData: rowData,
                    pagination: true,
                    // default col def properties get applied to all columns
                    defaultColDef: {
                        sortable: true,
                        resizable: true,
                        filter: true,
                        flex: 1,
                        minWidth: 200,
                    },
                    rowSelection: 'multiple', // allow rows to be selected
                    animateRows: true, // have rows animate to new positions when sorted
    
                    // example event handler
                    onCellClicked: params => {
                        $('#article_of_the_law').find('h5').html(params.colDef.field)
                        $('#article_of_the_law').find('p').html(params.value)
                        $('#article_of_the_law').modal('show')
                    }
                }
    
                new agGrid.Grid(gridDiv, gridOptions)
            }
            $('#decision_test').parent().parent().parent().show('fast')
            $('#show_motivations').modal('show')
        } else {
            alert("Таблица с мотивировками отсутствует в базе данных.\nНеобходимо загрузить таблицу")
        }
    })
}

export function motive_delete() {
    let request = new XMLHttpRequest();
    request.open("POST", "/motive_delete", true)
    request.setRequestHeader("Content-Type", "application/json")
    
    request.send()
    // document.querySelector('#decision_test').innerHTML = "Данные удалены";
    $('#decision_test').parent().parent().parent().hide('fast')
    // request.addEventListener("load", function () {
    // // получаем и парсим ответ сервера
    //     let receivedUser = JSON.parse(request.response);
    //     document.querySelector('#decision_test').innerHTML = receivedUser;
    // });
}