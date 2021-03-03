let connection=require('../config/db')
let moment=require('moment')
const { createInvoice } = require("../CreatePDF.js");
const { CreateCommande } = require("../CreateCommande.js");

let fs = require('fs')
let models={};

function formatDateTime(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const h=date.getHours();
  const m=date.getMinutes();
  const s=date.getSeconds();
  return year + "-" + month + "-" + day +" "+h+"-"+m+"-"+s;
}


models.formatDate=(date)=>{
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

models.VerifierCompte=(data)=>{
	return new Promise((resolve,reject)=>{
		var sql = 'select count(id) as verifier from delegue where Email=? and Password=?'
	    connection.query(sql, [data.USERNAME,data.PASSWORD], function(err, results, fields) {
		  if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.TypeCompte=(data)=>{
	return new Promise((resolve,reject)=>{
		var sql = 'select  * from delegue where Email=? and Password=?'
	    connection.query(sql, [data.USERNAME,data.PASSWORD], function(err, results, fields) {
		  if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.ListeMedicament=()=>{
	return new Promise((resolve,reject)=>{
	  var sql = 'select Code,Nom_medi,DATE_FORMAT(Date_Exp, "%d/%m/%Y %H:%i") as Date_Exp,Quantite,documentation from medicament'
	  connection.query(sql, function(err, results, fields){
		  if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.ListeDocteur=()=>{
	return new Promise((resolve,reject)=>{
	  var sql = 'select * from doctor'
	  connection.query(sql, function(err, results, fields){
		  if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.ListeDelegue=()=>{
	return new Promise((resolve,reject)=>{
	  var sql = 'select * from delegue where compte not like "Admin"'
	  connection.query(sql, function(err, results, fields){
		  if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}



models.SupprimerDocteur=(data)=>{
	return new Promise((resolve,reject)=>{
	 const id=data.delete_id;
    var sql = 'DELETE from doctor where id = ?';
	  connection.query(sql,[id],function(err, results, fields){
		  if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.AjouterDocteur=(data)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'insert into doctor SET nom=?,prenom=?,email=?,Numero_tele=?,specialite=?, adresse=?'
	  connection.query(sql, [data.First_name,data.Last_name,data.Email,data.phone,data.Speciality,data.adress], function(err, results, fields){
		  if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.AjouterDelegue=(data)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'insert into Delegue SET nom=?,prenom=?,email=?,Numero_tele=?,password=?, compte=?'
	connection.query(sql, [data.First_name,data.Last_name,data.Email,data.phone,data.password,"Delegue"], function(err, results, fields){
		  if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}

models.AjouterMedicament=(data)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'insert into medicament SET Code=?,Nom_medi=?,Date_Exp=?,Quantite=?,documentation=?'
		    connection.query(sql, [data.Code,data.Name,data.Date_Exp,data.Quantity,data.filename], function(err, results, fields) {
		  if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.ModifierDocteur=(data)=>{
	return new Promise((resolve,reject)=>{
   var sql = 'update doctor SET nom=?,prenom=?,email=?,Numero_tele=?, specialite=?, adresse=? where id=?'
	  connection.query(sql, [data.first_name,data.last_name,data.email,data.phone,data.specialite,data.adress,data.edit_id], function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.ModifierDelegue=(data)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'update delegue SET nom=?,prenom=?,email=?,Numero_tele=? where id=?'
	  connection.query(sql, [data.first_name,data.last_name,data.email,data.phone, data.edit_id], function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}



models.SupprimerDelegue=(data)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'DELETE from delegue where id = ?';
	  connection.query(sql,[data.delete_id],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.SupprimerMedicament=(data)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'DELETE from medicament where Code = ?';
	  connection.query(sql,[data.delete_code],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}



models.ListeEvenement=(session)=>{
	return new Promise((resolve,reject)=>{
     var sql = 'select * from events where delegue=?'
	  connection.query(sql, [session.Id],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}




models.AjouterEvenement=(data,session)=>{
	return new Promise((resolve,reject)=>{
var sql = 'insert into events SET delegue=?,sujet=?, docteur=?,coleur=?, date_d=?,date_f=?'
	  connection.query(sql, [session.Id,data.sujet,data.docteur,data.coleur,data.start,data.end], function(err, results, fields) {
		  if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}



models.SupprimerEvenement=(data)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'delete from events where id=?';
	  connection.query(sql,[data],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}

models.ModifierEvenementTitre=(data)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'update events SET sujet=? where id=?'
	  connection.query(sql, [data.title,data.id], function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.ModifierEvenementDate=(data)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'update events SET sujet=?,date_d=?,date_f=? where id=?'
	  connection.query(sql, [data.sujet,data.start,data.end,data.id], function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.ListeRapport=(session)=>{
	return new Promise((resolve,reject)=>{
     var sql = 'select id,Sujet, DATE_FORMAT(Date_creation, "%Y-%m-%d") as Date_creation,path from rapport where delegue=?'
	  connection.query(sql, [session.Id],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}








models.CreerRapport=(data,session)=>{
	return new Promise((resolve,reject)=>{
	var path="Rapport/Rapport"+'_'+Date.now()+'.pdf';
    createInvoice(data, path);
    var sql = 'insert into Rapport SET delegue=?, sujet=?,Date_creation=?, path=?'
	  connection.query(sql, [session.Id,data.sujet,formatDateTime(new Date()),path], function(err, results, fields) {
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.SupprimerRapport=(data)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'DELETE from Rapport where id = ?';
	  connection.query(sql,[data.delete_code],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}

models.SupprimerRapportDirectory=(data)=>{
	return new Promise((resolve,reject)=>{
    	var sql= "select path from Rapport where id=?"
    	connection.query(sql,[data.delete_code],function(err, results, fields){
	  if (err) return reject(err);
	  path="./public/"+results[0]['path'];
	  fs.unlinkSync(path);

	  console.log(results)
	  return resolve(results);
	})
})
}


models.AjouterVoyage=(data,session)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'insert into voyage SET delegue=?, ville_d=?,date_d=?,ville_a=?,date_a=?,description=?'
	connection.query(sql, [session.Id,data.ville_d,data.date_d,data.ville_a,data.date_a,data.description], function(err, results, fields){
		  if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.ListeVoyage=(session)=>{ 
	return new Promise((resolve,reject)=>{
     var sql = 'select id,ville_d,DATE_FORMAT(date_d, "%Y-%m-%d %H:%i") as date_d,ville_a,DATE_FORMAT(date_a, "%Y-%m-%d %H:%i") as date_a,description from Voyage where delegue=?'
	  connection.query(sql,[session.Id],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.SupprimerVoyage=(data)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'DELETE from Voyage where id = ?';
	  connection.query(sql,[data.delete_id],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.ModifierVoyage=(data)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'update voyage SET ville_d=?,date_d=?,ville_a=?,date_a=?,description=? where id =?'
	  connection.query(sql, [ data.editville_d,data.editdate_d, data.editville_a, data.editdate_a, data.editdescription,data.editid], function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}




models.AddMedicament_Ord=(data,session)=>{
		return new Promise((resolve,reject)=>{
        var sql = 'insert into commande SET id=?, code=?, quantite=?'
	  connection.query(sql, [session.Id,data.medicament,data.quantite], function(err, results, fields) {
		  if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}



models.ListeCommande=(session)=>{
  return new Promise((resolve,reject)=>{
     var sql = 'select m.Code,Nom_medi,Date_Exp,documentation,prix , c.quantite from medicament m , commande c where c.code=m.Code and id=?'
	  connection.query(sql,[session.Id], function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}



models.ModifierQuantite=(data)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'update commande SET quantite=? where code=?'
	  connection.query(sql, [data.quantite,data.code], function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.SupprimerProduitCommande=(data)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'delete from commande where code =?'
	  connection.query(sql, [data.code], function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.Prix_Total=(session)=>{
		return new Promise((resolve,reject)=>{
     var sql = 'select sum(c.quantite*m.prix) as Total from medicament m , commande c where c.code=m.Code and id=?'
	  connection.query(sql,[session.Id] , function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}





models.DestinateurCommande=(data)=>{
	return new Promise((resolve,reject)=>{
	  var sql = 'select * from doctor where id=?'
	  connection.query(sql, [data.docteur], function(err, results, fields){
		  if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}

models.EnregistreCommande=(data,Prix_Total,destinateur,session)=>{
return new Promise((resolve,reject)=>{
	var path="Commande/commande"+'_'+Date.now()+'.pdf';
    CreateCommande(data,Prix_Total, path,destinateur,session);
      var sql1='TRUNCATE TABLE commande';
      var sql = 'insert into fichecommande SET  delegue=?,destination=?,date=?,path=?'
	  connection.query(sql, [session.Id,destinateur[0].id,new Date(),path], function(err, results, fields) {
		 if (err) {
		  	return reject(err);
		  }else{
		  	connection.query(sql1, [], function(err, results, fields) {
		  		if(err)  return reject(err);
		  		  return resolve(results);
		  })

}
})
})
}


models.FicheCommande=(session)=>{
		return new Promise((resolve,reject)=>{
     var sql = 'select f.id, delegue, adresse , DATE_FORMAT(date, "%Y-%m-%d") as date , path from fichecommande f , doctor d where delegue=? and f.destination=d.id'
	  connection.query(sql, [session.Id],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}



models.AnnulerCommande=()=>{
return new Promise((resolve,reject)=>{
      var sql='TRUNCATE TABLE commande';
		  	connection.query(sql, [], function(err, results, fields) {
		  		if(err)  return reject(err);
		  		  return resolve(results);
		  })

})
}


models.SupprimerCommande=(data)=>{
	return new Promise((resolve,reject)=>{
    var sql = 'DELETE from FicheCommande where id = ?';
	  connection.query(sql,[data.deleteid],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}

models.SupprimerCommandeDirectory=(data)=>{
	return new Promise((resolve,reject)=>{
    	var sql= "select path from FicheCommande where id=?"
    	connection.query(sql,[data.deleteid],function(err, results, fields){
	  if (err) return reject(err);
	  path="./public/"+results[0]['path'];
	  fs.unlinkSync(path);

	  console.log(results)
	  return resolve(results);
	})
})
}

// les fonctions pour le tableau de board de delegue


models.NbreVoyage=(session)=>{
	return new Promise((resolve,reject)=>{
     var sql = 'select count(id) as Nbre_Voyage from voyage where delegue=?'
	  connection.query(sql,[session.Id],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}

models.NbreRapport=(session)=>{
	return new Promise((resolve,reject)=>{
     var sql = 'select count(id) as Nbre_Rapport from rapport where delegue=?'
	  connection.query(sql,[session.Id],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}

models.NbreCommande=(session)=>{
	return new Promise((resolve,reject)=>{
     var sql = 'select count(id) as Nbre_Commande from FicheCommande where delegue=?'
	  connection.query(sql,[session.Id],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.NbreRendez=(session)=>{
	return new Promise((resolve,reject)=>{
     var sql = 'select count(id) as Nbre_Rendez from events where delegue=?'
	  connection.query(sql,[session.Id],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.FicheCommandeUser=(session)=>{
		return new Promise((resolve,reject)=>{
     var sql = 'select f.id, delegue, adresse , DATE_FORMAT(date, "%Y-%m-%d") as date , path from fichecommande f , doctor d where delegue=? and f.destination=d.id limit 5'
	  connection.query(sql, [session.Id],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}


models.ListeRapportUser=(session)=>{
	return new Promise((resolve,reject)=>{
     var sql = 'select id,delegue,Sujet, DATE_FORMAT(Date_creation, "%Y-%m-%d") as Date_creation,path from rapport where delegue=? limit 5'
	  connection.query(sql, [session.Id],function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}



models.NbreDocteur=()=>{
	return new Promise((resolve,reject)=>{
     var sql = 'select count(id) as NbreDocteur from doctor'
	  connection.query(sql,function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}

models.NbreDelegue=()=>{
	return new Promise((resolve,reject)=>{
     var sql = 'select count(id) as NbreDelegue from delegue'
	  connection.query(sql,function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}

models.NbreMedicament=()=>{
	return new Promise((resolve,reject)=>{
     var sql = 'select count(Code) as NbreMedicament from medicament'
	  connection.query(sql,function(err, results, fields){
		 if (err) {
		  	return reject(err);
		  }
	  return resolve(results);
	})
})
}
 
    	        
    	         


module.exports=models