let champRecherche = document.getElementById("recherche-salle");
let cartesSalles = document.querySelectorAll(".carte-salle");
let texteResultat = document.getElementById("resultat-recherche");

function normaliserTexte(texte) {
    return (texte || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function rechercherSalles() {
    if (champRecherche === null || texteResultat === null) {
        return;
    }

    let recherche = normaliserTexte(champRecherche.value);
    let nombreSallesTrouvees = 0;

    for (let i = 0; i < cartesSalles.length; i++) {
        let texteSalle = normaliserTexte(cartesSalles[i].dataset.recherche);

        if (recherche === "" || texteSalle.includes(recherche)) {
            cartesSalles[i].hidden = false;
            nombreSallesTrouvees++;
        } else {
            cartesSalles[i].hidden = true;
        }
    }

    if (recherche === "") {
        texteResultat.textContent = nombreSallesTrouvees + " salles disponibles";
    } else if (nombreSallesTrouvees > 1) {
        texteResultat.textContent = nombreSallesTrouvees + " salles trouvees";
    } else if (nombreSallesTrouvees === 1) {
        texteResultat.textContent = "1 salle trouvee";
    } else {
        texteResultat.textContent = "0 salle trouvee";
    }
}

if (champRecherche !== null) {
    champRecherche.addEventListener("input", rechercherSalles);
}

rechercherSalles();
