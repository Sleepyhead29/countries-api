let inpuField = document.getElementById("inputField");

inpuField.addEventListener("focusout", getApi);

async function getApi() {
    let response = await fetch(`https://restcountries.com/v3.1/name/${inpuField.value}`)
    let data = await response.json();

    data.forEach(element => {
        let indexNb = data.indexOf(element)
        console.log(data[indexNb]);

        getInfo(data[indexNb].name.common, data[indexNb].population, data[indexNb].region,data[indexNb].capital[0]);
    });
    return data;
}

function getInfo(country, pop,reg,cap) {
    let countryName = country;
    let population = pop;
    let region = reg;
    let capital = cap;
    console.log(countryName, population, region, capital);
}