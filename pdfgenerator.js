const PDFDocument = require("pdfkit");
const fs = require("fs");

// Pipe its output somewhere, like to a file or HTTP response
const doc = new PDFDocument();

const generator = (fio, tel, email, correct, unanswered, result) => {
  const head = `
ФИО: ${fio}
Телефон: ${tel}
Email: ${email}
Правильных ответов: ${correct}
Неотвеченных: ${unanswered}`;
  // See below for browser usage
  doc.pipe(fs.createWriteStream(`results/${email}.pdf`, "utf-8"));

  doc.font("fonts/Inter-Medium.ttf");

  // Embed a font, set the font size, and render some text
  doc.fontSize(18).text("Спасибо что прошли наше тестирование!");

  doc.moveDown();
  doc.fontSize(12).text(head);

  doc.moveDown();
  doc.fontSize(12).text("Ответы:");

  result.forEach((i) => {
    doc.fontSize(12).text(i);
  });

  // Finalize PDF file
  doc.end();
};

module.exports = generator;
