const inputUsername = document.querySelector("#username");
const inputPassword = document.querySelector("#password");
const confirmInputPassword = document.querySelector("#confirm-password");
const form = document.querySelector("#signup");

const checkUsername = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const username = inputUsername.value.trim();
  if (!isRequired(username)) {
    showError(inputUsername, "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      inputUsername,
      `Username must be between ${min} and ${max} characters.`
    );
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
  } else if (!isPasswordSecure(password)) {
    showError(
      inputPassword,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)."
    );
  } else {
    showSuccess(inputPassword);
    valid = true;
  }
  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;
  const confirmPassword = confirmInputPassword.value.trim();
  const password = inputPassword.value.trim();
  if (!isRequired(confirmPassword)) {
    showError(confirmInputPassword, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmInputPassword, "The password does not match");
  } else {
    showSuccess(confirmInputPassword);
    valid = true;
  }
  return valid;
};

const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

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
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isUsernameValid && isPasswordValid && isConfirmPasswordValid;

  if (isFormValid) {
    const user = {
      username: inputUsername.value.trim(),
      password: inputPassword.value.trim(),
    };
    let users = JSON.parse(sessionStorage.getItem("users")) || []; // allows to store data for the meantime
    users.push(user);
    sessionStorage.setItem("users", JSON.stringify(users)); // convert a JavaScript object or value to a JSON string
    alert("Registration Successful!");
    window.location.href = "/index.html";
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
      case "confirm-password":
        checkConfirmPassword();
        break;
    }
  })
);
