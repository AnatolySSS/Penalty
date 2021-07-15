//Формирование Word файла
const docx = require("docx");
export function makeDecisionFile(decision) {

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
              new docx.Paragraph({
                  children: [
                      new docx.TextRun(decision)
                  ],
              }),
              // new docx.Table({
              //   width: {
              //       size: 8535,
              //       type: docx.WidthType.DXA,
              //   },
              //     rows: [
              //         new docx.TableRow({
              //             children: [
              //                 new docx.TableCell({
              //                     columnSpan: 2,
              //                     children: [
              //                         new docx.Paragraph({
              //                             children: [
              //                                 new docx.TextRun({
              //                                     text: "СЛУЖБА ФИНАНСОВОГО УПОЛНОМОЧЕННОГО\n",
              //                                     bold: true,
              //                                 }),
              //                                 new docx.TextRun({
              //                                     text: "РЕШЕНИЕ",
              //                                     bold: true,
              //                                     // characterSpacing: 5,
              //                                 }),
              //                             ]
              //                         }),
              //                     ]
              //                 }),
              //             ],
              //         }),
              //         new docx.TableRow({
              //             children: [
              //                 new docx.TableCell({
              //
              //                     children: [
              //                         new docx.Paragraph({
              //                             children: [
              //                                 new docx.TextRun({
              //                                     text: "«_____» _______________20____ г.",
              //                                     size: 12,
              //                                 }),
              //                             ]
              //                         }),
              //                     ]
              //                 }),
              //                 new docx.TableCell({
              //                   children: [],
              //                 }),
              //             ],
              //         }),
              //         new docx.TableRow({
              //             children: [
              //                 new docx.TableCell({
              //                     children: [
              //                         new docx.Paragraph({
              //                             children: [
              //                                 new docx.TextRun({
              //                                     text: "  дата подписания",
              //                                     size: 10,
              //                                 }),
              //                                 new docx.TextRun({
              //                                     text: "\n№\nг. Москва",
              //                                     size: 12,
              //                                 }),
              //                             ]
              //                         }),
              //                     ]
              //                 }),
              //                 new docx.TableCell({
              //                   children: [],
              //                 }),
              //             ],
              //         }),
              //     ],
              // }),
          ],
      }],
  });

  // Used to export the file into a .docx file
  docx.Packer.toBlob(doc).then(blob => {
       saveAs(blob, "Решение вер.1.docx");
  });
}
