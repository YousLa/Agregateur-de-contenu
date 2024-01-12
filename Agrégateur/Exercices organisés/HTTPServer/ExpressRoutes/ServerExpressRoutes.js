const express = require('express');

const app = express();

app.listen(8080, function() {
    console.log('Listening on port 8080'); 
   });

app.get('/', function(request, response) { 
    response.send("Hello Express");
});

app.get('/time', function(request, response) {
    let now = new Date();
    response.send("Il est " + now);
});