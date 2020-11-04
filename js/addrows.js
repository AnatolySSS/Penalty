function addrows(e) {

  let target = e.target || e.srcElement;

  if (target == app_btn_1) {
    $("#app_form_row_2").show('fast');
    $("#app_form_row_3").show('fast');
    $("#app_form_row_4").show('fast');
  } else if (target == app_btn_2) {
    $("#app_form_row_2").hide('fast');
    document.getElementById('app_date_2').value = "";
  } else if (target == app_btn_3) {
    $("#app_form_row_3").hide('fast');
    document.getElementById('app_date_3').value = "";
  } else if (target == app_btn_4) {
    $("#app_form_row_4").hide('fast');
    document.getElementById('app_date_4').value = "";
  }

  if (target == pay_btn_1) {
    for (var i = 2; i <= 5; i++) {
      $("#pay_form_row_" + i).show('fast');
    }
  }

  if (target == court_if_1) {
    $("#div_date_court_1").show();
    $("#div_date_fu_1").hide();
  } else if (target == voluntary_if_1) {
    $("#div_date_fu_1").hide();
    $("#div_date_court_1").hide();
  } else if (target == fu_if_1) {
    $("#div_date_fu_1").show();
    $("#div_date_court_1").hide();
  }

    switch (target) {
      case pay_btn_2:
        $("#pay_form_row_2").hide('fast');
        $("#add_info_pay_form_row_2").hide('fast');
        if ($("#add_info_btn_2").find(".toggle").hasClass("rotate")) {
          $("#add_info_btn_2").find(".toggle").removeClass("rotate");
        }
        break;
      case pay_btn_3:
        $("#pay_form_row_3").hide('fast');
        $("#add_info_pay_form_row_3").hide('fast');
        if ($("#add_info_btn_3").find(".toggle").hasClass("rotate")) {
          $("#add_info_btn_3").find(".toggle").removeClass("rotate");
        }
        break;
      case pay_btn_4:
        $("#pay_form_row_4").hide('fast');
        $("#add_info_pay_form_row_4").hide('fast');
        if ($("#add_info_btn_4").find(".toggle").hasClass("rotate")) {
          $("#add_info_btn_4").find(".toggle").removeClass("rotate");
        }
        break;
      case pay_btn_5:
        $("#pay_form_row_5").hide('fast');
        $("#add_info_pay_form_row_5").hide('fast');
        if ($("#add_info_btn_5").find(".toggle").hasClass("rotate")) {
          $("#add_info_btn_5").find(".toggle").removeClass("rotate");
        }
        break;
      default:
    }

}

document.addEventListener('click', addrows);
