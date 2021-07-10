//Формирование Word файла
const docx = require("docx");
export function makeDecisionFile() {

  //Если поле Финансовая организация не заполнено, то в текст решения
  //добавляется термин "Финансовая организация" в соответствующем падеже
  // if (fo_name != "") {
  //   fo_name = document.querySelector("#fo_name").value;
  //   fo_name_nominative = fo_name;
  //   fo_name_genitive = fo_name;
  //   fo_name_accusative = fo_name;
  //   fo_name_instrumental = fo_name;
  //   make_a_payment = " осуществило";
  //   fulfill = " исполнило";
  //   keep = " удержало";
  // } else {
  //   fo_name_nominative = "Финансовая организация";
  var fo_name_genitive = "Финансовой организации";
  //   fo_name_accusative = "Финансовую организацию";
  //   fo_name_instrumental = "Финансовой организацией";
  //   make_a_payment = " осуществила";
  //   fulfill = " исполнила";
  //   keep = " удержала";
  // }

  var first_paragraf = 'Рассмотрев требования Заявителя о взыскании с ' + fo_name_genitive + ' неустойки '+
  'за несоблюдение срока выплаты страхового возмещения по договору ОСАГО, '+
  'Финансовый уполномоченный приходит к следующему.'+'<br>'

  var article_191 = 'Статьей 191 ГК РФ установлено, что течение срока, определённого периодом времени, '+
  'начинается на следующий день после календарной даты или наступления события, '+
  'которыми определено его начало.'+'<br>';

  var holly = 'В соответствии со статьей 193 ГК РФ если последний день срока ' +
  'приходится на нерабочий день, днем окончания срока считается ближайший следующий за ним рабочий день.' + '<br>';

  var standart_motivation = 'Согласно статье 12 ГК РФ '+
  'взыскание неустойки является одним из способов защиты нарушенного гражданского права.'+'<br>'+
  'По смыслу статьи 330 ГК РФ неустойкой (штрафом, пеней) признается определенная '+
  'законом или договором денежная сумма, которую должник обязан уплатить кредитору '+
  'в случае неисполнения или ненадлежащего исполнения обязательства, в частности '+
  'в случае просрочки исполнения. По требованию об уплате неустойки кредитор не обязан '+
  'доказывать причинение ему убытков.'+'<br>'+
  'Пунктом 21 статьи 12 Закона № 40-ФЗ установлено, что в течение 20 календарных дней, '+
  'за исключением нерабочих праздничных дней, а в случае, предусмотренном пунктом 15.3 '+
  'статьи 12 Закона № 40-ФЗ, 30 календарных дней, за исключением нерабочих праздничных дней, '+
  'со дня принятия к рассмотрению заявления потерпевшего о страховом возмещении или прямом '+
  'возмещении убытков и приложенных к нему документов, предусмотренных Правилами ОСАГО, '+
  'страховщик обязан произвести страховую выплату потерпевшему или после осмотра и (или) '+
  'независимой технической экспертизы поврежденного транспортного средства выдать '+
  'потерпевшему направление на ремонт транспортного средства с указанием станции '+
  'технического обслуживания, на которой будет отремонтировано его транспортное '+
  'средство и которой страховщик оплатит восстановительный ремонт поврежденного '+
  'транспортного средства, и срока ремонта либо направить потерпевшему мотивированный '+
  'отказ в страховом возмещении.'+'<br>'+
  'При несоблюдении срока осуществления страховой выплаты или срока выдачи потерпевшему '+
  'направления на ремонт транспортного средства страховщик за каждый день просрочки '+
  'уплачивает потерпевшему неустойку (пеню) в размере одного процента от определенного '+
  'в соответствии с Законом № 40-ФЗ размера страхового возмещения по виду причиненного '+
  'вреда каждому потерпевшему.'+'<br>'+
  'В пункте 78 постановления Пленума Верховного Суда Российской Федерации от 26.12.2017 '+
  '№ 58 «О применении судами законодательства об обязательном страховании гражданской '+
  'ответственности владельцев транспортных средств» указано, что неустойка исчисляется '+
  'со дня, следующего за днем, установленным для принятия решения о выплате страхового '+
  'возмещения, то есть с 21-го дня после получения страховщиком заявления потерпевшего '+
  'о страховой выплате и документов, предусмотренных Правилами ОСАГО, и до дня '+
  'фактического исполнения страховщиком обязательства по договору включительно.'+'<br>';

  var ndfl_motivation_on = 'Пунктом 1 статьи 210 Налогового кодекса Российской Федерации (далее – НК РФ) '+
  'установлено, что при определении налоговой базы учитываются все доходы налогоплательщика, '+
  'полученные им как в денежной, так и в натуральной формах или право на распоряжение которыми '+
  'у него возникло, а также доходы в виде материальной выгоды.'+'<br>'+
  'Согласно статье 41 НК РФ доходом признается экономическая выгода в денежной или натуральной '+
  'форме, учитываемая в случае возможности ее оценки и в той мере, в которой такую выгоду можно '+
  'оценить, и определяемая в соответствии с главой 23 НК РФ.'+'<br>'+
  'В соответствии с подпунктом 10 пункта 1 статьи 208 НК РФ налогообложению подлежат иные доходы, '+
  'получаемые налогоплательщиком в результате осуществления им деятельности в Российской Федерации.'+'<br>'+
  'Сумма выплачиваемых штрафов, пени, неустоек не является компенсацией реального физического или '+
  'морального вреда физического лица и не входит в перечень выплат, освобожденных от налогообложения '+
  'на основании статьи 217 НК РФ.'+'<br>'+
  'Указанная выше позиция содержится в Письме Минфина России от 28.10.2015 № 03-04-07/62079, а также '+
  'в «Обзоре практики рассмотрения судами дел, связанных с применением главы 23 Налогового кодекса '+
  'Российской Федерации» (утв. Президиумом Верховного Суда РФ 21.10.2015) (далее – Обзор практики).'+'<br>'+
  'В частности, пункте 7 Обзора практики указано, что предусмотренные законодательством о защите прав '+
  'потребителей санкции носят исключительно штрафной характер. Их взыскание не преследует цель компенсации '+
  'потерь (реального ущерба) потребителя. Поскольку выплата сумм таких санкций приводит к образованию '+
  'имущественной выгоды у потребителя, они включаются в доход гражданина на основании положений '+
  'статей 41, 209 НК РФ вне зависимости от того, что получение данных сумм обусловлено нарушением '+
  'прав физического лица.'+'<br>'+
  'В связи с этим, сумма неустойки, выплаченная Страховщиком потерпевшему в случае нарушения '+
  'предусмотренного договором ОСАГО срока выплаты страхового возмещения в соответствии '+
  'с пунктом 21 статьи 12 Закона № 40-ФЗ, отвечает вышеуказанным признакам экономической '+
  'выгоды и являются его доходом, подлежащим обложению налогом на доходы физических лиц.'+'<br>'+
  'Пунктом 1 статьи 226 НК РФ установлено, что российские организации, от которых или '+
  'в результате отношений с которыми налогоплательщик получил доходы, подлежащие налогообложению, '+
  'обязаны исчислить, удержать у налогоплательщика и уплатить сумму налога на доходы физических лиц, '+
  'исчисленную в соответствии со статьей 224 НК РФ с учетом особенностей, предусмотренных статьей 226 НК РФ.'+'<br>'+
  'Указанные организации признаются налоговыми агентами и обязаны исполнять обязанности, '+
  'предусмотренные для налоговых агентов, в частности, статьей 226 НК РФ.'+'<br>'+
  'В соответствии с пунктом 4 статьи 226 НК РФ налоговые агенты обязаны удержать начисленную '+
  'сумму налога непосредственно из доходов налогоплательщика при их фактической выплате.'+'<br>';

  const doc = new docx.Document({
      title: "Решение ФУ",
      sections: [{
          properties: {},
          margins: {
                top: 2,
                right: 1.5,
                bottom: 2,
                left: 3,
            },
          children: [
              new docx.Table({
                width: {
                    size: 8535,
                    type: docx.WidthType.DXA,
                },
                  rows: [
                      new docx.TableRow({
                          children: [
                              new docx.TableCell({
                                  columnSpan: 2,
                                  children: [
                                      new docx.Paragraph({
                                          children: [
                                              new docx.TextRun({
                                                  text: "СЛУЖБА ФИНАНСОВОГО УПОЛНОМОЧЕННОГО\n",
                                                  bold: true,
                                              }),
                                              new docx.TextRun({
                                                  text: "РЕШЕНИЕ",
                                                  bold: true,
                                                  // characterSpacing: 5,
                                              }),
                                          ]
                                      }),
                                  ]
                              }),
                          ],
                      }),
                      new docx.TableRow({
                          children: [
                              new docx.TableCell({

                                  children: [
                                      new docx.Paragraph({
                                          children: [
                                              new docx.TextRun({
                                                  text: "«_____» _______________20____ г.",
                                                  size: 12,
                                              }),
                                          ]
                                      }),
                                  ]
                              }),
                              new docx.TableCell({
                                children: [],
                              }),
                          ],
                      }),
                      new docx.TableRow({
                          children: [
                              new docx.TableCell({
                                  children: [
                                      new docx.Paragraph({
                                          children: [
                                              new docx.TextRun({
                                                  text: "  дата подписания",
                                                  size: 10,
                                              }),
                                              new docx.TextRun({
                                                  text: "\n№\nг. Москва",
                                                  size: 12,
                                              }),
                                          ]
                                      }),
                                  ]
                              }),
                              new docx.TableCell({
                                children: [],
                              }),
                          ],
                      }),
                  ],
              }),
          ],
      }],
  });

  // Used to export the file into a .docx file
  docx.Packer.toBlob(doc).then(blob => {
       saveAs(blob, "Решение вер.1.docx");
  });
}