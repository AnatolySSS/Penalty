var i = 1;
if (document.querySelector('date_sv_last_day') != null) {
  document.querySelector('date_sv_last_day').onclick = function(){
    if (holly_boolen) {
      if (i % 2 == 0) {
        document.querySelector('#date_sv_last_day').setAttribute('tooltip', '193 ГК РФ');
        i++;
      } else {
        document.querySelector('#date_sv_last_day').setAttribute('tooltip', formatDate(new Date(off_days[0])));
        document.querySelector('#date_sv_last_day').setAttribute('flow', 'down');
        i++;
      }
    }
  }
}
for (var i = 0; i < off_days.length; i++) {
  
  document.querySelector('#test_span').innerHTML += ' ' + formatDate(new Date(off_days[i]));
}
