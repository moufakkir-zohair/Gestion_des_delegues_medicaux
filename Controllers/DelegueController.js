
	let connection=require('../config/db')

	let models=require('../models/models')
 
 	
   exports.AjouterEvenement=async(request,response)=>{
		try{
			//cette fonction permet de recuperer tout les Docteur
			    await models.AjouterEvenement(request.body,request.session);
			    response.redirect('/Liste_Evenement')
		    }catch(e){
		    	console.log(e)
		    }
		}

    exports.ListeEvenement=async(request,response)=>{
     try{
     	        if(request.session.Email){
					let Docteurs=await models.ListeDocteur(request.body);
				    let Evenement=await models.ListeEvenement(request.session);
				    response.render('pages/Delegue/Rendez_vous',{Evenement:Evenement,docteurs:Docteurs,User:request.session})
				}else{
	                response.redirect('/')
				}
		    }catch(e){
		    	console.log(e)
		    }
	};
    exports.ModifierEvenementTitre=async(request,response)=>{

    	 try{
			     if(request.body.delete){
			     	await models.SupprimerEvenement(request.body.id);
	             }else{
	             	await models.ModifierEvenementTitre(request.body);
	             }
		         response.redirect('/Liste_Evenement')
		     }
		    catch(e){
		    	console.log(e)
		    }
    }
    
    exports.ModifierEvenementDate=async(request,response)=>{

    	 	try{
				    await models.ModifierEvenementDate(request.body);
				     response.send(request.body);
			    }catch(e){
			    	console.log(e)
		    }
    }


    exports.ListeRapport=async(request,response)=>{
     try{
     	    if(request.session.Email){
				 let Rapport=await models.ListeRapport(request.session);
			     response.render('pages/Delegue/Rapport',{date:models.formatDate(new Date()),Rapport:Rapport,User:request.session})
				}else{
	                response.redirect('/')
		    }
			     
		    }catch(e){
		    	console.log(e)
		    }
	};

	exports.CreerRapport=async(request,response)=>{
     try{
			     await models.CreerRapport(request.body,request.session);
			     response.redirect('/ListeRapport')
		    }catch(e){
		    	console.log(e)
		    }
	};
    

    exports.SupprimerRapport=async(request,response)=>{
    try{
				    await models.SupprimerRapportDirectory(request.body);
				    await models.SupprimerRapport(request.body);
				    response.redirect('/ListeRapport')
			    }catch(e){
			    	console.log(e)
		    }

	};

	exports.ListeVoyage=async(request,response)=>{
         try{

         	if(request.session.Email){
				 let Voyage=await models.ListeVoyage(request.session);
			     response.render('pages/Delegue/Voyage',{date:models.formatDate(new Date()),Voyage:Voyage,User:request.session})
				}else{
	                response.redirect('/')
		    }
			}catch(e){
		    	console.log(e)
		    }
	};

 
    exports.AjouterVoyage=async(request,response)=>{
		try{
			    await models.AjouterVoyage(request.body,request.session);
			    response.redirect('/ListeVoyage')
		    }catch(e){
		    	console.log(e)
		    }
		}

    
    exports.SupprimerVoyage=async(request,response)=>{
    try{
				  await models.SupprimerVoyage(request.body);
				    response.redirect('/ListeVoyage')
			    }catch(e){
			    	console.log(e)
		    }
    };


   exports.ModifierVoyage=async(request,response)=>{
    	 	try{
				    await models.ModifierVoyage(request.body);
				     response.redirect('/ListeVoyage');
			    }catch(e){
			    	console.log(e)
		    }
    }

    exports.ListeCommande=async(request,response)=>{
    	 	try{

    	 		if(request.session.Email){
				    let docteur=await models.ListeDocteur();
				    let Medicament=await models.ListeMedicament();
                    let commande = await models.ListeCommande(request.session);
			        let FicheCommande = await models.FicheCommande(request.session);
				    response.render('pages/Delegue/Commande',{commande:commande,medicament:Medicament,FicheCommande:FicheCommande,docteur:docteur,date:models.formatDate(new Date()),User:request.session})
				}else{
	                response.redirect('/')
		    }
    	 		    
			    }catch(e){
			    	console.log(e)
		    }
    }

    exports.AddMedicament_Ord=async(request,response)=>{
    	 	try{
                    await models.AddMedicament_Ord(request.body,request.session);
				    response.redirect('/ListeCommande');
			    }catch(e){
			    	console.log(e)
		    }

		   
    }
    
    

    exports.ModifierQuantite=async(request,response)=>{

    	 	try{
				    await models.ModifierQuantite(request.body);
				     response.redirect('/ListeCommande');
			    }catch(e){
			    	console.log(e)
		    }
    }
    

     exports.SupprimerProduitCommande=async(request,response)=>{

    	 	try{
				    await models.SupprimerProduitCommande(request.body);
				     response.redirect('/ListeCommande');
			    }catch(e){
			    	console.log(e)
		    }
    }

    
    
     exports.EnregistreCommande=async(request,response)=>{
		 try{
		 	      let destinateur=await models.DestinateurCommande(request.body);
		 	      let commande = await models.ListeCommande(request.session);
		 	      let Prix_Total= await models.Prix_Total(request.session);
			      await models.EnregistreCommande(commande,Prix_Total,destinateur,request.session);
			     response.redirect('/ListeCommande')
			     console.log(destinateur)
		    }catch(e){
		    	console.log(e)
		    }
		}
     

     exports.AnnulerCommande=async(request,response)=>{
		 try{
		 	     await models.AnnulerCommande();
			     response.redirect('/ListeCommande')
		    }catch(e){
		    	console.log(e)
		    }
		}
    
     exports.SupprimerCommande=async(request,response)=>{
    try{
				    await models.SupprimerCommandeDirectory(request.body);
				    await models.SupprimerCommande(request.body);
				    response.redirect('/ListeCommande')
				    console.log(request.body)
			    }catch(e){
			    	console.log(e)
		    }

	};


    exports.dashboard_D=async(request,response)=>{
    try{          


    	if(request.session.Email){
				  let Rapport=await models.ListeRapportUser(request.session);
    	          let FicheCommande = await models.FicheCommandeUser(request.session);
    	          let NbreVoyage = await models.NbreVoyage(request.session);
    	          let NbreRapport = await models.NbreRapport(request.session);
    	          let NbreCommande = await models.NbreCommande(request.session);
    	          let NbreRendez = await models.NbreRendez(request.session);
    	          response.render('pages/Delegue/dashboard_D',{Rapport:Rapport,FicheCommande:FicheCommande,User:request.session,NbreVoyage:NbreVoyage,NbreRapport:NbreRapport,NbreCommande:NbreCommande,NbreRendez:NbreRendez});
				}else{
	                response.redirect('/')
		    }
		    

    	          
			    }catch(e){
			    	console.log(e)
		    }

	};
    


	


