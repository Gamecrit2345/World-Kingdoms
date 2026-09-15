function initSettings() {
  const openSettingsBtn = document.getElementById("openSettingsBtn");
  const closeSettingsBtn = document.getElementById("closeSettingsBtn");
  const settingsModal = document.getElementById("settingsModal");
  const orientationToggle = document.getElementById("orientationToggle");
  const languageSelect = document.getElementById("languageSelect");

  // Buksan ang Settings Modal
  if (openSettingsBtn && settingsModal) {
    openSettingsBtn.addEventListener("click", () => {
      settingsModal.classList.remove("hidden");
    });
  }
  
  // Isara ang Settings Modal
  if (closeSettingsBtn && settingsModal) {
    closeSettingsBtn.addEventListener("click", () => {
      settingsModal.classList.add("hidden");
    });
  }

  // Isara rin kapag pinalikuran/klinik ang labas ng modal box
  if (settingsModal) {
    settingsModal.addEventListener("click", (e) => {
      if (e.target === settingsModal) {
        settingsModal.classList.add("hidden");
      }
    });
  }

  // Handling ng Orientation (Portrait vs Landscape)
  if (orientationToggle) {
    orientationToggle.addEventListener("change", (e) => {
      const isLandscape = e.target.checked;

      if (isLandscape) {
        document.body.classList.add("landscape-mode");
        // Subukang i-lock ang tunay na screen orientation sa Mobile Browser
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock("landscape").catch(() => {
            // Hindi suportado ng ilang browser ang lock command nang walang fullscreen
          });
        }
      } else {
        document.body.classList.remove("landscape-mode");
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock().catch(() => {});
        }
      }
    });
  }

  // Handling ng Wika / Language
  if (languageSelect) {
    languageSelect.addEventListener("change", (e) => {
      if (typeof applyLanguage === "function") {
        applyLanguage(e.target.value);
      }
    });
  }
}