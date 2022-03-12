//<-------- VARIABLES -------->
let inpuField = document.getElementById("inputField");
let cardsContainer = document.getElementById("card-containers");
let countryCard = document.getElementById("country-card")
let activeClass = document.getElementsByClassName("active")
let extraPage = document.getElementById("extra-page");
let flagContainer = document.getElementById("flag-container");

//<-------- EVENT LISTENERS -------->
inpuField.addEventListener("focusout", getApi);


async function getApi() {

    let response = await fetch(`https://restcountries.com/v3.1/name/${inpuField.value}`)
    let data = await response.json();
    let countryCards = Array.from(activeClass);


    data.forEach(element => {

        let indexNb = data.indexOf(element)
        console.log(data[indexNb]);
        console.log(indexNb);

        createCards(data[indexNb].flags.svg, data[indexNb].name.common, data[indexNb].population, data[indexNb].region, data[indexNb].capital[0]);

        for (card of countryCards) {

            countryCard.classList.add("active");
            if (card.classList.contains("active")) {
                card.remove();
            }
        }

        countryCard.addEventListener("click", makeExtraPage)

        function makeExtraPage() {
            extraPage.style.display = "block";
            extraPage.style.border = "1px solid black";
        }

    });



    return data;
}


/*for (card of activeClass) {
    let cardPos = activeClass.item(0);
    let arrayCard = Array.from(activeClass)
    card.addEventListener("click", () => console.log(arrayCard.indexOf(this)));
}*/

function createCards(img, country, pop, reg, cap) {

    //Create HTML elements
    countryCard = document.createElement("div");
    let countryInfo = document.createElement("div");
    let countryCardName = document.createElement("h3");
    let countryImg = document.createElement("div");
    countryImg.setAttribute("id", "country-img"); //Set ID for Country Image
    let populationWord = document.createElement("h4");
    let regionWord = document.createElement("h4");
    let capitalWord = document.createElement("h4");


    //Create span for API values in card
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



    //Append child
    countryCardName.appendChild(countryText);
    countryInfo.appendChild(countryCardName);



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
    cardsContainer.appendChild(countryCard);
}















/*
function getInfo(img, country, pop, reg, cap) {
    let flag = img
    let countryName = country;
    let population = pop;
    let region = reg;
    let capital = cap;
    console.log(countryName, population, region, capital);

}
 getInfo(data[indexNb].flags.svg, data[indexNb].name.common, data[indexNb].population, data[indexNb].region, data[indexNb].capital[0]);
*/