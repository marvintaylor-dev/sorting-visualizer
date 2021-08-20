const reset = document.querySelector('#reset')

reset.addEventListener('click', randomBars)

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