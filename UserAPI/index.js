const express = require('express');
const app = express();
var sql = require('mssql');

const sqlConfig = {
    user: 'sa',
    password: 'Nagarro3145363',
    server: '34.72.183.62',
    database: 'UserDB'
};

async function executeQuery(queryString) {
    var dbConn = new sql.ConnectionPool(sqlConfig);
    await dbConn.connect();
        const request = new sql.Request(dbConn);
        const result = await request.query(queryString);
        console.log(result)
        return result;
}


app.get('/', (req, res) => {
    res.send('Sample application for Kubernetes demo');
});

app.get('/user/:userId', async (req, res) => {
    try{
        const result = await executeQuery('SELECT * FROM USERS WHERE USERID = 1');
        res.send(result.recordset);
    } catch (err) {
        console.log(err);
        res.status(500).json('Server error');
    }
});

app.listen(8080, () => console.log('Listeniing on port 8080'));
