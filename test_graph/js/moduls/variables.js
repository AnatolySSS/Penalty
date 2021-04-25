//Количество миллисекунд в одном дне
export let DAY = 24*60*60*1000;
//Дата начала действия лимита для европротокола 100 000₽
export let DATE_EURO_START = Date.parse(new Date(2018, 5, 1, 0));

export let COLUMN_NAME_0 = "№";
export let COLUMN_NAME_1 = "Вид выплаты";
export let COLUMN_NAME_2 = "Дата выплаты";
export let COLUMN_NAME_3 = "Сумма выплаты";

export let COLUMN_NAME_4 = "Начало";
export let COLUMN_NAME_5 = "Конец";
export let COLUMN_NAME_6 = "Дней";
export let COLUMN_NAME_7 = "Неустойка";

export let COLUMN_NAME_8 = "Период ДО суда";
export let COLUMN_NAME_9 = "Период ПОСЛЕ суда";

export let COLUMN_NAME_20 = "20-й день";
export let COLUMN_NAME_21 = "21-й день";

//Переменные для имени финансовой организации (в разных падежах)
export let holly, fo_name, fo_name_nominative, fo_name_genitive, fo_name_accusative, fo_name_instrumental;
//Для правильного склонения финансовой организации
export let make_a_payment; // "осуществило"/"осуществила"
export let fulfill; // "исполнило"/"исполнила"
export let keep; // "удержало"/"удержала"
//Переменная с тестом всего решения в части неустойки
export let decision;

// export let date_sv, date_sv_last_day, date_sv_penalty_day;


//Переменные для рисования графика SWG
export var swg_graph = SVG().addTo('#div_svg').size('100%', '100%');
export var line_svg_payment = [];
export var rect_svg_payment = [];
export var text_svg_payment = [];

//Переменные для canvas
export var date_sv_penalty_day_x;
export var max_days_delay = 0;
export var space = 10;
export var pay_summ_y_all = 0; //Сложение всех предыдущих сумм выплат (для определения координат начала очередного прямоугольника)
export var pay_date_x = [], pay_summ_y = [];

export let payment_voluntary = [];
