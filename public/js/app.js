// mdothree-landing — app.js

// ---- Dark Mode ----
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* storage unavailable */ }
}

let savedTheme = null;
try { savedTheme = localStorage.getItem('theme'); } catch { /* private browsing */ }
if (savedTheme) {
  applyTheme(savedTheme === 'dark');
} else {
  applyTheme(prefersDark.matches);
}

themeToggle?.addEventListener('click', () => {
  applyTheme(!document.body.classList.contains('dark'));
});

// ---- Tool Search ----
const searchInput = document.getElementById('toolSearch');
const toolCards = document.querySelectorAll('.tool-card');

searchInput?.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase().trim();
  toolCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.classList.toggle('hidden', q.length > 0 && !text.includes(q));
  });

  // Hide empty category sections
  document.querySelectorAll('.tool-category').forEach(section => {
    const visible = [...section.querySelectorAll('.tool-card')].some(c => !c.classList.contains('hidden'));
    section.style.display = visible ? '' : 'none';
  });
});
