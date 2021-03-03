    let connection=require('../config/db')
	let models=require('../models/models')
 	var path=require('path');
    let multer = require('multer')
    let session=require('express-session')

    
	const storage =multer.diskStorage({
		destination:function(req,file,cb){
			cb(null,'./public/documentation_medicament/')
		},
		filename:function(req,file,cb){
			cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname));
		}
	});

	const upload=multer({
		storage:storage
	}).single('document');



	exports.ListeMedicament=async(request,response)=>{
     try{
			//cette fonction permet de recuperer tout les medicament
			    if(request.session.Email){
			    	let Medicament=await models.ListeMedicament(request.body);
			    	response.render('pages/Admin/list_product',{Product:Medicament,User:request.session})
			    }else{
                    response.redirect('/')
			    }
		    }catch(e){
		    	console.log(e)
		    }
	};

	exports.ListeDocteur=async(request,response)=>{
		try{
			//cette fonction permet de recuperer tout les Docteur
			  	 if(request.session.Email){
			    	let Docteur=await models.ListeDocteur(request.body);
			    	response.render('pages/Admin/list_doctor',{Doctor:Docteur,User:request.session})
			    }else{
                    response.redirect('/')
			    }
		    }catch(e){
		    	console.log(e)
		    }
	};

	exports.ListeDelegue=async(request,response)=>{
		try{
			//cette fonction permet de recuperer tout les Delegue
			    if(request.session.Email){
				    let Delegue=await models.ListeDelegue(request.body);
				    response.render('pages/Admin/list_delegue',{Delegue:Delegue,User:request.session})
			    }else{
                    response.redirect('/')
			    }
		    }catch(e){
		    	console.log(e)
		    }
	};
	 
   exports.SupprimerDocteur=async(request,response)=>{
	try{
			//cette fonction permet de supprimer un docteur
			    if(request.session.Email){
					await models.SupprimerDocteur(request.body);
				    response.redirect('/list_doctor')
			    }else{
                    response.redirect('/')
			    }
		    }catch(e){
		    	console.log(e)
	    }
};

	exports.AjouterDocteur=async(request,response)=>{
		try{
				//cette fonction permet dajouter un doctor
				   
				if(request.session.Email){
					 await models.AjouterDocteur(request.body);
				    response.redirect('/list_doctor')
			    }else{
                    response.redirect('/')
			    }
			    }catch(e){
			    	console.log(e)
		    }
	}


	exports.ModifierDocteur=async(request,response)=>{
		try{
				//cette fonction permet de modifier un doctor
				    if(request.session.Email){
						await models.ModifierDocteur(request.body);
					    response.redirect('/list_doctor')
			        }else{
                    response.redirect('/')
			    }
			    }catch(e){
			    	console.log(e)
		    }
	}

	
	exports.SupprimerDelegue=async(request,response)=>{
	    	try{
				//cette fonction permet de supprimer un delegue
				    if(request.session.Email){
						await models.SupprimerDelegue(request.body);
				        response.redirect('/list_delegue')
			        }else{
                    response.redirect('/')
			    }
			    }catch(e){
			    	console.log(e)
		    }
	};


	exports.ModifierDelegue=async(request,response)=>{
				//cette fonction permet de modifier un delegue
				try{

					if(request.session.Email){
						await models.ModifierDelegue(request.body);
					    response.redirect('/list_delegue')
			        }else{
                    response.redirect('/')
			    }
			    }catch(e){
			    	console.log(e)
		    }
		}

	exports.AjouterDelegue=async(request,response)=>{
		try{
				//cette fonction permet d'jouter un delegue
				if(request.session.Email){
						await models.AjouterDelegue(request.body);
					    response.redirect('/list_delegue')
			        }else{
                    response.redirect('/')
			    }
			    }catch(e){
			    	console.log(e)
		    }
	}

   exports.SupprimerMedicament=async(request,response)=>{
	try{
			//cette fonction permet de supprimer un medicament
			if(request.session.Email){
				await models.SupprimerMedicament(request.body);
			    response.redirect('/list_product')
			}else{
                    response.redirect('/')
			}
			    
		    }catch(e){
		    	console.log(e)
	    }
	}



   // les deux fonctions ne fonctionne pas correctement

   exports.ModifierMedicament=function(request,response){
		var sql = 'update medicament SET Nom_medi=?,Date_Exp=?,Quantite=? where Code=?'
		  connection.query(sql, [request.body.name,request.body.Date_Exp,request.body.Quantite, request.body.code], function(err, rows, fields) {
		  if (err) throw err;
		});
		 // console.log(sql);
	response.redirect('/list_product')
	}

	exports.AjouterMedicament=function(req,res){
		upload(req,res,(err)=>{
	     if(err){
	     	throw err
	     	}
	     else{
	     	var sql = 'insert into medicament SET Code=?,Nom_medi=?,Date_Exp=?,Quantite=?,documentation=?,prix=?'
		    connection.query(sql, [req.body.Code,req.body.Name,req.body.Date_Exp,req.body.Quantity,req.file.filename,req.body.Prix], function(err, rows, fields) {
		    if (err) throw err;
		    });
		    res.redirect('/list_product')
		    
	     }
		});
	}



    exports.dashboard_Admin=async(request,response)=>{
		try{
			      let NbreDocteur = await models.NbreDocteur();
    	          let NbreDelegue = await models.NbreDelegue();
    	          let NbreMedicament = await models.NbreMedicament();
			      response.render('pages/Admin/dashboard_Admin',{NbreDocteur:NbreDocteur,NbreDelegue:NbreDelegue,NbreMedicament:NbreMedicament,User:request.session})
		    }catch(e){
		    	console.log(e)
		    }
	};
    
    

    


   