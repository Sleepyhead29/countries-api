let inpuField = document.getElementById("inputField");

inpuField.addEventListener("focusout", getApi);

async function getApi() {
    let response = await fetch(`https://restcountries.com/v3.1/name/${inpuField.value}`)
    let data = await response.json();

    data.forEach(element => {
        let indexNb = data.indexOf(element)
        console.log(data[indexNb].name);
    });
    return data;
}