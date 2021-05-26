const db = require('./init');

db.query(`INSERT INTO Users (username, password) Values ('test','[1,2,3]')`, () => console.log('Dev database seeded'));