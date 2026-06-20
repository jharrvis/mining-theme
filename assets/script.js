const breakingBar = document.querySelector(".breaking-bar");
const closeBreakingButton = document.querySelector(".breaking-bar__close");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const tickerTrack = document.querySelector(".ticker-strip__track");
const searchToggle = document.querySelector(".icon-button--search");
const searchPanel = document.querySelector(".search-panel");
const dropdownToggles = document.querySelectorAll(".site-nav__toggle");
const newswireTrack = document.querySelector(".newswire__track");
const newswirePrev = document.querySelector(".newswire__arrow--prev");
const newswireNext = document.querySelector(".newswire__arrow--next");

if (closeBreakingButton && breakingBar) {
  closeBreakingButton.addEventListener("click", () => {
    breakingBar.classList.add("is-hidden");
  });
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (searchToggle && searchPanel) {
  searchToggle.addEventListener("click", () => {
    const isOpen = searchPanel.classList.toggle("is-open");
    searchToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const parentItem = toggle.closest(".site-nav__item");
    const isOpen = parentItem?.classList.contains("is-open");

    dropdownToggles.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      button.closest(".site-nav__item")?.classList.remove("is-open");
    });

    if (parentItem && !isOpen) {
      parentItem.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element)) {
    return;
  }

  if (searchPanel && searchToggle && !searchPanel.contains(target) && !searchToggle.contains(target)) {
    searchPanel.classList.remove("is-open");
    searchToggle.setAttribute("aria-expanded", "false");
  }

  if (!target.closest(".site-nav__item--has-dropdown")) {
    dropdownToggles.forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      button.closest(".site-nav__item")?.classList.remove("is-open");
    });
  }
});

if (tickerTrack) {
  tickerTrack.innerHTML += tickerTrack.innerHTML;
}

if (newswireTrack && newswirePrev && newswireNext) {
  const scrollAmount = 274;

  newswirePrev.addEventListener("click", () => {
    newswireTrack.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  newswireNext.addEventListener("click", () => {
    newswireTrack.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}
