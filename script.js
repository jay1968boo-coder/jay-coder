// Toggle Class Active Navbar & Search
const navbarNav = document.querySelector('.navbar-nav');
const hamburger = document.querySelector('#hamburger-menu');

// ketika dokumen di klik
document.querySelector('#hamburger-menu').onclick = (e) => {
    navbarNav.classList.toggle('active');
    e.preventDefault(); // PERBAIKAN: Mencegah halaman melompat ke atas saat diklik
};

// Toggle Active untuk Shopping Cart
const shoppingCart = document.querySelector('.shopping-cart');
const cartButton = document.querySelector('#shopping-cart-button');

cartButton.onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault(); // Mencegah halaman melompat ke atas
};

// Klik di luar elemen untuk menyembunyikan keranjang
document.addEventListener('click', function (e) {
  if (!cartButton.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

// Modal Detail Item
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

document.addEventListener('click', function (e) {
  const btn = e.target.closest('.item-detail-button');
  if (btn) {
    e.preventDefault();
    itemDetailModal.querySelector('.modal-img').src = btn.dataset.img;
    itemDetailModal.querySelector('.modal-title').innerText = btn.dataset.name;
    itemDetailModal.querySelector('.modal-desc').innerText = btn.dataset.description;
    itemDetailModal.querySelector('.modal-price').innerText = btn.dataset.price;
    itemDetailModal.style.display = 'flex';
  }
});

// Toggle Active untuk Search Form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
const searchBtn = document.querySelector('#search-button');

if (searchBtn) {
  searchBtn.onclick = (e) => {
    e.preventDefault(); // Mencegah link meloncat ke #
    searchForm.classList.toggle('active');
    
    // Jika active, fokuskan ke kolom ketik
    if (searchForm.classList.contains('active')) {
      searchBox.focus();
    }
  };
}

// Klik di luar elemen untuk menyembunyikan search form
document.addEventListener('click', function (e) {
  if (!searchBtn.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }
});

// Klik di luar hamburger, Search Buton dan Shoping Cart
const hm = document.querySelector('#hamburger-menu');
// const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  // if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
  //   searchForm.classList.remove('active');
  // }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

// Close Modal
document.querySelector('#close-modal-btn').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
};

window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
};