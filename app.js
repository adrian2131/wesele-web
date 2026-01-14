// ====== USTAWIENIA ======
const weddingDate = new Date(2026, 7, 15, 14, 0, 0); // 15 sierpnia 2026, 14:00 (PL lokalnie)

// ====== COUNTDOWN ======
const elDays = document.getElementById("cdDays");
const elHours = document.getElementById("cdHours");
const elMins = document.getElementById("cdMins");
const elSecs = document.getElementById("cdSecs");

function tick() {
    const now = new Date();
    const diff = weddingDate.getTime() - now.getTime();

    if (diff <= 0) {
        elDays.textContent = "0";
        elHours.textContent = "00";
        elMins.textContent = "00";
        elSecs.textContent = "00";
        return;
    }

    const sec = Math.floor(diff / 1000);
    const days = Math.floor(sec / (3600 * 24));
    const hours = Math.floor((sec % (3600 * 24)) / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;

    elDays.textContent = String(days);
    elHours.textContent = String(hours).padStart(2, "0");
    elMins.textContent = String(mins).padStart(2, "0");
    elSecs.textContent = String(secs).padStart(2, "0");
}
tick();
setInterval(tick, 1000);

// ====== HERO SCROLL HINT ======
document.querySelectorAll("[data-scrollto]").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-scrollto");
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    });
});

// ====== RSVP (DEMO) ======
const form = document.getElementById("rsvpForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.style.display = "block";
    status.textContent = "Dziękujemy! Formularz działa w trybie testowym. Podłączymy wysyłkę (e-mail/Sheets) w kolejnym kroku.";
    form.reset();
});
