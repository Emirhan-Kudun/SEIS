/* ---- Custom Cursor ---- */
    (function() {
      var dot  = document.getElementById('cursor-dot');
      var ring = document.getElementById('cursor-ring');
      var mx = 0, my = 0, rx = 0, ry = 0;

      document.addEventListener('mousemove', function(e) {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
      });

      function animateRing() {
        rx += (mx - rx) * 0.14;
        ry += (my - ry) * 0.14;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(animateRing);
      }
      animateRing();
    })();

    /* ---- Navbar scroll ---- */
    (function() {
      var nav = document.getElementById('navbar');
      window.addEventListener('scroll', function() {
        if (window.scrollY > 60) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      });
    })();

    /* ---- Scroll Reveal ---- */
    (function() {
      var items = document.querySelectorAll('.reveal');
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      items.forEach(function(el) { observer.observe(el); });
    })();

    /* ---- Smooth anchor scroll ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });


    /* ---- Work filters + Behance lazy load ---- */
    (function() {
      var filterButtons = Array.prototype.slice.call(document.querySelectorAll('.work-filter'));
      var cards = Array.prototype.slice.call(document.querySelectorAll('#behance-grid .work-item'));
      var grid = document.getElementById('behance-grid');
      var emptyState = document.getElementById('work-empty-state');

      if (!filterButtons.length || !cards.length || !grid) {
        return;
      }

      function loadFrame(card) {
        var frame = card.querySelector('iframe[data-src]');
        if (frame && !frame.getAttribute('src')) {
          frame.setAttribute('src', frame.getAttribute('data-src'));
        }
      }

      function extractEmbedId(url) {
        var match = /project\/(\d+)/.exec(url || '');
        return match ? match[1] : '';
      }

      function createFutureCard(project) {
        var article = document.createElement('article');
        article.className = 'work-item reveal';
        article.setAttribute('data-category', 'photomanip');

        var embed = document.createElement('div');
        embed.className = 'work-embed';

        var frame = document.createElement('iframe');
        frame.setAttribute('data-src', 'https://www.behance.net/embed/project/' + project.embedId + '?ilo0=1');
        frame.setAttribute('loading', 'lazy');
        frame.setAttribute('allowfullscreen', '');
        frame.setAttribute('frameborder', '0');
        frame.setAttribute('allow', 'clipboard-write');
        frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        frame.setAttribute('title', project.title || 'Photomanipulation Project');

        embed.appendChild(frame);

        var info = document.createElement('div');
        info.className = 'work-info';

        var cat = document.createElement('p');
        cat.className = 'work-cat';
        cat.textContent = 'Fotomanipulasyon';

        var title = document.createElement('p');
        title.className = 'work-title-item';
        title.textContent = project.title || 'Photomanipulation';

        info.appendChild(cat);
        info.appendChild(title);

        article.appendChild(embed);
        article.appendChild(info);

        return article;
      }

      var observer = null;
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              loadFrame(entry.target);
              observer.unobserve(entry.target);
            }
          });
        }, { rootMargin: '220px 0px' });

        cards.forEach(function(card) { observer.observe(card); });
      }

      var seenEmbedIds = {};
      cards.forEach(function(card) {
        var frame = card.querySelector('iframe[data-src]');
        var id = extractEmbedId(frame ? frame.getAttribute('data-src') : '');
        if (id) {
          seenEmbedIds[id] = true;
        }
      });

      fetch('./behance-future.json')
        .then(function(response) {
          if (!response.ok) {
            throw new Error('registry missing');
          }
          return response.json();
        })
        .then(function(registry) {
          var list = (registry && registry.photomanipulation) || [];

          list.forEach(function(project) {
            if (!project || project.status !== 'published' || !project.embedId || seenEmbedIds[project.embedId]) {
              return;
            }

            var card = createFutureCard(project);
            grid.appendChild(card);
            cards.push(card);
            seenEmbedIds[project.embedId] = true;

            if (observer) {
              observer.observe(card);
            }
          });
        })
        .catch(function() {
          /* no-op: local file mode may block fetch */
        });

      function applyFilter(filter) {
        var visibleCount = 0;

        cards.forEach(function(card) {
          var show = filter === 'all' || card.getAttribute('data-category') === filter;
          card.classList.toggle('is-hidden', !show);

          if (show) {
            visibleCount += 1;
            loadFrame(card);
          }
        });

        if (emptyState) {
          emptyState.classList.toggle('is-visible', visibleCount === 0);
        }
      }

      filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
          var filter = button.getAttribute('data-filter');

          filterButtons.forEach(function(node) {
            var active = node === button;
            node.classList.toggle('active', active);
            node.setAttribute('aria-selected', active ? 'true' : 'false');
          });

          applyFilter(filter);
        });
      });

      applyFilter('all');
    })();
