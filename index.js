const express = require("express");
const { getEmployees, getEmployeesPaginated, getEmployeesOldest, getEmployeesPrivileges, postEmployees, getEmployeesBadges, getEmployeesByName } = require('./services/index');

const app = express();

app.use(express.json());

app.get('/', (req, res)=> {
    res.json({message: 'hello!'});
});

app.get('/api/employees', (req, res)=> {
    if(req.query.page){
        // http://localhost:8000/api/employees?page=1
        // http://localhost:8000/api/employees?page=2
        // http://localhost:8000/api/employees?page=N
        res.json(getEmployeesPaginated(req.query.page));
    } else if(req.query.user) {
        // http://localhost:8000/api/employees?user=true
        res.json(getEmployeesPrivileges(req.query.user));
    } else if(req.query.badges) {
        // http://localhost:8000/api/employees?badges=black
        res.json(getEmployeesBadges(req.query.badges));
    } else {
        // http://localhost:8000/api/employees
        res.json(getEmployees());
    }
});

// http://localhost:8000/api/employees/oldest
app.get('/api/employees/oldest', (req, res)=> {
    res.json(getEmployeesOldest());
});

// http://localhost:8000/api/employees
app.post('/api/employees', (req, res)=> {
    if(postEmployees(req.body).code){
        res.status(400).json(postEmployees(req.body));
    }
    res.json(postEmployees(req.body));
});

// http://localhost:8000/api/employees/Bob
app.get('/api/employees/:name', (req, res)=> {
    if(getEmployeesByName(req.params.name).code){
        res.status(404).json(getEmployeesByName(req.params.name));
    }
    res.json(getEmployeesByName(req.params.name));
});

app.listen(8000, ()=>{
    console.log('Ready!');
});