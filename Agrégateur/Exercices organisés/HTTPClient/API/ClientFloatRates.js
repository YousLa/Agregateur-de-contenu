// Envoyer une requête de type GET à l'adresse :
// https://www.floatrates.com:443/daily/usd.json
// Pour obtenir une réponse JSON

let https = require('https');

let request = {
    "host": "www.floatrates.com", // nom de domaine
    "port": 443,                    //port
    "path": "/daily/usd.json"    //chemin
    };

https.get(request, receiveResponseCallback);

function receiveResponseCallback(response) {
    // console.log('Got response:' + response.statusCode);
    let rawData = "";
    response.on('data', (chunk) => { rawData += chunk; }); 
    response.on('end', function() { 
        // console.log(rawData);
        let floatRates = JSON.parse(rawData);
        console.log("100 EUR = " + (floatRates.eur.inverseRate*100) + " USD");
        });
    }