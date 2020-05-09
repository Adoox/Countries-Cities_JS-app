const click_btn = document.querySelector("#button1");
const check_btn = document.querySelector("#button2");
const help_btn = document.querySelector("#button3");
const skip_btn = document.querySelector("#button4");
const flag_place = document.querySelector(".flag_place");
const country_name = document.querySelector(".country_name p");
const input = document.querySelector(".input_place");
const press_next = document.querySelector(".press-next-to-start");
const help_msg = document.querySelector("#help-msg");
const empty_eror = document.querySelector("#empty_value");
const options_box = document.querySelector(".options-buttons-box");

const information = {}; //prazan objekat u kojeg smjestamo sve potrebne informacije

$(click_btn).click(function () {
  random = Math.floor(
    Math.random() * 54
  ); /*generisanje random broja koji ce predstavljati odredenu drzavu iz niza*/
  //let api = "https://restcountries.eu/rest/v2/all";
  /*let api = `https://restcountries.eu/rest/v2/name/Croatia`;*/
  let api = `https://restcountries.eu/rest/v2/region/europe`;
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      console.log(data);
      information.country_flag = data[random].flag;
      information.name = data[random].name;
      capital_city = data[random].capital;
      capital_city_lowerCase = capital_city.toLowerCase();
      slova = capital_city_lowerCase.split("");
      console.log(capital_city);
      console.log(slova);
      console.log(slova[0]);
    })
    .then(function () {
      displayInformation();
    })
    .then(function () {
      $(input).val(""); /*resertovanje polja za unos*/
      click_btn.setAttribute("disabled", "disabled");
      $(click_btn).css("border", "none");
    });
  press_next.remove(); //brisanje diva sa tekstom "press next button to start quiz" nakon sto pokrenemo kviz
  removeHelp_msg();//pritiskom na next button pozivamo funkciju kojom brisemo help poruke za prethodni grad
});


$(check_btn).click(function () {
  /*funckija za provjeru ispravnosti unesenog glavmog grada*/
  console.log(random);
  console.log(capital_city);
  input_value = input.value;
  input_value_lowerCase = input_value.toLowerCase();
  result = input_value_lowerCase.localeCompare(
    capital_city_lowerCase
  ); /*uporeduje unos korisnika i vrijednost glavnog grada za odredenu drzavu*/
  if (result == 0) {
    console.log("true");
    click_btn.removeAttribute(
      "disabled"
    ); /*postavljanje vrijednosti "enable" na button kada je odgovor tacan*/
    $(click_btn).css("border", "3px solid #1ce73d");
  } else {
    console.log("false");
    click_btn.setAttribute(
      "disabled",
      "disabled"
    ); /*postavljanje vrijednosti "disable" na button kada je odgovor netacan*/
    $(click_btn).css("border", "3px solid red");
  }

  if (input_value == "") {
    removeHelp_msg();
    empty_value();
  } else {
    remove_empy_error();
  }
});

$(help_btn).click(function () {
  getHelp();
  remove_empy_error();
});

$(skip_btn).click(function () {
  random = Math.floor(
    Math.random() * 54
  ); /*generisanje random broja koji ce predstavljati odredenu drzavu iz niza*/
  let api = `https://restcountries.eu/rest/v2/region/europe`;
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      console.log(data);
      information.country_flag = data[random].flag;
      information.name = data[random].name;
      capital_city = data[random].capital;
      capital_city_lowerCase = capital_city.toLowerCase();
      slova = capital_city_lowerCase.split("");
      console.log(capital_city);
      console.log(slova);
      console.log(slova[0]);
    })
    .then(function () {
      displayInformation();
    });
  press_next.remove(); //brisanje diva sa tekstom "press next button to start quiz" nakon sto pokrenemo kviz
  removeHelp_msg();//pritiskom na next button pozivamo funkciju kojom brisemo help poruke za prethodni grad
  remove_empy_error();
});


function displayInformation() {
  flag_place.innerHTML = `<img src="${information.country_flag}"/>`;
  country_name.innerHTML = `${information.name}`;
}

//funkcija za ispis pomoci
//pomoc se sastoji od broja slova koliko grad ima u svom sastavu
//pored broja slova tu je i prvo i zadnje slovo rijeci
function getHelp() {
  help_msg.innerHTML = `<span>Number of letters: ${capital_city.length} </span></br><span>First letter: ${slova[0].toUpperCase()} </span></br><span>Last letter: ${slova[capital_city.length - 1]} </span>`;
}

//funkcija za brisanje poruka za pomoc
function removeHelp_msg() {
  help_msg.innerHTML = `<span></span>`;
}

function empty_value() {
  empty_eror.innerHTML = `<span>Error: Empty Value!</span>`;
}

function remove_empy_error() {
  empty_eror.innerHTML = `<span></span>`;
}
