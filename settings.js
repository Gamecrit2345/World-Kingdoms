function initSettings() {
  const openSettingsBtn = document.getElementById("openSettingsBtn");
  const closeSettingsBtn = document.getElementById("closeSettingsBtn");
  const settingsModal = document.getElementById("settingsModal");
  const orientationToggle = document.getElementById("orientationToggle");
  const languageSelect = document.getElementById("languageSelect");

  if (openSettingsBtn && settingsModal) {
    openSettingsBtn.addEventListener("click", () => settingsModal.classList.remove("hidden"));
  }
  
  if (closeSettingsBtn && settingsModal) {
    closeSettingsBtn.addEventListener("click", () => settingsModal.classList.add("hidden"));
  }

  if (orientationToggle) {
    orientationToggle.addEventListener("change", (e) => {
      if (e.target.checked) {
        document.body.classList.add("landscape-mode");
      } else {
        document.body.classList.remove("landscape-mode");
      }
    });
  }

  if (languageSelect) {
    languageSelect.addEventListener("change", (e) => {
      applyLanguage(e.target.value);
    });
  }
}