const searchInput = document.getElementById("recherche-salle");
const cards = Array.from(document.querySelectorAll(".club-item"));
const resultText = document.getElementById("resultat-recherche");
const noResult = document.getElementById("aucun-resultat");

function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function updateResults() {
    const query = normalizeText(searchInput.value);
    let visibleCount = 0;

    cards.forEach((card) => {
        const searchText = normalizeText(card.dataset.search || "");
        const matches = query === "" || searchText.includes(query);

        card.hidden = !matches;

        if (matches) {
            visibleCount += 1;
        }
    });

    resultText.textContent =
        visibleCount > 1
            ? visibleCount + " clubs disponibles"
            : visibleCount === 1
                ? "1 club disponible"
                : "0 club disponible";

    noResult.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", updateResults);
updateResults();
