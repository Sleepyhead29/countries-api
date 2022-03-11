//<-------- VARIABLES -------->
let inpuField = document.getElementById("inputField");
let cardsContainer = document.getElementById("card-containers");
let isDisplayed = false;
//let countryCard = document.createElement("div");
let countryCard = document.getElementById("country-card")
let activeClass = document.getElementsByClassName("active")
inpuField.addEventListener("focusout", getApi);



async function getApi() {

    let response = await fetch(`https://restcountries.com/v3.1/name/${inpuField.value}`)
    let data = await response.json();

    let countryCards = Array.from(activeClass);


    data.forEach(element => {

        let indexNb = data.indexOf(element)
        console.log(data[indexNb]);

        isDisplayed = true;


        countryCards.forEach(card => {

            countryCard.classList.add("active");
            if (card.classList.contains("active")) {
                card.remove();
            }
        })

        getInfo(data[indexNb].flags.svg, data[indexNb].name.common, data[indexNb].population, data[indexNb].region, data[indexNb].capital[0]);

        createCards(data[indexNb].flags.svg, data[indexNb].name.common, data[indexNb].population, data[indexNb].region, data[indexNb].capital[0]);

        countryCard.addEventListener("click", getExtra);

        function getExtra() {
            window.location = "extra.html";
        }

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



}

function createCards(img, country, pop, reg, cap) {


    //Create HTML elements

    countryCard = document.createElement("div");
    let countryInfo = document.createElement("div");
    let countryCardName = document.createElement("h3");
    let countryImg = document.createElement("div");
    let link = document.createElement("a");
    countryImg.setAttribute("id", "country-img");

    let populationWord = document.createElement("h4");
    let regionWord = document.createElement("h4");
    let capitalWord = document.createElement("h4");


    //Create span for text in card
    let populationHolder = document.createElement("span");
    let regionHolder = document.createElement("span");
    let capitalHolder = document.createElement("span");


    //Create values as textnodes
    let countryText = document.createTextNode(country)
    let populationText = document.createTextNode(`${pop}`)
    let regionText = document.createTextNode(`${reg}`)
    let capitalText = document.createTextNode(`${cap}`)



    //Put values in span
    populationHolder.appendChild(populationText)
    regionHolder.appendChild(regionText)
    capitalHolder.appendChild(capitalText)


    //Create text
    let populationWordText = document.createTextNode("Population: ");
    let regionWordText = document.createTextNode("Region: ");
    let capitalWordText = document.createTextNode("Capital: ");



    //append text nodes to H4
    populationWord.appendChild(populationWordText);
    regionWord.appendChild(regionWordText);
    capitalWord.appendChild(capitalWordText);

    //Append spans to H4
    populationWord.appendChild(populationHolder);
    regionWord.appendChild(regionHolder);
    capitalWord.appendChild(capitalHolder);
    //Append child & Set Attribute

    countryCardName.appendChild(countryText);
    countryInfo.appendChild(countryCardName);


    //Country Info


    //Append all to country card
    countryCard.appendChild(countryImg);
    countryInfo.appendChild(populationWord);
    countryInfo.appendChild(regionWord);
    countryInfo.appendChild(capitalWord);
    countryInfo.setAttribute("id", "country-info");
    countryCard.appendChild(countryInfo);
    countryCard.setAttribute("id", "country-card");
    countryImg.style.backgroundImage = `url(${img})`;
    countryCard.setAttribute("class", "active");
    countryCard.appendChild(link)

    cardsContainer.appendChild(countryCard);
}