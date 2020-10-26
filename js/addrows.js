document.getElementById('sv_btn').onclick =  function addrows() {

  var sv_btn = document.getElementById('sv_btn');
  var table_1__tbody = document.getElementById('table_1__tbody');

  var tr = [];
  var td_name = [];
  var td_date = [];
  var td_btn = [];
  var input = [];
  var btn = [];

  for (var i = 1; i <= 4; i++) {
    tr[i] = document.createElement('tr');
    td_name[i] = document.createElement('td');
    td_date[i] = document.createElement('td');
    td_btn[i] = document.createElement('td');
    input[i] = document.createElement('input');
    btn[i] = document.createElement('button');

    tr[i].setAttribute('id', 'tr' + i);
    td_name[i].innerHTML = 'о выплате УТС';
    td_name[i].setAttribute('id', 'td_name' + i);
    td_date[i].setAttribute('align', 'center');
    td_date[i].setAttribute('id', 'td_date' + i);
    input[i].setAttribute('id', 'date_uts');
    input[i].setAttribute('class', 'datepicker-here');
    input[i].setAttribute('type', 'text-here');
    input[i].setAttribute('size', '8');
    input[i].setAttribute('id', 'input' + i);
    btn[i].setAttribute('class', 'btn btn-warning');
    btn[i].setAttribute('id', 'btn' + i);
    btn[i].innerHTML = '+';
  }

  if (sv_btn.innerHTML == "+") {
    table_1__tbody.appendChild(tr[1]);
    tr[1].appendChild(td_name[1]);
    tr[1].appendChild(td_date[1]);
    tr[1].appendChild(td_btn[1]);
    td_date[1].appendChild(input[1]);
    td_btn[1].appendChild(btn[1]);
    sv_btn.innerHTML = '-';
  } else {
    document.getElementById('tr' + 1).parentNode.removeChild(document.getElementById('tr' + 1));
    sv_btn.innerHTML = '+';
  }







}
