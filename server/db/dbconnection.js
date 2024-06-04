const mysql=require("mysql");
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"gp",
    port:"3306"
})   
connection.connect((err)=>{
    if(err)throw err;
    console.log("db is connected");
})
module.exports=connection;