const parametresUrl = new URLSearchParams(window.location.search);
const formulaire = document.querySelector(".formulaire-inscription");
const champClub = document.getElementById("club");
const champAbonnement = document.getElementById("abonnement");
const messageFormulaire = document.getElementById("message-formulaire");
const boutonFermerMessage = document.getElementById("fermer-message-formulaire");
const clubChoisi = parametresUrl.get("club");
const abonnementChoisi = parametresUrl.get("abonnement");

if (champClub && clubChoisi) {
    champClub.value = clubChoisi;
}

if (champAbonnement && abonnementChoisi) {
    champAbonnement.value = abonnementChoisi;
}

if (formulaire) {
    const champsObligatoires = Array.from(formulaire.querySelectorAll("[required]"));

    function masquerMessage() {
        if (messageFormulaire) {
            messageFormulaire.hidden = true;
        }
    }

    champsObligatoires.forEach((champ) => {
        champ.addEventListener("input", () => {
            masquerMessage();
        });
        champ.addEventListener("change", () => {
            masquerMessage();
        });
    });

    formulaire.addEventListener("submit", (evenement) => {
        const champsVides = champsObligatoires.filter((champ) => champ.value.trim() === "");

        if (champsVides.length > 0) {
            evenement.preventDefault();

            if (messageFormulaire) {
                messageFormulaire.hidden = false;
            }

            champsVides[0].focus();
            return;
        }

        masquerMessage();
    });
}

if (boutonFermerMessage) {
    boutonFermerMessage.addEventListener("click", () => {
        if (messageFormulaire) {
            messageFormulaire.hidden = true;
        }
    });
}
