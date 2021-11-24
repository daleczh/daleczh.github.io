let heading = document.querySelector('h1');

function setUserName() {
    let name = prompt('Please tell me your name:');
    if (!name || name === null) {
        setUserName();
    }
    else {
        // localStorage.setItem('name', name);
        heading.textContent = 'Zhaohua CHEN welcomes ' +  name;
    }
}

let buttonYourName = document.querySelector('Button');
buttonYourName.onclick = function () {
    setUserName();
}


