// ==============================================
//  CIVICPULSE — app.js
//  Bangalore Real Data Edition
// ==============================================

// ---- CLEAR OLD LOCALSTORAGE (force fresh Bangalore data) ----
localStorage.removeItem('civicpulse_issues');

// ---- REAL BANGALORE SEED DATA ----
const SEED = [
  {
    id: 's1',
    title: 'Massive pothole causing bike accidents daily',
    desc: 'Large pothole near Silk Board signal, depth around 8 inches. 3 bike accidents reported this week alone.',
    category: 'Roads',
    status: 'open',
    votes: 142,
    voted: false,
    location: 'Silk Board Junction, Hosur Road',
    lat: 12.9177,
    lng: 77.6220,
    time: Date.now() - 86400000 * 1
  },
  {
    id: 's2',
    title: 'Illegal garbage dumping near Bellandur Lake',
    desc: 'Construction waste and household garbage being dumped openly. Spreading foul smell and mosquito breeding.',
    category: 'Waste',
    status: 'open',
    votes: 98,
    voted: false,
    location: 'Bellandur Lake Road, Bellandur',
    lat: 12.9259,
    lng: 77.6762,
    time: Date.now() - 86400000 * 2
  },
  {
    id: 's3',
    title: 'Sewage overflowing onto main road',
    desc: 'Sewage pipe burst near MG Road metro station. Dirty water flowing on footpath, health hazard for pedestrians.',
    category: 'Water',
    status: 'progress',
    votes: 76,
    voted: false,
    location: 'MG Road near Trinity Metro Station',
    lat: 12.9756,
    lng: 77.6099,
    time: Date.now() - 86400000 * 3
  },
  {
    id: 's4',
    title: 'Street lights off for 2 weeks — women feel unsafe',
    desc: 'Entire stretch of street lights non-functional. Women returning from work after 8pm feel very unsafe.',
    category: 'Safety',
    status: 'open',
    votes: 211,
    voted: false,
    location: 'Koramangala 5th Block, 80 Feet Road',
    lat: 12.9352,
    lng: 77.6245,
    time: Date.now() - 86400000 * 5
  },
  {
    id: 's5',
    title: 'Severe waterlogging — traffic jams every rain',
    desc: 'Marathahalli bridge underpass floods within 20 mins of rain. Vehicles getting stuck, office goers badly affected.',
    category: 'Water',
    status: 'open',
    votes: 334,
    voted: false,
    location: 'Marathahalli Bridge, Outer Ring Road',
    lat: 12.9591,
    lng: 77.6972,
    time: Date.now() - 86400000 * 1
  },
  {
    id: 's6',
    title: 'Garbage black spot near park — 6 months ignored',
    desc: 'Open garbage dumping next to Cubbon Park entrance. BBMP has not cleared it despite multiple complaints.',
    category: 'Waste',
    status: 'progress',
    votes: 87,
    voted: false,
    location: 'Cubbon Park Main Gate, Kasturba Road',
    lat: 12.9763,
    lng: 77.5929,
    time: Date.now() - 86400000 * 14
  },
  {
    id: 's7',
    title: 'Daily power cuts 6–10pm — IT workers affected',
    desc: 'Whitefield area facing 4-hour power cuts every evening. BESCOM not responding. WFH employees badly impacted.',
    category: 'Power',
    status: 'progress',
    votes: 456,
    voted: false,
    location: 'Whitefield ITPL Main Road',
    lat: 12.9858,
    lng: 77.7272,
    time: Date.now() - 86400000 * 4
  },
  {
    id: 's8',
    title: 'Broken footpath — elderly fall risk',
    desc: 'Footpath tiles completely broken and uplifted. An elderly woman fell and fractured her wrist last week.',
    category: 'Roads',
    status: 'resolved',
    votes: 63,
    voted: false,
    location: 'Indiranagar 100 Feet Road, near BDA Complex',
    lat: 12.9784,
    lng: 77.6408,
    time: Date.now() - 86400000 * 20
  },
  {
    id: 's9',
    title: 'Tree branch fallen on transformer wire',
    desc: 'Large dry tree branch resting on 11KV transformer wire near HSR. Sparks visible at night — fire risk.',
    category: 'Power',
    status: 'open',
    votes: 179,
    voted: false,
    location: 'HSR Layout Sector 2, 27th Main',
    lat: 12.9116,
    lng: 77.6473,
    time: Date.now() - 86400000 * 2
  },
  {
    id: 's10',
    title: 'Stray dogs attacking school children',
    desc: 'Pack of 8+ stray dogs near Jayanagar school gate. Two children bitten this month. BBMP animal control not responding.',
    category: 'Safety',
    status: 'open',
    votes: 290,
    voted: false,
    location: 'Jayanagar 4th Block, near Govt School',
    lat: 12.9254,
    lng: 77.5938,
    time: Date.now() - 86400000 * 3
  },
  {
    id: 's11',
    title: 'Drainage blocked — stagnant water breeding mosquitoes',
    desc: 'Storm drain completely blocked with plastic waste. Stagnant water for 10+ days. Dengue cases reported nearby.',
    category: 'Water',
    status: 'open',
    votes: 145,
    voted: false,
    location: 'BTM Layout 2nd Stage, 16th Cross',
    lat: 12.9165,
    lng: 77.6101,
    time: Date.now() - 86400000 * 7
  },
  {
    id: 's12',
    title: 'Road dug up by BWSSB — not repaired for 3 months',
    desc: 'BWSSB dug the road for pipeline work in January. Road never repaired. Half the road is gravel and mud.',
    category: 'Roads',
    status: 'progress',
    votes: 201,
    voted: false,
    location: 'JP Nagar 6th Phase, 24th Main',
    lat: 12.9072,
    lng: 77.5856,
    time: Date.now() - 86400000 * 90
  }
];

