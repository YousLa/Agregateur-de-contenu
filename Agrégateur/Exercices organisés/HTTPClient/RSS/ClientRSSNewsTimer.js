let https = require('https');
let parseString = require('xml2js').parseString;

let dataToDisplay = new Object();
dataToDisplay.feedGeekWire = new Object();
dataToDisplay.feedGeekWire.item = [];

updateRSSGeekWire();

function updateRSSGeekWire() {
    // Envoyer une requête de type GET à l'adresse :
    // https://www.geekwire.com/feed/
    // Pour obtenir une réponse XML
    let request = {
        "host": "www.geekwire.com",
        "port": 443,
        "path": "/feed/"
        };
    https.get(request, receiveResponseCallback);
    setTimeout(updateRSSGeekWire, 10000);
    
    function receiveResponseCallback(response) { 
        // console.log('Got response:' + response.statusCode);
        let rawData = "";
        response.on('data', (chunk) => { rawData += chunk; }); 
        response.on('end', function() { 
            parseString(rawData, function (err, result) {
                for(let i=0; i<result.rss.channel[0].item.length ; i++){  // itérer les items
                    let item = {
                        "title": result.rss.channel[0].item[i].title[0],
                        "link" : result.rss.channel[0].item[i].link[0],
                        "pubDate": result.rss.channel[0].item[i].pubDate[0]
                    }
                    dataToDisplay.feedGeekWire.item.push(item);
                    }
                });
            });
        }
}