require('dotenv').config()

const express = require('express')
const crypto = require('crypto')
const axios = require('axios')
const path = require('path');

const cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var sessionId ;
var phone;

const jwt = require('jsonwebtoken')
const port = 4000 || process.env.PORT;
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN
const cors = require('cors')
let refreshTokens = [];

const smsKey = process.env.FA_API_KEY

const app = express()
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname+ "/public")));
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())
app.use(cors({origin: 'http://localhost:5000', credentials:true}))
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//   routing here :-
const home          = require('./controller/routes/home');
const login         =  require('./controller/routes/login');
const verify        =  require('./controller/routes/verify');

app.use('/',home);
app.use('/login',login);
app.use('/verify', verify);

app.listen(port,()=>{
  console.log(`server is runing on port ${port}`)
})