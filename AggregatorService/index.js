const express = require('express');
const http = require('http');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const  request = require('request');


const app = express();

app.listen('8080', () => console.log('Aggregator API listening to port 3000'));

app.get('/', (req, res) => res.send('Aggregator Service.'));

async function get(url) {
    return new Promise((resolve, reject) => {
        request.get(url, (error, response, body) => {
          try{
            if(error) {
              reject(error);
            } else {
            let json = JSON.parse(body);
            console.log(json);
            resolve(json);
            }
          } catch(err) {
            console.log(err);
            reject(err);
          }
        
      });
    });

}

const usersUrl = 'http://userservice.default.svc.cluster.local:8080/user/1';
const ordersUrl = 'http://orderservice.default.svc.cluster.local:8080/orders/1';

app.get('/orderdetails/:orderDetailId', async (req, res) => {
    try {
      const [result1, result2] = await Promise.all([ get(usersUrl), get(ordersUrl)]);
      if(result1 && result2) {
        res.send({'userDetails': result1[0], 'orders': result2.orders });
      } 
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    } 
    
});