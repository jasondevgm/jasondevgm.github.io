let lng_btn_1 = document.getElementById("language-btn-1");
let lng_btn_2 = document.getElementById("language-btn-2");
let lng_btn_3 = document.getElementById("language-btn-3");

let lng_btns = document.getElementById("language-btns");

let navigator_lang = navigator.language || navigator.userLanguage;
let selected_language = "";
console.log(navigator_lang);

if (/^es*$/.test(navigator_lang)) {
    lng_btn_2.style.display = "flex";
    lng_btn_2.style.order = "1";
    lng_btn_1.style.order = "2";
    lng_btn_3.style.order = "3";
    lng_btn_2.addEventListener("mouseover", event => {
        lng_btn_1.style.display = "flex";
        lng_btn_3.style.display = "flex";
    });
    lng_btn_2.addEventListener("mouseout", event => {
        setTimeout(() => {
            lng_btn_1.style.display = "none";
            lng_btn_3.style.display = "none";
        }, 3000);
    });
} else if (/^ca*$/.test(navigator_lang)) {
    lng_btn_3.style.display = "flex";
    lng_btn_3.style.order = "1";
    lng_btn_1.style.order = "2";
    lng_btn_2.style.order = "3";
    lng_btn_3.addEventListener("mouseover", event => {
        lng_btn_1.style.display = "flex";
        lng_btn_2.style.display = "flex";
    });
    lng_btn_3.addEventListener("mouseout", event => {
        setTimeout(() => {
            lng_btn_1.style.display = "none";
            lng_btn_2.style.display = "none";
        }, 3000);
    });
} else {
    lng_btn_1.style.display = "flex";
    lng_btn_1.style.order = "1";
    lng_btn_2.style.order = "2";
    lng_btn_3.style.order = "3";
    lng_btn_1.addEventListener("mouseover", event => {
        lng_btn_1.style.display = "flex";
        lng_btn_3.style.display = "flex";
    });
    lng_btn_1.addEventListener("mouseout", event => {
        setTimeout(() => {
            lng_btn_2.style.display = "none";
            lng_btn_3.style.display = "none";
        }, 3000);
    });
}



