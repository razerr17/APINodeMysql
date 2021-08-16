const express=require('express');
const mysql=require('mysql');

const bodyParser=require('body-parser');

const PORT = process.env.PORT || 3000;

const app=express();

app.use(bodyParser.json());

//MySql
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1password2',
    database:'DBtutorias'
});


//check conecction
connection.connect(error =>{
    if(error) throw error;
    console.log("BD server running!");
});

//Listening server
app.listen(PORT,()=> console.log('Server on port ',PORT));
//Routes
app.get('/',(req,res)=>{
    res.send('Welcome to my API!');
});

// Get all estudents
app.get('/api/student',(req,res)=>{
    const sql='Select * from testudiante';
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length>0){
            res.json(results);
        }else{
            res.send('No result');
        }
    });
});
// Get student by id
app.get('/api/student/:id',(req,res)=>{
    const {id }=req.params;
    const sql =`select * from testudiante where IDEstudiante=${id}`;
    connection.query(sql,(error,result)=>{
        if(error) throw error;
        if(result.length>0){
            res.json(result);
        }else{
            res.send('No result');
        }
    });
});
// Add new student
app.post('/api/student/add',(req,res)=>{
    const sql='insert into testudiante SET ?';

    const studentObj={
        IDEstudiante:req.body.IDEstudiante,
        Nombres:req.body.Nombres,
        ApPaterno:req.body.ApPaterno,
        ApMaterno:req.body.ApMaterno,
        Email:req.body.Email,
        Direccion:req.body.Direccion,
        Celular:req.body.Celular
    }
    connection.query(sql,studentObj,error=>{
        if(error) throw error;
        res.send('Student created!!!');
    });
});
//update student by id
app.put('/api/student/update/:id',(req,res)=>{
    const {id }=req.params;
    const {IDEstudiante,Nombres,ApPaterno,ApMaterno,Email,Direccion,Celular}=req.body;
    const sql =`update testudiante SET IDEstudiante ='${IDEstudiante}',Nombres='${Nombres}',ApPaterno='${ApPaterno}',
    ApMaterno='${ApMaterno}',Email='${Email}',Direccion='${Direccion}',Celular='${Celular}' where IDEstudiante=${id}`;
    connection.query(sql,error=>{
        if(error) throw error;
        res.send('Student updated!');
    });
});
//delete student by id
app.delete('/api/student/delete/:id',(req,res)=>{
    const{id }=req.params;
    const sql=`delete from testudiante where IDEstudiante='${id}'`;
    connection.query(sql,error=>{
        if(error) throw error;
        res.send('Delete student');
    });
});
