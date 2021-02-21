// function drawCoordinates(canvas_width){
//
// var canvas = document.getElementById("penalty_graph");
// var penalty_graph = canvas.getContext("2d");
// canvas.width = canvas_width;
// penalty_graph.translate(0, canvas.height);
// penalty_graph.scale(1, -1);
//
// // penalty_graph.translate(0, canvas.height);
// // penalty_graph.scale(1, -1);
//
// var space = 10;
// // var pay_date_x = [], pay_summ_y = [];
// // pay_date_x[1] = 150;
// // pay_date_x[2] = 320;
// // pay_summ_y[1] = 60;
// // pay_summ_y[2] = 120;
//
// penalty_graph.strokeStyle = "black";
// penalty_graph.beginPath();
// penalty_graph.moveTo(space, canvas.height);
// penalty_graph.lineTo(space, space);
// penalty_graph.lineTo(canvas.width, space);
// penalty_graph.stroke();
//
// penalty_graph.beginPath();
// penalty_graph.moveTo(space - 5, canvas.height - 20);
// penalty_graph.lineTo(space, canvas.height);
// penalty_graph.lineTo(space + 5, canvas.height - 20);
// penalty_graph.arc(space, canvas.height - 20, 5, 0, Math.PI, false);
// penalty_graph.fill();
//
// penalty_graph.beginPath();
// penalty_graph.moveTo(canvas.width - 20, space - 5);
// penalty_graph.lineTo(canvas.width, space);
// penalty_graph.lineTo(canvas.width - 20, space + 5);
// penalty_graph.arc(canvas.width - 20, space, 5, Math.PI * 0,5, Math.PI * 1,5, true);
// penalty_graph.fill();
//
//
//
// // penalty_graph.beginPath();
// // penalty_graph.rect(date_sv_penalty_day_x, space, date_sv_penalty_day_x + pay_date_x[1], pay_summ_y[1]);
// // penalty_graph.rect(date_sv_penalty_day_x, space + pay_summ_y[1], date_sv_penalty_day_x + pay_date_x[2], pay_summ_y[1] + pay_summ_y[2]);
// // penalty_graph.strokeStyle = "red";
// // penalty_graph.stroke();
// }
