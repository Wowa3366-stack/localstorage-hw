const STORAGE_KEY = "bookmarks-list";

function save(key, value) {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (error) {
    console.error("Set data error", error);
  }
}

function load(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Get data error", error);
    return [];
  }
}

const inputEl = document.querySelector("#bookmarkInput");
const addBtn = document.querySelector("#addBookmarkBtn");
const listEl = document.querySelector("#bookmarkList");

let bookmarks = load(STORAGE_KEY);

function renderBookmarks() {
  listEl.innerHTML = bookmarks
    .map((url, index) => {
      const formattedUrl =
        url.startsWith("http://") || url.startsWith("https://")
          ? url
          : `https://${url}`;

      return `
        <li>
          <a href="${formattedUrl}" target="_blank" rel="noopener noreferrer">${url}</a>
          <button class="delete" data-index="${index}">X</button>
        </li>
      `;
    })
    .join("");
}

function onAddBookmark() {
  const urlValue = inputEl.value.trim();

  if (!urlValue) {
    alert("Будь ласка, введіть URL!");
    return;
  }

  bookmarks.push(urlValue);
  save(STORAGE_KEY, bookmarks);
  renderBookmarks();
  inputEl.value = "";
}

function onDeleteBookmark(event) {
  if (!event.target.classList.contains("delete")) return;

  const indexToDelete = Number(event.target.dataset.index);
  bookmarks.splice(indexToDelete, 1);
  save(STORAGE_KEY, bookmarks);
  renderBookmarks();
}

addBtn.addEventListener("click", onAddBookmark);
listEl.addEventListener("click", onDeleteBookmark);

renderBookmarks();
