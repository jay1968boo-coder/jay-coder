document.addEventListener("alpine:init", () => {
  // 1. Store Global khusus pencarian
  Alpine.store("search", {
    keyword: "",
  });

  // Data Produk
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Bakso Biasa",
        img: "img/product/tentang-kami1.jpg",
        price: 10000,
        desc: "Bakso daging sapi asli dengan kuah gurih dan mi.",
      },
      {
        id: 2,
        name: "Bakso Spesial",
        img: "img/product/tentang-kami2.jpg",
        price: 15000,
        desc: "Bakso urat jumbo ditambah bakso halus dan tahu.",
      },
      {
        id: 3,
        name: "Mie Ayam",
        img: "img/product/tentang-kami3.jpg",
        price: 10000,
        desc: "Mie kenyal dengan potongan daging ayam manis gurih.",
      },
      {
        id: 4,
        name: "Mie Ayam Bakso",
        img: "img/product/tentang-kami4.jpg",
        price: 15000,
        desc: "Perpaduan mie ayam lezat dengan 2 butir bakso halus.",
      },
      {
        id: 5,
        name: "Mie Ayam Spesial",
        img: "img/product/tentang-kami5.jpg",
        price: 15000,
        desc: "Mie ayam komplit dengan ceker dan bakso ekstra.",
      },
      {
        id: 6,
        name: "Es Teh Manis",
        img: "img/product/iced-latte.jpg",
        price: 5000,
        desc: "Kesegaran es teh manis penyegar setelah makan bakso.",
      },
      {
        id: 7,
        name: "Kopi Susu",
        img: "img/product/copi-susu.jpg",
        price: 5000,
        desc: "Kesegaran es teh manis penyegar setelah makan bakso.",
      },
      {
        id: 8,
        name: "Kopi Hitam",
        img: "img/product/kopi-hitam.jpg",
        price: 5000,
        desc: "Kesegaran es marimas penyegar setelah makan bakso.",
      },
      {
        id: 9,
        name: "Marimas",
        img: "img/product/marimas.jpg",
        price: 2000,
        desc: "Kesegaran es marimas penyegar setelah makan bakso.",
      },
    ],

    // Getter untuk memfilter item berdasarkan kata kunci search di store
    get filteredItems() {
      const keyword = Alpine.store("search").keyword.toLowerCase();
      if (!keyword) {
        return this.items;
      }
      return this.items.filter((item) =>
        item.name.toLowerCase().includes(keyword),
      );
    },
  }));

  // Store Keranjang Belanja
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,

    add(newItem) {
      // Cek apakah barang sudah ada di keranjang
      const cartItem = this.items.find((item) => item.id === newItem.id);

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika barang sudah ada, tambah quantity & total item
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);

      if (cartItem.quantity > 1) {
        // Kurangi quantity jika lebih dari 1
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // Hapus item dari keranjang jika tinggal 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },

    // 1. KITA TAMBAHKAN FUNGSI CLEAR DI SINI
    clear() {
      this.items = [];
      this.total = 0;
      this.quantity = 0;
    },
  });
});

// Modal Logic & Form Interaction
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#item-detail-modal");
  const modalImg = modal.querySelector(".modal-img");
  const modalTitle = modal.querySelector(".modal-title");
  const modalDesc = modal.querySelector(".modal-desc");
  const modalPrice = modal.querySelector(".modal-price");
  const closeBtn = document.querySelector("#close-modal-btn");
  const modalAddToCartBtn = document.querySelector("#modal-add-to-cart-btn"); // Selesai Diperbaiki di sini

  let currentModalItem = null;

  // Tangkap klik di seluruh halaman
  document.addEventListener("click", function (e) {
    const targetBtn = e.target.closest(".item-detail-button");

    if (targetBtn) {
      e.preventDefault();

      // 1. Ambil data dari atribut tombol yang diklik
      const id = targetBtn.getAttribute("data-id"); // Ambil ID asli agar sinkron dengan cart
      const name = targetBtn.getAttribute("data-name");
      const img = targetBtn.getAttribute("data-img");
      const price = targetBtn.getAttribute("data-price");
      const description = targetBtn.getAttribute("data-description");

      // 2. Masukkan data ke dalam elemen modal box
      modalTitle.textContent = name;
      modalImg.src = img;
      modalImg.alt = name;
      modalPrice.textContent = price;
      modalDesc.textContent = description;

      // Simpan data produk asli lengkap untuk keperluan Alpine Cart
      currentModalItem = {
        id: parseInt(id),
        name: name,
        img: img.replace("img/product/", ""),
        price: parseInt(price.replace(/[^0-9]/g, "")),
      };

      // 3. Tampilkan modal box
      modal.style.display = "flex";
    }
  });

  // AKTIFKAN TOMBOL KERANJANG DI MODAL
  if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentModalItem && window.Alpine && Alpine.store("cart")) {
        Alpine.store("cart").add(currentModalItem);
        modal.style.display = "none"; // Tutup modal otomatis setelah ditambah
      }
    });
  }

  // Fungsi klik tombol close
  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      modal.style.display = "none";
    });
  }

  // Fungsi klik di luar area modal window
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// Kirim data ketika tombol checkout di klik
window.kirimData = function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);

  // 1. Membuka WhatsApp (Kode awal Anda yang berhasil)
  window.open(
    `https://wa.me/6289530768006?text=` + encodeURIComponent(message),
  );

  // 2. Memunculkan notifikasi sukses
  alert("🎉 Pesan telah berhasil terkirim! Terima kasih.");

  // 3. Mengosongkan formulir ketikan nama dan alamat
  e.target.reset();

  // 4. Mengosongkan keranjang belanja Alpine.js
  // Langkah ini otomatis akan menghilangkan form checkout secara instan tanpa mengunci sistem
  if (
    window.Alpine &&
    Alpine.store("cart") &&
    typeof Alpine.store("cart").clear === "function"
  ) {
    Alpine.store("cart").clear();
  }

  // 3. BARIS PERBAIKAN: Kosongkan isi input teks Nama & Alamat secara aman dari sisi JavaScript
  const formFormular = e.target;
  if (formFormular) {
    formFormular.reset(); // Mengosongkan kotak input fisik tanpa merusak struktur render Alpine
  }
};

const formatMessage = (obj) => {
  const listPesanan = JSON.parse(obj.items)
    .map((item) => {
      return `- ${item.name} (${item.quantity} x ${rupiah(item.total)})\n`;
    })
    .join("");

  return `Data Customer:
Nama   : ${obj.name}
Alamat : ${obj.address}

Data Pesanan:
${listPesanan}
Total: ${rupiah(obj.total)}

Terima Kasih.`;
};

// Konversi Angka ke Format Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
