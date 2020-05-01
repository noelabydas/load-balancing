const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs');

// Round Robin initial load
const rr_load = { server1: 0, server2: 0, server3: 0 };

const server = express();

const appRR1 = express();
const appRR2 = express();
const appRR3 = express();

//Set view engine
server.use(expressLayouts);
server.set('view engine', 'ejs');
appRR1.use(expressLayouts);
appRR1.set('view engine', 'ejs');
appRR2.use(expressLayouts);
appRR2.set('view engine', 'ejs');
appRR3.use(expressLayouts);
appRR3.set('view engine', 'ejs');

// Parse the request body as JSON
appRR1.use(express.static(__dirname + '/views'));
appRR2.use(express.static(__dirname + '/views'));
appRR3.use(express.static(__dirname + '/views'));


let logData = `$ node server-rr.js
Server running at 8080`;

appRR1.get('/my-request-rr', (req, res) => {
    rr_load.server1++;
    const myLog = `
Server 1 : ${req.method} ${req.url}`;
    console.log('Server 1 :', req.method, req.url);
    logData += myLog;
    res.render('round-robin', {
        logs: logData,
        load: rr_load
    });
});


appRR2.get('/my-request-rr', (req, res) => {
    rr_load.server2++;
    const myLog = `
Server 2 : ${req.method} ${req.url}`;
    console.log('Server 2 :', req.method, req.url);
    logData += myLog;
    res.render('round-robin', {
        logs: logData,
        load: rr_load
    });
});


appRR3.get('/my-request-rr', (req, res) => {
    rr_load.server3++;
    const myLog = `
Server 3 : ${req.method} ${req.url}`;
    console.log('Server 3 :', req.method, req.url);
    logData += myLog;
    res.render('round-robin', {
        logs: logData,
        load: rr_load
    });
});

appRR1.listen(3000);
appRR2.listen(3001);
appRR3.listen(3002);

const request = require('request');

const servers = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'];
let cur = 0;

// Round Robin

const handlerserver = (req, res) => {
    req.pipe(request({ url: servers[cur] + req.url })).pipe(res);
    cur = (cur + 1) % servers.length;
};

server.use(express.static(__dirname + '/views'));

server.get('/', (req, res) => {
    res.render('round-robin', {
        logs: logData,
        load: rr_load
    });
});

server.get('/my-request-rr', (req, res) => {
    handlerserver(req, res);
});

server.listen(8080, () => {
    console.log(`Server running at ${8080}`);
});