let cellElements = [];
let currKey = "", prevKey = "", username = "";
let foods, snake, barriers, gameInterval, mode = 0;
const grid = document.getElementById("grid");
const tabPanels = document.querySelectorAll(".tab-pane");

// ------------- STARTING GAME --------------->

function renderScreen() {
    console.log(`Rendering screen...`);
    if (currKey != "") snake.move(currKey);
    if (checkGame()) {
        render(foods.container, "food");
        render(snake.body, "snake");
    }
}

function startGame() {
    showModeChange();
    foods = new Foods();
    snake = new Snake();
    barriers = new Barriers();
    updateScoreboard();
    document.getElementById("points").innerHTML = snake.points;
    barriers.makeBarrier(lvls[mode].barrier);
    foods.makeFood(lvls[mode].food);
    render(barriers.container, "barrier");
    renderScreen();
    gameInterval = setInterval(renderScreen, lvls[mode].speed);
}

function checkGame() {
    if (snake.hitBorder() || snake.onBody() || snake.hits(barriers)) {
        gameInterval = clearInterval(gameInterval);
        endGame();
        showEndPopup();
        updateScoreboard();
        updateGist();
        return false;
    }
    if (snake.hits(foods)) {
        snake.expand();
        foods.removeFood(snake.head);
        document.getElementById("points").innerHTML = snake.points;
        animateCSS(document.getElementById("points"));
        if (lvls[mode].food > foods.container.length)
            foods.makeFood(lvls[mode].food - foods.container.length);
    }
    return true;
}

function startSession() {
    renderCells();
    getGist();
    renderButtons();
    window.dark = true;

    if (!cookieExists("username")) cookieDoesNotExistPopup();
    else {
        username = getCookie("username");
        cookieExistsPopup(); // cookies call startGame()
    }
}

startSession();

// -------------- EVENT LISTENERS ------------->

window.addEventListener('keydown', function(event) {
    currKey = event.key;
    console.log(currKey);
});

$(document).ready(function() {
    $('#toggle').change(function() {
        if ($(this).prop('checked')) { // initial state
            window.dark = true;
            $(document.body).css("background-image", "linear-gradient(rgb(240,122,175), rgb(181,136,202)");
            $(".right-col").css("color", "white");
            $(".right-col").css("background-image", "linear-gradient(rgb(143,142,244), rgb(29,39,48))");
            $("a").css("color", "white");
            $("#grid").css("background-color", "rgb(46,52,66)");
            $("#grid div:nth-child(odd)").css("background-color", "rgb(36,43,54)");
        }
        else {
            window.dark = false;
            $(document.body).css("background-image", "linear-gradient(#55423d, #55423d)");
            $(".right-col").css("color", "#271c19");
            $(".right-col").css("background-image", "linear-gradient(#ffc0ad, #ffc0ad)");
            $("a").css("color", "#271c19");
            $("#grid").css("background-color", "#fff3ec");
            $("#grid div:nth-child(odd)").css("background-color", "#dfd5d0");
        }
    })
});

// --------------- MISC FUNCTIONS ---------->

function updateScoreboard() {
    tabPanels[mode].children[2].innerHTML = "";
    if (!lvls[mode].getScores().some( pair=> pair[0] == username)){ // if the username does not exists
        lvls[mode].addNewRecord(username, 0);
    } // add a new record to the lvls[mode].score
    else if (snake.points >= lvls[mode].getScore(username)){ // if the current points is more
        lvls[mode].updateScore(username, snake.points); // update it
    }
    lvls[mode].getScores().forEach( score=> {
        const li = document.createElement("p");
        li.innerHTML = `<i class="fas fa-award"></i>  ${score[0]} - ${score[1]}`;
        $(li).hide().appendTo(tabPanels[mode].children[2]).fadeIn(1000);
    })
}

function endGame() {
    currKey = "";
    prevKey = "";
    cellElements.forEach( cell=> {
        cell.classList.remove("food");
        cell.classList.remove("barrier");
        cell.classList.remove("snake");
    })
}

function getCell(x, y) { return cellElements[x * cols + y]; }

function animateCSS(element) {
    return new Promise((resolve, reject) => {
        element.classList.add('animate__animated', `animate__bounce`);
        handleAnimationEnd = () => {
            element.classList.remove("animate__animated", `animate__bounce`);
            element.removeEventListener('animationend', handleAnimationEnd);
            resolve('Animation ended');
        }
        element.addEventListener('animationend', handleAnimationEnd);
    })
}


// ------------------ RENDER FUNCTIONS ------------>

function renderCells() {
    for (let i = 0; i < rows * cols; i++) {
      let cell = document.createElement("div");
      cellElements.push(cell);
      grid.appendChild(cell);
    }
}

function render(items, cssClass) {
    items.forEach( item=> {
        let cell = getCell(item.x, item.y);
        cell.classList.add(cssClass);
    })
}

function renderButtons() {
    const buttons = document.querySelectorAll(".button");
    let colors = ["rgba(209,206,253,.3)", "rgba(63,166,145,.3)", "rgba(143,142,244, .3)", "rgba(240,122,175, .3)", "rgba(36,43,54,.3)"];

    for (let i = 0 ; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(e) {
            buttons.forEach(button=> { button.style.background = "none"; })
            buttons[i].style.background = colors[i];
            tabPanels[i].style.background = `linear-gradient(${colors[i]}, rgba(255,255,255,.3))`;
            gameInterval = clearInterval(gameInterval);
            endGame();
            mode = i;
            updateScoreboard();
            startGame();
        })
    }
    buttons[0].style.background = colors[0];
    tabPanels[0].style.background = `linear-gradient(${colors[0]}, rgba(255,255,255,.3))`;
}

