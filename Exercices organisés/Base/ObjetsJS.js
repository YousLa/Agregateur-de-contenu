let maVoiture = new Object();
maVoiture.fabricant = "Ford";
maVoiture.modele = "Mustang";
maVoiture.annee = 1969;

let taVoiture = {
    fabricant: 'Fiat',
    modele: '500',
    annee: 2022
  };

function Voiture(_fabricant, _modele, _annee) {
  this.fabricant = _fabricant;
  this.modele = _modele;
  this.annee = _annee;
}

let saVoiture = new Voiture("Mazda", "Miata", 1993);


console.log(maVoiture.fabricant);
console.log(taVoiture['annee']);
console.log(saVoiture);

// https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Working_with_Objects