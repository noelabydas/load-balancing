const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs');

// Least Connections initial load
const lc_load = { server1: 0, server2: 0, server3: 0 };

const server = express();

const appLC1 = express();
const appLC2 = express();
const appLC3 = express();

//Set view engine
server.use(expressLayouts);
server.set('view engine', 'ejs');
appLC1.use(expressLayouts);
appLC1.set('view engine', 'ejs');
appLC2.use(expressLayouts);
appLC2.set('view engine', 'ejs');
appLC3.use(expressLayouts);
appLC3.set('view engine', 'ejs');

// Parse the request body as JSON
appLC1.use(express.static(__dirname + '/views'));
appLC2.use(express.static(__dirname + '/views'));
appLC3.use(express.static(__dirname + '/views'));


let logData = `$ node server-lc.js
Server running at 8081`;

appLC1.get('/my-request-lc', (req, res) => {
    lc_load.server1++;
    const myLog = `
Server 1 : ${req.method} ${req.url}`;
    console.log('Server 1 :', req.method, req.url);
    logData += myLog;
    res.render('least-connections', {
        logs: logData,
        load: lc_load
    });
});


appLC2.get('/my-request-lc', (req, res) => {
    lc_load.server2++;
    const myLog = `
Server 2 : ${req.method} ${req.url}`;
    console.log('Server 2 :', req.method, req.url);
    logData += myLog;
    res.render('least-connections', {
        logs: logData,
        load: lc_load
    });
});


appLC3.get('/my-request-lc', (req, res) => {
    lc_load.server3++;
    const myLog = `
Server 3 : ${req.method} ${req.url}`;
    console.log('Server 3 :', req.method, req.url);
    logData += myLog;
    res.render('least-connections', {
        logs: logData,
        load: lc_load
    });
});

appLC1.listen(4000);
appLC2.listen(4001);
appLC3.listen(4002);

const request = require('request');

const servers = ['http://localhost:4000', 'http://localhost:4001', 'http://localhost:4002'];

// Least Connections

const handlerserver = (req, res) => {
    const minLoad = Math.min(lc_load.server1, lc_load.server2, lc_load.server3);
    const possibleServers = [];
    if (minLoad === lc_load.server1) {
        possibleServers.push(0);
    }
    if (minLoad === lc_load.server2) {
        possibleServers.push(1);
    }
    if (minLoad === lc_load.server3) {
        possibleServers.push(2);
    }
    const serverChoice = Math.floor((Math.random() * 10) % possibleServers.length);
    req.pipe(request({ url: servers[possibleServers[serverChoice]] + req.url })).pipe(res);
};

server.use(express.static(__dirname + '/views'));

server.get('/', (req, res) => {
    res.render('least-connections', {
        logs: logData,
        load: lc_load
    });
});

server.get('/my-request-lc', (req, res) => {
    handlerserver(req, res);
});

server.listen(8081, () => {
    console.log(`Server running at ${8081}`);
});