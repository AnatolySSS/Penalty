//Формирование Word файла
import { Document,
         Paragraph,
         Packer,
         TextRun,
         Table,
         TableRow,
         TableCell,
         WidthType } from "docx"
import { saveAs } from "file-saver"

import { docx } from "docx";

export function makeDecisionFile() {

    // Create a new instance of Document for the docx module
    const doc = new Document({
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
                new Paragraph({
                    children: [
                        new TextRun(decision)
                    ],
                }),
                new Table({
                  width: {
                      size: 8535,
                      type: WidthType.DXA,
                  },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    columnSpan: 2,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "СЛУЖБА ФИНАНСОВОГО УПОЛНОМОЧЕННОГО\n",
                                                    bold: true,
                                                }),
                                                new TextRun({
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
                        new TableRow({
                            children: [
                                new TableCell({
                
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "«_____» _______________20____ г.",
                                                    size: 12,
                                                }),
                                            ]
                                        }),
                                    ]
                                }),
                                new TableCell({
                                  children: [],
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "  дата подписания",
                                                    size: 10,
                                                }),
                                                new TextRun({
                                                    text: "\n№\nг. Москва",
                                                    size: 12,
                                                }),
                                            ]
                                        }),
                                    ]
                                }),
                                new TableCell({
                                  children: [],
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }],
    })
    // Call saveDocumentToFile with the document instance and a filename
    saveDocumentToFile(doc, "New Document.docx")

  // Used to export the file into a .docx file
  
  function saveDocumentToFile(doc, fileName) {
    // Create new instance of Packer for the docx module
    const packer = new Packer()
    // Create a mime type that will associate the new file with Microsoft Word
    const mimeType =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    // Create a Blob containing the Document instance and the mimeType
    packer.toBuffer(doc).then(blob => {
      const docblob = blob.slice(0, blob.size, mimeType)
      // Save the file using saveAs from the file-saver package
      saveAs(docblob, fileName)
    })
  }
}

export function generate() {
        const doc = new docx.Document({
            sections: [
                {
                    children: [
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun("Hello World"),
                                new docx.TextRun({
                                    text: "Foo Bar",
                                    bold: true,
                                }),
                                new docx.TextRun({
                                    text: "\tGithub is the best",
                                    bold: true,
                                }),
                            ],
                        }),
                    ],
                },
            ],
        });

        docx.Packer.toBlob(doc).then((blob) => {
            console.log(blob);
            saveAs(blob, "example.docx");
            console.log("Document created successfully");
        });
    }