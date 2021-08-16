const insertionSortBtn = document.querySelector('#insertion-sort')

insertionSortBtn.addEventListener('click', async () => {
    let arrayOfHeights = [];
    for (let bars of vizbars) {
        let barHeights = parseInt(bars.style.height)
        arrayOfHeights.push(barHeights)
    }

    await visualizedInsertionSort(arrayOfHeights)
})


const visualizedInsertionSort = async arr => {
    let currentVal;
    let j;
    let i;

    for (i = 1; i < arr.length; i++) {

        currentVal = arr[i];

        //add red to the first item in our list 
        //-------------------------------------
        await sleep()
        vizbars[i].classList.add('red')
        if (vizbars[i - 1] !== vizbars[i]) {
            vizbars[i - 1].classList.remove('red')
        }
        //------------------------------------


        for (j = i - 1; j >= 0; j--) {



            //add blue to the j loop as it searches for the insertion point.
            //-------------------------------------------
            await sleep()
            vizbars[j].classList.add('blue')


            vizbars[j + 1].classList.remove('blue')

            //-------------------------------------------


            if (arr[j] > currentVal) {

                arr[j + 1] = arr[j]
                //make the height of the smaller bar = to the larger bar
                //-----------------------------------------------------
                await sleep()
                vizbars[j + 1].style.height = vizbars[j].style.height

                //-----------------------------------------------------
            } else {
                break;
            }
        }

        //once in correct position set the height equal to the saved value.
        //-----------------------------------------------------
        if (arr[j]) {
            vizbars[j].classList.remove('blue')
            await sleep()
            vizbars[j].classList.add('green')
            await sleep()
            vizbars[j].classList.remove('green')
        }

        vizbars[j + 1].style.height = `${currentVal}px`
        //-----------------------------------------------------
        arr[j + 1] = currentVal
    }
    for (let bars of vizbars) {
        bars.classList.add('orange')
    }
    return arr
}









//------------------------------------Insertion Sort-------------------------------------

//Pseudo Insertion Sort

//nested loops
//temporary value storage
//first loop: iterate from start to finish once.
//second loop: iterate backwards from the selected number
//once you find the insertion point splice. index position, removal of x items, insert value

// [2, 4, 7, 1, 3, 9, 6, 10, 5]
//           i
//        j
//   currVal stored as 1

//ex: [2,3,1,5,4]     
//       j i  
//    [2,3,3,5,4]     
//     j i=1
//    [2,2,3,5,4]
//     i
//    [1,2,3,4,5]
//ex: [2,    ,3    ,3   ,5   ,4]
//            j    j+1
//                 cv=1  

function insertionSort(arr) {
    let currentVal;
    let j;
    //loop through the array
    for (let i = 1; i < arr.length; i++) {
        //store the value at the index of i. We only iterate through once in this loop so by the time we reach the end the array will be sorted.
        //we store the value so that we can 'move backward'.
        currentVal = arr[i];
        //here we can initialize a loop moving backward looking for the position to place the saved 'currentVal'
        for (j = i - 1; j >= 0; j--) {
            //if the number one index behind the 'currentVal' is larger we want to copy the large numbers value and place it forward.
            //if the value is not larger we need to break the loop.
            if (arr[j] > currentVal) {
                arr[j + 1] = arr[j]
            } else {
                break;
            }
        }
        //this will only execute at the 'end' of the inner loop or once the break is hit.
        //this will place that current value in front of the smaller number and because the larger number was duplicated earlier this does not cause an array issue.
        arr[j + 1] = currentVal;
    }
    return arr
}