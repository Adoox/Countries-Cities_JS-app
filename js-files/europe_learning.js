const search_country = document.querySelector(".search_country");
const search_country_btn = document.querySelector("#search_country_btn");
const flag_box = document.querySelector(".flag_box");
const country_name = document.querySelector("#country_name");
const capital_city = document.querySelector("#capital_city");
const region = document.querySelector("#region");
const subregion = document.querySelector("#subregion");
const population = document.querySelector("#population");
const type_name = document.querySelector(".type-name-to-search");
const error_box = document.querySelector(".error-box");
const error_msg = document.querySelector("#error-msg");

const informations = {};

$(search_country_btn).click(function () {
  type_name.remove(); //brisanje diva sa informacijama nakon prvok pritiska na search button
  let country_api = `https://restcountries.eu/rest/v2/name/${search_country.value}`; /*dohvacanje podataka uz pomoc vrijednosti drzave koju korisnik unese*/

  fetch(country_api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      console.log(data);
      informations.flag = data[0].flag;
      informations.country_name = data[0].name;
      informations.capital_city = data[0].capital;
      informations.region = data[0].region;
      informations.subregion = data[0].subregion;
      informations.population = data[0].population;
    })
    .then(function () {
      displayAllInformation();
    }).then(function () {
      removeError();
    }).catch(function () {
      console.log("Wrong");
      displayError();
    });
});

function displayAllInformation() {
  flag_box.innerHTML = `<img src="${informations.flag}"/>`;
  country_name.innerHTML = informations.country_name;
  capital_city.innerHTML = `<span id="span">Capital city: </span>${informations.capital_city}`;
  region.innerHTML = `<span id="span">Region: </span>${informations.region}`;
  subregion.innerHTML = `<span id="span">Subregion: </span>${informations.subregion}`;
  population.innerHTML = `<span id="span">Population: </span>${informations.population}`;
}

function displayError() {//funkcija za prikaz errora u slucaju da je ime drzave pogresno uneseno ili je polje prazno
  error_msg.innerHTML = `<span>Empty value or wrong country name!</span>`;
}

function removeError() {//funkcija kojom cemo "izbrisat" error kada je unos korisnika ispravan
  error_msg.innerHTML = `<span></span>`
}
