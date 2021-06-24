//Переменные для рисования графика SWG
import { makeRubText_nominative } from './makeRubText_nominative.js';
import { makeRubText_genitive } from './makeRubText_genitive.js';
import { declinationDays } from './declinationDays.js';

export function fillPenaltyGraph(swg_graph,
                 max_days_delay,
                 count_days,
                 count_vol_days,
                 payment_vol_types,
                 payment_vol_summs,
                 count_fu_days,
                 payment_fu_last_days,
                 payment_fu_summs,
                 payment_fu_types,
                 count_court_days,
                 payment_court_summs,
                 payment_court_types,
                 payment_court_in_force_dates,
                 fu_claim_set) {
  swg_graph.clear();
  var line_svg_payment = [];
  var rect_svg_payment = [];
  var text_svg_payment = [];
  var indent = 40; // отступ от краев
  var time_index = 0.9; // доля от общей длины по горизонтали
  var line_21_day = [];
  var line_fu_day = [];
  var line_payment = [];
  var line_payment_time = [];
  var line_payment_$ = [];
  var rect_payment = [];
  var text_rect = [];
  var text_line = [];
  var line_index = 0;
  var current_summ = 0;
  var type;
  var last_days_name = [];
  var text_21 = [];

  var div_svg_width = $('#div_svg').width();
  var div_svg_height = $('#div_svg').height();
  // if (max_days_delay == 0) {
    max_days_delay = 500;
  // }

  //рисование системы координат
  var coordinate_system = swg_graph.polyline([indent, 0, indent, div_svg_height - indent, div_svg_width, div_svg_height - indent])
                                   .fill('none')
                                   .stroke({ color: 'black', width: 2, linecap: 'round', linejoin: 'round' });
  swg_graph.polyline([indent - 5, 20, indent, 0, indent + 5, 20])
           .fill('black')
           .stroke({ color: 'black', width: 2, linecap: 'round', linejoin: 'round' });
  swg_graph.polyline([div_svg_width - 20, div_svg_height - indent - 5, div_svg_width, div_svg_height - indent, div_svg_width - 20, div_svg_height - indent + 5])
           .fill('black')
           .stroke({ color: 'black', width: 2, linecap: 'round', linejoin: 'round' });

  //рисование наименования координатных прямых
  var x_name = swg_graph.text('days');
  x_name.move(div_svg_width - 60, div_svg_height - indent).font({ fill: 'black', family: 'Inconsolata', size: '20pt', weight: 'bold' });
  var y_name = swg_graph.text('₽');
  y_name.move(15,0).font({ fill: 'black', family: 'Inconsolata', size: '20pt', weight: 'bold' })

  for (var i = 0; i < count_days.length; i++) {
    if (count_days[i] > max_days_delay) {
      max_days_delay = count_days[i];
    }
  }

  //Отрисовка пунктирных прямых (21й день)
  for (var i = 0; i < count_days.length; i++) {
    if (!isNaN(count_days[i])) {
      switch (i) {
        case 0:
          last_days_name[i] = swg_graph.text('СВ');
          text_21[i] = "21-й день с даты заявления о страховом возмещении";
          break;
        case 1:
          last_days_name[i] = swg_graph.text('УТС');
          text_21[i] = "21-й день с даты заявления о выплате УТС";
          break;
        case 2:
          last_days_name[i] = swg_graph.text('ЭВ');
          text_21[i] = "21-й день с даты заявления о выплате расходов на эвакуатор";
          break;
        case 3:
          last_days_name[i] = swg_graph.text('ХР');
          text_21[i] = "21-й день с даты заявления о выплате расходов на хранение";
          break;
        default:
        last_days_name[i] = swg_graph.text('СВ');
      }
      line_21_day[i] = swg_graph.line(indent + (count_days[i] * div_svg_width * time_index / max_days_delay),
                                       0,
                                       indent + (count_days[i] * div_svg_width * time_index / max_days_delay),
                                       div_svg_height - indent - 1)
                                 .stroke({ color: 'blue', width: 1, opacity: 0.1 })
                                 .css({ border: 'dashed' });
     last_days_name[i].move(indent - 10 + (count_days[i] * div_svg_width * time_index / max_days_delay),
                         div_svg_height - indent - 1)
                   .font({ fill: 'black', family: 'Inconsolata', size: '10pt', weight: 'bold' })
                   .css({ cursor: 'pointer', opacity: 0.1 });

     last_days_name[i].mouseover(function() {
        this.animate({ when: 'now' }).css({ opacity: 1 });
        $('#total_count').html(text_21[last_days_name.indexOf(this)]);
        line_21_day[last_days_name.indexOf(this)].stroke({ opacity: 1 });
      });
     last_days_name[i].mouseout(function() {
        this.animate({ when: 'now'}).css({ opacity: 0.1 });
        $('#total_count').html('');
        line_21_day[last_days_name.indexOf(this)].stroke({ opacity: 0.1 });
      });
    }
  }
  //Отрисовка линий для последней даты исполнения решения ФУ
  // for (var i = 0; i < payment_fu_last_days.length; i++) {
  //   if (!isNaN(payment_fu_last_days[i])) {
  //     line_fu_day[i] = swg_graph.line(indent + (payment_fu_last_days[i] * div_svg_width * time_index / max_days_delay),
  //                                     0,
  //                                     indent + (payment_fu_last_days[i] * div_svg_width * time_index / max_days_delay),
  //                                     div_svg_height - indent - 1)
  //                               .stroke({ color: 'grey', width: 1, opacity: 0.1 })
  //                               .css({ border: 'dashed' });
  //   }
  // }

  //отрисовка добровольных выплат
  for (var i = 0; i < count_vol_days.length; i++) {
    if (!isNaN(count_vol_days[i])) {
      switch (payment_vol_types[i]) {
        case 0:
          type = 0;
          break;
        case 1:
          type = 1;
          break;
        case 2:
          type = 2;
          break;
        case 3:
          type = 3;
          break;
        default:
        type = 0;
      }
      if (count_vol_days[i] < count_days[type]) {
        line_payment[line_index] = swg_graph.line(indent - 2 + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                      div_svg_height - indent - 1 - current_summ - payment_vol_summs[i],
                                      indent - 2 + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                      div_svg_height - indent - 1 - current_summ)
                                .stroke({ color: 'green', width: 5, opacity: 0.5 })
                                .css({ cursor: 'pointer'});

        line_payment_time[line_index] = swg_graph.line(indent + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                                       div_svg_height - indent - 1 - current_summ,
                                                       indent + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                                       div_svg_height - indent - 1)
                                                 .stroke({ color: 'green', width: 1, opacity: 0 });
        line_payment_$[line_index] = swg_graph.line(indent + 1,
                                                    div_svg_height - indent - 1 - current_summ - payment_vol_summs[i],
                                                    indent + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                                    div_svg_height - indent - 1 - current_summ - payment_vol_summs[i])
                                              .stroke({ color: 'green', width: 1, opacity: 0 });


        text_line[line_index] = "Выплата в размере " + makeRubText_nominative(payment_vol_summs[i] * 1000) + " осуществлена в срок";

        line_payment[line_index].mouseover(function() {
          this.animate({ when: 'now' }).stroke({ opacity: 1 });
          $('#total_count').html(text_line[line_payment.indexOf(this)]);
          line_payment_time[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
          line_payment_$[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
        });
        line_payment[line_index].mouseout(function() {
          this.animate({ when: 'now' }).stroke({ opacity: 0.5 });
          $('#total_count').html('');
          line_payment_time[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
          line_payment_$[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
        });
        line_index = line_index + 1;

      } else {
        line_payment[line_index] = swg_graph.line(indent - 2 + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                      div_svg_height - indent - 1 - current_summ - payment_vol_summs[i],
                                      indent - 2 + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                      div_svg_height - indent - 1 - current_summ)
                                .stroke({ color: 'red', width: 5, opacity: 1 });

        line_payment_time[line_index] = swg_graph.line(indent + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                                       div_svg_height - indent - 1 - current_summ,
                                                       indent + (count_vol_days[i] * div_svg_width * time_index / max_days_delay),
                                                       div_svg_height - indent - 1)
                                                 .stroke({ color: 'red', width: 1, opacity: 0 });
        line_payment_$[line_index] = swg_graph.line(indent + 1,
                                                    div_svg_height - indent - 1 - current_summ - payment_vol_summs[i],
                                                    indent + (count_days[type] * div_svg_width * time_index / max_days_delay),
                                                    div_svg_height - indent - 1 - current_summ - payment_vol_summs[i])
                                              .stroke({ color: 'red', width: 1, opacity: 0 });

        rect_payment[line_index] = swg_graph.rect((count_vol_days[i] - count_days[type]) * div_svg_width * time_index / max_days_delay,
                                      payment_vol_summs[i])
                                .move(indent + (count_days[type] * div_svg_width * time_index / max_days_delay),
                                      div_svg_height - indent - 1 - current_summ - payment_vol_summs[i])
                                .fill({ color: 'red', opacity: 0.2 })
                                .stroke({ color: 'red', width: 1, opacity: 1 })
                                .css({ cursor: 'pointer'});

        text_rect[line_index] = "" + makeRubText_nominative(payment_vol_summs[i] * 1000) + " × " + declinationDays(count_vol_days[i] - count_days[type] + 1) + " × 1% = " + makeRubText_nominative(payment_vol_summs[i] * (count_vol_days[i] - count_days[type] + 1) * 10);
        rect_payment[line_index].mouseover(function() {
          this.animate({ when: 'now' }).fill({ opacity: 1 });
          $('#total_count').html(text_rect[rect_payment.indexOf(this)]);
          line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
          line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
        });
        rect_payment[line_index].mouseout(function() {
          this.animate({ when: 'now' }).fill({ opacity: 0.2 });
          $('#total_count').html('');
          line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
          line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });

        });
        line_index = line_index + 1;
      }
      current_summ = current_summ + payment_vol_summs[i];
    }
  }

  //Отрисовка выплат по решению ФУ
  for (var i = 0; i < count_fu_days.length; i++) {
    if (!isNaN(count_fu_days[i])) {
      for (var j = 0; j < payment_fu_types[i].length; j++) {
        switch (payment_fu_types[i][j]) {
          case 0:
            type = 0;
            break;
          case 1:
            type = 1;
            break;
          case 2:
            type = 2;
            break;
          case 3:
            type = 3;
            break;
          default:
          type = 0;
        }

        line_fu_day[line_index] = swg_graph.line(indent + (payment_fu_last_days[i] * div_svg_width * time_index / max_days_delay),
                                                 0,
                                                 indent + (payment_fu_last_days[i] * div_svg_width * time_index / max_days_delay),
                                                 div_svg_height - indent - 1)
                                           .stroke({ color: 'grey', width: 1, opacity: 0 })
                                           .css({ border: 'dashed' });

        if (count_fu_days[i] < payment_fu_last_days[i]) {
          line_payment[line_index] = swg_graph.line(indent - 2 + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                        div_svg_height - indent - 1 - current_summ - payment_fu_summs[i][j],
                                        indent - 2 + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                        div_svg_height - indent - 1 - current_summ)
                                  .stroke({ color: 'green', width: 5, opacity: 0.5 })
                                  .css({ cursor: 'pointer'});

          line_payment_time[line_index] = swg_graph.line(indent + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                                         div_svg_height - indent - 1 - current_summ,
                                                         indent + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                                         div_svg_height - indent - 1)
                                                   .stroke({ color: 'green', width: 1, opacity: 0 });
          line_payment_$[line_index] = swg_graph.line(indent + 1,
                                                      div_svg_height - indent - 1 - current_summ - payment_fu_summs[i][j],
                                                      indent + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                                      div_svg_height - indent - 1 - current_summ - payment_fu_summs[i][j])
                                                .stroke({ color: 'green', width: 1, opacity: 0 });

          text_line[line_index] = "Решение ФУ о взыскании " + makeRubText_genitive(payment_fu_summs[i][j] * 1000) + " исполнено в срок";

          line_payment[line_index].mouseover(function() {
            this.animate({ when: 'now' }).stroke({ opacity: 1 });
            $('#total_count').html(text_line[line_payment.indexOf(this)]);
            line_payment_time[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
            line_payment_$[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
            line_fu_day[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
          });
          line_payment[line_index].mouseout(function() {
            this.animate({ when: 'now' }).stroke({ opacity: 0.5 });
            $('#total_count').html('');
            line_payment_time[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
            line_payment_$[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
            line_fu_day[line_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
          });
          line_index = line_index + 1;

        } else {
          line_payment[line_index] = swg_graph.line(indent - 2 + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                        div_svg_height - indent - 1 - current_summ - payment_fu_summs[i][j],
                                        indent - 2 + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                        div_svg_height - indent - 1 - current_summ)
                                  .stroke({ color: 'red', width: 5, opacity: 1 });

          line_payment_time[line_index] = swg_graph.line(indent + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                                         div_svg_height - indent - 1 - current_summ,
                                                         indent + (count_fu_days[i] * div_svg_width * time_index / max_days_delay),
                                                         div_svg_height - indent - 1)
                                                   .stroke({ color: 'red', width: 1, opacity: 0 });
          line_payment_$[line_index] = swg_graph.line(indent + 1,
                                                      div_svg_height - indent - 1 - current_summ - payment_fu_summs[i][j],
                                                      indent + (count_days[type] * div_svg_width * time_index / max_days_delay),
                                                      div_svg_height - indent - 1 - current_summ - payment_fu_summs[i][j])
                                                .stroke({ color: 'red', width: 1, opacity: 0 });


          rect_payment[line_index] = swg_graph.rect((count_fu_days[i] - count_days[type]) * div_svg_width * time_index / max_days_delay,
                                                    payment_fu_summs[i][j])
                                              .move(indent + (count_days[type] * div_svg_width * time_index / max_days_delay),
                                                    div_svg_height - indent - 1 - current_summ - payment_fu_summs[i][j])
                                              .fill({ color: 'red', opacity: 0.2 })
                                              .stroke({ color: 'red', width: 1, opacity: 1 })
                                              .css({ cursor: 'pointer'});

          text_rect[line_index] = "" + makeRubText_nominative(payment_fu_summs[i][j] * 1000) + " × " + declinationDays(count_fu_days[i] - count_days[type] + 1) + " × 1% = " + makeRubText_nominative(payment_fu_summs[i][j] * (count_fu_days[i] - count_days[type] + 1) * 10);
          rect_payment[line_index].mouseover(function() {
            this.animate({ when: 'now' }).fill({ opacity: 1 });
            $('#total_count').html(text_rect[rect_payment.indexOf(this)]);
            line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
            line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
            line_fu_day[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
          });
          rect_payment[line_index].mouseout(function() {
            this.animate({ when: 'now' }).fill({ opacity: 0.2 });
            $('#total_count').html('');
            line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
            line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
            line_fu_day[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
          });
          line_index = line_index + 1;
        }
        current_summ = current_summ + payment_fu_summs[i][j];
      }
    }
  }

  //Отрисовка выплат по решению суда
  for (var i = 0; i < count_court_days.length; i++) {
    if (!isNaN(count_court_days[i])) {
      for (var j = 0; j < payment_court_types[i].length; j++) {
        switch (payment_court_types[i][j]) {
          case 0:
            type = 0;
            break;
          case 1:
            type = 1;
            break;
          case 2:
            type = 2;
            break;
          case 3:
            type = 3;
            break;
          default:
          type = 0;
        }

        line_payment_time[line_index] = swg_graph.line(indent + (count_court_days[i] * div_svg_width * time_index / max_days_delay),
                                                       div_svg_height - indent - 1 - current_summ,
                                                       indent + (count_court_days[i] * div_svg_width * time_index / max_days_delay),
                                                       div_svg_height - indent - 1)
                                                 .stroke({ color: 'red', width: 1, opacity: 0 });
        line_payment_$[line_index] = swg_graph.line(indent + 1,
                                                    div_svg_height - indent - 1 - current_summ - payment_court_summs[i][j],
                                                    indent + (count_court_days[i] * div_svg_width * time_index / max_days_delay),
                                                    div_svg_height - indent - 1 - current_summ - payment_court_summs[i][j])
                                              .stroke({ color: 'red', width: 1, opacity: 0 });

        if (fu_claim_set.has(payment_court_types[i][j])) {
          line_payment[line_index] = swg_graph.line(indent - 2 + (count_court_days[i] * div_svg_width * time_index / max_days_delay),
                                        div_svg_height - indent - 1 - current_summ - payment_court_summs[i][j],
                                        indent - 2 + (count_court_days[i] * div_svg_width * time_index / max_days_delay),
                                        div_svg_height - indent - 1 - current_summ)
                                  .stroke({ color: 'red', width: 5, opacity: 1 });

          rect_payment[line_index] = swg_graph.rect((count_court_days[i] - payment_court_in_force_dates[i]) * div_svg_width * time_index / max_days_delay,
                                                    payment_court_summs[i][j])
                                              .move(indent + (payment_court_in_force_dates[i] * div_svg_width * time_index / max_days_delay),
                                                    div_svg_height - indent - 1 - current_summ - payment_court_summs[i][j])
                                              .fill({ color: 'red', opacity: 0.2 })
                                              .stroke({ color: 'red', width: 1, opacity: 1 })
                                              .css({ cursor: 'pointer'});

          text_rect[line_index] = "" + makeRubText_nominative(payment_court_summs[i][j] * 1000) + " × " + declinationDays(count_court_days[i] - payment_court_in_force_dates[i] + 1) + " × 1% = " + makeRubText_nominative(payment_court_summs[i][j] * (count_court_days[i] - payment_court_in_force_dates[i] + 1) * 10);
          rect_payment[line_index].mouseover(function() {
            this.animate({ when: 'now' }).fill({ opacity: 1 });
            $('#total_count').html(text_rect[rect_payment.indexOf(this)]);
            line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
            line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
          });
          rect_payment[line_index].mouseout(function() {
            this.animate({ when: 'now' }).fill({ opacity: 0.2 });
            $('#total_count').html('');
            line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
            line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
          });
          line_index = line_index + 1;
          current_summ = current_summ + payment_court_summs[i][j];
        } else {
          line_payment[line_index] = swg_graph.line(indent - 2 + (count_court_days[i] * div_svg_width * time_index / max_days_delay),
                                        div_svg_height - indent - 1 - current_summ - payment_court_summs[i][j],
                                        indent - 2 + (count_court_days[i] * div_svg_width * time_index / max_days_delay),
                                        div_svg_height - indent - 1 - current_summ)
                                  .stroke({ color: 'red', width: 5, opacity: 1 });

          rect_payment[line_index] = swg_graph.rect((count_court_days[i] - count_days[type]) * div_svg_width * time_index / max_days_delay,
                                                    payment_court_summs[i][j])
                                              .move(indent + (count_days[type] * div_svg_width * time_index / max_days_delay),
                                                    div_svg_height - indent - 1 - current_summ - payment_court_summs[i][j])
                                              .fill({ color: 'red', opacity: 0.2 })
                                              .stroke({ color: 'red', width: 1, opacity: 1 })
                                              .css({ cursor: 'pointer'});

          text_rect[line_index] = "" + makeRubText_nominative(payment_court_summs[i][j] * 1000) + " × " + declinationDays(count_court_days[i] - count_days[type] + 1) + " × 1% = " + makeRubText_nominative(payment_court_summs[i][j] * (count_court_days[i] - count_days[type] + 1) * 10);
          rect_payment[line_index].mouseover(function() {
            this.animate({ when: 'now' }).fill({ opacity: 1 });
            $('#total_count').html(text_rect[rect_payment.indexOf(this)]);
            line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
            line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0.5 });
          });
          rect_payment[line_index].mouseout(function() {
            this.animate({ when: 'now' }).fill({ opacity: 0.2 });
            $('#total_count').html('');
            line_payment_time[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
            line_payment_$[rect_payment.indexOf(this)].animate({ duration: 1000, when: 'now' }).stroke({ opacity: 0 });
          });
          line_index = line_index + 1;
          current_summ = current_summ + payment_court_summs[i][j];
        }
      }
    }
  }
}
