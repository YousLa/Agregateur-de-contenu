const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.listen(8080, function() {
    console.log('Listening on port 8080'); 
   });

app.get('/', function(request, response) { 
    // Fusion du ejs avec mes data
    response.render('templateHello.ejs', { nom : "Rudi" });
});
