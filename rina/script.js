/*
  TAMBAHKAN FOTO DI SINI.
  Format:
  { src: "assets/nama-file.jpg", title: "Judul Foto", category: "portrait" }

  category yang tersedia:
  portrait, nature, travel, other
*/
const photos = [
  { src: "../assets/Chibi_Ramdan.jpg", title: "Foto 01", category: "portrait" },
  { src: "assets/foto2.jpg", title: "Foto 02", category: "nature" },
  { src: "assets/foto3.jpg", title: "Foto 03", category: "travel" },
  { src: "assets/foto4.jpg", title: "Foto 04", category: "portrait" },
  { src: "assets/foto5.jpg", title: "Foto 05", category: "nature" },
  { src: "assets/foto6.jpg", title: "Foto 06", category: "travel" },
  { src: "assets/foto7.jpg", title: "Foto 07", category: "other" },
  { src: "assets/foto8.jpg", title: "Foto 08", category: "portrait" },
  { src: "assets/foto9.jpg", title: "Foto 09", category: "nature" },
  { src: "assets/foto10.jpg", title: "Foto 10", category: "travel" },
  { src: "assets/foto11.jpg", title: "Foto 11", category: "other" },
  { src: "assets/foto12.jpg", title: "Foto 12", category: "portrait" },
];

const gallery = document.getElementById("gallery");
const empty = document.getElementById("empty");
const search = document.getElementById("searchInput");
const filters = document.querySelectorAll(".filter");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightboxImage");
const lbTitle = document.getElementById("lightboxTitle");
const lbCategory = document.getElementById("lightboxCategory");
let activeFilter = "all",
  visible = [],
  current = 0;

function render() {
  const q = search.value.trim().toLowerCase();
  visible = photos.filter(
    (p) =>
      (activeFilter === "all" || p.category === activeFilter) &&
      (p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)),
  );
  gallery.innerHTML = "";
  empty.hidden = visible.length > 0;
  visible.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "card";
    card.style.animationDelay = i * 35 + "ms";
    card.innerHTML = `<img loading="lazy" src="${p.src}" alt="${p.title}" onerror="this.style.opacity='.12'">
      <div class="info"><h3>${p.title}</h3><span>${p.category}</span></div>`;
    card.onclick = () => openLightbox(i);
    gallery.appendChild(card);
  });
}

function openLightbox(i) {
  current = i;
  const p = visible[current];
  if (!p) return;
  lbImg.src = p.src;
  lbImg.alt = p.title;
  lbTitle.textContent = p.title;
  lbCategory.textContent = p.category;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function move(dir) {
  if (!visible.length) return;
  current = (current + dir + visible.length) % visible.length;
  openLightbox(current);
}

search.addEventListener("input", render);
filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((x) => x.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    render();
  }),
);
document.getElementById("closeBtn").onclick = closeLightbox;
document.getElementById("prevBtn").onclick = () => move(-1);
document.getElementById("nextBtn").onclick = () => move(1);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") move(-1);
  if (e.key === "ArrowRight") move(1);
});
render();
