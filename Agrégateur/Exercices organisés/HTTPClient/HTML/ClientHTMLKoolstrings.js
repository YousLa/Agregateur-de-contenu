// Envoyer une requête de type GET à l'adresse :
// https://www.koolstrings.net/agenda.php
// Pour obtenir une réponse HTML

let https = require('https');
const jsdom = require('jsdom');
const { JSDOM } = jsdom; 

let request = {
    "host": "www.koolstrings.net",
    "port": 443,
    "path": "/agenda.php" 
    };

https.get(request, receiveResponseCallback);

console.log("requête envoyée");

function receiveResponseCallback(response) { 
    console.log('Got response:' + response.statusCode);
    let rawData = "";
    response.on('data', (chunk) => { rawData += chunk; }); 
    response.on('end', function() { 
        //console.log(rawData);
        let counterFromGoodDate = 5;
        const dom = new JSDOM(rawData);
        dom.window.document.querySelectorAll('td').forEach(function(node) {
            counterFromGoodDate++;
            if(counterFromGoodDate==2) console.log(node.textContent);
            if(counterFromGoodDate==4) console.log(node.textContent)
            if(node.textContent=="24/11/2023"){
                counterFromGoodDate = 0;
            }
        });
    });
}