function initSettings() {
  const openSettingsBtn = document.getElementById("openSettingsBtn");
  const closeSettingsBtn = document.getElementById("closeSettingsBtn");
  const settingsModal = document.getElementById("settingsModal");
  const orientationToggle = document.getElementById("orientationToggle");
  const languageSelect = document.getElementById("languageSelect");

  const viewPatchNotesBtn = document.getElementById("viewPatchNotesBtn");
  const updateModal = document.getElementById("updateModal");

  if (openSettingsBtn && settingsModal) {
    openSettingsBtn.addEventListener("click", () => {
      settingsModal.classList.remove("hidden");
    });
  }
  
  if (closeSettingsBtn && settingsModal) {
    closeSettingsBtn.addEventListener("click", () => {
      settingsModal.classList.add("hidden");
    });
  }

  if (settingsModal) {
    settingsModal.addEventListener("click", (e) => {
      if (e.target === settingsModal) {
        settingsModal.classList.add("hidden");
      }
    });
  }

  if (viewPatchNotesBtn && updateModal) {
    viewPatchNotesBtn.addEventListener("click", () => {
      updateModal.classList.remove("hidden");
      settingsModal.classList.add("hidden");
    });
  }

  if (orientationToggle) {
    orientationToggle.addEventListener("change", (e) => {
      const isLandscape = e.target.checked;

      if (isLandscape) {
        document.body.classList.add("landscape-mode");
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock("landscape").catch(() => {});
        }
      } else {
        document.body.classList.remove("landscape-mode");
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock().catch(() => {});
        }
      }
    });
  }

  if (languageSelect) {
    languageSelect.addEventListener("change", (e) => {
      if (typeof applyLanguage === "function") {
        applyLanguage(e.target.value);
      }
    });
  }
}