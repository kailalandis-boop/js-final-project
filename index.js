function openMenu() {
    document.body.classList.add("menu--open");
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}

const input = document.querySelector(".input");
let searchTerm = "";

function setSearchTerm(event) {
  searchTerm = event.target.value;
}

function routeToCarsPage() {
  const searchTerm = document.querySelector(".input").value;

  if (searchTerm === "") return;

  window.location.href = `cars.html?search=${searchTerm}`;
}