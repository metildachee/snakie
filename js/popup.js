function showEndPopup() {
    let backgroundColor, confirmButtonColor = "";
    if (window.dark) {
        backgroundColor = `linear-gradient(rgba(209,206,253,.8), rgba(255,255,255,.5))`;
        confirmButtonColor = "rgb(63,166,145)";
    }
    else {
        backgroundColor = `linear-gradient(rgba(255,206,191,.8), rgba(255,255,255,.8))`;
        confirmButtonColor = "rgb(255,192,173)";
    }
    swal.fire({
        title: "Uh oh! You lost.",
        text: `Try again!`,
        background: backgroundColor,
        allowOutsideClick: false,
        confirmButtonText: "Restart",
        confirmButtonColor: confirmButtonColor,
    }).then((value) => { startGame(); });
}

function cookieDoesNotExistPopup() {
    const { value: text } = Swal.fire({
        title: 'Enter your username..',
        text: 'P.S. capitalised names look better!',
        input: 'text',
        background: `linear-gradient(rgba(209,206,253,.9), rgba(255,255,255,.8))`,
        confirmButtonColor: "rgb(63,166,145)",
        allowOutsideClick: false,
        inputPlaceholder: 'moshimoshicheese',
        showCancelButton: false,
        inputValidator: value => {
            if (!value) return 'You need to write something!'
            else username = value;
        }
    }).then(text => { 
        if (text.value) {
            username = text.value; 
            setCookie("username", username, 1);
            Swal.fire({
                title: `Instructions, ${username}`,
                html: `<img src="https://raw.githubusercontent.com/metildachee/snakie/master/img/brickwall.png"> Represents a barrier, avoid them at all costs! </br><img src="https://raw.githubusercontent.com/metildachee/snakie/master/img/hamburger.png"> Represents a snakie's food, eat them!`,
                background: `linear-gradient(rgba(209,206,253,.9), rgba(255,255,255,.8))`,
                confirmButtonColor: "rgb(63,166,145)",
                allowOutsideClick: false,
                confirmButtonText: "Let's start!"
            }).then( value=> { startGame(); })
        }
    });
}

function cookieExistsPopup() {
    Swal.fire({
        title: `Welcome back ${username}!`,
        text: "Snakie is best viewed on Chrome or Firefox",
        background: `linear-gradient(rgba(209,206,253,.9), rgba(255,255,255,.8))`,
        confirmButtonColor: "rgb(63,166,145)",
        allowOutsideClick: false,
    }).then( value=> {
        startGame();
    });
}

function showModeChange() {
    let textNodes = [
        {
            id: "easy",
            text: `${username}, it'll be a piece of cake for a smartie like you!`
        },
        {
            id: "moderate",
            text: `So easy right, ${username}?`
        },
        {
            id: "difficult",
            text: `${username}, we're adding barriers. Be sure not to hit them!`
        },
        {
            id: "freak",
            text: `Woah woah woah.. ${username}, are you sure?! You're gonna go faster!`
        },
        {
            id: "hell",
            text: `Zen, ${username}, zen.`
        }, 
    ];

    let backgroundColor = "";
    if (window.dark) {
        backgroundColor = `linear-gradient(rgba(209,206,253,.9), rgba(255,255,255,.6))`;
        confirmButtonColor = "rgb(63,166,145)";
    }
    else {
        backgroundColor = `linear-gradient(rgba(255,206,191,.9), rgba(255,255,255,.8))`;
        confirmButtonColor = "rgb(255,192,173)";
    }

    Swal.fire({
        html: `<h2>Starting ${textNodes[mode].id} game in <b></b> seconds...</h2>
                ${textNodes[mode].text} <strong>When you're ready, press any arrow key to move.</strong>`,
        timer: 3000,
        background: backgroundColor,
        timerProgressBar: true,
        showConfirmButton: false,
        padding: '2em',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                b.textContent = Math.round(Swal.getTimerLeft()/1000);
              }
            }
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
    })
}