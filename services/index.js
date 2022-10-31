const Employees = require('../data/employees.json');

const getEmployees = () => {
    return Employees;
}

const getEmployeesPaginated = (page) => { 
    const intoPage = parseInt(page);
    const limit = 2;

    const startIndex = (intoPage - 1)*limit;
    const endIndex = intoPage*limit;
    const results = {};

    if ( endIndex < Employees.length ) {
        results.next = {
            intoPage: intoPage + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.previous = {
            intoPage: intoPage - 1,
            limit: limit
        }
    }

    results.results = Employees.slice(startIndex, endIndex);
    return results;
}

const getEmployeesOldest = () => {
    const age = Employees.map( data => data.age );
    const maxAge = Math.max(...age);
    const oldest = Employees.find( data => data.age === maxAge );
    return oldest;
}

const getEmployeesPrivileges = (privileges) => {
    const valor = privileges === 'true' ? 'user' : 'admin';
    const results = Employees.filter( data => data.privileges === valor);
    return results;
}

const postEmployees = (body) => {    
    const keys = Object.keys(Employees[0]);
    const receiveKeys = Object.keys(body);
    // console.log()
    if (keys.length === receiveKeys.length && keys.every(value => ~receiveKeys.indexOf(value))) {
        Employees.push(body);
        return Employees;
    } else { 
        return {"code": "bad_request"};
    }
}

const getEmployeesBadges = (badge) => {
    const data = Employees.filter(data => data.badges.includes(badge));
    return data;
}

const getEmployeesByName = (name) => {
    const data = Employees.filter(data => data.name === name);
    if ( data.length > 0 ) {
        return data;
    } else { 
        return {"code": "bad_request"};
    }
}

module.exports = {
    getEmployees,
    getEmployeesPaginated,
    getEmployeesOldest,
    getEmployeesPrivileges,
    postEmployees,
    getEmployeesBadges,
    getEmployeesByName
};