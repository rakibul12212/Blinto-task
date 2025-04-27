function initTestimonialSection() {
  const testimonialsContainer = document.querySelector(".testimonial-grid");
  if (!testimonialsContainer) return;

  const viewMoreButton = document.createElement("button");
  viewMoreButton.textContent = "Load More +";
  viewMoreButton.classList.add("view-more-btn");
  testimonialsContainer.parentElement.appendChild(viewMoreButton);

  let currentIndex = 3;

  function showTestimonials() {
    const cards = testimonialsContainer.querySelectorAll(".card");

    cards.forEach((card) => (card.style.display = "none"));

    for (let i = 0; i < currentIndex && i < cards.length; i++) {
      cards[i].style.display = "block";
    }

    viewMoreButton.style.display =
      currentIndex >= cards.length ? "none" : "block";
  }

  viewMoreButton.addEventListener("click", () => {
    currentIndex = 9;

    showTestimonials();
  });

  function updateGridLayout() {
    if (window.innerWidth <= 600) {
      currentIndex = 3;
    } else {
      currentIndex = 9;
    }
    showTestimonials();
  }

  updateGridLayout();
  window.addEventListener("resize", updateGridLayout);
}
