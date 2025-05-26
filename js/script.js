document.addEventListener("DOMContentLoaded", () => {
  // Gestion du formulaire de contact
  const form = document.getElementById("contact-form");
  const messageDiv = document.getElementById("form-message");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const company = document.getElementById("company").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validation des champs
      if (!name || !company || !email || !message) {
        showMessage("Tous les champs sont obligatoires.", true);
        return;
      }

      // Validation de l'email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMessage("Veuillez entrer une adresse email valide.", true);
        return;
      }

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          showMessage("Merci pour votre message 💌 Je vous répondrai vite !");
          form.reset();
        } else {
          throw new Error("Erreur serveur");
        }
      } catch (error) {
        console.error("Erreur:", error);
        showMessage("Une erreur est survenue. Réessayez plus tard.", true);
      }
    });

    function showMessage(text, isError = false) {
      if (!messageDiv) return;

      messageDiv.textContent = text;
      messageDiv.className = "visible";
      messageDiv.style.backgroundColor = isError ? "#ffe6e6" : "#e6ffe6";
      messageDiv.style.color = isError ? "#a30000" : "#2e7d32";
      messageDiv.style.borderColor = isError ? "#a30000" : "#2e7d32";

      setTimeout(() => {
        messageDiv.className = "hidden";
      }, 5000);
    }
  }

  // Animation de texte
  function typeText(element, text, speed = 50, callback) {
    if (!element) return;

    let i = 0;
    element.textContent = "";

    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        callback?.();
      }
    }, speed);
  }

  // Gestion du loader et animation de la page d'accueil
  const loader = document.getElementById("loader");
  const h1 = document.getElementById("typed-title");
  const p = document.getElementById("typed-text");

  if (loader && h1 && p) {
    const h1Text = "Bienvenue sur mon portfolio🎊";
    const pText =
      "Passionné par le développement web, je conçois et construis des sites\nmodernes et performants, en mettant l'accent sur l'expérience\nutilisateur et l'innovation.";

    const navigationEntry = performance.getEntriesByType("navigation")[0];
    const isReload =
      navigationEntry?.type === "reload" || performance.navigation?.type === 1;

    if (isReload) {
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
          animateText();
        }, 500);
      }, 1500); // Réduit le temps d'affichage du loader
    } else {
      loader.style.display = "none";
      animateText();
    }

    function animateText() {
      h1.classList.add("typing");
      typeText(h1, h1Text, 60, () => {
        h1.classList.remove("typing");
        p.classList.add("typing");
        typeText(p, pText, 40, () => p.classList.remove("typing"));
      });
    }
  }

  // Animation du texte de contact
  const contactText = document.getElementById("animated-contact-text");
  if (contactText) {
    const phrases = [
      "Un projet en tête ? Parlons-en ! 💬",
      "Réponse rapide garantie 🚀",
    ];
    let index = 0;
    let char = 0;
    let reverse = false;

    function typeLoop() {
      const current = phrases[index];
      contactText.textContent = current.substring(0, char);

      if (!reverse && char < current.length) {
        char++;
      } else if (reverse && char > 0) {
        char--;
      } else {
        reverse = !reverse;
        if (!reverse) index = (index + 1) % phrases.length;
        setTimeout(typeLoop, 1200);
        return;
      }

      setTimeout(typeLoop, reverse ? 35 : 65);
    }
    typeLoop();
  }
});

// JavaScript optionnel pour un effet plus dynamique
document.querySelectorAll(".social-icon").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    icon.style.transform = "scale(1.2) translateY(-5px)";
  });

  icon.addEventListener("mouseleave", () => {
    icon.style.transform = "scale(1)";
  });
});

// Réduction du logo au scroll (mobile)
const logo = document.querySelector(".logo");

window.addEventListener("scroll", () => {
  if (window.innerWidth <= 768) {
    if (window.scrollY > 50) {
      logo.classList.add("shrink");
    } else {
      logo.classList.remove("shrink");
    }
  }
});
