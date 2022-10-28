const Employess = require('../data/employees.json');

// () => {
//     console.log(employess);
// }

const getEmployees = () => {
    return Employess;
}

module.exports = {
    getEmployees 
};