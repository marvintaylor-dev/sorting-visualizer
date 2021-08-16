let randomize = document.querySelector('#randomize')
let vizbars = document.querySelectorAll('.viz-bar')
let vizBarContainer = document.querySelector('.viz-bars-container')
let counter = document.querySelector('#count-input')
let number;


randomize.addEventListener('click', randomBars)

//Function to create random sized bars between 1 - 200 px in height
function randomBars() {
    clearBars()
    number = Math.floor(parseInt(counter.value))
    if (!number) return alert('no number input')
    if (number > 100) return alert('number too large')
    for (let i = 0; i < number; i++) {
        let bar = document.createElement('div')
        bar.classList.add('viz-bar')
        vizBarContainer.append(bar)
    }

    vizbars = document.querySelectorAll('.viz-bar')
    for (let bars of vizbars) {
        let random = Math.floor(Math.random() * 300) + 1
        bars.style.height = `${random}px`
    }
}


function clearBars() {
    for (let bars of vizbars) {
        vizBarContainer.removeChild(bars);
    }
}