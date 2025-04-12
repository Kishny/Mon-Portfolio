document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Empêche le rechargement de la page

      const name = document.getElementById("name").value.trim();
      const company = document.getElementById("company").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Vérification des champs vides
      if (!name || !company || !email || !message) {
        alert("Tous les champs sont obligatoires.");
        return;
      }

      // Validation simple de l'email
      if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Veuillez entrer une adresse email valide.");
        return;
      }

      // Crée l'objet à envoyer
      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          alert("Votre message a été envoyé avec succès !");
          form.reset(); // Réinitialise le formulaire après envoi
        } else {
          alert("Une erreur est survenue, veuillez réessayer.");
        }
      } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur est survenue, veuillez vérifier votre connexion.");
      }
    });
  }
});