const CAT_ICONS = {
  Roads: '🛣️', Water: '💧', Power: '⚡', Waste: '🗑️', Safety: '🚨', Other: '📌'
};

// ---- STATE ----
let issues  = [];
let filter  = 'all';
let sort    = 'newest';
let selCat  = 'Roads';
let markers = {};
let map;

// ---- STORAGE ----
function load() {
  issues = JSON.parse(JSON.stringify(SEED));
}

function save() {
  localStorage.setItem('civicpulse_issues', JSON.stringify(issues));
}

// ---- MAP ----
function initMap() {
  map = L.map('map', { zoomControl: true, scrollWheelZoom: true });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19,
  }).addTo(map);
  map.setView([12.9716, 77.5946], 12); // Bangalore center
}

function getMarkerColor(status) {
  return status === 'resolved' ? '#3ecf8e' : status === 'progress' ? '#4a9eff' : '#ff5f5f';
}

function renderMarkers() {
  Object.values(markers).forEach(m => map.removeLayer(m));
  markers = {};
  issues.forEach(issue => {
    if (!issue.lat || !issue.lng) return;
    const color = getMarkerColor(issue.status);
    const icon = L.divIcon({
      className: '',
      html: `<div style="
        width:28px;height:28px;border-radius:50% 50% 50% 0;
        background:${color};transform:rotate(-45deg);
        border:3px solid #0d0f0e;
        box-shadow:0 2px 8px rgba(0,0,0,0.5);
        display:flex;align-items:center;justify-content:center;
      "><span style="transform:rotate(45deg);font-size:11px;">${CAT_ICONS[issue.category] || '📌'}</span></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
    });
    const m = L.marker([issue.lat, issue.lng], { icon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family:'DM Sans',sans-serif;min-width:190px;">
          <strong style="font-size:0.9rem;">${issue.title}</strong>
          <div style="margin-top:4px;font-size:0.78rem;color:#888;">📍 ${issue.location}</div>
          <div style="margin-top:4px;font-size:0.78rem;color:#aaa;">${issue.desc || ''}</div>
          <div style="margin-top:8px;">
            <span style="font-size:0.7rem;padding:2px 8px;border-radius:99px;
              background:${color}22;color:${color};font-weight:600;">
              ${issue.status.toUpperCase()}
            </span>
            <span style="font-size:0.75rem;color:#888;margin-left:8px;">▲ ${issue.votes} upvotes</span>
          </div>
        </div>
      `);
    markers[issue.id] = m;
  });
}

// ---- FEED ----
function getFiltered() {
  let list = filter === 'all' ? [...issues] : issues.filter(i => i.status === filter);
  if      (sort === 'newest')   list.sort((a, b) => b.time - a.time);
  else if (sort === 'votes')    list.sort((a, b) => b.votes - a.votes);
  else if (sort === 'category') list.sort((a, b) => a.category.localeCompare(b.category));
  return list;
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1)   return 'just now';
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function nextStatus(s) {
  return s === 'open' ? 'progress' : s === 'progress' ? 'resolved' : 'open';
}

function nextStatusLabel(s) {
  const n = nextStatus(s);
  return n === 'progress' ? 'In Progress' : n === 'resolved' ? 'Resolved' : 'Open';
}

function renderFeed() {
  const feed = document.getElementById('issue-feed');
  const list = getFiltered();

  if (!list.length) {
    feed.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🌆</div>
        <h3>No issues found</h3>
        <p>Try a different filter or be the first to report!</p>
      </div>`;
    return;
  }

  feed.innerHTML = list.map(issue => `
    <div class="issue-card" data-id="${issue.id}">
      <div class="card-top">
        <div class="card-title">${issue.title}</div>
        <span class="status-badge status-${issue.status}">
          ${issue.status === 'progress' ? 'In Progress' : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
        </span>
      </div>
      ${issue.desc ? `<div class="card-desc">${issue.desc}</div>` : ''}
      <div class="card-meta">
        <span class="card-cat">${CAT_ICONS[issue.category]} ${issue.category}</span>
        <span>📍 ${issue.location}</span>
        <span>🕐 ${timeAgo(issue.time)}</span>
      </div>
      <div class="card-actions">
        <button class="vote-btn ${issue.voted ? 'voted' : ''}" data-id="${issue.id}">
          ▲ <span>${issue.votes}</span>
        </button>
        <button class="status-toggle" data-id="${issue.id}">
          → Mark ${nextStatusLabel(issue.status)}
        </button>
      </div>
    </div>
  `).join('');

  // Card click → fly map
  feed.querySelectorAll('.issue-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.vote-btn') || e.target.closest('.status-toggle')) return;
      const issue = issues.find(i => i.id === card.dataset.id);
      if (issue?.lat && issue?.lng) {
        map.flyTo([issue.lat, issue.lng], 15, { duration: 1.2 });
        markers[issue.id]?.openPopup();
      }
    });
  });

  // Vote
  feed.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const issue = issues.find(i => i.id === btn.dataset.id);
      if (!issue) return;
      issue.voted = !issue.voted;
      issue.votes += issue.voted ? 1 : -1;
      save(); renderFeed(); updateNavStats();
    });
  });

  // Status
  feed.querySelectorAll('.status-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const issue = issues.find(i => i.id === btn.dataset.id);
      if (!issue) return;
      issue.status = nextStatus(issue.status);
      save(); renderFeed(); renderMarkers(); updateNavStats();
      showToast(`✅ Status → ${nextStatusLabel(issue.status)}`, 'success');
    });
  });
}

// ---- NAV STATS ----
function updateNavStats() {
  document.getElementById('nav-total').textContent    = `${issues.length} Issues`;
  document.getElementById('nav-resolved').textContent = `${issues.filter(i => i.status === 'resolved').length} Resolved`;
}

// ---- TOAST ----
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast show ${type}`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.className = 'toast', 2800);
}

// ---- MODAL ----
const overlay = document.getElementById('modalOverlay');
document.getElementById('openModal').addEventListener('click', () => overlay.classList.add('active'));
document.getElementById('closeModal').addEventListener('click', () => overlay.classList.remove('active'));
overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });

