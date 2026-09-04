function openMenu() {
    document.body.classList.add("menu--open");
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}

const urls = [
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/honda/modelyear/2015?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/honda/modelyear/2017?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/honda/modelyear/2019?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/honda/modelyear/2021?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/toyota/modelyear/2016?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/toyota/modelyear/2018?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/toyota/modelyear/2022?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/toyota/modelyear/2024?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/lexus/modelyear/2017?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/lexus/modelyear/2020?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/lexus/modelyear/2023?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/lexus/modelyear/2026?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/subaru/modelyear/2015?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/subaru/modelyear/2018?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/subaru/modelyear/2021?format=json',
    'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/subaru/modelyear/2024?format=json'
];

async function fetchAll() {
    try {
        const cars = urls.map(url => fetch(url).then(res => res.json()));
        const carsData = await Promise.all(cars);
        const carsListEl = document.querySelector('car-list');
        console.log(carsData)
        carsListEl.innerHTML = carsData.map(car => 
        `<div class="car-card">
            <div class="car-card__container">
                <p>${car.ModelYear}:</p>
                <p>${car.Make_Name}</p>
                <p>${car.Model_Name}</p>
            </div>
        </div>`
        )
        .join("")
    }   
        catch (error) {
        console.error('one of the API calls failed', error);
    }
}

fetchAll();