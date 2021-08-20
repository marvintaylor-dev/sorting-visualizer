let sleepNumber = document.querySelector('#sleepNumber')

sleepNumber.addEventListener('change', () => {
    console.log(sleepNumber.value)
})

let sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, 500 - sleepNumber.value || milliseconds))
}

