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
const worldHotspots = document.querySelectorAll(".world-map__hotspot");
const worldPopup = document.querySelector(".world-popup");
const worldPopupFlag = document.querySelector(".world-popup__flag");
const worldPopupTitle = document.querySelector(".world-popup__title");
const worldPopupCommodities = document.querySelector(".world-popup__commodities");
const faqItems = document.querySelectorAll(".faq-item");

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

const tickerCharts = document.querySelectorAll(".ticker-card__chart");

if (window.Chart && tickerCharts.length > 0) {
  tickerCharts.forEach((canvas) => {
    const points = (canvas.dataset.points || "")
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isFinite(value));

    if (points.length === 0) {
      return;
    }

    const lineColor = canvas.dataset.lineColor || "#39d48d";
    const fillColor = canvas.dataset.fillColor || "rgba(57,212,141,0.18)";

    new Chart(canvas, {
      type: "line",
      data: {
        labels: points.map((_, index) => index + 1),
        datasets: [
          {
            data: points,
            borderColor: lineColor,
            backgroundColor: fillColor,
            borderWidth: 1.8,
            fill: true,
            tension: 0.35,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: false,
        animation: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
        elements: {
          line: { capBezierPoints: true },
        },
      },
    });
  });
}

if (
  worldHotspots.length > 0 &&
  worldPopup &&
  worldPopupFlag &&
  worldPopupTitle &&
  worldPopupCommodities
) {
  const setActiveHotspot = (hotspot) => {
    worldHotspots.forEach((button) => button.classList.remove("is-active"));
    hotspot.classList.add("is-active");

    const country = hotspot.dataset.country || "";
    const flag = hotspot.dataset.flag || "";
    const commodities = hotspot.dataset.commodities || "";
    const popupX = hotspot.dataset.popupX || "69%";
    const popupY = hotspot.dataset.popupY || "66%";

    worldPopup.style.left = popupX;
    worldPopup.style.top = popupY;
    worldPopupTitle.textContent = country;
    worldPopupCommodities.textContent = commodities;
    worldPopupFlag.src = flag;
    worldPopupFlag.alt = `${country} flag`;
  };

  worldHotspots.forEach((hotspot) => {
    hotspot.addEventListener("click", () => {
      setActiveHotspot(hotspot);
    });
  });

  setActiveHotspot(worldHotspots[0]);
}

if (faqItems.length > 0) {
  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-item__button");

    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach((faq) => {
        faq.classList.remove("is-open");
        faq.querySelector(".faq-item__button")?.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}
