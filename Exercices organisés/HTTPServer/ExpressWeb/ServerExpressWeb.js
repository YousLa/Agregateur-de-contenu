// Simple serveur Web avec Express
const express = require('express');

const app = express();

app.use('/', express.static(__dirname + '/htdocs'));

app.listen(8080, function() {
    console.log('Listening on port 8080'); 
   });