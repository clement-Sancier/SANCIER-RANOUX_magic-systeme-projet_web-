console.log("Script inscription charge");

let parametresPage = new URLSearchParams(window.location.search);
let formulaire = document.querySelector(".formulaire-inscription");
let champClub = document.getElementById("club");
let champAbonnement = document.getElementById("abonnement");
let fenetreMessage = document.getElementById("alerte-formulaire");
let titreMessage = document.getElementById("titre-message-formulaire");
let texteMessage = document.getElementById("texte-message-formulaire");
let boutonFermer = document.getElementById("fermer-message-formulaire");

let clubChoisi = parametresPage.get("club");
let abonnementChoisi = parametresPage.get("abonnement");
let viderFormulaireApresMessage = false;

function corrigerNomAbonnement(abonnement) {
    if (abonnement === "Starter") {
        return "Essentiel";
    }

    if (abonnement === "Elite") {
        return "Premium";
    }

    return abonnement;
}

function remplirChampsDepuisLien() {
    if (champClub !== null && clubChoisi !== null) {
        champClub.value = clubChoisi;
    }

    if (champAbonnement !== null && abonnementChoisi !== null) {
        champAbonnement.value = corrigerNomAbonnement(abonnementChoisi);
    }
}

function afficherFenetre(titre, texte, texteBouton) {
    if (fenetreMessage === null) {
        return;
    }

    if (titreMessage !== null) {
        titreMessage.textContent = titre;
    }

    if (texteMessage !== null) {
        texteMessage.textContent = texte;
    }

    if (boutonFermer !== null) {
        boutonFermer.textContent = texteBouton;
    }

    fenetreMessage.hidden = false;
}

function fermerFenetre() {
    if (fenetreMessage === null) {
        return;
    }

    fenetreMessage.hidden = true;

    if (viderFormulaireApresMessage === true && formulaire !== null) {
        formulaire.reset();
        remplirChampsDepuisLien();
        viderFormulaireApresMessage = false;
    }
}

function formulaireEstComplet() {
    if (formulaire === null) {
        return false;
    }

    let champsObligatoires = formulaire.querySelectorAll("[required]");

    for (let i = 0; i < champsObligatoires.length; i++) {
        if (champsObligatoires[i].value.trim() === "") {
            return false;
        }
    }

    return true;
}

function envoyerFormulaire(evenement) {
    evenement.preventDefault();

    if (formulaireEstComplet() === false) {
        viderFormulaireApresMessage = false;
        afficherFenetre(
            "Formulaire incomplet",
            "Veuillez remplir les champs marques d'une *",
            "Fermer"
        );
        return;
    }

    viderFormulaireApresMessage = true;
    afficherFenetre(
        "Demande envoyee",
        "Votre demande a bien ete prise en compte. Nous vous recontacterons rapidement.",
        "OK"
    );
}

remplirChampsDepuisLien();

if (formulaire !== null) {
    formulaire.addEventListener("submit", envoyerFormulaire);
}

if (boutonFermer !== null) {
    boutonFermer.addEventListener("click", fermerFenetre);
}

if (fenetreMessage !== null) {
    fenetreMessage.addEventListener("click", function (evenement) {
        if (evenement.target === fenetreMessage) {
            fermerFenetre();
        }
    });
}

document.addEventListener("keydown", function (evenement) {
    if (evenement.key === "Escape") {
        fermerFenetre();
    }
});
