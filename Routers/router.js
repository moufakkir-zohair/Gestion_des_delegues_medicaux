const express=require("express")
const router = express.Router()
let connection=require('../config/db')
const AdminController=require('../Controllers/AdminController');
const DelegueController=require('../Controllers/DelegueController');
const AuthentifierController=require('../Controllers/AuthentifierController');
//---------------------------------les actions de l'administrateur--------------------------------------

//s'authentifier

router.get('/',AuthentifierController.LoginPage);

router.post('/',AuthentifierController.VerifierCompte);

//gerer les docteurs

router.get('/list_doctor',AdminController.ListeDocteur);

router.post('/Add_Doctor',AdminController.AjouterDocteur);

router.post('/edit_Doctor',AdminController.ModifierDocteur);

router.post('/delete_Doctor',AdminController.SupprimerDocteur);

//gerer les delegues

router.get('/list_delegue',AdminController.ListeDelegue);

router.post('/Add_Delegate',AdminController.AjouterDelegue);

router.post('/edit_delegate',AdminController.ModifierDelegue);

router.post('/delete_Delegate',AdminController.SupprimerDelegue);

//gerer le stock

router.get('/list_product',AdminController.ListeMedicament);

router.post('/add_Product',AdminController.AjouterMedicament);

router.post('/edit_Product',AdminController.ModifierMedicament);

router.post('/delete_Product',AdminController.SupprimerMedicament);



//------------------------------les actions de delegues-------------------------------------------

//gerere le rendez vous

router.get('/Liste_Evenement',DelegueController.ListeEvenement);

router.post('/AjouterEvenement',DelegueController.AjouterEvenement);

router.post('/ModifierEvenementTitre',DelegueController.ModifierEvenementTitre);

router.post('/ModifierEvenementDate',DelegueController.ModifierEvenementDate);

//gerer le rapport

router.get('/ListeRapport',DelegueController.ListeRapport);

router.post('/CreerRapport',DelegueController.CreerRapport);

router.post('/SupprimerRapport',DelegueController.SupprimerRapport);

//gerer les voyages

router.get('/ListeVoyage',DelegueController.ListeVoyage);

router.post('/AjouterVoyage',DelegueController.AjouterVoyage)

router.post('/SupprimerVoyage',DelegueController.SupprimerVoyage)

router.post('/ModifierVoyage',DelegueController.ModifierVoyage)

// gerer la Commande

router.get('/ListeCommande',DelegueController.ListeCommande)

router.post('/AddMedicament_Ord',DelegueController.AddMedicament_Ord)

router.post('/ModifierQuantite',DelegueController.ModifierQuantite)

router.post('/SupprimerProduitCommande',DelegueController.SupprimerProduitCommande)

router.post('/EnregistreCommande',DelegueController.EnregistreCommande)

router.get('/AnnulerCommande',DelegueController.AnnulerCommande)

router.post('/SupprimerCommande',DelegueController.SupprimerCommande)

router.get('/dashboard_D',DelegueController.dashboard_D)

router.get('/dashboard_Admin',AdminController.dashboard_Admin)




//se deconnecter

router.get('/logout',AuthentifierController.Logout)


module.exports=router