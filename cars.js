function openMenu() {
    document.body.classList.add("menu--open");
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}

const carsListEl = document.querySelector('.car-list');

let cars = [];

async function fetchCars() {
  try {
    carsListEl.innerHTML = '<p class="loading">Loading...</p>';
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get("search")?.toLowerCase() || "";
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${searchTerm}?format=json`,
    );
    const data = await response.json();
    cars = data.Results.slice(0, 12);

    carsListEl.innerHTML = cars.map((car) => carHTML(car)).join("");
  } catch (error) {
    console.log("Error fetching cars:", error);
  }
}

function sortCars(event) {
  const filter = event.target.value;
  let sortedCars = [];
  if (filter === "A_TO_Z") {
    sortedCars = cars.sort((a, b) => a.Model_Name.localeCompare(b.Model_Name));
  } else {
    sortedCars = cars.sort((a, b) => b.Model_Name.localeCompare(a.Model_Name));
  }

  carsListEl.innerHTML = sortedCars.map((car) => carHTML(car)).join("");
}

function carHTML(car) {
  return `<div class="car-card">
    <div class="car-card__container">
    <p>${car.Make_Name}</p>
    <p>${car.Model_Name}</p>
    </div>
    </div>`;
}

fetchCars();