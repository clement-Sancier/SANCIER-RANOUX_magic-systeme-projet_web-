console.log("Je suis la console !");

function quizAlert() {
    let club = document.getElementById("club").value;
    let nom = document.getElementById("nom").value;
    let email = document.getElementById("email").value;
    let telephone = document.getElementById("telephone").value;
    let statut = document.getElementById("abonnement").value;

    if (club === "" || prenom === "" || date === "" || email === "" || statut === "") {
        alert("Remplissez tout les champs");
        return;
    }
    alert("inscription réussite");
    quizConfirm();
}