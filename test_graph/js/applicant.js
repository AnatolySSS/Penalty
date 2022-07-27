//Добавляет поле для ввода номера телефона
$(document).on("change", ".app_type", function (event) {
	if ($(this).find(':selected').text() == "ФЛ") {
        $(this).parent().parent().parent().find('.fl').show('fast')
        $(this).parent().parent().parent().find('.fl').find('input').addClass('form-control')

        $(this).parent().parent().parent().find('.ip').hide('fast')
        $(this).parent().parent().parent().find('.ul').hide('fast')
        setTimeout(() => {
            $(this).parent().parent().parent().find('.ip').find('input').removeClass('form-control')
            $(this).parent().parent().parent().find('.ul').find('input').removeClass('form-control')
        }, 200)
	} else if ($(this).find(':selected').text() == "ИП") {
        $(this).parent().parent().parent().find('.ip').show('fast')
        $(this).parent().parent().parent().find('.ip').find('input').addClass('form-control')

        $(this).parent().parent().parent().find('.fl').hide('fast')
        $(this).parent().parent().parent().find('.ul').hide('fast')
        setTimeout(() => {
            $(this).parent().parent().parent().find('.fl').find('input').removeClass('form-control')
            $(this).parent().parent().parent().find('.ul').find('input').removeClass('form-control')
        }, 200)
	} else if ($(this).find(':selected').text() == "ЮЛ") {
        $(this).parent().parent().parent().find('.ul').show('fast')
        $(this).parent().parent().parent().find('.ul').find('input').addClass('form-control')

        $(this).parent().parent().parent().find('.fl').hide('fast')
        $(this).parent().parent().parent().find('.ip').hide('fast')
        setTimeout(() => {
            $(this).parent().parent().parent().find('.fl').find('input').removeClass('form-control')
            $(this).parent().parent().parent().find('.ip').find('input').removeClass('form-control')
        }, 200)
    } else {
        $(this).parent().parent().parent().find('.fl').hide('fast')
        $(this).parent().parent().parent().find('.ip').hide('fast')
        $(this).parent().parent().parent().find('.ul').hide('fast')
        setTimeout(() => {
            $(this).parent().parent().parent().find('.fl').find('input').removeClass('form-control')
            $(this).parent().parent().parent().find('.ip').find('input').removeClass('form-control')
            $(this).parent().parent().parent().find('.ul').find('input').removeClass('form-control')
        }, 200)
    }
    validationCheckUpdate('preambula')
    validationCheck('preambula')
});