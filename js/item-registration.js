const form = document.querySelector("#register-item");
const backButton = document
  .getElementById("back-arrow")
  .addEventListener("click", goBackHomepage);

function goBackHomepage() {
  window.location.href = "/html/homepage.html";
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const itemName = form.querySelector("#item-name").value.trim();
  const location = form.querySelector("#location").value.trim();
  const category = form.querySelector("#category").value;

  if (itemName && location) {
    try {
      const qrCodeUrl = await fetchQRCodeUrl(itemName);
      const items = JSON.parse(sessionStorage.getItem("items")) || [];
      items.push({ itemName, location, category, qrCodeUrl });
      sessionStorage.setItem("items", JSON.stringify(items));
      alert("Item registered successfully!");
      form.reset();
      window.location.href = "/html/homepage.html";
    } catch (error) {
      alert("Failed to generate QR code.");
      console.error("Error fetching QR code:", error);
    }
  } else {
    alert("Please fill out all fields.");
  }
});

async function fetchQRCodeUrl(itemName) {
  const response = await fetch(
    `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      itemName
    )}&size=150x150`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.url;
}
