const API_URL = 'https://demohotelsapi.pythonanywhere.com/hotels/';
const state = {
  cabins: [],
  localCabins: JSON.parse(localStorage.getItem('local_cabins') || '[]'),
  deletedCabins: JSON.parse(localStorage.getItem('deleted_cabins') || '[]'),
  bookings: JSON.parse(localStorage.getItem('bookings') || '[]'),
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  reviews: JSON.parse(localStorage.getItem('reviews') || '{}'),
  page: 1,
  perPage: 6,
  search: '',
  location: 'All',
  minPrice: 500,
  maxPrice: 10000,
  rating: 'All',
  sortBy: 'price'
};
const elements = {
  searchInput: document.querySelector('#searchInput'),
  locationSelect: document.querySelector('#locationSelect'),
  minPrice: document.querySelector('#minPrice'),
  maxPrice: document.querySelector('#maxPrice'),
  priceRange: document.querySelector('#priceRange'),
  ratingSelect: document.querySelector('#ratingSelect'),
  sortSelect: document.querySelector('#sortSelect'),
  filterBtn: document.querySelector('#filterBtn'),
  cabinsList: document.querySelector('#cabinsList'),
  pageInfo: document.querySelector('#pageInfo'),
  prevPage: document.querySelector('#prevPage'),
  nextPage: document.querySelector('#nextPage'),
  bookingsList: document.querySelector('#bookingsList'),
  favoritesList: document.querySelector('#favoritesList'),
  localCabinsList: document.querySelector('#localCabinsList'),
  adminName: document.querySelector('#adminName'),
  adminLocation: document.querySelector('#adminLocation'),
  adminPrice: document.querySelector('#adminPrice'),
  adminRating: document.querySelector('#adminRating'),
  adminThumbnail: document.querySelector('#adminThumbnail'),
  adminAdd: document.querySelector('#adminAdd'),
  detailsModal: new bootstrap.Modal(document.querySelector('#detailsModal')),
  detailsTitle: document.querySelector('#detailsTitle'),
  detailsImage: document.querySelector('#detailsImage'),
  detailsLocation: document.querySelector('#detailsLocation'),
  detailsRating: document.querySelector('#detailsRating'),
  detailsPrice: document.querySelector('#detailsPrice'),
  detailsDescription: document.querySelector('#detailsDescription'),
  detailsFeatures: document.querySelector('#detailsFeatures'),
  detailsThumbs: document.querySelector('#detailsThumbs'),
  bookNow: document.querySelector('#bookNow'),
  favoriteNow: document.querySelector('#favoriteNow'),
  reviewText: document.querySelector('#reviewText'),
  submitReview: document.querySelector('#submitReview'),
  reviewList: document.querySelector('#reviewList'),
  toastArea: document.querySelector('#toastArea'),
  confirmArea: document.querySelector('#confirmArea')
};
function saveState() {
  localStorage.setItem('local_cabins', JSON.stringify(state.localCabins));
  localStorage.setItem('deleted_cabins', JSON.stringify(state.deletedCabins));
  localStorage.setItem('bookings', JSON.stringify(state.bookings));
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
  localStorage.setItem('reviews', JSON.stringify(state.reviews));
}
function toast(message, type = 'success') {
  const toastCard = document.createElement('div');
  toastCard.className = `toast-card ${type}`;
  toastCard.textContent = message;
  elements.toastArea.appendChild(toastCard);
  setTimeout(() => {
    toastCard.remove();
  }, 2800);
}
function confirmPopup(message, onConfirm) {
  elements.confirmArea.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'confirm-card';
  card.innerHTML = `<h5>Confirm action</h5><p>${message}</p><div class="confirm-actions"><button class="btn btn-outline-secondary" id="confirmCancel">Cancel</button><button class="btn btn-danger" id="confirmOk">Confirm</button></div>`;
  elements.confirmArea.appendChild(card);
  document.querySelector('#confirmCancel').onclick = () => card.remove();
  document.querySelector('#confirmOk').onclick = () => {
    onConfirm();
    card.remove();
  };
}
function buildQueryParams() {
  const params = new URLSearchParams();
  params.set('limit', 100);
  if (state.search.trim()) params.set('search', state.search);
  if (state.location !== 'All') params.set('location', state.location);
  if (state.rating !== 'All') params.set('rating', state.rating);
  params.set('order_by', state.sortBy);
  params.set('min_price', state.minPrice);
  params.set('max_price', state.maxPrice);
  return params;
}
function fetchCabins() {
  const params = buildQueryParams();
  return fetch(`${API_URL}?${params.toString()}`)
    .then((response) => response.json())
    .then((body) => body.data || [])
    .then((apiCabins) => {
      const filteredApi = apiCabins.filter((item) => !state.deletedCabins.includes(item.id));
      return [...state.localCabins, ...filteredApi];
    });
}
function renderCabins(cabins) {
  const start = (state.page - 1) * state.perPage;
  const pageCabins = cabins.slice(start, start + state.perPage);
  elements.cabinsList.innerHTML = pageCabins.map((cabin) => {
    const favorited = state.favorites.includes(cabin.id);
    return `<div class="col"><div class="card-glamp"><img src="${cabin.thumbnail}" alt="${cabin.name}" /><div class="card-body"><h5 class="card-title">${cabin.name}</h5><p class="text-sub">${cabin.location}</p><div class="d-flex align-items-center gap-2 mb-3"><span class="chip">★ ${Number(cabin.rating).toFixed(1)}</span><span class="chip">₹${Number(cabin.price).toLocaleString()}</span></div><p class="text-sub mb-3">${cabin.description.slice(0, 100)}...</p><div class="d-flex gap-2 flex-wrap"><button class="btn btn-sm btn-primary" data-action="details" data-id="${cabin.id}">Details</button><button class="btn btn-sm ${favorited ? 'btn-secondary' : 'btn-outline-secondary'}" data-action="favorite" data-id="${cabin.id}">${favorited ? 'Unfavorite' : 'Favorite'}</button><button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${cabin.id}">Hide</button></div></div></div></div>`;
  }).join('');
  elements.pageInfo.textContent = `Page ${state.page} of ${Math.max(1, Math.ceil(cabins.length / state.perPage))}`;
}
function handleCardActions(event) {
  const button = event.target.closest('button');
  if (!button) return;
  const action = button.dataset.action;
  const id = Number(button.dataset.id);
  if (action === 'details') {
    openDetailsModal(id);
  }
  if (action === 'favorite') {
    const index = state.favorites.indexOf(id);
    if (index === -1) {
      state.favorites.push(id);
      toast('Added to favorites');
    } else {
      state.favorites.splice(index, 1);
      toast('Removed from favorites', 'success');
    }
    saveState();
    render();
  }
  if (action === 'delete') {
    confirmPopup('Hide this stay from the explorer?', () => {
      state.deletedCabins.push(id);
      saveState();
      toast('Stay hidden from explorer');
      render();
    });
  }
}
function renderBookings() {
  elements.bookingsList.innerHTML = state.bookings.length ? state.bookings.map((booking) => `<div class="list-group-item rounded-4 mb-2"><div class="d-flex justify-content-between align-items-start"><div><h6>${booking.name}</h6><p class="mb-1 text-sub">${booking.location}</p><p class="mb-0 text-sub">${booking.date}</p></div><button class="btn btn-sm btn-outline-danger" data-id="${booking.id}" data-action="cancel">Cancel</button></div></div>`).join('') : '<div class="text-sub">No active bookings</div>';
}
function renderFavorites() {
  const favoriteCabins = state.cabins.filter((cabin) => state.favorites.includes(cabin.id));
  elements.favoritesList.innerHTML = favoriteCabins.length ? favoriteCabins.map((cabin) => `<div class="list-group-item rounded-4 mb-2"><div class="d-flex justify-content-between align-items-start"><div><h6>${cabin.name}</h6><p class="mb-1 text-sub">${cabin.location}</p><p class="mb-0 text-sub">★ ${Number(cabin.rating).toFixed(1)}</p></div><button class="btn btn-sm btn-primary" data-action="details" data-id="${cabin.id}">Details</button></div></div>`).join('') : '<div class="text-sub">No favorites yet</div>';
}
function renderLocalCabins() {
  elements.localCabinsList.innerHTML = state.localCabins.length ? state.localCabins.map((cabin, index) => `<div class="list-group-item rounded-4 mb-2"><div class="d-flex justify-content-between align-items-start"><div><h6>${cabin.name}</h6><p class="mb-1 text-sub">${cabin.location}</p><p class="mb-0 text-sub">₹${Number(cabin.price).toLocaleString()}</p></div><button class="btn btn-sm btn-outline-danger" data-action="remove-local" data-index="${index}">Remove</button></div></div>`).join('') : '<div class="text-sub">No local stays added</div>';
}
function addLocalCabin() {
  const cabin = {
    id: Date.now(),
    name: elements.adminName.value.trim() || 'Cozy Cabin',
    location: elements.adminLocation.value.trim() || 'Wayanad',
    price: Number(elements.adminPrice.value) || 3500,
    rating: Number(elements.adminRating.value) || 4.5,
    thumbnail: elements.adminThumbnail.value.trim() || 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    description: 'A locally added cabin stay with comfortable amenities, scenic views, and a calm outdoor experience.',
    photos: [elements.adminThumbnail.value.trim() || 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80']
  };
  state.localCabins.push(cabin);
  saveState();
  toast('Local cabin added');
  render();
}
function removeLocalCabin(index) {
  state.localCabins.splice(index, 1);
  saveState();
  renderLocalCabins();
}
function openDetailsModal(id) {
  fetch(`${API_URL}${id}/`)
    .then((response) => response.json())
    .then((body) => body.data)
    .then((cabin) => {
      if (!cabin) throw new Error('Stay information unavailable');
      elements.detailsTitle.textContent = cabin.name;
      elements.detailsImage.src = cabin.thumbnail;
      elements.detailsLocation.textContent = cabin.location;
      elements.detailsRating.textContent = `★ ${Number(cabin.rating).toFixed(1)}`;
      elements.detailsPrice.textContent = `₹${Number(cabin.price).toLocaleString()} / night`;
      elements.detailsDescription.textContent = cabin.description;
      elements.detailsFeatures.innerHTML = `<div class="details-feature">Cozy bedding</div><div class="details-feature">Free breakfast</div><div class="details-feature">Private outdoor space</div><div class="details-feature">Fast wifi</div>`;
      elements.detailsThumbs.innerHTML = (cabin.photos || [cabin.thumbnail]).slice(0, 4).map((photo) => `<div class="details-thumb"><img src="${photo}" alt="${cabin.name}" /></div>`).join('');
      elements.detailsThumbs.querySelectorAll('.details-thumb').forEach((thumb) => {
        thumb.addEventListener('click', () => {
          elements.detailsImage.src = thumb.querySelector('img').src;
          elements.detailsThumbs.querySelectorAll('.details-thumb').forEach((item) => item.classList.remove('active'));
          thumb.classList.add('active');
        });
      });
      elements.detailsThumbs.firstChild?.classList.add('active');
      renderReviewSection(id);
      elements.bookNow.onclick = () => addBooking(cabin);
      elements.favoriteNow.onclick = () => toggleFavorite(id);
      elements.submitReview.onclick = () => submitReview(id);
      elements.reviewText.value = '';
      elements.detailsModal.show();
    })
    .catch(() => toast('Unable to load stay details', 'success'));
}
function addBooking(cabin) {
  const booking = {
    id: Date.now(),
    name: cabin.name,
    location: cabin.location,
    date: new Date().toLocaleDateString()
  };
  state.bookings.push(booking);
  saveState();
  toast('Booking confirmed');
  renderBookings();
}
function toggleFavorite(id) {
  const index = state.favorites.indexOf(id);
  if (index === -1) {
    state.favorites.push(id);
    toast('Added to favorites');
  } else {
    state.favorites.splice(index, 1);
    toast('Removed from favorites');
  }
  saveState();
  renderFavorites();
}
function submitReview(id) {
  const text = elements.reviewText.value.trim();
  if (!text) return;
  state.reviews[id] = state.reviews[id] || [];
  state.reviews[id].push({ text, date: new Date().toLocaleDateString() });
  saveState();
  renderReviewSection(id);
  toast('Review submitted');
}
function renderReviewSection(id) {
  const items = state.reviews[id] || [];
  elements.reviewList.innerHTML = items.length ? items.map((review) => `<div class="mb-3"><p class="mb-1">${review.text}</p><small class="text-sub">${review.date}</small></div>`).join('') : '<p class="text-sub">No reviews yet.</p>';
}
function render() {
  fetchCabins().then((cabins) => {
    state.cabins = cabins;
    renderCabins(cabins);
    renderBookings();
    renderFavorites();
    renderLocalCabins();
  });
}
function initEvents() {
  elements.filterBtn.onclick = () => {
    state.search = elements.searchInput.value;
    state.location = elements.locationSelect.value;
    state.minPrice = Number(elements.minPrice.value);
    state.maxPrice = Number(elements.maxPrice.value);
    state.rating = elements.ratingSelect.value;
    state.sortBy = elements.sortSelect.value;
    state.page = 1;
    render();
  };
  elements.priceRange.oninput = (event) => {
    elements.maxPrice.value = event.target.value;
  };
  elements.prevPage.onclick = () => {
    if (state.page > 1) {
      state.page -= 1;
      render();
    }
  };
  elements.nextPage.onclick = () => {
    state.page += 1;
    render();
  };
  elements.cabinsList.onclick = handleCardActions;
  elements.bookingsList.onclick = (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    const id = Number(button.dataset.id);
    if (button.dataset.action === 'cancel') {
      state.bookings = state.bookings.filter((booking) => booking.id !== id);
      saveState();
      renderBookings();
      toast('Booking canceled');
    }
  };
  elements.favoritesList.onclick = (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.action === 'details') openDetailsModal(Number(button.dataset.id));
  };
  elements.localCabinsList.onclick = (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    removeLocalCabin(Number(button.dataset.index));
  };
  elements.adminAdd.onclick = addLocalCabin;
}
initEvents();
render();
