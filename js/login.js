const inputUsername = document.querySelector("#username");
const inputPassword = document.querySelector("#password");
const form = document.querySelector("#login");
const roleModal = document.getElementById("role-modal");
const parentBtn = document.getElementById("parent-btn");
const kidBtn = document.getElementById("kid-btn");

const checkUsername = () => {
  let valid = false;
  const username = inputUsername.value.trim();
  if (!isRequired(username)) {
    showError(inputUsername, "Username cannot be blank.");
  } else {
    showSuccess(inputUsername);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;
  const password = inputPassword.value.trim();
  if (!isRequired(password)) {
    showError(inputPassword, "Password cannot be blank.");
  } else {
    showSuccess(inputPassword);
    valid = true;
  }
  return valid;
};

const isRequired = (value) => (value === "" ? false : true);

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  const error = formField.querySelector("small");
  error.textContent = "";
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let isUsernameValid = checkUsername(),
    isPasswordValid = checkPassword();

  let isFormValid = isUsernameValid && isPasswordValid;

  if (isFormValid) {
    const username = inputUsername.value.trim();
    const password = inputPassword.value.trim();
    const users = JSON.parse(sessionStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      alert("Login successful!");
      roleModal.style.display = "flex";
    } else {
      showError(inputUsername, "Invalid username or password.");
      showError(inputPassword, "Invalid username or password.");
    }
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "username":
        checkUsername();
        break;
      case "password":
        checkPassword();
        break;
    }
  })
);

parentBtn.addEventListener("click", () => {
  sessionStorage.setItem("role", "parent");
  window.location.href = "html/homepage.html";
});

kidBtn.addEventListener("click", () => {
  sessionStorage.setItem("role", "kid");
  window.location.href = "html/homepage.html";
});
