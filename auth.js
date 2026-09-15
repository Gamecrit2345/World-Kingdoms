const registeredUsers = [
  { email: "admin@gmail.com", password: "123123Password!" },
  { email: "player@gmail.com", password: "secretpassword123!" }
];

let animatedDotsInterval = null;

function setButtonLoading(form, isLoading) {
  const btn = form.querySelector(".btn-action");
  if (!btn) return;
  const textSpan = btn.querySelector(".btn-text");
  const loaderDiv = btn.querySelector(".btn-loader");

  if (isLoading) {
    btn.disabled = true;
    if (textSpan) textSpan.classList.add("hidden");
    if (loaderDiv) loaderDiv.classList.remove("hidden");
  } else {
    btn.disabled = false;
    if (textSpan) textSpan.classList.remove("hidden");
    if (loaderDiv) loaderDiv.classList.add("hidden");
  }
}

function showAlert(messageKey, type = "error") {
  const alertMsg = document.getElementById("alertMsg");
  if (!alertMsg) return;
  
  clearInterval(animatedDotsInterval);

  const text = (translations[currentLang] && translations[currentLang][messageKey]) || messageKey;
  alertMsg.textContent = text;
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

function showAnimatedLoginSuccess(callback) {
  const alertMsg = document.getElementById("alertMsg");
  if (!alertMsg) return;
  
  clearInterval(animatedDotsInterval);
  
  const baseText = translations[currentLang].loginSuccess;
  let dotCount = 0;

  alertMsg.classList.remove("hidden");
  alertMsg.style.background = "rgba(50, 200, 50, 0.2)";
  alertMsg.style.borderColor = "#32c832";
  alertMsg.style.color = "#88ff88";

  animatedDotsInterval = setInterval(() => {
    dotCount = (dotCount % 3) + 1;
    let dots = ".".repeat(dotCount);
    alertMsg.textContent = `${baseText}${dots}`;
  }, 400);

  setTimeout(() => {
    clearInterval(animatedDotsInterval);
    if (callback) callback();
  }, 3000);
}

function hideAlert() {
  const alertMsg = document.getElementById("alertMsg");
  if (!alertMsg) return;
  clearInterval(animatedDotsInterval);
  alertMsg.classList.add("hidden");
  alertMsg.textContent = "";
}

function validatePasswordStrength(password) {
  if (password.length < 8) return "passLengthErr";
  if (!/[A-Z]/.test(password)) return "passUpperErr";
  if (!/[0-9]/.test(password)) return "passNumErr";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "passCharErr";
  return null;
}

function initAuth() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const forgotForm = document.getElementById("forgotForm");

  const toForgot = document.getElementById("toForgot");
  const toRegister = document.getElementById("toRegister");
  const toLoginBtnList = document.querySelectorAll(".toLogin");

  if (toRegister) {
    toRegister.addEventListener("click", (e) => {
      e.preventDefault();
      hideAlert();
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
    });
  }

  if (toForgot) {
    toForgot.addEventListener("click", (e) => {
      e.preventDefault();
      hideAlert();
      loginForm.classList.add("hidden");
      forgotForm.classList.remove("hidden");
    });
  }

  toLoginBtnList.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      hideAlert();
      registerForm.classList.add("hidden");
      forgotForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    });
  });

  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.previousElementSibling;
      if (!input) return;
      const type = input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
      this.textContent = type === "password" ? "👁️" : "🙈";
    });
  });

  if (loginForm) {
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
          showAlert("noAccount");
        } else if (userFound.password !== passwordInput) {
          showAlert("wrongPass");
        } else {
          showAnimatedLoginSuccess(() => {
            // Success logic
          });
        }
      }, 2000);
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      hideAlert();

      const regEmail = document.getElementById("regEmail").value.trim();
      const regPassword = document.getElementById("regPassword").value;
      const regConfirmPassword = document.getElementById("regConfirmPassword").value;

      const passwordError = validatePasswordStrength(regPassword);
      if (passwordError) {
        showAlert(passwordError);
        return;
      }

      if (regPassword !== regConfirmPassword) {
        showAlert("passMismatch");
        return;
      }

      setButtonLoading(registerForm, true);

      setTimeout(() => {
        setButtonLoading(registerForm, false);
        const userExists = registeredUsers.some((user) => user.email === regEmail);

        if (userExists) {
          showAlert("accExists");
        } else {
          registeredUsers.push({ email: regEmail, password: regPassword });
          showAlert("accCreated", "success");

          setTimeout(() => {
            hideAlert();
            registerForm.reset();
            registerForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
          }, 1500);
        }
      }, 3000);
    });
  }

  if (forgotForm) {
    forgotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      hideAlert();
      setButtonLoading(forgotForm, true);

      const forgotEmail = document.getElementById("forgotEmail").value.trim();

      setTimeout(() => {
        setButtonLoading(forgotForm, false);
        const userFound = registeredUsers.find((user) => user.email === forgotEmail);

        if (!userFound) {
          showAlert("noAccount");
        } else {
          showAlert("resetSent", "success");
        }
      }, 3000);
    });
  }
}`  `