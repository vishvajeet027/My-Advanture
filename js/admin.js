/* ================================================================
   admin.js — Catalog CRUD (hotels, places, vehicles, flights)
   Admin role only
   ================================================================ */

const INR = n => '₹' + Number(n || 0).toLocaleString('en-IN');

let currentTab = 'hotels';
let editingId = null;

const CATALOG_LABELS = {
  hotels: 'Hotel',
  places: 'Place',
  rentals: 'Vehicle',
  flights: 'Flight',
};

function getCatalogList(tab) {
  switch (tab) {
    case 'hotels':  return MockData.getAllHotels();
    case 'places':  return MockData.getAllPlaces();
    case 'rentals': return MockData.getAllRentals();
    case 'flights': return MockData.getAllFlights();
    default:        return [];
  }
}

function switchCatalogTab(tab) {
  currentTab = tab;
  editingId = null;
  document.querySelectorAll('.admin-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  const addBtn = document.getElementById('adminAddBtn');
  if (addBtn) addBtn.innerHTML = `<i class="fas fa-plus"></i> Add ${CATALOG_LABELS[tab]}`;
  renderCatalogList();
}

function updateCounts() {
  ['hotels', 'places', 'rentals', 'flights'].forEach(tab => {
    const el = document.getElementById('count-' + tab);
    if (el) el.textContent = getCatalogList(tab).length;
  });
}

function renderCatalogList() {
  updateCounts();
  const list = document.getElementById('adminList');
  if (!list) return;

  const q = (document.getElementById('adminSearch')?.value || '').trim().toLowerCase();
  let items = getCatalogList(currentTab);
  if (q) {
    items = items.filter(item => JSON.stringify(item).toLowerCase().includes(q));
  }

  if (!items.length) {
    list.innerHTML = `
      <div class="admin-empty">
        <i class="fas fa-inbox"></i>
        <p>No ${CATALOG_LABELS[currentTab].toLowerCase()}s found.</p>
        <button type="button" class="btn-primary" onclick="openCatalogForm()">
          <i class="fas fa-plus"></i> Add one
        </button>
      </div>`;
    return;
  }

  list.innerHTML = items.map(item => catalogCardHtml(currentTab, item)).join('');
}

function catalogThumbHtml(imageUrl, iconClass) {
  const src = String(imageUrl || '').trim();
  if (src) {
    return `
      <div class="admin-card-thumb">
        <img src="${esc(src)}" alt="" class="admin-card-img"
          onerror="this.style.display='none'; this.parentElement.classList.add('is-empty');"/>
        <div class="admin-card-placeholder" aria-hidden="true">
          <i class="${iconClass}"></i>
        </div>
      </div>`;
  }
  return `
    <div class="admin-card-thumb is-empty">
      <div class="admin-card-placeholder" aria-hidden="true">
        <i class="${iconClass}"></i>
      </div>
    </div>`;
}

function catalogCardHtml(tab, item) {
  const idAttr = esc(String(item.id));
  const actions = `
    <div class="admin-card-actions">
      <button type="button" class="admin-edit-btn" data-id="${idAttr}" title="Edit" aria-label="Edit">
        <i class="fas fa-pen"></i>
      </button>
      <button type="button" class="admin-delete-btn danger" data-id="${idAttr}" title="Delete" aria-label="Delete">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;

  if (tab === 'hotels') {
    return `
      <article class="admin-card">
        ${catalogThumbHtml(item.image, 'fas fa-hotel')}
        <div class="admin-card-body">
          <h3>${esc(item.name)}</h3>
          <p>${esc(item.city)}, ${esc(item.country)} · ★ ${item.rating || '—'} · ${INR(item.price)}/night</p>
          <p class="admin-card-desc">${esc(item.desc || '')}</p>
        </div>
        ${actions}
      </article>`;
  }

  if (tab === 'places') {
    return `
      <article class="admin-card">
        ${catalogThumbHtml(item.image, 'fas fa-map-marker-alt')}
        <div class="admin-card-body">
          <h3>${esc(item.name)}</h3>
          <p>${esc(item.city)} · ${esc(item.type || '')} · ★ ${item.rating || '—'} · ${item.price ? INR(item.price) : 'Free'}</p>
          <p class="admin-card-desc">${esc(item.desc || '')}</p>
        </div>
        ${actions}
      </article>`;
  }

  if (tab === 'rentals') {
    return `
      <article class="admin-card">
        ${catalogThumbHtml(item.image, 'fas fa-car')}
        <div class="admin-card-body">
          <h3>${esc(item.name)}</h3>
          <p>${esc(item.type)} · ${esc(item.vehicle)} · ★ ${item.rating || '—'} · ${INR(item.price)}/day</p>
          <p class="admin-card-desc">${esc(item.desc || '')}</p>
        </div>
        ${actions}
      </article>`;
  }

  // flights
  return `
    <article class="admin-card">
      ${catalogThumbHtml(item.image, 'fas fa-plane')}
      <div class="admin-card-body">
        <h3>${esc(item.from)} → ${esc(item.to)}</h3>
        <p>${esc(item.airline)} · ${esc(item.flightClass)} · ${esc(item.departure)}–${esc(item.arrival)} · ${INR(item.price)}</p>
        <p class="admin-card-desc">${esc(item.fromCode)} → ${esc(item.toCode)} · ${esc(item.duration)}</p>
      </div>
      ${actions}
    </article>`;
}

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fieldDefs(tab) {
  if (tab === 'hotels') {
    return [
      { key: 'name', label: 'Name', required: true },
      { key: 'city', label: 'City', required: true },
      { key: 'country', label: 'Country', required: true },
      { key: 'rating', label: 'Rating', type: 'number', step: '0.1', min: '0', max: '5' },
      { key: 'price', label: 'Price / night (₹)', type: 'number', required: true },
      { key: 'image', label: 'Image URL' },
      { key: 'desc', label: 'Description', textarea: true },
      { key: 'facilities', label: 'Facilities (comma-separated)' },
    ];
  }
  if (tab === 'places') {
    return [
      { key: 'name', label: 'Name', required: true },
      { key: 'city', label: 'City', required: true },
      { key: 'type', label: 'Type (Landmark, Museum…)' },
      { key: 'rating', label: 'Rating', type: 'number', step: '0.1', min: '0', max: '5' },
      { key: 'price', label: 'Entry price (₹)', type: 'number' },
      { key: 'image', label: 'Image URL' },
      { key: 'desc', label: 'Description', textarea: true },
    ];
  }
  if (tab === 'rentals') {
    return [
      { key: 'name', label: 'Name', required: true },
      { key: 'type', label: 'Type (Bike / Car)', required: true },
      { key: 'vehicle', label: 'Vehicle model', required: true },
      { key: 'rating', label: 'Rating', type: 'number', step: '0.1', min: '0', max: '5' },
      { key: 'price', label: 'Price / day (₹)', type: 'number', required: true },
      { key: 'image', label: 'Image URL' },
      { key: 'desc', label: 'Description', textarea: true },
    ];
  }
  return [
    { key: 'from', label: 'From city', required: true },
    { key: 'fromCode', label: 'From code', required: true },
    { key: 'fromCountry', label: 'From country' },
    { key: 'to', label: 'To city', required: true },
    { key: 'toCode', label: 'To code', required: true },
    { key: 'toCountry', label: 'To country' },
    { key: 'airline', label: 'Airline', required: true },
    { key: 'flightClass', label: 'Class', required: true },
    { key: 'departure', label: 'Departure' },
    { key: 'arrival', label: 'Arrival' },
    { key: 'duration', label: 'Duration' },
    { key: 'price', label: 'Price (₹)', type: 'number', required: true },
    { key: 'image', label: 'Image URL' },
  ];
}

function openCatalogForm(id) {
  editingId = id != null ? id : null;
  const item = editingId != null
    ? getCatalogList(currentTab).find(i => String(i.id) === String(editingId))
    : null;

  document.getElementById('adminModalTitle').textContent =
    (item ? 'Edit ' : 'Add ') + CATALOG_LABELS[currentTab];

  const fields = document.getElementById('adminFormFields');
  fields.innerHTML = fieldDefs(currentTab).map(f => {
    const val = item ? (f.key === 'facilities' && Array.isArray(item.facilities)
      ? item.facilities.join(', ')
      : (item[f.key] ?? '')) : '';
    if (f.textarea) {
      return `<label class="full">${f.label}<textarea name="${f.key}" ${f.required ? 'required' : ''}>${esc(val)}</textarea></label>`;
    }
    return `<label>${f.label}<input name="${f.key}" type="${f.type || 'text'}"
      ${f.step ? `step="${f.step}"` : ''} ${f.min != null ? `min="${f.min}"` : ''}
      ${f.max != null ? `max="${f.max}"` : ''} ${f.required ? 'required' : ''}
      value="${esc(val)}"/></label>`;
  }).join('');

  document.getElementById('adminModal').classList.remove('hidden');
}

function closeCatalogForm() {
  document.getElementById('adminModal').classList.add('hidden');
  editingId = null;
}

function handleAdminModalClick(e) {
  if (e.target.id === 'adminModal') closeCatalogForm();
}

function submitCatalogForm(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());

  ['price', 'rating', 'passengers'].forEach(k => {
    if (data[k] !== undefined && data[k] !== '') data[k] = Number(data[k]);
  });

  if (currentTab === 'hotels') {
    data.facilities = String(data.facilities || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }

  if (editingId != null) {
    CatalogStorage.update(currentTab, coerceId(editingId), data);
    showToast(`${CATALOG_LABELS[currentTab]} updated.`, 'success');
  } else {
    CatalogStorage.add(currentTab, data);
    showToast(`${CATALOG_LABELS[currentTab]} added.`, 'success');
  }

  closeCatalogForm();
  renderCatalogList();
}

function coerceId(id) {
  const n = Number(id);
  return Number.isFinite(n) && String(n) === String(id) ? n : id;
}

let pendingDeleteId = null;
let pendingReseed = false;

function catalogItemLabel(item) {
  if (!item) return { name: 'Unknown item', sub: CATALOG_LABELS[currentTab] };
  if (currentTab === 'hotels') {
    return { name: item.name, sub: `${item.city || ''}, ${item.country || ''}`.replace(/^,\s*|,\s*$/g, '') || 'Hotel' };
  }
  if (currentTab === 'places') {
    return { name: item.name, sub: `${item.city || ''} · ${item.type || 'Place'}` };
  }
  if (currentTab === 'rentals') {
    return { name: item.name, sub: `${item.type || ''} · ${item.vehicle || 'Vehicle'}` };
  }
  return {
    name: `${item.from || ''} → ${item.to || ''}`,
    sub: `${item.airline || 'Flight'} · ${item.flightClass || ''}`.trim(),
  };
}

function catalogTabIcon() {
  return {
    hotels: 'fas fa-hotel',
    places: 'fas fa-map-marker-alt',
    rentals: 'fas fa-car',
    flights: 'fas fa-plane',
  }[currentTab] || 'fas fa-cube';
}

function openAdminDeleteModal({ id = null, reseed = false } = {}) {
  pendingDeleteId = id;
  pendingReseed = reseed;

  const title = document.getElementById('adminDeleteTitle');
  const message = document.getElementById('adminDeleteMessage');
  const preview = document.getElementById('adminDeletePreview');
  const nameEl = document.getElementById('adminDeleteName');
  const subEl = document.getElementById('adminDeleteSub');
  const previewIcon = document.getElementById('adminDeletePreviewIcon');
  const mainIcon = document.getElementById('adminDeleteIcon');
  const confirmBtn = document.getElementById('adminDeleteConfirmBtn');
  const cancelBtn = document.querySelector('#adminDeleteModal .btn-delete-cancel');

  if (reseed) {
    if (title) title.textContent = 'Reset Catalog?';
    if (message) {
      message.textContent =
        'This will replace all hotels, places, vehicles, and flights with the default mock data. Custom entries will be lost.';
    }
    if (preview) preview.classList.add('hidden');
    if (mainIcon) mainIcon.className = 'fas fa-seedling';
    if (confirmBtn) {
      confirmBtn.innerHTML = '<i class="fas fa-seedling"></i> Yes, Reset';
      confirmBtn.classList.remove('is-loading');
    }
    if (cancelBtn) cancelBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Keep Catalog';
  } else {
    const item = getCatalogList(currentTab).find(i => String(i.id) === String(id));
    const label = catalogItemLabel(item);
    const typeName = CATALOG_LABELS[currentTab];

    if (title) title.textContent = `Delete ${typeName}?`;
    if (message) {
      message.textContent =
        `This action cannot be undone. The ${typeName.toLowerCase()} will be permanently removed from the catalog.`;
    }
    if (preview) preview.classList.remove('hidden');
    if (nameEl) nameEl.textContent = label.name || typeName;
    if (subEl) subEl.textContent = label.sub || typeName;
    if (previewIcon) previewIcon.className = catalogTabIcon();
    if (mainIcon) mainIcon.className = 'fas fa-trash-alt';
    if (confirmBtn) {
      confirmBtn.innerHTML = '<i class="fas fa-trash"></i> Yes, Delete';
      confirmBtn.classList.remove('is-loading');
    }
    if (cancelBtn) cancelBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Keep It';
  }

  document.getElementById('adminDeleteModal')?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeAdminDeleteModal() {
  document.getElementById('adminDeleteModal')?.classList.add('hidden');
  document.body.style.overflow = '';
  pendingDeleteId = null;
  pendingReseed = false;
  const confirmBtn = document.getElementById('adminDeleteConfirmBtn');
  if (confirmBtn) confirmBtn.classList.remove('is-loading');
}

function handleAdminDeleteModalClick(e) {
  if (e.target.id === 'adminDeleteModal') closeAdminDeleteModal();
}

function confirmAdminDelete() {
  const confirmBtn = document.getElementById('adminDeleteConfirmBtn');
  if (confirmBtn) {
    confirmBtn.classList.add('is-loading');
    confirmBtn.innerHTML = pendingReseed
      ? '<i class="fas fa-spinner fa-spin"></i> Resetting...'
      : '<i class="fas fa-spinner fa-spin"></i> Deleting...';
  }

  setTimeout(() => {
    if (pendingReseed) {
      MockData.seedCatalog(true);
      showToast('Catalog reset to defaults.', 'success');
    } else if (pendingDeleteId != null) {
      CatalogStorage.remove(currentTab, coerceId(pendingDeleteId));
      showToast(`${CATALOG_LABELS[currentTab]} deleted.`, 'success');
    }

    closeAdminDeleteModal();
    renderCatalogList();
  }, 280);
}

function deleteCatalogItem(id) {
  openAdminDeleteModal({ id });
}

function reseedCatalog() {
  openAdminDeleteModal({ reseed: true });
}

function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = 'toast show ' + type;
  setTimeout(() => { toast.className = 'toast'; }, 2800);
}

document.addEventListener('DOMContentLoaded', () => {
  if (!AuthSession.requireAdmin()) return;
  MockData.seedCatalog(false);

  const list = document.getElementById('adminList');
  if (list) {
    list.addEventListener('click', (e) => {
      const editBtn = e.target.closest('.admin-edit-btn');
      const deleteBtn = e.target.closest('.admin-delete-btn');
      if (editBtn) {
        openCatalogForm(editBtn.dataset.id);
        return;
      }
      if (deleteBtn) {
        deleteCatalogItem(deleteBtn.dataset.id);
      }
    });
  }

  switchCatalogTab('hotels');
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const deleteModal = document.getElementById('adminDeleteModal');
  if (deleteModal && !deleteModal.classList.contains('hidden')) {
    closeAdminDeleteModal();
    return;
  }
  const formModal = document.getElementById('adminModal');
  if (formModal && !formModal.classList.contains('hidden')) closeCatalogForm();
});
