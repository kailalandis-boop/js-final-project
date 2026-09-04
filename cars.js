function openMenu() {
    document.body.classList.add("menu--open");
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}

const urls = [
    { year: 2015, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/honda/modelyear/2015?format=json'},
    { year: 2017, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/honda/modelyear/2017?format=json'},
    { year: 2019, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/honda/modelyear/2019?format=json'},
    { year: 2021, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/honda/modelyear/2021?format=json'},
    { year: 2016, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/toyota/modelyear/2016?format=json'},
    { year: 2018, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/toyota/modelyear/2018?format=json'},
    { year: 2022, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/toyota/modelyear/2022?format=json'},
    { year: 2024, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/toyota/modelyear/2024?format=json'},
    { year: 2017, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/lexus/modelyear/2017?format=json'},
    { year: 2020, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/lexus/modelyear/2020?format=json'},
    { year: 2023, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/lexus/modelyear/2023?format=json'},
    { year: 2026, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/lexus/modelyear/2026?format=json'},
    { year: 2015, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/subaru/modelyear/2015?format=json'},
    { year: 2018, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/subaru/modelyear/2018?format=json'},
    { year: 2021, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/subaru/modelyear/2021?format=json'},
    { year: 2024, url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/subaru/modelyear/2024?format=json'}
];

async function fetchAll() {
    try {
        const cars = urls.map(car => fetch(car.url)
            .then(res => res.json())
            .then(data => data.Results.map(result => ({
                ...result, ModelYear: car.year
            })))
        );

        const carsData = await Promise.all(cars);
        const allCars = carsData.flat();
        const carsListEl = document.querySelector('.car-list');

        carsListEl.innerHTML = allCars.map(car =>
        `<div class="car-card">
            <div class="car-card__container">
                <p>${car.ModelYear}</p>
                <p>${car.Make_Name}</p>
                <p>${car.Model_Name}</p>
            </div>
        </div>`
        ).join("");
    }   
        catch (error) {
        console.error('one of the API calls failed', error);
    }
}

fetchAll();