// Envoyer une requête de type GET à l'adresse :
// https://www.lemonde.fr/pixels/rss_full.xml
// Pour obtenir une réponse XML

let https = require('https');

let parseString = require('xml2js').parseString;

let request = {
    "host": "www.lemonde.fr",
    "port": 443,
    "path": "/pixels/rss_full.xml" 
    };

https.get(request, receiveResponseCallback);

// console.log("requête envoyée");

function receiveResponseCallback(response) { 
    // console.log('Got response:' + response.statusCode);
    let rawData = "";
    response.on('data', (chunk) => { rawData += chunk; }); 
    response.on('end', function() { 
        // console.log(rawData);
        parseString(rawData, function (err, result) {
            for(let i=0; i<result.rss.channel[0].item.length ; i++){
                console.log(result.rss.channel[0].item[i].title[0]);
                }
            });
        });
    }