let galleryHeading = document.querySelector('header#main-title h1');
let galleryOriginalHeadingContext = "";
let galleryButtonYourName = document.querySelector('div#hello-button');
let yourName = localStorage.getItem('yourName');

$(document).ready(function () {
    $("div#hello-button").load("/hello-button.html", function () {
        galleryButtonYourName = document.querySelector('div#hello-button');
    });
    $("header#main-title").load("/my-name.html", function () {
        galleryHeading = document.querySelector('header#main-title h1');
        galleryOriginalHeadingContext = galleryHeading.textContent;
        if (yourName !== null) {
            galleryHeading.textContent = galleryOriginalHeadingContext + ' welcomes ' + yourName + ' to his gallery!';
        }
    });
    $("nav").load("/navi.html");
});

function gallerySetUserName() {
    galleryHeading = document.querySelector('header#main-title h1');
    let yourName = prompt('Please tell me your name:');
    if (!yourName || yourName === null) {
        return;
    }
    else {
        localStorage.setItem('yourName', yourName);
        galleryHeading.textContent = galleryOriginalHeadingContext + ' welcomes ' + yourName + ' to his gallery!';
    }
}

galleryButtonYourName.onclick = function () {
    gallerySetUserName();
}





