let heading = document.querySelector('header#main-title h1');
let originalHeadingContext = "";
let buttonYourName = document.querySelector('div#hello-button');
let yourName = localStorage.getItem('yourName');

$(document).ready(function () {
    $("div#hello-button").load("/hello-button.html", function () {
        buttonYourName = document.querySelector('div#hello-button');
    });
    $("header#main-title").load("/my-name.html", function () {
        heading = document.querySelector('header#main-title h1');
        originalHeadingContext = heading.textContent;
        if (yourName !== null) {
            heading.textContent = originalHeadingContext + ' welcomes ' + yourName + ' !';
        }
    });
    $("nav").load("/navi.html");
});

function setUserName() {
    heading = document.querySelector('header#main-title h1');
    let yourName = prompt('Please tell me your name:');
    if (!yourName || yourName === null) {
        return;
    }
    else {
        localStorage.setItem('yourName', yourName);
        heading.textContent = originalHeadingContext + ' welcomes ' + yourName + ' !';
    }
}

buttonYourName.onclick = function () {
    setUserName();
}


