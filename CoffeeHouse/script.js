// 1) Načtení menu přes AJAX 

fetch("./data/menu.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Chyba při načítání menu.json");
        }
        return response.json();
    })
    .then(data => {
        const menuDiv = document.getElementById("menu-items");
        let html = "";

        // Kávy
        html += `<h3>Kávy</h3>`;
        data.coffee.forEach(item => {
            html += `<p><strong>${item.name}</strong> — ${item.price} Kč</p>`;
        });

        // Dezerty
        html += `<h3>Dezerty</h3>`;
        data.desserts.forEach(item => {
            html += `<p><strong>${item.name}</strong> — ${item.price} Kč</p>`;
        });

        menuDiv.innerHTML = html;
    })
    .catch(error => {
        document.getElementById("menu-items").innerHTML =
            "<p class='error'>Nepodařilo se načíst menu.</p>";
        console.error(error);
    });


// 2) Odeslání kontaktního formuláře přes AJAX

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const formData = new FormData(form);

    fetch("./backend/contact.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(text => {
        document.getElementById("formMessage").textContent = text;
        form.reset(); // vyčištění formuláře
    })
    .catch(() => {
        document.getElementById("formMessage").textContent =
            "Chyba při odesílání zprávy.";
    });
});


// 3) Smooth scroll pro navigaci 

document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});



// 4) Modal galerie

const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

// Najdi všechny obrázky v galerii
document.querySelectorAll(".gallery-grid img").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src; // nastaví obrázek
    });
});

// Klik na X zavře modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Klik mimo obrázek také zavře modal
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


