// Envoyer une requête de type GET à l'adresse :
// https://www.geekwire.com/feed/
// Pour obtenir une réponse XML
// RSS est un élément

let https = require('https');

let parseString = require('xml2js').parseString;


updateRSSGeekWire();

// console.log("requête envoyée");



function receiveResponseCallback(response) {
    // console.log('Got response:' + response.statusCode);
    let rawData = "";
    response.on('data', (chunk) => { rawData += chunk; });
    response.on('end', function () {
        // console.log(rawData);
        response.on('end', function () {
            parseString(rawData, function (err, result) {
                for (let i = 0; i < result.rss.channel[0].item.length; i++) {
                    for (let j = 0; j < result.rss.channel[0].item[i].category.length; j++) {
                        if (result.rss.channel[0].item[i].category[j] == 'AI') {
                            console.log(result.rss.channel[0].item[i].title[0]);
                        }
                    }
                }
            });
        });
    });
}


function updateRSSGeekWire() {
    let request = {
        "host": "www.geekwire.com",
        "port": 443,
        "path": "/feed/"
    };


    https.get(request, receiveResponseCallback);
    setTimeout(updateRSSGeekWire, 10000);
}