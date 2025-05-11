const API_BASE = "https://jsonplaceholder.typicode.com/users";
const productList = document.getElementById("product-list");
const sortSelect = document.getElementById("sort");

// Function to fetch users (products) with optional sort param
async function fetchProducts(sortBy = "") {
  try {
    let url = API_BASE;
    if (sortBy) {
      url += `?_sort=${sortBy}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayProducts(data);
  } catch (error) {
    productList.innerHTML = `<p style="color:red;">Failed to fetch products: ${error.message}</p>`;
    console.error("Fetch error:", error);
  }
}

// Function to render the product cards
function displayProducts(products) {
  productList.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p><strong>Email:</strong> ${product.email}</p>
      <p><strong>Phone:</strong> ${product.phone}</p>
      <p><strong>Company:</strong> ${product.company.name}</p>
    `;
    productList.appendChild(card);
  });
}

// Handle sort dropdown change
sortSelect.addEventListener("change", () => {
  const selectedValue = sortSelect.value;
  fetchProducts(selectedValue);
});

// Initial fetch without sort
fetchProducts();
