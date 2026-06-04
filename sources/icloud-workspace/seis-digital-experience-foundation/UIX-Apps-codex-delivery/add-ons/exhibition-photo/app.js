const galleryNode = document.getElementById("gallery");
const filterNode = document.getElementById("filter-bar");
const countNode = document.getElementById("item-count");
const dialogNode = document.getElementById("preview-dialog");
const dialogImageNode = document.getElementById("preview-image");
const dialogTitleNode = document.getElementById("preview-title");
const dialogCategoryNode = document.getElementById("preview-category");
const dialogCloseNode = document.getElementById("preview-close");

let items = [];
let activeFilter = "all";
let activeIndex = -1;

function prettyCategory(value) {
  const map = {
    "open-space": "Open Space",
    exhibition: "Exhibition",
    photography: "Photography"
  };
  return map[value] || value;
}

function getFilteredItems() {
  if (activeFilter === "all") return items;
  return items.filter((item) => item.category === activeFilter);
}

function setCount() {
  countNode.textContent = `${getFilteredItems().length} curated frames`;
}

function renderGallery() {
  const filtered = getFilteredItems();
  galleryNode.innerHTML = "";

  filtered.forEach((item) => {
    const figure = document.createElement("figure");
    figure.className = "card";

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Preview ${item.title}`);
    button.dataset.id = item.id;

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.alt;
    image.loading = "lazy";

    const caption = document.createElement("figcaption");
    caption.innerHTML = `${item.title}<br /><span class="category">${prettyCategory(item.category)}</span>`;

    button.appendChild(image);
    button.appendChild(caption);
    figure.appendChild(button);
    galleryNode.appendChild(figure);
  });

  setCount();
}

function openDialogById(id) {
  const filtered = getFilteredItems();
  const foundIndex = filtered.findIndex((item) => item.id === id);
  if (foundIndex < 0) return;
  activeIndex = foundIndex;
  const item = filtered[foundIndex];

  dialogImageNode.src = item.image;
  dialogImageNode.alt = item.alt;
  dialogTitleNode.textContent = item.title;
  dialogCategoryNode.textContent = prettyCategory(item.category);
  dialogNode.showModal();
}

function moveDialog(step) {
  const filtered = getFilteredItems();
  if (!filtered.length) return;
  activeIndex = (activeIndex + step + filtered.length) % filtered.length;
  const item = filtered[activeIndex];
  dialogImageNode.src = item.image;
  dialogImageNode.alt = item.alt;
  dialogTitleNode.textContent = item.title;
  dialogCategoryNode.textContent = prettyCategory(item.category);
}

function setActiveFilter(nextFilter) {
  activeFilter = nextFilter;
  filterNode.querySelectorAll(".filter").forEach((button) => {
    const isActive = button.dataset.filter === nextFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
  renderGallery();
}

async function loadGallery() {
  const response = await fetch("./gallery.json", { cache: "no-cache" });
  const data = await response.json();
  items = data.items || [];
  renderGallery();
}

filterNode.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  setActiveFilter(button.dataset.filter);
});

galleryNode.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  openDialogById(button.dataset.id);
});

dialogCloseNode.addEventListener("click", () => {
  dialogNode.close();
});

dialogNode.addEventListener("click", (event) => {
  const frame = event.target.closest(".dialog-frame");
  if (!frame) dialogNode.close();
});

window.addEventListener("keydown", (event) => {
  if (!dialogNode.open) return;
  if (event.key === "Escape") dialogNode.close();
  if (event.key === "ArrowRight") moveDialog(1);
  if (event.key === "ArrowLeft") moveDialog(-1);
});

loadGallery().catch(() => {
  countNode.textContent = "Gallery data could not be loaded";
});
