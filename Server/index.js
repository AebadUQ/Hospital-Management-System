const express = require('express') ;
const app  = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const main = require('./routes/main')

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(main);

app.listen(3001,()=>{
    console.log("hello");
})