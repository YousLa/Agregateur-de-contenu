// Envoyer une requête de type GET à l'adresse :
// https://api.open-meteo.com/v1/forecast?latitude=50.85&longitude=4.37&hourly=temperature_2m
// Pour obtenir une réponse JSON
let https = require('https');

let request = {
    "host": "api.open-meteo.com",
    "port": 443,
    "path": "/v1/forecast?latitude=50.85&longitude=4.37&hourly=temperature_2m" 
    };

https.get(request, receiveResponseCallback);

// console.log("requête envoyée");

function receiveResponseCallback(response) { 
    // console.log('Got response:' + response.statusCode);
    let rawData = "";
    response.on('data', (chunk) => { rawData += chunk; }); 
    response.on('end', function() { 
        // console.log(rawData); 
        let weather = JSON.parse(rawData);
        console.log(weather.hourly.temperature_2m[12])
        });
    }