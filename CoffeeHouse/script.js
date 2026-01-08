/* 1) Načtení menu */

const menuDiv = document.getElementById("menu-items");

function loadMenu() {
    fetch("./data/menu.json")
        .then(res => {
            if (!res.ok) throw new Error("Chyba při načítání menu.json");
            return res.json();
        })
        .then(data => renderMenu(data))
        .catch(() => menuDiv.innerHTML = "<p class='error'>Nepodařilo se načíst menu.</p>");
}

function renderMenu(data) {
    let html = `
        <h3>Kávy</h3>
        ${data.coffee.map(item => `<p><strong>${item.name}</strong> — ${item.price} Kč</p>`).join("")}

        <h3>Dezerty</h3>
        ${data.desserts.map(item => `<p><strong>${item.name}</strong> — ${item.price} Kč</p>`).join("")}
    `;

    menuDiv.style.opacity = "0";
    menuDiv.innerHTML = html;

    setTimeout(() => menuDiv.style.opacity = "1", 50);
}

loadMenu();

/*  2) AJAX kontakt form */

const form = document.getElementById("contactForm");
const msg = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("./backend/contact.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(text => {
        msg.textContent = text;
        msg.style.color = "#28a745";
        form.reset();
    })
    .catch(() => {
        msg.textContent = "Chyba při odesílání.";
        msg.style.color = "#d32f2f";
    });
});

/* 
   3) Smooth scroll */

document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
    });
});

/*  4) Modal galerie */

const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".gallery-grid img").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;
    });
});

closeBtn.addEventListener("click", () => modal.style.display = "none");

modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.style.display = "none";
});


document.querySelector("a[href='#home']").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});







