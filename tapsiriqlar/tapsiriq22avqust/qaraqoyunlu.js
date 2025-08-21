// ...existing code...
let products = [];
let filteredProducts = [];
let currentPage = 1;
const pageSize = 6;

async function loadProducts() {
  try {
    const res = await fetch('qpdb.json');
    products = await res.json();
    filteredProducts = products.slice();

    if (document.getElementById('product-grid')) {
      showPage(currentPage);
      setupPaginationControls();
      setupFilterControl();
    }

    if (window.location.pathname.endsWith('haqqinda.html')) {
      const id = getIdFromUrl();
      if (id) {
        showDetails(id);
      } else if (document.getElementById('haqqinda1')) {
        renderAllDetails();
      }
    }
  } catch (err) {
    console.error('Failed to load products:', err);
  }
}

function showPage(page) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const start = (page - 1) * pageSize;
  const pageProducts = filteredProducts.slice(start, start + pageSize);

  pageProducts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="card-header">
        <img src="${p.sekil || ''}" alt="${escapeHtml(p.name || '')}" width="150">
        <h4>${escapeHtml(p.name || '')}</h4>
      </div>
      <div class="card-body">
        <p class="vezife">${escapeHtml(p.vezife || '')}</p>
        ${p.yasi ? `<p class="yasi">yasi: ${escapeHtml(String(p.yasi))}</p>` : ''}
        <p class="haqqinda">${escapeHtml(p.haqqinda || '')}</p>
      </div>
      <div class="card-actions">
        <button class="toggle-result" type="button" aria-pressed="false">Nəticəni gizlə</button>
        <button class="delete-btn" type="button">Sil</button>
      </div>
    `;

    // card click -> open details page
    card.addEventListener('click', () => {
      if (p && p.id !== undefined) {
        window.location.href = `haqqinda.html?id=${encodeURIComponent(p.id)}`;
      }
    });

    // toggle: hide/show only card-body
    const toggleBtn = card.querySelector('.toggle-result');
    const cardBody = card.querySelector('.card-body');
    if (toggleBtn && cardBody) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const hidden = cardBody.style.display === 'none';
        if (hidden) {
          cardBody.style.display = '';
          toggleBtn.textContent = 'Nəticəni gizlə';
          toggleBtn.setAttribute('aria-pressed', 'false');
        } else {
          cardBody.style.display = 'none';
          toggleBtn.textContent = 'Göstər';
          toggleBtn.setAttribute('aria-pressed', 'true');
        }
      });
    }

    // delete: remove product from arrays and re-render current page
    const deleteBtn = card.querySelector('.delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!confirm('Bu kartı silmək istədiyinizə əminsiniz?')) return;

        const idStr = String(p.id);
        // remove from original and filtered arrays
        products = products.filter(item => String(item.id) !== idStr);
        filteredProducts = filteredProducts.filter(item => String(item.id) !== idStr);

        // recalculate pages and adjust currentPage if necessary
        const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
        if (currentPage > totalPages) currentPage = totalPages;

        showPage(currentPage);
      });
    }

    grid.appendChild(card);
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const pageInfo = document.getElementById('page-info');
  if (pageInfo) pageInfo.textContent = `Page ${page} of ${totalPages}`;

  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  if (prevBtn) prevBtn.disabled = page === 1;
  if (nextBtn) nextBtn.disabled = page === totalPages;
}

function getIdFromUrl() {
  return new URLSearchParams(window.location.search).get('id');
}

function showDetails(id) {
  const haq = document.getElementById('haqqinda1');
  if (!haq) return;
  haq.innerHTML = '';

  const product = products.find(p => String(p.id) === String(id));
  if (!product) {
    haq.textContent = 'Məhsul tapılmadı';
    document.title = 'Haqqında';
    return;
  }

  document.title = product.name || 'Haqqında';

  haq.innerHTML = `
    <div class="haq1">
      <img src="${product.sekil || ''}" alt="${escapeHtml(product.name || '')}" width="200" style="float:right; margin-left:16px;">
      <h2>${escapeHtml(product.name || '')}</h2>
      <p>${escapeHtml(product.haqqinda || '')}</p>
      <p>${escapeHtml(product.vezife || '')}</p>
      ${product.yasi ? `<p>yasi: ${escapeHtml(String(product.yasi))}</p>` : ''}
      ${product.genis ? `<div class="genis"><h3>Ətraflı:</h3><p>${escapeHtml(product.genis)}</p></div>` : ''}
    </div>
  `;
}

function renderAllDetails() {
  const haq = document.getElementById('haqqinda1');
  if (!haq) return;
  haq.innerHTML = '';

  filteredProducts.forEach(coni => {
    const div = document.createElement('div');
    div.className = 'haq1';
    div.innerHTML = `
      <img src="${coni.sekil || ''}" alt="${escapeHtml(coni.name || '')}" width="200" style="float:right; margin-left:16px;">
      <h2>${escapeHtml(coni.name || '')}</h2>
      <p>${escapeHtml(coni.haqqinda || '')}</p>
      <p>${escapeHtml(coni.vezife || '')}</p>
      ${coni.genis ? `<div class="genis"><h3>Ətraflı:</h3><p>${escapeHtml(coni.genis)}</p></div>` : ''}
      ${coni.yasi ? `<p>yasi: ${escapeHtml(String(coni.yasi))}</p>` : ''}
    `;
    haq.appendChild(div);
  });
}

function setupPaginationControls() {
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
      }
    });
  }
}

function setupFilterControl() {
  const filterEl = document.getElementById('filter');
  if (!filterEl) return;
  filterEl.addEventListener('change', (e) => {
    const value = e.target.value;
    if (value === 'hamsi') {
      filteredProducts = products.slice();
    } else {
      filteredProducts = products.filter(p => p.vezife === value);
    }
    currentPage = 1;
    showPage(currentPage);
  });
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

loadProducts();