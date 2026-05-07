const boutonsFiltre = Array.from(document.querySelectorAll(".filtre-zone"));
const lignesMachines = Array.from(document.querySelectorAll(".tableau-equipements tbody tr"));
const texteStatut = document.getElementById("statut-equipements");

const nomsZones = {
    toutes: "toutes les zones",
    cardio: "la zone cardio",
    musculation: "la zone musculation",
    libre: "la zone libre",
};

function mettreAJourEquipements(zone) {
    let nombreVisible = 0;

    lignesMachines.forEach((ligne) => {
        const correspond = zone === "toutes" || ligne.dataset.zone === zone;
        ligne.hidden = !correspond;

        if (correspond) {
            nombreVisible += 1;
        }
    });

    boutonsFiltre.forEach((bouton) => {
        bouton.classList.toggle("zone-active", bouton.dataset.zone === zone);
    });

    if (texteStatut) {
        texteStatut.textContent =
            "Affichage : " + nomsZones[zone] + " (" + nombreVisible + " machines)";
    }
}

boutonsFiltre.forEach((bouton) => {
    bouton.addEventListener("click", () => {
        mettreAJourEquipements(bouton.dataset.zone);
    });
});

mettreAJourEquipements("toutes");
