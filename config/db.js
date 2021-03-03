let mysql =require('mysql')
let connection = mysql.createConnection({
	host : 'localhost',
	user :'root',
	password:'',
	database:'Gestion_Delegue'
})
connection.connect();
module.exports=connection