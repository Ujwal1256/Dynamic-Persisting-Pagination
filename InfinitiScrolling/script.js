const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");

let limit = 10;         // Number of images per fetch
let page = 1;           // Current page index

// Fetch data from API
async function fetchPhotos() {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    renderPhotos(data);
  } catch (error) {
    loader.innerText = "Failed to load data.";
    console.error("Error fetching photos:", error);
  }
}

// Render fetched photos to the DOM
function renderPhotos(photos) {
  photos.forEach(photo => {
    const photoCard = document.createElement("div");
    photoCard.className = "photo-card";
    photoCard.innerHTML = `
      <img src="${photo.thumbnailUrl}" alt="${photo.title}" />
    `;
    gallery.appendChild(photoCard);
  });
}

// Infinite Scroll Logic
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    page++;
    fetchPhotos();
  }
}, {
  rootMargin: "100px",
});

// Start observing the loader
observer.observe(loader);

// Initial Fetch
fetchPhotos();
