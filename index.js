let inpuField = document.getElementById("inputField");
let cardsContainer = document.getElementById("card-containers");

inpuField.addEventListener("focusout", getApi);

async function getApi() {
    let response = await fetch(`https://restcountries.com/v3.1/name/${inpuField.value}`)
    let data = await response.json();

    data.forEach(element => {
        let indexNb = data.indexOf(element)
        console.log(data[indexNb]);

        getInfo(data[indexNb].flag, data[indexNb].name.common, data[indexNb].population, data[indexNb].region, data[indexNb].capital[0]);
    });
    return data;
}

function getInfo(img, country, pop, reg, cap) {
    let flag = img
    let countryName = country;
    let population = pop;
    let region = reg;
    let capital = cap;
    console.log(countryName, population, region, capital);

    createCards(countryName, population, region, capital);
}

function createCards( /*img,*/ country, pop, reg, cap) {
    //Create country card
    let countryCard = document.createElement("div");
    let countryInfo = document.createElement("div");
    let countryCardName = document.createElement("h3");
    //Create text
    let countryText = document.createTextNode(country)
    let populationText = document.createTextNode(`Population: ${pop}`)
    let regionText = document.createTextNode(`Region: ${reg}`)
    let capitalText = document.createTextNode(`Capital: ${cap}`)
    //Append child & Set Attribute
    countryCardName.appendChild(countryText);
    countryInfo.appendChild(countryCardName);
    countryInfo.appendChild(populationText);
    countryInfo.appendChild(regionText);
    countryInfo.appendChild(capitalText);
    countryInfo.setAttribute("id","country-info");
    countryCard.appendChild(countryInfo);
    countryCard.setAttribute("id","country-card");
    cardsContainer.appendChild(countryCard);
}