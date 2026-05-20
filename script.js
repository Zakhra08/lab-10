function showPage(pageId) {
  const pages = {
    home: document.getElementById('page-home'),
    about: document.getElementById('page-about'),
  };
 
  Object.values(pages).forEach(p => { if (p) p.classList.remove('active'); });
  if (pages[pageId]) pages[pageId].classList.add('active');
 
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) link.classList.add('active');
  });
 
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('navLinks').classList.remove('open');
  setTimeout(triggerReveal, 100);
}
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      showPage(this.dataset.page);
    });
  });
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => navLinksContainer.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinksContainer.contains(e.target)) {
      navLinksContainer.classList.remove('open');
    }
  });
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let sliderInterval;
 
  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }
 
  function startAutoSlide() {
    sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }
  function resetAutoSlide() {
    clearInterval(sliderInterval);
    startAutoSlide();
  }
 
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoSlide(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goToSlide(i); resetAutoSlide(); }));
 
  if (slides.length > 0) {
    goToSlide(0);
    if (slides.length > 1) startAutoSlide();
  }
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(0,0,0,0.15)'
      : '0 1px 8px rgba(0,0,0,0.1)';
  });
  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();
 
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
 
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.4 });
 
  document.querySelectorAll('[data-target]').forEach(el => countObserver.observe(el));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
 
  function triggerReveal() {
    document.querySelectorAll(
      '.stat-card, .news-card, .value-card, .mv-card, .dean-card, .big-stat'
    ).forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        el.style.transitionDelay = (i % 4) * 0.08 + 's';
        revealObserver.observe(el);
      }
    });
  }
 
  triggerReveal();
  showPage('home');
 
});
