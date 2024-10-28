import './style.css';

const track = document.querySelector('.carousel__track');
const left = document.querySelector('.carousel__button--left');
const right = document.querySelector('.carousel__button--right');

const trackSize = (track.children.length - 1) * 40;
let position = 0;
let indicatorCounter = 0;
let myTimer = setTimeout(moveRight, 5000);

function moveRight() {
    position += -40;
    track.style.left = `${position}rem`;
    chechBoundries()
    indicatorCounter++;
    changeIndicator();
    resetTimer()
}

function moveLeft() {
    position += 40;
    track.style.left = `${position}rem`;
    chechBoundries();
    indicatorCounter--;
    changeIndicator();
    resetTimer();
}

right.addEventListener('click', moveRight);
left.addEventListener('click', moveLeft);

function chechBoundries() {
    if (position === 0) {
        left.classList.toggle('boundry', true);
        right.classList.toggle('boundry', false);
    } else if (position === -trackSize) {
        right.classList.toggle('boundry', true);
        left.classList.toggle('boundry', false);
    } else  {
        left.classList.toggle('boundry', false);
        right.classList.toggle('boundry', false);
    }
}

function resetTimer() {
    clearTimeout(myTimer);
    if (position != (-1 * trackSize)) {
        myTimer = setTimeout(moveRight, 5000);
    }
}

const indicators = document.querySelectorAll('.carousel__indicator');

indicators.forEach(indicator => {
    const index = Array.from(indicators).indexOf(indicator);
    const newPosition = (-40) * index;
    indicator.addEventListener('click', () => {
        position = newPosition;
        track.style.left = `${position}rem`;
        chechBoundries();
        indicatorCounter = index;
        changeIndicator();
        resetTimer();
    })
})

function changeIndicator() {
    document.querySelector('.active-slide').classList.toggle('active-slide', false);
    indicators[indicatorCounter].classList.toggle('active-slide', true);
}