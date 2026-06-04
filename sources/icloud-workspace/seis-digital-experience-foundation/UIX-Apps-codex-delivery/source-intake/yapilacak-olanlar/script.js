/* ================================================
   Emirhan Kudun Portfolio — script.js
   Dreamweaver CS6 / CC Compatible
================================================ */

(function () {
  'use strict';

  /* ================================================
     1. CUSTOM CURSOR
  ================================================ */
  var dot  = document.getElementById('cursor-dot');
  var ring = document.getElementById('cursor-ring');
  var mouseX = 0, mouseY = 0;
  var ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  /* ================================================
     2. NAVBAR — scroll sticky effect
  ================================================ */
  var navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ================================================
     3. SCROLL REVEAL (IntersectionObserver)
  ================================================ */
  var revealEls = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ================================================
     4. SMOOTH ANCHOR SCROLL
  ================================================ */
  var anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      var target   = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset    = 80;
        var targetTop = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  /* ================================================
     5. ACTIVE NAV LINK on scroll
  ================================================ */
  var sections  = document.querySelectorAll('section[id], div[id]');
  var navLinks  = document.querySelectorAll('.nav-links a');

  function setActiveNav() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      if (!section.id) return;
      var top    = section.offsetTop;
      var bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);

  /* ================================================
     6. WORK CARDS — tilt effect on hover
  ================================================ */
  var workItems = document.querySelectorAll('.work-item');

  workItems.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect   = card.getBoundingClientRect();
      var x      = e.clientX - rect.left;
      var y      = e.clientY - rect.top;
      var centerX = rect.width  / 2;
      var centerY = rect.height / 2;
      var rotateX = ((y - centerY) / centerY) * -4;
      var rotateY = ((x - centerX) / centerX) *  4;
      card.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    });

    card.addEventListener('mouseenter', function () {
      card.style.transition = 'transform 0.1s ease';
    });
  });

  /* ================================================
     7. SERVICE CARDS — magnetic button effect
  ================================================ */
  var serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect    = card.getBoundingClientRect();
      var x       = e.clientX - rect.left - rect.width  / 2;
      var y       = e.clientY - rect.top  - rect.height / 2;
      var moveX   = x * 0.04;
      var moveY   = y * 0.04;
      card.style.transform = 'translateX(' + moveX + 'px) translateY(' + (moveY - 6) + 'px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  /* ================================================
     8. MARQUEE — pause on hover
  ================================================ */
  var marqueeTrack = document.querySelector('.marquee-track');

  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', function () {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.addEventListener('mouseleave', function () {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  /* ================================================
     9. SCROLL PROGRESS BAR (top of page)
  ================================================ */
  var progressBar = document.createElement('div');
  progressBar.id  = 'scroll-progress';
  progressBar.style.cssText =
    'position:fixed;top:0;left:0;height:2px;background:#c8a96e;' +
    'z-index:9999;transition:width 0.1s linear;width:0%;pointer-events:none;';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function () {
    var scrollTop  = window.scrollY;
    var docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    var progress   = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });

  /* ================================================
     10. STAT COUNTER ANIMATION
  ================================================ */
  var statNums = document.querySelectorAll('.stat-num');

  function animateCounter(el) {
    var text   = el.textContent;
    var suffix = el.querySelector('span') ? el.querySelector('span').textContent : '';
    var target = parseInt(text, 10);
    var start  = 0;
    var duration = 1800;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      var current  = Math.floor(eased * target);
      el.textContent = current;
      if (suffix) {
        var span = document.createElement('span');
        span.textContent = suffix;
        el.appendChild(span);
      }
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(function (el) {
    statsObserver.observe(el);
  });

  /* ================================================
     11. PAGE LOAD FADE-IN
  ================================================ */
  window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(function () {
      document.body.style.opacity = '1';
    }, 50);
  });

})();
