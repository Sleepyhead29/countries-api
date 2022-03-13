//<-------- VARIABLES -------->
let inpuField = document.getElementById("inputField");
let cardsContainer = document.getElementById("card-containers");
//let countryCard = document.getElementById("country-card")
let activeClass = document.getElementsByClassName("active")
let extraPage = document.getElementById("extra-page");
let flagContainer = document.getElementById("flag-container");
let backBtn = document.getElementById("back-button");
let countryTitle = document.createElement("h2");
countryTitle.setAttribute("id", "country-title");
let option = document.querySelector('select');
//<-------- EVENT LISTENERS -------->
inpuField.addEventListener("focusout", getApi);


async function getApi() {

    try {
        let response = await fetch(`https://restcountries.com/v3.1/name/${inpuField.value}`)
        let data = await response.json();
        let countryCards = Array.from(activeClass);
      
        data.forEach(element => {

            let indexNb = data.indexOf(element)
            console.log(data[indexNb]);
            console.log(indexNb);

            if (data[indexNb].hasOwnProperty('capital') == false) {
                data[indexNb].capital = "None";
            } else {
                createCards(data[indexNb].flags.svg, data[indexNb].name.common, data[indexNb].population, data[indexNb].region, data[indexNb].capital[0]);

            }
            for (card of countryCards) {

                countryCard.classList.add("active");
                if (card.classList.contains("active")) {
                    card.remove();
                }
            }

            countryCard.addEventListener("click", makeExtraPage)
            backBtn.addEventListener("click", () => {
                extraPage.style.display = "none";
                let basicInfo = document.getElementById("basic-info");
                basicInfo.remove();
                info2.remove();

            })

            function makeExtraPage() {
                extraPage.style.display = "flex";
                flagContainer.style.backgroundImage = `url('${data[indexNb].flags.svg}')`;
                countryTitle.innerHTML = data[indexNb].name.common;

                //Store currency name inside a variable. I can't manually access it since Idk the currency name of each country.                                                /*Accessed the proprety through the new proprety name variable*/
                let currencyName = Object.keys(data[indexNb].currencies);
                console.log(Object.values(data[indexNb].currencies))
                console.log(currencyName);
                createInfo(data[indexNb].name.official, data[indexNb].population, data[indexNb].region, data[indexNb].subregion, data[indexNb].capital[0], data[indexNb].tld[0], data[indexNb].currencies[currencyName[0]].name, Object.values(data[indexNb].languages));


            }

        });

        return data;
    } catch (error) {
        console.log(error);
    }
}

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
    let link = document.createElement("a");

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


function createInfo(native, pop, reg, subReg, cap, dom, cur, lang) {
    //Connect HTML elements
    let basicInfo = document.createElement("div");
    basicInfo.setAttribute("id", "basic-info");
    let info2 = document.createElement("div");
    info2.setAttribute("id", "info2");
    let content = document.getElementById("content");
    //Create HTML elements
    let nativeName = document.createElement("h4");
    let population = document.createElement("h4");
    let region = document.createElement("h4");
    let subRegion = document.createElement("h4");
    let capital = document.createElement("h4");
    let domain = document.createElement("h4");
    let currencies = document.createElement("h4");
    let languages = document.createElement("h4");

    //Create text for H4 Elements
    nativeName.innerHTML = "Official Name: ";
    population.innerHTML = "Population: ";
    region.innerHTML = "Region: ";
    subRegion.innerHTML = "Sub Region : ";
    capital.innerHTML = "Capital: ";
    domain.innerHTML = "Top Level Domain: ";
    currencies.innerHTML = "Currencies: ";
    languages.innerHTML = "Languages: ";

    //Create Spans for API data
    let nativeNameHolder = document.createElement("span");
    let populationHolder = document.createElement("span");
    let regionHolder = document.createElement("span");
    let subRegionHolder = document.createElement("span");
    let capitalHolder = document.createElement("span");
    let domainHolder = document.createElement("span");
    let currenciesHolder = document.createElement("span");
    let languagesHolder = document.createElement("span");


    //Create TextNodes with API Data
    nativeNameNode = document.createTextNode(native);
    populationNode = document.createTextNode(pop);
    regionNode = document.createTextNode(reg);
    subRegionNode = document.createTextNode(subReg);
    capitalNode = document.createTextNode(cap);
    domainNode = document.createTextNode(dom);
    currenciesNode = document.createTextNode(cur);
    languagesNode = document.createTextNode(lang);

    //Append API data into Span elements
    nativeNameHolder.appendChild(nativeNameNode);
    populationHolder.appendChild(populationNode);
    regionHolder.appendChild(regionNode);
    subRegionHolder.appendChild(subRegionNode);
    capitalHolder.appendChild(capitalNode);
    domainHolder.appendChild(domainNode);
    currenciesHolder.appendChild(currenciesNode);
    languagesHolder.appendChild(languagesNode);

    //Append Span to H4
    nativeName.appendChild(nativeNameHolder);
    population.appendChild(populationHolder);
    region.appendChild(regionHolder);
    subRegion.appendChild(subRegionHolder);
    capital.appendChild(capitalHolder);
    domain.appendChild(domainHolder);
    currencies.appendChild(currenciesHolder);
    languages.appendChild(languagesHolder);

    //Append H4 elements to parent container
    extraPage.appendChild(content);
    content.appendChild(basicInfo);
    content.appendChild(info2);
    basicInfo.append(countryTitle);
    basicInfo.appendChild(nativeName);
    basicInfo.appendChild(population);
    basicInfo.appendChild(region);
    basicInfo.appendChild(subRegion);
    basicInfo.appendChild(capital);
    info2.appendChild(domain);
    info2.appendChild(currencies);
    info2.appendChild(languages);

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