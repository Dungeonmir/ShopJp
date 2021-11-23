const { json } = require('body-parser');
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const { inspect } = require('util');
const bcrypt = require('bcrypt');


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shop_jp'
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    const sqlTables = 'show tables;';
    db.query(sqlTables, (err, result) => {
        res.send(result);
        console.log(err);
    });

})

app.get('/api/get', (req, res) => {
    const sqlSELECT = 'SELECT * FROM shop_jp.products;';

    db.query(sqlSELECT, (err, result) => {
        console.log(err);
        console.log(result);
        res.send(result);
    })
})
app.get('/api/getBooks', (req, res) => {
    const sqlSELECT = 'SELECT * FROM shop_jp.books;';

    db.query(sqlSELECT, (err, result) => {
        console.log(err);
        console.log(result);
        res.send(result);
    })
})
app.get('/api/getSweets', (req, res) => {
    const sqlSELECT = 'SELECT * FROM shop_jp.sweets;';

    db.query(sqlSELECT, (err, result) => {
        console.log(err);
        console.log(result);
        res.send(result);
    })
})

app.get('/api/getBadges', (req, res) => {
    const sqlSELECT = 'SELECT * FROM shop_jp.badges;';

    db.query(sqlSELECT, (err, result) => {
        console.log(err);
        console.log(result);
        res.send(result);
    })
})

app.get('/api/getClothes', (req, res) => {
    const sqlSELECT = 'SELECT * FROM shop_jp.clothes;';

    db.query(sqlSELECT, (err, result) => {
        console.log(err);
        console.log(result);
        res.send(result);
    })
})

app.post('/api/insertUser', (req, res) => {
    console.log('Новая запись, ' +
        req.body.user);
    let user = req.body.user;
    let password = req.body.password;
    let FirstName = req.body.FirstName;
    let LastName = req.body.LastName;
    let email = req.body.Email;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        console.log(hash);
        if (user) {
            const sqlIns = 'INSERT INTO `shop_jp`.`customers` (`FirstName`, `LastName`, `Username`, `Email`, `Password`) VALUES ("' + FirstName + '", "' + LastName + '", "' + user + '", "' + email + '", "' + hash + '");';
            db.query(sqlIns, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Запись добавлена' + result);
                }
            })
        }

    })

    /*const id = req.body.id;
    console.log(id);
    if (id) {
        */
    /*
    c
    */
})
app.post('/api/getAccount', (req, res) => {
    const login = req.body.user;
    if (login) {
        const getHashQuery = 'SELECT idCustomers, FirstName, LastName, UserName, Email FROM shop_jp.customers where Username = "' + login + '";'
        db.query(getHashQuery, (err, result) => {
            console.log('sql error: ' + err);
            if (result[0] == undefined) {
                console.log('This login is not saved in database');
            } else {
                res.send(result);
                console.log(result);
            }
        })
    }
})

app.post('/api/verifyPassword', (req, res) => {
    const login = req.body.user;
    const password = req.body.password;

    if (login) {
        const getHashQuery = 'SELECT Password FROM shop_jp.customers where Username = "' + login + '";'
        db.query(getHashQuery, (err, result) => {
            console.log('sql error: ' + err);
            if (result[0] == undefined) {
                console.log('This login is not saved in database');
            } else {
                let hash = result[0]['Password'];
                bcrypt.compare(password, hash, (error, result) => {
                    console.log('bcrypt error: ' + error);
                    res.send(result);
                    console.log(login + ' залогинился');
                })
            }

        })
    }
})






app.listen(3001, () => {

    console.log('server running on port 3001 http://localhost:3001');
})