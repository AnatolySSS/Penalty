//Формирование Word файла
// const docx = require("docx");
import { Document, Packer, Paragraph, AlignmentType } from 'docx'


export function makeDecisionFile(all_paragraphs) {
    let paragraphs = []
    for (let i = 0; i < all_paragraphs.length; i++) {
        paragraphs[i] = new Paragraph({ text: all_paragraphs[i], style: "myCustomStyle" })
        
    }
    const doc = new Document({
        sections: [
            {
                children: [
                    paragraphs[1],
                    paragraphs[2],
                    paragraphs[3],
                    paragraphs[4],
                ],
            },
        ],
        styles: {
            paragraphStyles: [
              {
                id: "myCustomStyle",
                name: "My Custom Style",
                basedOn: "Normal",
                run: {
                  size: 26,
                  font: "Times New Roman",
                },
                paragraph: {
                  spacing: { line: 276, before: 150, after: 150 },
                  alignment: AlignmentType.JUSTIFIED
                }
              }
            ]
          },
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "Решение ФУ.docx");
    });
}

