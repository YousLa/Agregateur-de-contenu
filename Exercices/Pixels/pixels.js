// Envoyer une requête de type GET à l'adresse : 
// https://www.lemonde.fr/pixels/rss_full.xml
// Pour obtenir une réponse XML

// Require font appel à des classes qui contiennent des méthodes/fonctions
let https = require('https');
// Port HTTP 80, HTTPS 443
let parseString = require('xml2js').parseString;
// Cela devient objet de type parseString

// On crée une variable de type objet qui va contenir 3 propriétés : host, port, path
let request = {
    // 1. Le nom de domaine
    "host": "www.lemonde.fr",
    // 2. Le port du protocole
    "port": 443,
    // 3. Le chemin vers la ressource
    "path": "/pixels/rss_full.xml"
};

// A partir de l'objet https envoyer la requête vers le server qui est défini dans l'objet request
// get => est une requête HTTP pour obtenir quelque chose 
https.get(request, receiveResponseCallback);
// Ici on utilise la fonction receiveResponseCallback car NodeJS fonctionne de manière asynchrone (la requête est lancée et il fait autre chose jusqu'au moment ou il à reçu une réponse), donc on lui demande d'appeller la fonction de "callback" au moment ou il reçoit la réponse

// On reçoit un objet response
function receiveResponseCallback(response) {
    console.log('Got response:' + response.statusCode);

    let rawData = "";
    response.on('data', (chunk) => { rawData += chunk; });
    response.on('end', function (chunk) {
        // console.log(rawData);

        // Article : 

        // On appelle une méthode dans laquelle on met en paramètres rawData et une fonction de callback 
        // Result => on obtient un objet JSON
        parseString(rawData, function (err, result) {
            console.log(result.rss.channel[0].item[0].title[0]);

            for (let i = 0; i < result.rss.channel[0].item.length; i++) {
                console.log(result.rss.channel[0].item[i].title[0]);

            }

        });
    });
};

// rawData => On reçoie une chaîne de caractère structurée en JSON

