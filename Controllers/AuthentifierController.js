    let connection=require('../config/db')
	let models=require('../models/models')
 	var path=require('path');
    let multer = require('multer')
    let session=require('express-session')

    
	exports.LoginPage=(request,response)=>{
	response.render('pages/index')
    }

    exports.VerifierCompte=async(request,response)=>{
		if(request.body.USERNAME==undefined||request.body.USERNAME==''||request.body.PASSWORD==undefined||request.body.PASSWORD==''){
			response.render("pages/index");
		}else{
			try{
			//cette fonction verifier si l'models qui est entrain de se connecter existe dans la base de donne
			    let existe=await models.VerifierCompte(request.body);
			    if(existe[0].verifier){
				    //cette fonction permet de verifier le type de compte (Admin, Delegue) pour le rediger en bonne chemin
				    let Compte=await models.TypeCompte(request.body);
				        request.session.Nom=Compte[0].nom;
				    	request.session.Prenom=Compte[0].prenom
				    	request.session.Numero=Compte[0].Numero_tele
				    	request.session.Email=Compte[0].email
				    	request.session.Id=Compte[0].id
				    if(Compte[0].compte=='Admin'){
				    	response.redirect('/dashboard_Admin')
				  }else{
				    	response.redirect('/dashboard_D')
				    }
			    }else{
			    	response.render("pages/index");
		    	}
		    }catch(e){
		    	console.log(e)
		    }
	    }
	}



    exports.Logout=(request,response)=>{

    	request.session.destroy(function(err){
    		if(err){
    			response.negotiate(err);
    		}
    		response.redirect('/')
    	})
	
    }
	