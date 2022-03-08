let inpuField = document.getElementById("inputField");
let cardsContainer = document.getElementById("card-containers");

inpuField.addEventListener("focusout", getApi);

async function getApi() {
    let response = await fetch(`https://restcountries.com/v3.1/name/${inpuField.value}`)
    let data = await response.json();

    data.forEach(element => {
        let indexNb = data.indexOf(element)
        console.log(data[indexNb]);

        getInfo(data[indexNb].flags.svg, data[indexNb].name.common, data[indexNb].population, data[indexNb].region, data[indexNb].capital[0]);
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

    createCards(flag, countryName, population, region, capital);
}

function createCards(img, country, pop, reg, cap) {
    //Create country card
    let countryCard = document.createElement("div");
    let countryInfo = document.createElement("div");
    let countryCardName = document.createElement("h3");
    let countryFlagContainer = document.createElement("img");

    let populationHolder = document.createElement("h4");
    let regionHolder = document.createElement("h4");
    let captalHolder = document.createElement("h4");
    countryFlagContainer.setAttribute("src", img);
    //Create text
    let countryText = document.createTextNode(country)
    let populationText = document.createTextNode(`Population: ${pop}`)
    let regionText = document.createTextNode(`Region: ${reg}`)
    let capitalText = document.createTextNode(`Capital: ${cap}`)
    //let flagText = document.createTextNode(img);
    //Append child & Set Attribute
    countryCard.appendChild(countryFlagContainer);
    countryCardName.appendChild(countryText);
    countryCard.appendChild(countryCardName);

    //Country Info
    populationHolder.appendChild(populationText)
    regionHolder.appendChild(regionText)
    captalHolder.appendChild(capitalText)

    //Append all to country card

    countryInfo.appendChild(populationHolder);
    countryInfo.appendChild(regionHolder);
    countryInfo.appendChild(captalHolder);
    countryInfo.setAttribute("id", "country-info");
    countryCard.appendChild(countryInfo);
    countryCard.setAttribute("id", "country-card");

    cardsContainer.appendChild(countryCard);
}