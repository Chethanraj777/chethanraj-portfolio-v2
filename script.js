const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const backTop = document.getElementById('backTop');
const year = document.getElementById('year');
const typewriter = document.getElementById('typewriter');
const cursorGlow = document.getElementById('cursorGlow');

const roles = [
  'Full Stack Developer',
  'DevOps Engineer',
  'Project & Quality Manager',
  'Cloud Enthusiast',
  'Software Engineer'
];

let roleIndex = 0;
let charIndex = 0;
let typing = true;

function typeRole() {
  const current = roles[roleIndex];
  if (typing) {
    charIndex++;
    typewriter.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      typing = false;
      setTimeout(typeRole, 1200);
      return;
    }
  } else {
    charIndex--;
    typewriter.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, typing ? 80 : 45);
}

window.addEventListener('load', () => {
  loader.classList.add('hide');
  typeRole();
});

navToggle?.addEventListener('click', () => navMenu.classList.toggle('open'));

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  backTop.classList.toggle('show', window.scrollY > 600);
});

backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.reveal').forEach((el) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  observer.observe(el);
});

document.querySelectorAll('.counter-item').forEach((card) => {
  const countEl = card.querySelector('h3');
  const target = parseInt(countEl.dataset.count, 10);
  let started = false;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        started = true;
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 80));
        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          countEl.textContent = target === 100 ? `${count}%` : `${count}+`;
        }, 20);
      }
    });
  }, { threshold: 0.4 });

  obs.observe(card);
});

document.querySelectorAll('.skill-header').forEach((btn) => {
  btn.addEventListener('click', () => {
    const panel = btn.closest('.skill-panel');
    panel.classList.toggle('open');
  });
});

document.querySelectorAll('.ripple').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    btn.style.setProperty('--x', `${x}px`);
    btn.style.setProperty('--y', `${y}px`);
  });
});

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});

document.querySelectorAll('.project-card, .about-card, .tilt').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

document.querySelectorAll('.timeline-item').forEach((item) => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('active', entry.isIntersecting);
    });
  }, { threshold: 0.7 });
  obs.observe(item);
});
