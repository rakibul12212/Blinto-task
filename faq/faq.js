const items = document.querySelectorAll(".faq-item");

items.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});
