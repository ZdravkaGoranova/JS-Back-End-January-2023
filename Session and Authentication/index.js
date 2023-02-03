const express = require('express');

const cookieParser = require('cookie-parser');
const expressSessopn = require('express-session');

const jwt = require('jsonwebtoken');
const secret = 'myveryverysecretsecret'

const dataService = require('./dataService.js')
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(expressSessopn({
    secret: 'keyboard cat',//служи за криптиране
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }//
}));

app.get('/', (req, res) => {
    res.send(`<h1>Hello</h1>
    <p><a href='/login'>Login</a></p>
    <p><a href='/register'>Register</a></p>
    <p><a href='/profile'>Profile</a></p>
    <p><a href='/logout'>Logout</a></p>
    `)
});

app.get('/login', (req, res) => {
    res.send(`
    <h1>Sign In</h1>
<form method="POST">
    <label for="username"> Username</label>
    <input type="text" id="username" name="username" />

    <label for="password"> Password </label>
    <input type="text" id="password" name="password" />

    <input type="submit" value="login" />
</form>
`)
});

app.post('/login', async (req, res) => {

    const { username, password } = req.body

    try {
        const token = await dataService.loginUser(username, password);

        res.cookie('token', token, { httpOnly: true })

        // const authData = {
        //     username: user.username,
        // }
        // res.cookie('auth', JSON.stringify(authData))

        // req.session.username = user.username;
        // req.session.privateInfo = user.password;//user.password e hash

        return res.redirect('/')

    } catch (err) {
        console.log(err)
        res.status(401).end();
    }
});

app.get('/register', (req, res) => {

    res.send(`
    <h1>Sign Up</h1>
    <form method="POST">
        <label for="username"> Username</label>
        <input type="text" id="username" name="username" />
    
        <label for="password"> Password </label>
        <input type="text" id="password" name="password" />
    
        <input type="submit" value="register" />
    </form>
    `)
});

app.post('/register', async (req, res) => {

    const { username, password } = req.body;
    await dataService.registerUser(username, password)

    res.redirect('/login')
});

app.get("/profile", (req, res) => {

    //check if user is logged?
    const token = req.cookies['token'];

    if (!token) {
        return res.status(401).end();
    }
    try {
        const decodedTooken = jwt.verify(token, secret)

        // console.log(req.session);
        console.log(decodedTooken);

        res.send(`
            <h2>Hello - ${decodedTooken.username}</h2>`);

    } catch (err) {
        res.status(401).end();
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('auth')
    res.redirect('/')
})


app.listen(5000, () => console.log('Server is listening on port 5000....'))