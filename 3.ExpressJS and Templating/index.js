const express = require('express');
const res = require('express/lib/response.js');
const app = express();//инстанция на Express server


app.get('/', (req, res) => {
    res.status(200)
    res.send(`<h1>Hello from Exppress!</h1>
    <a href ="/cats">Cats</a>${'\n'}
    <a href ="/dogs">Dogs</a>
    `)
});

app.post('/cats', (req, res) => {
    res.send('Cats is received')
});
app.put('/cats', (req, res) => {
    res.send('Cats is updated')
});
app.delete('/cats', (req, res) => {
    res.send('Cats is deleted')
});
app.get('/cats', (req, res) => {
    res.send('<h1>Cats page</h1>')
});

app.get('/cats/1', (req, res) => {
    //res.download('./cat.jpg');//browser да го изтегли локално ;има автоматично  end накрая 
    res.sendFile('./cat.jpg', { root: __dirname });//отваря в browser
    //res.attachment('./cat.jpg');//withhaout edn();

});
app.get('/cats/:catId', (req, res) => {
    console.log(req.params);
    res.send(`Individual Cat page on cat is catId: ${req.params.catId}`);
    //req.params.(catId)- трябва да се казва както е наречено след : (catId)
});

app.get('/dogs', (req, res) => {
    res.send('<h1>Dogs page</h1>')
});

app.get('/json', (req, res) => {
    res.json({ ok: true, message: 'Hello from JSON' })
})

app.get('/redirect', (req, res) => {
    res.redirect('/rediredtedddd');
})

app.get('/rediredtedddd', (req, res) => {
    res.send('This is rediredtedddd page :)')
})


app.get('*', (req, res) => {//Ако е GET заявка означава  *- всички пътища
    res.send(`404`)
});

app.listen(5000, () => console.log('Server is listening on port 5000...'));
