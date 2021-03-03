const fs = require("fs");
const PDFDocument = require("pdfkit");
const Total=0;
function CreateCommande(commande, Prix_Total, path,destinateur, Delegue) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc,Delegue);
  generateCustomerInformation(doc, destinateur);
  generateInvoiceTable(doc, commande,Prix_Total);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream("./public/"+path));
}

function generateHeader(doc,Delegue) {
   doc
   
    .fillColor("#444444")
    .fontSize(10)
    .image("public/images/Sothema.jpg", 450, 15, { width: 100 },{ align: "right" })
    .fontSize(10)
    .text("Nom et Prénom: "+Delegue.Nom+" "+Delegue.Prenom, 50, 50, { align: "left" })
    .text("Tél: "+Delegue.Numero, 50, 65, { align: "left" })
    .text("Email: "+Delegue.Email, 50, 80, { align: "left" })
    .moveDown();
    generateHr(doc, 100);
}






function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Client", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Nom et Prénom:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice[0].nom+" "+invoice[0].prenom, 150, customerInformationTop)
    .font("Helvetica")
    .text("Numéro de télephone:", 50, customerInformationTop + 15)
    .font("Helvetica-Bold")
    .text(invoice[0].Numero_tele, 150, customerInformationTop + 15)
    .font("Helvetica")
    .text("Spécialité:", 50, customerInformationTop + 30)
    .font("Helvetica-Bold")
    .text(
      invoice[0].specialite, 150,
      customerInformationTop + 30
    )

    .font("Helvetica")
    
    .text("Email:", 300, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice[0].email, 350, customerInformationTop)
    .font("Helvetica")
    .text("Adresse:", 300, customerInformationTop + 30)
    .font("Helvetica-Bold")
    .text(
      invoice[0].adresse,
      350,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}











  function generateInvoiceTable(doc, commande,Prix_Total) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  doc.fillColor("#2A2932");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Code",
    "Nom",
    "Quantité",
    "Prix unitaire",
    "Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");
  doc.fillColor("#2A2932");
  
  for (i = 0; i < commande.length; i++) {
    const item = commande[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.Code,
      item.Nom_medi,
      item.quantite,
      item.prix,
      item.quantite*item.prix+" Dh"
    );

    generateHr(doc, position + 20);

    
  }

  doc.fillColor("#2D08E7");
  const subtotalPosition = invoiceTableTop + (i + 1) * 40;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "",
    "Prix Total",
    
    Prix_Total[0].Total+" Dh"
  );
}

  
function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Signature",
      200,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  Code,
  Nom_medi,
  quantite,
  prix,
  Total
) {
  doc

    .fontSize(10)
    .text(Code, 50, y)
    .text(Nom_medi, 150, y)
    .text(quantite, 280, y)
    .text(prix, 370, y)
    .text(Total, 0, y, { align: "right" });
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
  CreateCommande
};
