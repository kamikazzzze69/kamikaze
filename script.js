const ageGate = document.getElementById('ageGate');
const confirmAge = document.getElementById('confirmAge');
const leaveSite = document.getElementById('leaveSite');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

document.body.classList.add('locked');
confirmAge.addEventListener('click', () => {
  ageGate.classList.add('hidden');
  document.body.classList.remove('locked');
  sessionStorage.setItem('kamikazeAgeConfirmed', 'yes');
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('is-visible'), 120 + i * 120);
  });
});
if (sessionStorage.getItem('kamikazeAgeConfirmed') === 'yes') {
  ageGate.classList.add('hidden');
  document.body.classList.remove('locked');
}
leaveSite.addEventListener('click', () => {
  document.querySelector('.age-card').innerHTML = '<p class="eyebrow">KAMIKAZE</p><h2>THANK YOU.</h2><p>Silakan tutup tab ini jika kamu belum memenuhi batas usia yang berlaku.</p>';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13, rootMargin: '0px 0px -35px 0px' });
document.querySelectorAll('.reveal').forEach(el => {
  if (!el.closest('.hero')) revealObserver.observe(el);
  else if (ageGate.classList.contains('hidden')) el.classList.add('is-visible');
});

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => activeObserver.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent('Pesan untuk KAMIKAZE — ' + form.get('name'));
  const body = encodeURIComponent(`Nama: ${form.get('name')}\nEmail: ${form.get('email')}\n\nPesan:\n${form.get('message')}`);
  window.location.href = `mailto:hello@kamikaze.example?subject=${subject}&body=${body}`;
});
