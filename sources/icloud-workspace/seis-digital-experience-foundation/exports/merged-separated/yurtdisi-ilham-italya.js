(function() {
  var fallbackData = {
    categories: [
      { id: 'muze', label: 'Muze' },
      { id: 'resim-sergisi', label: 'Resim Sergisi' },
      { id: 'fotograf-sergisi', label: 'Fotografcilik Sergisi' }
    ],
    items: [
      { category: 'muze', title: 'Italy Museum Reference 01', src: './assets/italy-inspiration/6d706aa0-4f30-4775-8df6-3028265385f3.JPG', alt: 'Italya muzesi ilham fotografi' },
      { category: 'muze', title: 'Italy Museum Reference 02', src: './assets/italy-inspiration/c2797675-8394-4043-b970-b0808df1d145.JPG', alt: 'Italya muze mimari ilham fotografi' },
      { category: 'muze', title: 'Italy Museum Reference 03', src: './assets/italy-inspiration/2E19F84A-C927-4FAB-B6DD-657FE4D0AEF4.JPG', alt: 'Italya galerisi gezi referansi' },
      { category: 'muze', title: 'Italy Museum Reference 04', src: './assets/italy-inspiration/12d13d73-235b-4129-b795-ff168e717a2a.JPG', alt: 'Italya kultur mekani fotografi' },
      { category: 'resim-sergisi', title: 'Italy Painting Expo 01', src: './assets/italy-inspiration/19bf2938-18f6-4e24-a67f-e045e9acd245.JPG', alt: 'Italya resim sergisi ilham gorseli' },
      { category: 'resim-sergisi', title: 'Italy Painting Expo 02', src: './assets/italy-inspiration/6ae99fbc-3a8a-49c9-9834-87c8ed27f9a5.JPG', alt: 'Italya sanat sergisi referans gorsel' },
      { category: 'resim-sergisi', title: 'Italy Painting Expo 03', src: './assets/italy-inspiration/744b91c8-affc-4677-b25e-61e7f538ee97.JPG', alt: 'Italya sanat mekanlari ilham karesi' },
      { category: 'resim-sergisi', title: 'Italy Painting Expo 04', src: './assets/italy-inspiration/808c7c8c-3eb4-4b7b-bb0b-509447d71d58.JPG', alt: 'Italya sergi atmosferi fotografi' },
      { category: 'fotograf-sergisi', title: 'Italy Photo Expo 01', src: './assets/italy-inspiration/218cca77-5d5d-465a-84ae-4438209d5dfa.JPG', alt: 'Italya fotografcilik sergisi ilhami' },
      { category: 'fotograf-sergisi', title: 'Italy Photo Expo 02', src: './assets/italy-inspiration/2341fe76-d5db-49b8-b040-72fd8b083f97.JPG', alt: 'Italya sokak fotografi sergi referansi' },
      { category: 'fotograf-sergisi', title: 'Italy Photo Expo 03', src: './assets/italy-inspiration/7358a3cd-97ab-4c66-a88c-4e4bc3c3957a.JPG', alt: 'Italya gezi fotografi sergisi gorseli' },
      { category: 'fotograf-sergisi', title: 'Italy Photo Expo 04', src: './assets/italy-inspiration/b47e75cb-d7ea-4d27-9ee5-1d2226e5147e.JPG', alt: 'Italya fotograf seckisi ilham karesi' }
    ]
  };

  var filterButtons = Array.prototype.slice.call(document.querySelectorAll('.inspiration-filter'));
  var grid = document.getElementById('italy-grid');
  var emptyState = document.getElementById('italy-empty-state');

  if (!grid || !filterButtons.length) {
    return;
  }

  function loadData() {
    return fetch('./yurtdisi-ilham-italya.json')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('JSON load failed');
        }
        return response.json();
      })
      .catch(function() {
        return fallbackData;
      });
  }

  function buildCategoryMap(categories) {
    return categories.reduce(function(map, category) {
      map[category.id] = category.label;
      return map;
    }, {});
  }

  function renderItems(items, categoryMap, activeFilter) {
    var filtered = items.filter(function(item) {
      return activeFilter === 'all' || item.category === activeFilter;
    });

    grid.innerHTML = '';

    filtered.forEach(function(item) {
      var card = document.createElement('article');
      card.className = 'inspiration-card';

      var img = document.createElement('img');
      img.className = 'inspiration-image';
      img.src = item.src;
      img.alt = item.alt;
      img.loading = 'lazy';

      var meta = document.createElement('div');
      meta.className = 'inspiration-meta';

      var cat = document.createElement('p');
      cat.className = 'inspiration-cat';
      cat.textContent = categoryMap[item.category] || item.category;

      var title = document.createElement('p');
      title.className = 'inspiration-name';
      title.textContent = item.title;

      meta.appendChild(cat);
      meta.appendChild(title);
      card.appendChild(img);
      card.appendChild(meta);
      grid.appendChild(card);
    });

    emptyState.classList.toggle('is-visible', filtered.length === 0);
  }

  loadData().then(function(data) {
    var categoryMap = buildCategoryMap(data.categories || fallbackData.categories);
    var items = data.items || fallbackData.items;
    var activeFilter = 'all';

    function applyFilter(filter) {
      activeFilter = filter;
      renderItems(items, categoryMap, activeFilter);
    }

    filterButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        var filter = button.getAttribute('data-filter');

        filterButtons.forEach(function(node) {
          var isActive = node === button;
          node.classList.toggle('active', isActive);
          node.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        applyFilter(filter);
      });
    });

    applyFilter(activeFilter);
  });
})();
