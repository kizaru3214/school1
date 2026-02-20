const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 4321;
const subject = require("./db/subject");
const teacher = require("./db/teacher");
const suboffered = require("./db/suboffered");

const app = express();
app.use(express.urlencoded({'extended':false}));
app.use(express.json());

app.use('/subject', subject);
app.use('/teacher', teacher);
app.use('/edp', suboffered);

app.get("/",(req,res)=>{
    res.send("hello world");
});

const server = app.listen(port,()=>{
    require('dns').lookup(require('os').hostname(),(err,addr,fam)=>{
        console.log(`listening at http:\\${addr}:${port}`)
    });
});	