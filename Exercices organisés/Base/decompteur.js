let compteur = 10;

let decompteurTimer = setInterval(decompte, 1000);

function decompte() {
    console.log(compteur);
    if(compteur==0) clearInterval(decompteurTimer);
    compteur--;
}

// https://www.w3schools.com/jsref/met_win_setinterval.asp