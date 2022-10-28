const express = require("express");
const { getEmployees } = require('./services/index');

const app = express();

app.use(express.json());

app.get('/', (req, res)=> {
    // res.send('<h1>hello!</h1>');
    res.json({message: 'hello!'});
});

app.get('/api/employees', (req, res)=> {
    res.json(getEmployees());
});

app.listen(3001, ()=>{
    console.log('Ready!');
});