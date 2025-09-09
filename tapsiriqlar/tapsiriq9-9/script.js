const photoGrid = document.getElementById("photoGrid");
const newPhotosContainer = document.getElementById("newPhotosContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageNumbersDiv = document.getElementById("pageNumbers");
const topPageInput = document.getElementById("topPageInput");
const topTotalPages = document.getElementById("topTotalPages");

let photosData = [];
let filteredPhotos = [];
let currentPage = 1;
const pageSize = 8;

// JSON yüklə
// JSON yüklə
async function loadPhotos() {
  try {
    const res = await fetch("photos.json");
    photosData = await res.json();
    filteredPhotos = photosData.slice();
    // Remove the call to renderTopPhotos() here
    showPage(currentPage);
    renderPagination();
  } catch (err) {
    console.error("JSON yüklənmədi:", err);
  }
}

// Yuxarı grid: son 10 şəkil
function renderTopPhotos() {
  newPhotosContainer.innerHTML = "";
  const lastPhotos = photosData.slice(-10);
  lastPhotos.forEach(item => {
    const div = document.createElement("div");
    div.className = "photo-card";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <h4>${item.title}</h4>
      <p>${item.category}</p>
    `;
    newPhotosContainer.appendChild(div);
  });
}

// Alt main grid: səhifə üzrə şəkillər
function showPage(page) {
  photoGrid.innerHTML = "";

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const list = filteredPhotos.slice(start, end);

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "photo-card";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <h4>${item.title}</h4>
      <p>${item.category}</p>
    `;
    photoGrid.appendChild(div);
  });
}

// Alt pagination render
function renderPagination() {
  const totalPages = Math.ceil(filteredPhotos.length / pageSize);

  // Yuxarı pagination update
  topPageInput.max = totalPages;
  topPageInput.value = currentPage;
  topTotalPages.textContent = `of ${totalPages}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  // Nömrələr (max 9)
  pageNumbersDiv.innerHTML = "";
  const maxButtons = 9;
  let start = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
  let end = start + maxButtons - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(end - maxButtons + 1, 1);
  }

  for (let i = start; i <= end; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      showPage(currentPage);
      renderPagination();
    });
    pageNumbersDiv.appendChild(btn);
  }
}

// Search
function searchPhotos() {
  const q = searchInput.value.toLowerCase();
  filteredPhotos = photosData.filter(
    p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );
  currentPage = 1;
  showPage(currentPage);
  renderPagination();
}

searchBtn.addEventListener("click", searchPhotos);
searchInput.addEventListener("keyup", e => {
  if (e.key === "Enter") searchPhotos();
});

// Previous / Next
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
    renderPagination();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredPhotos.length / pageSize);
  if (currentPage < totalPages) {
    currentPage++;
    showPage(currentPage);
    renderPagination();
  }
});

// Yuxarı input ilə səhifəni dəyiş
topPageInput.addEventListener("change", () => {
  let page = parseInt(topPageInput.value);
  const totalPages = Math.ceil(filteredPhotos.length / pageSize);
  if (!isNaN(page)) {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentPage = page;
    showPage(currentPage);
    renderPagination();
  }
});

// Parallax
window.addEventListener("scroll", () => {
  requestAnimationFrame(() => {
    const scrollY = window.scrollY;
    const heroImg = document.getElementById("heroImg");
    if (heroImg) heroImg.style.transform = `translateY(${scrollY * -0.2}px)`;
  });
});

loadPhotos();
