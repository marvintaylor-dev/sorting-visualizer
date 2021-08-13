let randomize = document.querySelector('#randomize')
let quick_sort = document.querySelector('#quick-sort')
let ref = document.querySelector('script')
let vizbars = document.querySelectorAll('.viz-bar')
let vizBarContainer = document.querySelector('.viz-bars-container')
let counter = document.querySelector('#count-input')
let sleepNumber = document.querySelector('#sleepNumber')


randomize.addEventListener('click', randomBars)
quick_sort.addEventListener('click', quickSort_randomizer)

let swapper = document.querySelector('#swapper')
swapper.addEventListener('click', swapFunc)

function swapFunc() {
    let sizeArr = [];
    const swapArr = (arr, idx1, idx2) => {
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
    }
    for (let bars of vizbars) {
        let size = parseInt(bars.style.height)
        sizeArr.push(size)
    }
    vizbars[0].classList.add('blue')
    vizbars[1].classList.add('red')

    swapArr(sizeArr, 0, 1)
    console.log(sizeArr)
}

//Place randomized heights into an array. Calls sorting method
function quickSort_randomizer() {
    let sizeArr = [];
    for (let bars of vizbars) {
        let size = parseInt(bars.style.height)
        sizeArr.push(size)
    }
    let sorted = quickSort(sizeArr)

    for (let i = 0; i < sorted.length; i++) {
        vizbars[i].style.height = `${sorted[i]}px`
    }

}



//Function to create random sized bars between 1 - 200 px in height
function randomBars() {
    let number = Math.floor(parseInt(counter.value))
    if (!number) return alert('no number input')
    if (number > 100) return alert('number too large')
    for (let i = 0; i < number; i++) {
        let bar = document.createElement('div')
        bar.classList.add('viz-bar')
        vizBarContainer.append(bar)
    }

    vizbars = document.querySelectorAll('.viz-bar')
    for (let bars of vizbars) {
        let random = Math.floor(Math.random() * 200) + 1
        bars.style.height = `${random}px`
    }
}


function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        let pivotIdx = pivot(arr, left, right);
        //left 
        quickSort(arr, left, pivotIdx - 1)
        //right
        quickSort(arr, pivotIdx + 1, right)
    }
    return arr
}



function pivot(arr, start = 0, end = arr.length - 1) {
    const swap = (arr, idx1, idx2) => {
        //adds a red color to the pivot and the number at the pivot index when they're swapped.
        /* for (let j = 0; j < vizbars.length; j++) {
            if (idx1 === j && idx2 === j) {
                vizbars[j].classList.add('red')
            }
        } */
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
        //add an orange color to the pivot points which have been cemented. Eventually ALL points should be orange.
        /* for (let j = 0; j < vizbars.length; j++) {
            if (idx1 === j) {
                vizbars[j].classList.add('orange')
            }
        } */
    }

    let pivot = arr[start];
    let swapIdx = start;

    //assigns a blue color to the pivot number.
    /*  for (let j = 0; j < vizbars.length; j++) {
         if (vizbars[j] === pivot) {
             vizbars[j].classList.add('blue')
         }
     } */


    for (let i = start + 1; i <= end; i++) {
        //Assigns Purple value to numbers larger than the pivot
        if (pivot < arr[i]) {
            for (let j = 0; j < vizbars.length; j++) {
                if (i === j) {
                    vizbars[j].classList.add('purple')
                }
            }
        }

        //assigns a green color to the small numbers that need to come before the pivot
        if (pivot > arr[i]) {
            for (let j = 0; j < vizbars.length; j++) {
                if (swapIdx === j) {
                    vizbars[j].classList.add('green')
                }
            }
            swapIdx++;
            swap(arr, swapIdx, i);
        }
    }
    // Swap the pivot from the start the swapPoint
    swap(arr, start, swapIdx);

    return swapIdx;
}


