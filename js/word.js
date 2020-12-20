// document.querySelector('button').onclick = function generate() {
//     const doc = new docx.Document();
//
//     doc.addSection({
//         properties: {},
//         children: [
//             new docx.Paragraph({
//                 children: [
//                     new docx.TextRun("Hello World"),
//                     new docx.TextRun({
//                         text: "Foo Bar",
//                         bold: true,
//                     }),
//                     new docx.TextRun({
//                         text: "\tGithub is the best",
//                         bold: true,
//                     }),
//                 ],
//             }),
//         ],
//     });
//
//     docx.Packer.toBlob(doc).then(blob => {
//         console.log(blob);
//         saveAs(blob, "example.docx");
//         console.log("Document created successfully");
//     });
// }
