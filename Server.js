let express=require('express')
let app=express()
let moment=require('moment')
let bodyParser = require('body-parser')
let connection=require('./config/db')
//classe

    let session=require('express-session');
    app.use(session({
    	secret:'Delegue_medical',
    	resave:false,
    	saveUninitialized:true,
    	cookie:{secure:false}
    }));


var path=require('path');
let multer = require('multer')
const router= require('./Routers/router')
//Moteur de template
app.set('view engine','ejs')
//Middelwere
app.use('/static', express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/',router)






  

app.listen(3000)