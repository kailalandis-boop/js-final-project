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
  if(searchTerm === "") return;
  window.location.href = `${window.location.origin}/cars.html?search=${searchTerm}`;
}