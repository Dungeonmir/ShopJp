const { json } = require('body-parser');
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const e = require('express');


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
app.post('/api/getOrders', (req, res)=>{
    const sqlSELECT = `
        SELECT idOrders, Name, Username, DateOfOrder, DateOfDelivery, Status FROM shop_jp.orders
        join products on Products_idProducts = idProducts
        join customers on Customers_idCustomers = idCustomers;
    `;

    db.query(sqlSELECT, (err, result) => {
        console.log(err);
        console.log(result);
        res.send(result);
    })
})

app.post('/api/buy', (req, res) => {
    const productId = req.body.productId;
    const idCustomers = req.body.idCustomers;
    console.log('----------------------------------');
    console.log(productId);
    console.log(idCustomers);
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getDate();
    const dateNow = year + '-' + month + '-' + day;
    console.log(date);

    if (productId) {
        const getAmount = 'SELECT Quantity FROM shop_jp.products where idProducts = ' + productId + ';'
        db.query(getAmount, (err, amount) => {
            console.log("error with get amount: " + err);
            console.log(amount[0]);
            if (amount[0] == undefined) {
                res.send('idProduct error');
            } else {
                if (amount[0].Quantity <= 0) {
                    res.send('EmptyStorage');
                } else {
                    let quantity = parseInt(amount[0].Quantity) - 1;
                    console.log(quantity);
                    const decreaseAmount = 'UPDATE `shop_jp`.`products` SET `Quantity` = ' + quantity + ' WHERE (`idProducts` = ' + productId + ');';
                    db.query(decreaseAmount, (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Количество уменьшили' + result);
                            const setOrderSQL = 'INSERT INTO `shop_jp`.`orders` (`Products_idProducts`, `Customers_idCustomers`, `Status`, `DateOfOrder`) VALUES (' + productId + ', ' + idCustomers + ', "Обработка", "' + dateNow + '");';

                            db.query(setOrderSQL, (err, result) => {
                                console.log('insert sql error: ' + err);

                            })

                        }
                    })
                }

            }

        })

    }
})
app.post('/api/delete',(req,res)=>{
    console.log(req.body.productId);
    const productId = req.body.productId;
    if (productId) {
        const deleteOrder = 'DELETE FROM `shop_jp`.`orders` WHERE (`Products_idProducts` = '+productId+');'
        const deleteItem = 'DELETE FROM `shop_jp`.`products` WHERE (`idProducts` = '+productId+');'
        const deleteFromSweets = 'DELETE FROM `shop_jp`.`ctg_sweets` WHERE (`idSweets` = '+productId+');';
        const deleteFromBooks = 'DELETE FROM `shop_jp`.`ctg_books` WHERE (`idBook` = '+productId+');';
        const deleteFromBadges = 'DELETE FROM `shop_jp`.`ctg_badges` WHERE (`idBadge` = '+productId+');';
        query(deleteOrder);
        query( deleteItem);
        query(deleteFromSweets);
        query(deleteFromBooks);
        query(deleteFromBadges);
    }

})
function query(stringSQL){
    db.query(stringSQL, (err, result) => {
        console.log('sql error: ' + err);
        if (result == undefined) {
            console.log('undefined error');
        } else {
            console.log(result);
        }
    })
}
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
        const getHashQuery = 'SELECT Password, idCustomers FROM shop_jp.customers where Username = "' + login + '";'
        db.query(getHashQuery, (err, resultSQL) => {
            console.log('sql error: ' + err);
            if (resultSQL[0] == undefined) {
                console.log('This login is not saved in database');
            } else {
                let hash = resultSQL[0]['Password'];
                bcrypt.compare(password, hash, (error, resultPSW) => {
                    console.log('bcrypt error: ' + error);
                    console.log(resultPSW);
                    res.send({ isLoggedIn: resultPSW, idCustomers: resultSQL[0]['idCustomers'] });
                    console.log(login + ' залогинился');
                })
            }

        })
    }
})
app.post('/api/getStatsDay', (req, res)=>{
    let date = req.body.date;
    const getQuanity = `
    SELECT  categories.name as categoryName, count(*) as quantity  FROM shop_jp.orders
    join products on Products_idProducts = idProducts
    join categories on idCategory = category_idCategory
     where month(DateOfOrder) = '`+date+`'
    group by categories.name;
    `;
    if (date) {
        db.query(getQuanity, (err, result) => {
            console.log(err);
            console.log(result);
            res.send(result);
        })
    }
    
})
app.post('/api/statistic', (req, res)=>{
    const getQuanity = `
    SELECT categories.name as categoryName, count(*) as quantity  FROM shop_jp.orders
    join products on Products_idProducts = idProducts
    join categories on idCategory = category_idCategory
    group by categories.name;
    `;
    db.query(getQuanity, (err, result) => {
        console.log(err);
        console.log(result);
        res.send(result);
    })
})

app.post('/api/getOrdersDay',(req, res)=>{
    const date = req.body.date;
    console.log(date);
    const sqlGetOrdersDay = `
        SELECT idOrders, Name, Username, DateOfOrder, Price-Discount as Price, Status FROM shop_jp.orders
        join products on Products_idProducts = idProducts
        join customers on Customers_idCustomers = idCustomers
        where DateOfOrder = '`+date+`';
    `;
    if (date) {
        db.query(sqlGetOrdersDay, (err, result) => {
            console.log(err);
            console.log(result);
            if (result==undefined) {
                console.log('Пусто');
                res.send([]);
            }
            else{
                res.send(result);
            }
            
        })
    }
    else{
        console.log('Нет даты');
    }
    
})


app.listen(3001, () => {

    console.log('server running on port 3001 http://localhost:3001');
})