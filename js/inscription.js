const params = new URLSearchParams(window.location.search);
const clubInput = document.getElementById("club");
const abonnementInput = document.getElementById("abonnement");
const selectedClub = params.get("club");
const selectedAbonnement = params.get("abonnement");

if (clubInput && selectedClub) {
    clubInput.value = selectedClub;
}

if (abonnementInput && selectedAbonnement) {
    abonnementInput.value = selectedAbonnement;
}
