// Envoyer une requête de type GET à l'adresse :
// http://api.irail.be/liveboard/?id=BE.NMBS.008812005&lang=fr&format=json
// Pour obtenir une réponse JSON

let http = require('http');

let request = {
    "host": "api.irail.be",
    "port": 80,
    "path": "/liveboard/?id=BE.NMBS.008812005&lang=fr&format=json" 
    };

http.get(request, receiveResponseCallback);

// console.log("requête envoyée");

function receiveResponseCallback(response) { 
    // console.log('Got response:' + response.statusCode);
    let rawData = "";
    response.on('data', (chunk) => { rawData += chunk; }); 
    response.on('end', function() { 
        // console.log(rawData); 
        let liveboardGareNord = JSON.parse(rawData);
        for(let i=0; i<liveboardGareNord.departures.departure.length; i++) {
            let heureDepartDuTrain = new Date(liveboardGareNord.departures.departure[i].time*1000)
            console.log(`${heureDepartDuTrain.getHours()}:${('0' + heureDepartDuTrain.getMinutes()).slice(-2)}`);
            console.log(liveboardGareNord.departures.departure[i].delay);
            console.log(liveboardGareNord.departures.departure[i].station);
            console.log(liveboardGareNord.departures.departure[i].canceled);
            }
        });
    }