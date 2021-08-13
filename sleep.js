sleepNumber.addEventListener('change', () => {
    console.log(sleepNumber.value)
})

let sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, sleepNumber.value || milliseconds))
}

