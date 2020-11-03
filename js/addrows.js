function addrows(e) {

  var target = e.target || e.srcElement

  if (target == app_btn_1) {
    $("#app_form_row_2").show('fast');
    $("#app_form_row_3").show('fast');
    $("#app_form_row_4").show('fast');
  } else if (target == app_btn_1) {
    $("#app_form_row_2").hide('fast');
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

  if ((target == add_info_btn_1) && (add_info_btn_1.innerHTML == "▼")) {
    $("#add_info_pay_form_row_1").show();
    document.getElementById('add_info_btn_1').innerHTML = "▲";
  } else if ((target == add_info_btn_1) && (add_info_btn_1.innerHTML == "▲")) {
    $("#add_info_pay_form_row_1").hide();
    document.getElementById('add_info_btn_1').innerHTML = "▼";
  } else if ((target == add_info_btn_2) && (add_info_btn_2.innerHTML == "▼")) {
    $("#add_info_pay_form_row_2").show();
    document.getElementById('add_info_btn_2').innerHTML = "▲";
  } else if ((target == add_info_btn_2) && (add_info_btn_2.innerHTML == "▲")) {
    $("#add_info_pay_form_row_2").hide();
    document.getElementById('add_info_btn_2').innerHTML = "▼";
  } else if ((target == add_info_btn_3) && (add_info_btn_3.innerHTML == "▼")) {
    $("#add_info_pay_form_row_3").show();
    document.getElementById('add_info_btn_3').innerHTML = "▲";
  } else if ((target == add_info_btn_3) && (add_info_btn_3.innerHTML == "▲")) {
    $("#add_info_pay_form_row_3").hide();
    document.getElementById('add_info_btn_3').innerHTML = "▼";
  } else if ((target == add_info_btn_4) && (add_info_btn_4.innerHTML == "▼")) {
    $("#add_info_pay_form_row_4").show();
    document.getElementById('add_info_btn_4').innerHTML = "▲";
  } else if ((target == add_info_btn_4) && (add_info_btn_4.innerHTML == "▲")) {
    $("#add_info_pay_form_row_4").hide();
    document.getElementById('add_info_btn_4').innerHTML = "▼";
  } else if ((target == add_info_btn_5) && (add_info_btn_5.innerHTML == "▼")) {
    $("#add_info_pay_form_row_5").show();
    document.getElementById('add_info_btn_5').innerHTML = "▲";
  } else if ((target == add_info_btn_5) && (add_info_btn_5.innerHTML == "▲")) {
    $("#add_info_pay_form_row_5").hide();
    document.getElementById('add_info_btn_5').innerHTML = "▼";
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
        break;
      case pay_btn_3:
        $("#pay_form_row_3").hide('fast');
        break;
      case pay_btn_4:
        $("#pay_form_row_4").hide('fast');
        break;
      case pay_btn_5:
        $("#pay_form_row_5").hide('fast');
        break;
      default:
    }

}

document.addEventListener('click', addrows);
