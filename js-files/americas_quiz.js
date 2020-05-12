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
        Math.random() * 58
    ); /*generisanje random broja koji ce predstavljati odredenu drzavu iz niza*/
    //let api = "https://restcountries.eu/rest/v2/all";
    /*let api = `https://restcountries.eu/rest/v2/name/Croatia`;*/
    let api = `https://restcountries.eu/rest/v2/region/americas`;
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
        remove_empty_error();
    }
});

$(help_btn).click(function () {
    getHelp();
    remove_empty_error();
});

$(skip_btn).click(function () {
    random = Math.floor(
        Math.random() * 58
    ); /*generisanje random broja koji ce predstavljati odredenu drzavu iz niza*/
    let api = `https://restcountries.eu/rest/v2/region/americas`;
    fetch(api)//dohvacanje apija
        .then(function (response) {//prosljedivanje odgovora odnosno zahtjeva samog apija
            let data = response.json();//podatke koje smo povukli transformisemo u json format kako bi ih mogli citati
            return data;//vracamo podatke u jason formatu koje cemo koristiti u nastavku programa
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
            setTimeout(function () {
                displayInformation();
            }, 2000);
            // displayInformation();
        });
    show_capital_city();
    setTimeout(function () {//setTimeout funkcija koja ce se pozvati sve ostale potrebne funkcije 2 sekunde nakon sto se pritiskom na skip opciju ispise ime glavnog grada
        press_next.remove();
        removeHelp_msg();
        remove_empty_error();
        click_btn.setAttribute( //pritiskom na skip opciju postavljamo vrijednost next opcije na disable kako bi izbjegli odredjeni bug 
            "disabled",
            "disabled"
        );
        $(click_btn).css("border", "none"); //ako smo odgovorili tacno a pritisnuli smo skip umjesto next postavili smo vrijednost next opcije na disable te uklonuli border kako izbor za sljedecu drzavu bio validan
    }, 2000);
    // press_next.remove(); //brisanje diva sa tekstom "press next button to start quiz" nakon sto pokrenemo kviz
    // removeHelp_msg();//pritiskom na next button pozivamo funkciju kojom brisemo help poruke za prethodni grad
    // remove_empty_error();
    // click_btn.setAttribute( //pritiskom na skip opciju postavljamo vrijednost next opcije na disable kako bi izbjegli odredjeni bug 
    //   "disabled",
    //   "disabled"
    // );
    // $(click_btn).css("border", "none"); //ako smo odgovorili tacno a pritisnuli smo skip umjesto next postavili smo vrijednost next opcije na disable te uklonuli border kako izbor za sljedecu drzavu bio validan
});


function displayInformation() {
    flag_place.innerHTML = `<img src="${information.country_flag}"/>`;
    country_name.innerHTML = `${information.name}`;
}

//funkcija za ispis pomoci
//pomoc se sastoji od broja slova koliko grad ima u svom sastavu
//pored broja slova tu je i prvo i zadnje slovo rijeci
function getHelp() {
    // help_msg.innerHTML = `<span>Number of letters: ${capital_city.length} </span></br><span>First letters: ${slova[0].toUpperCase()} </span></br><span>Last letter: ${slova[capital_city.length - 1]} </span>`;
    /*funkcija kojom se prikazuje pomoc korisniku u vidu praznih mjesta koji oznacavaju broj slova koja nedostaju. 
    Kao pomoc su data i odredjena slova, odnosno prvo slovo, zatim slovo koje se nalazi u sredini koje smo dobili dijeljenjem ukupnog broja slova sa 2, te zadnje slovo 
    Postavili smo uvjet kojim provjeravamo da li je broj slova odredjenog grada paran ili ne. Ukoliko broj nije paran, za slovo koje se nalazi u sredini koristimo cjelobrojno dijeljenje*/
    let dash = "__  ";
    var x = capital_city.length / 2;
    if (capital_city.length % 2 == 0) {
        help_msg.innerHTML = `<span>${slova[0].toUpperCase()}${dash.repeat(capital_city.length / 2 - 1)}${slova[capital_city.length / 2]}${dash.repeat(capital_city.length - capital_city.length / 2 - 2)}${slova[capital_city.length - 1]}</span>`;
    } else {
        help_msg.innerHTML = `<span>${slova[0].toUpperCase()}${dash.repeat(Math.floor(x) - 1)}${slova[Math.floor(x)]}${dash.repeat(capital_city.length - Math.floor(x) - 2)}${slova[capital_city.length - 1]}</span>`;
    }
}

//funkcija za brisanje poruka za pomoc
function removeHelp_msg() {
    help_msg.innerHTML = `<span></span>`;
}

//funkcija za prikaz errora
function empty_value() {
    empty_eror.innerHTML = `<span>Error: Empty Value!</span>`;
}

//funkcija za brisanje errora
function remove_empty_error() {
    empty_eror.innerHTML = `<span></span>`;
}

//funkcija za porikaz imena glavnog grada ukoliko korisnik odabere opciju "skip"
function show_capital_city() {
    //poruku cemo ispisati na mjestu help poruke
    help_msg.innerHTML = `<span>Answer: ${capital_city}</span>`;
}

//pritiskom na input polje brisemo help poruku i error poruku
$(input).click(function () {
    removeHelp_msg();
    remove_empy_error();
})


