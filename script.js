// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

// Date du jour au format AAAA-MM-JJ (heure locale)
const d = new Date();
const today = [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');

// Calendrier : griser les rendez-vous passés, signaler le prochain
let nextMarked = false;
document.querySelectorAll('tr[data-date]').forEach((row) => {
  if (row.dataset.date < today) {
    row.classList.add('past');
  } else if (!nextMarked) {
    row.classList.add('next');
    nextMarked = true;
  }
});

// Accueil : bandeau « Prochain rendez-vous »
const band = document.getElementById('next-band');
if (band && window.OA_EVENTS) {
  const next = window.OA_EVENTS.find((e) => e.date >= today);
  if (next) {
    const label = next.date === today ? "Aujourd'hui" : next.label;
    document.getElementById('next-text').textContent = `${label} — ${next.what} (${next.where})`;
    band.hidden = false;
  }
}
