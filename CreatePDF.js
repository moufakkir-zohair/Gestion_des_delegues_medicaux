const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc,invoice);
  generateCustomerInformation(doc, invoice);
  //generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream("./public/"+path));
}

function generateHeader(doc,invoice) {
  doc
   
    .fillColor("#444444")
    .fontSize(10)
    // .text("ACME Inc.", 200, 50, { align: "right" })
    // .text("123 Main Street", 200, 65, { align: "right" })
    // .text("New York, NY, 10025", 200, 80, { align: "right" })
    .image("public/images/Sothema.jpg", 450, 15, { width: 100 },{ align: "right" })
    .fontSize(10)
    .text("Nom et Prénom:Zohair Moufakkir", 50, 50, { align: "left" })
    .text("Tél: 0628978060", 50, 65, { align: "left" })
    .text("Email:zouhirmoufakir1998@gmail.com", 50, 80, { align: "left" })
    .moveDown();
    generateHr(doc, 100);
}

function generateCustomerInformation(doc, invoice) {
 
  const customerInformationTop = 160;

  doc
     .fontSize(10)
    .text("Date:"+formatDate(new Date()), 50, customerInformationTop,{ align: "right" })
     .fontSize(15)
    
    .text("Sujet:"+invoice.sujet, 50, customerInformationTop+40,{ align: "left" })
    .fontSize(10)
    .text(invoice.contenu, 50, customerInformationTop+80,{ align: "left" })
    
    .text("Signature", 50, customerInformationTop+300,{ align: "left" })

    
}


function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}


function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}



module.exports = {
  createInvoice
};
