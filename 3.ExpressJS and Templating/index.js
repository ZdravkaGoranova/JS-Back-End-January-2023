const express = require('express');
const handlebars = require('express-handlebars');//obekt

const loggerMiddleware = require('./loggerMiddleware');
const app = express();//инстанция на Express server

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');//за всички req използвай 'view engine' с име handlebars

app.use(express.static('public'));//Проверява дали има статични файлове
app.use(loggerMiddleware);
//ще работи за всички req от тук надолу/под него
// use  е за Middleware
//за всеки req,които влезе без значение от път и метод да се изпълни



app.get('/', (req, res) => {
    res.render('home');
});

app.get('/old', (req, res) => {
    res.send(`
        <html>
            <head>
                <link rel="stylesheet" href="/css/style.css" />
            </head>
            <body>
                <h1>Hello from Express!</h1>
                <a href="/cats">cats</a>
                <a href="/dogs">Dogs</a>
            </body>
        </html>
    `);
});

app.get('/cats', (req, res) => {
    const cats = [
        { name: 'Navcho', breed: 'Persian', age: 7 },
        { name: 'Sisa', breed: 'Angora', age: 12 },
        { name: 'Zuza', breed: 'UlichnaPrevyzhodna', age: 8 },
    ];

    res.render('cats', { cats });
});

app.get('/cats/1', (req, res) => {
    res.sendFile('./cat.jpg', { root: __dirname });//отваря в browser
    // res.download('./cat.jpg');//browser да го изтегли локално ;има автоматично  end накрая 
    // res.attachment('./cat.jpg'); // without end();
});
//прейзползване на функционалност Middleware
let validateCatIdMiddleware = (req, res, next) => {
    let catId = Number(req.params.catId);
    //console.log('Middleware logger...');

    if (!catId) {//NAN 
        return res.send('Invalid CatId!!');
        // return res.redirect('/404');
    }
    req.catId = catId;
    next();

    // if (!catId) {//NAN 
    //     res.send("Invalid catID")
    // } else {
    //     next();
    // }

};

app.get('/cats/:catId', validateCatIdMiddleware, (req, res) => {
    // res.send(`<h1>Individual Cat Page - catId=${req.params.catId}</h1>`);
    //req.params.(catId)- трябва да се казва както е наречено след : (catId)
    res.render('cat', { id: req.params.catId, isOdd: req.catId % 2 != 0 })
});

app.get('/dogs', (req, res) => {
    res.send('<h1>Dogs Page</h1>');
});

app.post('/cats', (req, res) => {
    res.send('Cats is received')
});

app.put('/cats', (req, res) => {
    res.send('Cats is updated')
});

app.delete('/cats', (req, res) => {
    res.send('Cat is deleted')
});

app.get('/json', (req, res) => {
    res.json({ ok: true, message: 'hello from json' });
});

app.get('/redirect', (req, res) => {
    res.redirect('/redirected');
});

app.get('/redirected', (req, res) => {
    res.send('This is redirected page');
});

//Ако е GET заявка означава  *- всички пътища
app.get('*', (req, res) => {
    res.send('404');
});

app.listen(5000, () => console.log('Server is listening on port 5000...'));
