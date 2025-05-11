const API_URL = 'https://jsonplaceholder.typicode.com/users';
const USERS_PER_PAGE = 6;

const userContainer = document.getElementById('user-container');
const paginationContainer = document.getElementById('pagination-container');

// Function to fetch users for a specific page
async function fetchUsers(page = 1) {
  try {
    const response = await fetch(`${API_URL}?_page=${page}&_limit=${USERS_PER_PAGE}`);

    // Handle error responses
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    displayUsers(data);
    createPaginationButtons(2, page); // Max 10 users, 6 per page = 2 pages
  } catch (error) {
    console.error('Error fetching users:', error);
    userContainer.innerHTML = `<p style="color:red;">Failed to load user data. Please try again later.</p>`;
  }
}

// Function to display users in the DOM
function displayUsers(users) {
  userContainer.innerHTML = ''; // Clear existing users

  users.forEach(user => {
    const div = document.createElement('div');
    div.className = 'user-card';
    div.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
    `;
    userContainer.appendChild(div);
  });
}

// Function to create pagination buttons
function createPaginationButtons(totalPages, currentPage) {
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;

    btn.addEventListener('click', () => fetchUsers(i));
    paginationContainer.appendChild(btn);
  }
}

// Initial load
fetchUsers(1);
