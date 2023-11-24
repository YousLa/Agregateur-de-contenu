// Créez une application qui utilise un timer et pour afficher, dans la console, un décompteur de 10 secondes (et s'arrête à zéro).
let compteur = 10;

let decompteurTimer = setInterval(decompte, 1000);

function decompte() {

    // if à une instruction
    if (compteur == 0) clearInterval(decompteurTimer);

    console.log(compteur);
    compteur--;

}