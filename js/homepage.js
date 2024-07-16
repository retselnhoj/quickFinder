document.querySelector(".register-item-btn").addEventListener("click", () => {
  window.location.href = "/html/item-registration.html";
});

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
}

// Function to filter items by category
function filterItems(category) {
  const items = JSON.parse(sessionStorage.getItem("items")) || [];
  const filteredItems = items.filter((item) => item.category === category);
  displayItems(filteredItems, category);
}

// Function to display items under their respective categories
function displayItems(items, category) {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = ""; // Clear previous content

  const categoryTitle = document.createElement("div");
  categoryTitle.classList.add("category-title");
  categoryTitle.textContent = category;
  categoryContainer.appendChild(categoryTitle);

  const itemList = document.createElement("ul");
  itemList.classList.add("item-list");
  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("item");
    listItem.textContent = `${item.itemName} - ${item.location}`;
    listItem.innerHTML = `<img src="${item.qrCodeUrl}" alt="QR Code"><br>${item.itemName} - ${item.location}`;
    listItem.onclick = () => showItemDetails(item);
    itemList.appendChild(listItem);
  });
  categoryContainer.appendChild(itemList);
}

// Function to show item details
function showItemDetails(item) {
  const itemDetailsContainer = document.getElementById("item-details");
  itemDetailsContainer.innerHTML = ""; // Clearing  of the previous content

  const itemName = document.createElement("div");
  itemName.textContent = `Item Name: ${item.itemName}`;
  itemDetailsContainer.appendChild(itemName);

  const itemLocation = document.createElement("div");
  itemLocation.textContent = `Location: ${item.location}`;
  itemDetailsContainer.appendChild(itemLocation);

  const itemCategory = document.createElement("div");
  itemCategory.textContent = `Category: ${item.category}`;
  itemDetailsContainer.appendChild(itemCategory);
}

// Function to search items (placeholder)
function searchItems() {
  const searchQuery = document.getElementById("search-bar").value.toLowerCase();
  const items = JSON.parse(sessionStorage.getItem("items")) || [];
  const filteredItems = items.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchQuery) ||
      item.location.toLowerCase().includes(searchQuery)
  );
  displayItems(filteredItems, "Search Results");
}

// Function to handle speech recognition
function startSpeechRecognition() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.replace(/\.$/, ""); // Remove trailing period
    document.getElementById("search-bar").value = transcript;
    searchItems();
  };
  recognition.start();
}

// Function to logout
function logout() {
  sessionStorage.removeItem("role");
  window.location.href = "/index.html";
}

// Set user role in navbar
document.getElementById("user-role").textContent =
  sessionStorage.getItem("role") || "Guest";
