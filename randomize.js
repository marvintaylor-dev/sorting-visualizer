let randomize = document.querySelector('#randomize')
let vizbars = document.querySelectorAll('.viz-bar')
let vizBarContainer = document.querySelector('.viz-bars-container')
let counter = document.querySelector('#count-input')
let number = document.querySelector('#barNumber')
const limit = 31;


//use number value to display x number of random bars
number.addEventListener('change', randomBars)

//Function to create random sized bars between 10 - 310 px in height
function randomBars() {
    clearBars()
    number = barNumber.value
    /* if (!number) return alert('no number input')
    if (number > 101) return alert('number too large') */
    for (let i = 0; i < number; i++) {
        let bar = document.createElement('div')
        bar.classList.add('viz-bar')
        vizBarContainer.append(bar)
    }

    vizbars = document.querySelectorAll('.viz-bar')
    for (let bars of vizbars) {
        let random = Math.floor(Math.random() * 450) + 25
        bars.style.height = `${random}px`
        if (vizbars.length < limit) {
            bars.innerHTML = parseInt(bars.style.height);
        }
    }
}

//display bars on page load
randomBars()


function clearBars() {
    for (let bars of vizbars) {
        vizBarContainer.removeChild(bars);
    }
}