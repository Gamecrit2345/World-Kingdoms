function initPatchNotes() {
  const updateModal = document.getElementById("updateModal");
  const closeUpdateBtn = document.getElementById("closeUpdateBtn");
  const gotItUpdateBtn = document.getElementById("gotItUpdateBtn");

  // Ipakita ang Patch Notes kapag binuksan ang app
  if (updateModal) {
    updateModal.classList.remove("hidden");
  }

  const closePatchNotes = () => {
    if (updateModal) {
      updateModal.classList.add("hidden");
    }
  };

  if (closeUpdateBtn) closeUpdateBtn.addEventListener("click", closePatchNotes);
  if (gotItUpdateBtn) gotItUpdateBtn.addEventListener("click", closePatchNotes);

  if (updateModal) {
    updateModal.addEventListener("click", (e) => {
      if (e.target === updateModal) {
        closePatchNotes();
      }
    });
  }
}