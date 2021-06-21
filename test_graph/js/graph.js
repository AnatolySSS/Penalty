//Переменные для рисования графика SWG
function fillPenaltyGraph(swg_graph, max_days_delay, count_days, count_vol_days, payment_vol_types, count_fu_days, payment_fu_last_days, count_court_days) {
  swg_graph.clear();
  var line_svg_payment = [];
  var rect_svg_payment = [];
  var text_svg_payment = [];
  var indent = 40; // отступ от краев
  var line_21_day = [];
  var line_fu_day = [];
  var line_payment;

  var div_svg_width = $('#div_svg').width();
  var div_svg_height = $('#div_svg').height();
  if (max_days_delay == 0) {
    max_days_delay = 500;
  }

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
      line_21_day[i] = swg_graph.line(indent + (count_days[i] * div_svg_width * 0.9 / max_days_delay),
                                       0,
                                       indent + (count_days[i] * div_svg_width * 0.9 / max_days_delay),
                                       div_svg_height - indent - 1)
                                 .stroke({color: 'blue', width: 1 })
                                 .css({border: 'dashed'});
    }
  }
  //Отрисовка линий для последней даты исполнения решения ФУ
  for (var i = 0; i < payment_fu_last_days.length; i++) {
    if (!isNaN(payment_fu_last_days[i])) {
      line_fu_day[i] = swg_graph.line(indent + (payment_fu_last_days[i] * div_svg_width * 0.9 / max_days_delay),
                                       0,
                                       indent + (payment_fu_last_days[i] * div_svg_width * 0.9 / max_days_delay),
                                       div_svg_height - indent - 1)
                                 .stroke({color: 'grey', width: 1 })
                                 .css({border: 'dashed'});
    }
  }

  //отрисовка добровольных выплат
  for (var i = 0; i < count_vol_days.length; i++) {
    if (!isNaN(count_vol_days[i])) {
      var type;
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
        line_payment = swg_graph.line(indent + (count_vol_days[i] * div_svg_width * 0.9 / max_days_delay),
                                      0,
                                      indent + (count_vol_days[i] * div_svg_width * 0.9 / max_days_delay),
                                      div_svg_height - indent - 1)
                                .stroke({color: 'green', width: 3, opacity: 0.8 });
      } else {
        line_payment = swg_graph.line(indent + (count_vol_days[i] * div_svg_width * 0.9 / max_days_delay),
                                      0,
                                      indent + (count_vol_days[i] * div_svg_width * 0.9 / max_days_delay),
                                      div_svg_height - indent - 1)
                                .stroke({color: 'red', width: 3, opacity: 0.8 });
      }
    }
  }

  //Отрисовка выплат по решению ФУ
  for (var i = 0; i < count_fu_days.length; i++) {
    if (!isNaN(count_fu_days[i])) {
      if (count_fu_days[i] < payment_fu_last_days[i]) {
        line_payment = swg_graph.line(indent + (count_fu_days[i] * div_svg_width * 0.9 / max_days_delay),
                                      0,
                                      indent + (count_fu_days[i] * div_svg_width * 0.9 / max_days_delay),
                                      div_svg_height - indent - 1)
                                .stroke({color: 'green', width: 3, opacity: 0.8 });
      } else {
        line_payment = swg_graph.line(indent + (count_fu_days[i] * div_svg_width * 0.9 / max_days_delay),
                                      0,
                                      indent + (count_fu_days[i] * div_svg_width * 0.9 / max_days_delay),
                                      div_svg_height - indent - 1)
                                .stroke({color: 'red', width: 3, opacity: 0.8 });
      }
    }
  }

  //Отрисовка выплат по решению суда
  for (var i = 0; i < count_court_days.length; i++) {
    if (!isNaN(count_court_days[i])) {
      line_payment = swg_graph.line(indent + (count_court_days[i] * div_svg_width * 0.9 / max_days_delay),
                                    0,
                                    indent + (count_court_days[i] * div_svg_width * 0.9 / max_days_delay),
                                    div_svg_height - indent - 1)
                              .stroke({color: 'red', width: 3, opacity: 0.8 });
    }
  }











  // for (var i = 1; i <= number_of_payments; i++) {
  //   pay_summ_y[0] = 0;
  //   pay_date_x[i] = pay_count[i] / day;
  //   pay_summ_y[i] = pay_text[i] / 1000;
  //   pay_summ_y_all = pay_summ_y_all + pay_summ_y[i - 1];
  //
  //   //Отрисовска прямоугольников с неустойками
  //   if (pay_count[i] == 0) {
  //     line_svg_payment[i] = swg_graph.line(((pay_date[i] - date_sv) / day) * div_svg_width * 0.9 / max_days_delay - 3,
  //                                         div_svg_height - pay_summ_y_all,
  //                                         ((pay_date[i] - date_sv) / day) * div_svg_width * 0.9 / max_days_delay - 3,
  //                                         div_svg_height - pay_summ_y_all - pay_summ_y[i])
  //                                    .stroke({color: 'green', width: 6 });
  //   } else {
  //     line_svg_payment[i] = swg_graph.line((date_sv_penalty_day_x + pay_date_x[i]) * div_svg_width * 0.9 / max_days_delay - 3,
  //                                         div_svg_height - pay_summ_y_all,
  //                                         (date_sv_penalty_day_x + pay_date_x[i]) * div_svg_width * 0.9 / max_days_delay - 3,
  //                                         div_svg_height - pay_summ_y_all - pay_summ_y[i])
  //                                    .stroke({color: 'red', width: 6 });
  //     rect_svg_payment[i] = swg_graph.rect((pay_date_x[i]) * div_svg_width * 0.9 / max_days_delay,
  //                                           pay_summ_y[i])
  //                                    .move((date_sv_penalty_day_x) * div_svg_width * 0.9 / max_days_delay,
  //                                           div_svg_height - pay_summ_y_all - pay_summ_y[i])
  //                                    .stroke({color: 'red', width: 1, opacity: 1})
  //                                    .fill({color: 'red', opacity: 0.2});
  //
  //    rect_svg_payment[i].mouseover(function() {
  //      this.animate({when: 'now'}).fill({opacity: 1});
  //    });
  //    rect_svg_payment[i].mouseout(function() {
  //      this.animate({when: 'now'}).fill({opacity: 0.2});
  //    });
  //   }
  // }
  //
  // if (!isNaN(date_court_from) || court_without_period) {
  //   var court_swg_rect = swg_graph.rect(((date_court_to - date_court_from) / day + 1) * div_svg_width * 0.9 / max_days_delay,
  //                                         div_svg_height)
  //                                  .move(((date_court_from - date_sv) / day) * div_svg_width * 0.9 / max_days_delay,
  //                                         0)
  //                                 // .stroke({color: 'red', width: 1, opacity: 1})
  //                                  .fill({color: 'grey', opacity: 0.6});
  // }
  //
  // court_swg_rect.mouseover(function() {
  //   this.animate({when: 'now'}).fill({opacity: 1});
  //   for (var i = 1; i <= number_of_payments; i++) {
  //     rect_svg_payment[i].animate({when: 'now'}).fill({opacity: 0.6});
  //   }
  // });
  // court_swg_rect.mouseout(function() {
  //   this.animate({when: 'now'}).fill({opacity: 0.6});
  //   for (var i = 1; i <= number_of_payments; i++) {
  //     rect_svg_payment[i].animate({when: 'now'}).fill({opacity: 0.2});
  //   }
  // });
}
