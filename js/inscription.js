const parametresUrl = new URLSearchParams(window.location.search);
const formulaire = document.querySelector(".formulaire-inscription");
const champClub = document.getElementById("club");
const champAbonnement = document.getElementById("abonnement");
const messageFormulaire = document.getElementById("message-formulaire");
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

    champsObligatoires.forEach((champ) => {
        champ.addEventListener("input", () => {
            if (messageFormulaire) {
                messageFormulaire.textContent = "";
            }
        });
        champ.addEventListener("change", () => {
            if (messageFormulaire) {
                messageFormulaire.textContent = "";
            }
        });
    });

    formulaire.addEventListener("submit", (evenement) => {
        const champsVides = champsObligatoires.filter((champ) => champ.value.trim() === "");

        if (champsVides.length > 0) {
            evenement.preventDefault();

            if (messageFormulaire) {
                messageFormulaire.textContent = "Veuillez remplir les champs marques d'une *";
            }

            champsVides[0].focus();
            return;
        }

        if (messageFormulaire) {
            messageFormulaire.textContent = "";
        }
    });
}
