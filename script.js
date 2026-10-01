const nav = document.querySelector('.navbar');
const menu = document.querySelector('.menu-toggle');

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('menu-open');
  menu.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('menu-open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const counters = document.querySelectorAll('[data-count]');
let counted = false;

const metricObserver = new IntersectionObserver((entries) => {
  if (!entries[0].isIntersecting || counted) return;
  counted = true;

  counters.forEach(counter => {
    const target = Number(counter.dataset.count);
    const duration = 1100;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}, { threshold: 0.4 });

const metrics = document.querySelector('.metrics');
if (metrics) metricObserver.observe(metrics);

const accessBtn = document.getElementById('accessBtn');
const terminal = document.getElementById('terminal');

accessBtn.addEventListener('click', () => {
  const lines = [
    'initializing secure channel...',
    'scanning biometric signature...',
    'identity verified.',
    'ACCESS REQUEST QUEUED // CX-01',
    '>> welcome to the next era.'
  ];

  terminal.innerHTML = '';
  let i = 0;

  const writeLine = () => {
    if (i >= lines.length) return;
    const line = document.createElement('div');
    line.innerHTML = `<span class="terminal-prompt">></span> ${lines[i]}`;
    terminal.appendChild(line);
    i++;
    setTimeout(writeLine, 420);
  };

  writeLine();
});

// Small parallax effect for the hero core.
const core = document.querySelector('.cyborg-core');
window.addEventListener('mousemove', (e) => {
  if (!core || window.innerWidth < 900) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  core.style.transform = `translate(${x}px, ${y}px)`;
});
