let miscHeading = document.querySelector('header#main-title h1');
let miscOriginalHeadingContext = "";
let miscButtonYourName = document.querySelector('div#hello-button');
let yourName = localStorage.getItem('yourName');

$(document).ready(function () {
    $("div#hello-button").load("/hello-button.html", function () {
        miscButtonYourName = document.querySelector('div#hello-button');
    });
    $("header#main-title").load("/my-name.html", function () {
        miscHeading = document.querySelector('header#main-title h1');
        miscOriginalHeadingContext = miscHeading.textContent;
        if (yourName !== null) {
            miscHeading.textContent = miscOriginalHeadingContext + ' welcomes ' + yourName + ' to his misc!';
        }
    });
    $("nav").load("/navi.html");
});

function miscSetUserName() {
    miscHeading = document.querySelector('header#main-title h1');
    let yourName = prompt('Please tell me your name:');
    if (!yourName || yourName === null) {
        return;
    }
    else {
        localStorage.setItem('yourName', yourName);
        miscHeading.textContent = miscOriginalHeadingContext + ' welcomes ' + yourName + ' to his misc!';
    }
}

miscButtonYourName.onclick = function () {
    miscSetUserName();
}





