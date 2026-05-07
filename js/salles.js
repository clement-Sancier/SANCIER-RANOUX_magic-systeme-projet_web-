const champRecherche = document.getElementById("recherche-salle");
const boutonRecherche = document.getElementById("bouton-recherche");
const cartesSalles = Array.from(document.querySelectorAll(".carte-salle"));
const texteResultat = document.getElementById("resultat-recherche");
const texteAucunResultat = document.getElementById("aucun-resultat");

function normaliserTexte(texte) {
    return texte
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function mettreAJourResultats() {
    const recherche = normaliserTexte(champRecherche.value);
    let nombreVisible = 0;

    cartesSalles.forEach((carte) => {
        const texteRecherche = normaliserTexte(carte.dataset.recherche || "");
        const correspond = recherche === "" || texteRecherche.includes(recherche);

        carte.hidden = !correspond;

        if (correspond) {
            nombreVisible += 1;
        }
    });

    texteResultat.textContent =
        nombreVisible > 1
            ? nombreVisible + " clubs disponibles"
            : nombreVisible === 1
                ? "1 club disponible"
                : "0 club disponible";

    texteAucunResultat.hidden = nombreVisible !== 0;
}

champRecherche.addEventListener("input", mettreAJourResultats);

if (boutonRecherche) {
    boutonRecherche.addEventListener("click", mettreAJourResultats);
}

mettreAJourResultats();
