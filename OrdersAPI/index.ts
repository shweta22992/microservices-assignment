const express = require('express');

const app = express();

const orders = [
    {
        "orderId": 1,
        "orderAmount": 250,
        "orderDate": "14-Apr-2020"
      },
     {
        "orderId": 2,
        "orderAmount": 450,
        "orderDate": "15-Apr-2020"
      }
 
];

app.listen('8080', () => console.log('Orders API listening to port 8080'));

app.get('/', (req, res) => res.send('Orders API'));

app.get('/orders/:orderId', (req, res) => {
    res.send({'orders': orders});
});

