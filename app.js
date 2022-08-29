const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div') //divs inside the grid class
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')
console.log(squares)
let currentIndex = 76
let timerId
let currentTime = 20

function moveFrog(e) {
    lose()
    win()
    squares[currentIndex].classList.remove('frog')
    switch (e.key) {
        case 'ArrowLeft':
            if (currentIndex % 9 !== 0) currentIndex -= 1; //avoiding overflow from left
            break;
        case 'ArrowRight':
            if (currentIndex % 9 !== 8) currentIndex += 1;
            break;
        case 'ArrowUp':
            if (currentIndex > 8) currentIndex -= 9;
            break;
        case 'ArrowDown':
            if (currentIndex < 72) currentIndex += 9;
            break;
    }

    squares[currentIndex].classList.add('frog') // adding frog class to current div that frog on
    //the current div is determined by all the squares list and index
}


function autoMoveElements() {
    currentTime--
    timeLeftDisplay.textContent = currentTime

    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
    lose()
    win()
}

function moveLogLeft(logLeft) {
    switch (true) {
        case logLeft.classList.contains('l1'): //check classlist
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break;
        case logLeft.classList.contains('l2'): //check classlist
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break;
        case logLeft.classList.contains('l3'): //check classlist
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break;
        case logLeft.classList.contains('l4'): //check classlist
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break;
        case logLeft.classList.contains('l5'): //check classlist
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break;
        default:
            break;
    }
}

function moveLogRight(logRight) {
    switch (true) {
        case logRight.classList.contains('l1'): //check classlist
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break;
        case logRight.classList.contains('l2'): //check classlist
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break;
        case logRight.classList.contains('l3'): //check classlist
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break;
        case logRight.classList.contains('l4'): //check classlist
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break;
        case logRight.classList.contains('l5'): //check classlist
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break;
        default:
            break;
    }
}

function moveCarLeft(carLeft) {
    switch (true) {
        case carLeft.classList.contains('c1'): //check classlist
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break;
        case carLeft.classList.contains('c2'): //check classlist
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break;
        case carLeft.classList.contains('c3'): //check classlist
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break;
    }
}

function moveCarRight(carRight) {
    switch (true) {
        case carRight.classList.contains('c1'): //check classlist
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break;
        case carRight.classList.contains('c2'): //check classlist
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break;
        case carRight.classList.contains('c3'): //check classlist
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break;
    }
}
function lose() {
   if (
    squares[currentIndex].classList.contains('c1') ||
    squares[currentIndex].classList.contains('l4') ||
    squares[currentIndex].classList.contains('l5') ||
    currentTime <= 0
   ){
    resultDisplay.textContent = "You lose!"
    clearInterval(timerId)
    squares[currentIndex].classList.remove('frog')
    document.removeEventListener('keydown', moveFrog)
   }
}

function win() {
    if(squares[currentIndex].classList.contains('ending-block')){
    resultDisplay.textContent = "You Win!"
    clearInterval(timerId)
    document.removeEventListener('keydown', moveFrog)
    }
}
//event listener with function
startPauseButton.addEventListener('click', () => {
    if(timerId){
        clearInterval(timerId)
        document.removeEventListener('keydown', moveFrog)
        timerId = null //to use else statement
    }else {
        timerId = setInterval(autoMoveElements, 1000)
        document.addEventListener('keydown', moveFrog) //keyup event for everything (document)
    }
})
