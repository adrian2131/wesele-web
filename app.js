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

// ====== COVER SCROLL HINT ======
document.querySelectorAll("[data-scrollto]").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-scrollto");
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    });
});

// ====== SHOW TEXT FIELD ======
document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("special");
    const field = document.getElementById("specialField");

    if (!checkbox || !field) return;

    checkbox.addEventListener("change", () => {
        field.style.display = checkbox.checked ? "block" : "none";
    });
});

// ====== RSVP (WALIDACJA) ======
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("rsvpForm");
    const nameInput = document.getElementById("name");
    const status = document.getElementById("formStatus");
    const alcoholField = document.getElementById("alcoholField");
    const alcoholCheckboxes = Array.from(document.querySelectorAll('input[name="alcohol[]"]'));

    if (!form || !status || !nameInput) return;

    form.addEventListener("submit", (e) => {
        // reset komunikatu
        status.style.display = "none";
        status.textContent = "";

        // 0) WALIDACJA IMIENIA
        const nameValue = nameInput.value.trim();
        if (nameValue.length < 3) {
            e.preventDefault();
            status.style.display = "block";
            status.textContent = "Daj nam znać jak się nazywasz.";
            return;
        }

        // 1) WALIDACJA: minimum 1 checkbox z grupy alcohol[]
        const atLeastOne = alcoholCheckboxes.some(cb => cb.checked);
        if (!atLeastOne) {
            e.preventDefault();
            status.style.display = "block";
            status.textContent = "Wybierz przynajmniej jedną opcję w sekcji napojów.";
            alcoholField?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        // 2) TRYB DEMO (blokujemy wysyłkę, ale tylko gdy walidacja OK)
        e.preventDefault();
        status.style.display = "block";
        status.textContent =
            "Dziękujemy za twoją wiadomość!";
        form.reset();

        // po resecie ukryj pole special
        document.getElementById("specialField")?.style.setProperty("display", "none");
    });

    // Bonus: jeśli ktoś zaznaczy cokolwiek, chowamy komunikat błędu (dla alkoholu)
    alcoholCheckboxes.forEach(cb => {
        cb.addEventListener("change", () => {
            if (alcoholCheckboxes.some(x => x.checked)) {
                status.style.display = "none";
                status.textContent = "";
            }
        });
    });

    // Bonus 2: jak ktoś zacznie wpisywać imię, też chowamy komunikat
    nameInput.addEventListener("input", () => {
        if (nameInput.value.trim().length >= 3) {
            status.style.display = "none";
            status.textContent = "";
        }
    });
});
