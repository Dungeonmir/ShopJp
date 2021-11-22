const { json } = require('body-parser');
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const {  inspect } = require('util');



const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shop_jp'
});

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use( bodyParser.json() );  

app.get('/', (req, res)=>{
    const sqlTables = 'show tables;'; 
    db.query(sqlTables, (err, result)=>{
        res.send(result);
        console.log(err);
    });
    
})

app.get('/api/get', (req, res)=>{
    const sqlSELECT = 'SELECT * FROM shop_jp.products;'; 
    
    db.query(sqlSELECT ,(err, result)=>{
            console.log(err);
            console.log(result);
            res.send(result);
    })
})
app.get('/api/getBooks', (req, res)=>{
    const sqlSELECT = 'SELECT * FROM shop_jp.books;'; 
    
    db.query(sqlSELECT ,(err, result)=>{
            console.log(err);
            console.log(result);
            res.send(result);
    })
})
app.get('/api/getSweets', (req, res)=>{
    const sqlSELECT = 'SELECT * FROM shop_jp.sweets;'; 
    
    db.query(sqlSELECT ,(err, result)=>{
            console.log(err);
            console.log(result);
            res.send(result);
    })
})

app.get('/api/getBadges', (req, res)=>{
    const sqlSELECT = 'SELECT * FROM shop_jp.badges;'; 
    
    db.query(sqlSELECT ,(err, result)=>{
            console.log(err);
            console.log(result);
            res.send(result);
    })
})

app.get('/api/getClothes', (req, res)=>{
    const sqlSELECT = 'SELECT * FROM shop_jp.clothes;'; 
    
    db.query(sqlSELECT ,(err, result)=>{
            console.log(err);
            console.log(result);
            res.send(result);
    })
})

app.post('/api/insert', (req, res)=>{
    
    const id = req.body.id;
    console.log(id);
    if (id) {
        const sqlIns = 'INSERT INTO `shop_jp`.`categories` (`name`) VALUES ("'+ id +'");'; 
    db.query(sqlIns ,(err, result)=>{
        console.log(err);
    })
    }
    
})




app.listen(3001, ()=>{

    console.log('run on 3001');
})