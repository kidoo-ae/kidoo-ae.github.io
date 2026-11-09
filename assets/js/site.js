(function () {
  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-btn');
  var mobile = document.querySelector('.mobile-panel');
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galItems = document.querySelectorAll('.gal-item');
  var lightbox = document.getElementById('lightbox');
  var lbImg = lightbox ? lightbox.querySelector('img') : null;
  var lbCap = lightbox ? lightbox.querySelector('.lb-cap') : null;
  var lbClose = lightbox ? lightbox.querySelector('.lb-close') : null;

  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (menuBtn && mobile) {
    menuBtn.addEventListener('click', function () {
      mobile.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', mobile.classList.contains('open') ? 'true' : 'false');
    });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobile.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      galItems.forEach(function (item) {
        var cats = (item.getAttribute('data-cat') || '').split(/\s+/);
        var show = f === 'all' || cats.indexOf(f) !== -1;
        item.classList.toggle('hidden', !show);
      });
    });
  });

  function openLb(src, cap) {
    if (!lightbox || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = cap || '';
    if (lbCap) lbCap.textContent = cap || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  galItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      if (!img) return;
      var full = item.getAttribute('data-full') || img.src;
      var cap = item.getAttribute('data-cap') || img.alt || '';
      openLb(full, cap);
    });
  });
  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLb();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLb();
  });

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
})();
