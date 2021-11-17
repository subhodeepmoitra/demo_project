const express = require('express');
const app = express();
const app1 = express();
const app2 = express();
const path = require('path');
const router = express.Router();
var mysql = require('mysql');
var alert = require('alert');
var bodyParser = require('body-parser');
app1.use(bodyParser.urlencoded({extended: false}));
app1.use(bodyParser.json());
app2.use(bodyParser.urlencoded({extended: false}));
app2.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_js_application"
});

// Define the static file path
app.use(express.static(__dirname+'/'));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

//code for registration
app1.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/complain.html'));
});
app1.post('/submit',function(req,res){

  var name=req.body.fname;
  var email=req.body.femail;
  var address=req.body.faddress;
  var contact=req.body.fcontact;
  var complain=req.body.fcomplain;
  
  alert("YOUR COMPLAIN HAS BEEN REGISTERED SUCCESSFULLY...");
  
  con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO complain (name, email, address, contact, complain) VALUES ('"+name+"', '"+email+"','"+address+"', '"+contact+"', '"+complain+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.end();
  });
  });
})


//code for death certificate registration
app2.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/death_certificate_register.html'));
});
app2.post('/submit',function(req,res){

  var name=req.body.fname;
  var address=req.body.faddress;
  var cause=req.body.fcause;
  var phone=req.body.fphone;
  var place=req.body.fplace;
  var doctor=req.body.fdoctor;
  
  alert("Death registration successful...");
  
  con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO death (name, address, cause, phone, place, doctor) VALUES ('"+name+"', '"+address+"','"+cause+"', '"+phone+"', '"+place+"', '"+doctor+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.end();
  });
  });
})
//for death registration
app2.use('/', router);
app2.listen(process.env.port || 3002);
console.log('Running at Port 3002');


//for complain registration
app1.use('/', router);
app1.listen(process.env.port || 3001);
console.log('Running at Port 3001');


//add the router
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');