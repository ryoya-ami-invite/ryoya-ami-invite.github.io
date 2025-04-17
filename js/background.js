function setupBackgroundTriggers() {
  const bg = document.getElementById("photo-background");
  const triggers = document.querySelectorAll(".photo-trigger");
  let currentImage = "";
  let isVisible = false;

  function updatePhotoOnScroll() {
    triggers.forEach((trigger) => {
      const rect = trigger.getBoundingClientRect();
      if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
        const img = trigger.dataset.photo;
        if (img && currentImage !== img) {
          bg.style.backgroundImage = `url('img/${img}')`;
          currentImage = img;
        }
        if (!isVisible) {
          bg.style.opacity = "1";
          isVisible = true;
        }
      }
    });

    const lastTrigger = triggers[triggers.length - 1];
    if (
      lastTrigger.getBoundingClientRect().bottom < window.innerHeight * 0.5 &&
      isVisible
    ) {
      bg.style.opacity = "0";
      isVisible = false;
    }
  }

  window.addEventListener("scroll", updatePhotoOnScroll);
  window.addEventListener("load", () => {
    bg.style.opacity = "0";
    updatePhotoOnScroll();
  });
}

window.setupBackgroundTriggers = setupBackgroundTriggers;
