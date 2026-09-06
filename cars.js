function openMenu() {
    document.body.classList.add("menu--open");
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}

const urls = [
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/honda/modelyear/2018?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/toyota/modelyear/2020?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/lexus/modelyear/2023?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/subaru/modelyear/2026?format=json'
];

const carsListEl = document.querySelector('.car-list');
const searchInput = document.querySelector('.input');
const resultsContainer = document.getElementById('results-container');
const filterEl = document.getElementById("filter"); 

async function fetchAll() {
    try {
        const cars = urls.map(car => fetch(car.url)
            .then(res => res.json())
            .then(data => data.Results.map(result => ({
                ...result
            })))
        );

        carsListEl.innerHTML = '<p class="loading">Loading...</p>';

        const carsData = await Promise.all(cars);
        const allCars = carsData.flat();

        const params = new URLSearchParams(window.location.search);
        const searchTerm = params.get("search")?.toLowerCase() || "";

        const filteredCars = allCars.filter(car =>
            car.Make_Name.toLowerCase().includes(searchTerm) ||
            car.Model_Name.toLowerCase().includes(searchTerm)
        );

        const sortOption = filterEl.value;
            if (sortOption === "A TO Z") {
                filteredCars.sort((a, b) => {
            if (a.Model_Name < b.Model_Name) return -1;
            if (a.Model_Name > b.Model_Name) return 1;
            return 0;
            });
        } 
            else if (sortOption === "Z TO A") {
                filteredCars.sort((a, b) => {
            if (a.Model_Name < b.Model_Name) return 1;
            if (a.Model_Name > b.Model_Name) return -1;
            return 0;
            });
        }
        filterEl.addEventListener("change", () => {
            fetchAll();
        });

        const limitedCars = filteredCars.slice(0, 15);

        if (limitedCars.length === 0) {
            carsListEl.innerHTML = '<p class="no-results">No results match your search.</p>';
        } else {
            carsListEl.innerHTML = limitedCars.map(car => carHTML(car)).join("");
        }
    } 
        catch (error) {
        console.error('Error');
    }
}

fetchAll();

function carHTML(car) {
    return `<div class="car-card">
        <div class="car-card__container">
            <p>${car.Make_Name}</p>
            <p>${car.Model_Name}</p>
        </div>
    </div>`;
}