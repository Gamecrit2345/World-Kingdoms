document.addEventListener("DOMContentLoaded", () => {
  // Forms & Elements
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const forgotForm = document.getElementById("forgotForm");

  const toForgot = document.getElementById("toForgot");
  const toRegister = document.getElementById("toRegister");
  const toLoginBtnList = document.querySelectorAll(".toLogin");
  const alertMsg = document.getElementById("alertMsg");

  // Sample Registered Accounts (Database)
  const registeredUsers = [
    { email: "admin@gmail.com", password: "123123Password!" },
    { email: "player@gmail.com", password: "secretpassword123!" }
  ];

  // Helper Function para sa Loading State ng Button
  function setButtonLoading(form, isLoading) {
    const btn = form.querySelector(".btn-action");
    const textSpan = btn.querySelector(".btn-text");
    const loaderDiv = btn.querySelector(".btn-loader");

    if (isLoading) {
      btn.disabled = true;
      textSpan.classList.add("hidden");
      loaderDiv.classList.remove("hidden");
    } else {
      btn.disabled = false;
      textSpan.classList.remove("hidden");
      loaderDiv.classList.add("hidden");
    }
  }

  // Helper Function para sa Alert Messages
  function showAlert(message, type = "error") {
    alertMsg.textContent = message;
    alertMsg.classList.remove("hidden");
    
    if (type === "success") {
      alertMsg.style.background = "rgba(50, 200, 50, 0.2)";
      alertMsg.style.borderColor = "#32c832";
      alertMsg.style.color = "#88ff88";
    } else {
      alertMsg.style.background = "rgba(200, 50, 50, 0.2)";
      alertMsg.style.borderColor = "#c83232";
      alertMsg.style.color = "#ff8888";
    }
  }

  function hideAlert() {
    alertMsg.classList.add("hidden");
    alertMsg.textContent = "";
  }

  // Password Rules Validation Helper
  function validatePasswordStrength(password) {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter (A-Z).";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number (0-9).";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character (!@#$%^&* etc.).";
    }
    return null; // Valid ang password
  }

  // Switch Forms (Navigation)
  toRegister.addEventListener("click", (e) => {
    e.preventDefault();
    hideAlert();
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
  });

  toForgot.addEventListener("click", (e) => {
    e.preventDefault();
    hideAlert();
    loginForm.classList.add("hidden");
    forgotForm.classList.remove("hidden");
  });

  toLoginBtnList.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      hideAlert();
      registerForm.classList.add("hidden");
      forgotForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    });
  });

  // Toggle Password Visibility (Eye Icon)
  const toggleButtons = document.querySelectorAll(".toggle-password");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.previousElementSibling;
      const type = input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
      this.textContent = type === "password" ? "👁️" : "🙈";
    });
  });

  // LOGIN LOGIC
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    hideAlert();
    setButtonLoading(loginForm, true);

    const emailInput = document.getElementById("loginEmail").value.trim();
    const passwordInput = document.getElementById("loginPassword").value;

    setTimeout(() => {
      setButtonLoading(loginForm, false);

      const userFound = registeredUsers.find((user) => user.email === emailInput);

      if (!userFound) {
        showAlert("No account found with this email!");
      } else if (userFound.password !== passwordInput) {
        showAlert("Wrong password! Please try again.");
      } else {
        showAlert("Login successful! Entering Game...", "success");
        // halimbawa: window.location.href = "dashboard.html";
      }
    }, 3000);
  });

  // REGISTER LOGIC (With Password Strength & Confirm Password Validation)
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    hideAlert();

    const regEmail = document.getElementById("regEmail").value.trim();
    const regPassword = document.getElementById("regPassword").value;
    const regConfirmPassword = document.getElementById("regConfirmPassword").value;

    // 1. I-validate kung sumusunod sa password rules
    const passwordError = validatePasswordStrength(regPassword);
    if (passwordError) {
      showAlert(passwordError);
      return;
    }

    // 2. I-validate kung nagtutugma ang Password at Confirm Password
    if (regPassword !== regConfirmPassword) {
      showAlert("Passwords do not match!");
      return;
    }

    // 3. Pag maayos ang lahat, simulan ang 3-second loading
    setButtonLoading(registerForm, true);

    setTimeout(() => {
      setButtonLoading(registerForm, false);

      const userExists = registeredUsers.some((user) => user.email === regEmail);

      if (userExists) {
        showAlert("Account already exists with this email!");
      } else {
        registeredUsers.push({ email: regEmail, password: regPassword });
        showAlert("Account created successfully! You can now login.", "success");
        
        // Lilipat sa login form pagkatapos ng 1.5 seconds
        setTimeout(() => {
          hideAlert();
          registerForm.reset(); // Linisin ang inputs
          registerForm.classList.add("hidden");
          loginForm.classList.remove("hidden");
        }, 1500);
      }
    }, 3000);
  });

  // FORGOT PASSWORD LOGIC
  forgotForm.addEventListener("submit", (e) => {
    e.preventDefault();
    hideAlert();
    setButtonLoading(forgotForm, true);

    const forgotEmail = document.getElementById("forgotEmail").value.trim();

    setTimeout(() => {
      setButtonLoading(forgotForm, false);

      const userFound = registeredUsers.find((user) => user.email === forgotEmail);

      if (!userFound) {
        showAlert("No account found with this email!");
      } else {
        showAlert("Reset link sent to your Gmail!", "success");
      }
    }, 3000);
  });
});