// Category select
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selCat = btn.dataset.cat;
  });
});

// Geolocation
document.getElementById('use-location').addEventListener('click', () => {
  if (!navigator.geolocation) return showToast('Geolocation not supported', 'error');
  navigator.geolocation.getCurrentPosition(pos => {
    document.getElementById('issue-lat').value = pos.coords.latitude.toFixed(5);
    document.getElementById('issue-lng').value  = pos.coords.longitude.toFixed(5);
    showToast('📍 Location captured!', 'success');
  }, () => {
    // Default to Bangalore center if denied
    document.getElementById('issue-lat').value = '12.97160';
    document.getElementById('issue-lng').value  = '77.59460';
    document.getElementById('issue-location').value = 'Bangalore, Karnataka';
    showToast('📍 Set to Bangalore center', 'success');
  });
});

// Submit
document.getElementById('submit-issue').addEventListener('click', () => {
  const title = document.getElementById('issue-title').value.trim();
  if (!title) return showToast('Please enter an issue title ✏️', 'error');

  const latVal = parseFloat(document.getElementById('issue-lat').value);
  const lngVal = parseFloat(document.getElementById('issue-lng').value);

  // Random spread across Bangalore if no coords
  const lat = isNaN(latVal) ? 12.90 + Math.random() * 0.12 : latVal;
  const lng = isNaN(lngVal) ? 77.55 + Math.random() * 0.20 : lngVal;

  const issue = {
    id:       'u' + Date.now(),
    title,
    desc:     document.getElementById('issue-desc').value.trim(),
    category: selCat,
    status:   'open',
    votes:    0,
    voted:    false,
    location: document.getElementById('issue-location').value.trim() || 'Bangalore, Karnataka',
    lat, lng,
    time:     Date.now(),
  };

  issues.unshift(issue);
  save(); renderFeed(); renderMarkers(); updateNavStats();
  overlay.classList.remove('active');
  showToast('🎉 Issue reported! Thank you!', 'success');

  // Clear form
  ['issue-title','issue-desc','issue-location','issue-lat','issue-lng'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.cat-btn[data-cat="Roads"]').classList.add('active');
  selCat = 'Roads';

  setTimeout(() => map.flyTo([lat, lng], 14, { duration: 1.5 }), 400);
});

// ---- FILTER CHIPS ----
const filterMap = { 'filter-all': 'all', 'filter-open': 'open', 'filter-progress': 'progress', 'filter-resolved': 'resolved' };
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('chip-open'));
    chip.classList.add('chip-open');
    filter = filterMap[chip.id] || 'all';
    renderFeed();
  });
});

// ---- SORT ----
document.getElementById('sort-select').addEventListener('change', e => {
  sort = e.target.value;
  renderFeed();
});

// ---- BOOT ----
load();
initMap();
renderMarkers();
renderFeed();
updateNavStats();