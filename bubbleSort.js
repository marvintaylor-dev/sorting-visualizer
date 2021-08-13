

const bubbleBtn = document.querySelector('#bubble-sort');
let vizbarHeight;





bubbleBtn.addEventListener('click', async () => {
    //places the randomized heights from the randomizer button into an array for processing.
    let arrayOfHeights = [];
    for (let bars of vizbars) {
        let barHeights = parseInt(bars.style.height)
        arrayOfHeights.push(barHeights)
    }

    await visualizedBubbleSort(arrayOfHeights)
})



const visualizedBubbleSort = async arr => {

    let marker0 = 0
    let marker1 = 1


    let noSwaps;

    for (let i = arr.length; i > 0; i--) {


        if (i < arr.length) {
            vizbars[i].classList.add('orange')
        }

        noSwaps = true

        marker0 = 0;
        marker1 = 1;


        for (let j = 0; j < i - 1; j++) {
            await sleep()

            vizbars[marker0].classList.add('red')
            vizbars[marker1].classList.add('red')

            /* vizbarHeight = parseInt(vizbars[j].style.height) */

            if (arr[j] > arr[j + 1]) {
                await sleep()
                vizbars[marker0].classList.add('blue')
                vizbars[marker1].classList.add('blue')

                var temp = arr[j];
                let temp1 = vizbars[j].style.height;

                arr[j] = arr[j + 1];
                vizbars[j].style.height = vizbars[j + 1].style.height;
                /* vizbars[j].style.height = `${arr[j + 1]}px` */

                arr[j + 1] = temp;
                vizbars[j + 1].style.height = temp1
                /* vizbars[j + 1].style.height = `${temp}px` */


                noSwaps = false
            }
            await sleep()
            vizbars[marker0].classList.remove('blue')
            vizbars[marker1].classList.remove('blue')

            marker0++
            marker1++


            vizbars[marker0 - 1].classList.remove('red')

        }

        if (noSwaps) break;


    }
    for (let bar of vizbars) {
        bar.classList.add('orange')
    }
    return arr
}

//----------------------------bubble sort explanation--------------------------


//ES5 Syntax
function swapES5(arr, idx1, idx2) {   //accept 3 values: array, index1, index2

    var temp = arr[idx1];         // stores the value at array[index1] temporarily

    arr[idx1] = arr[idx2];        // array[index1] is set equal to array[index2]

    arr[idx2] = temp;             // array[index2] is set to the earlier saved value 
    // of array[index1]
}

//ES2015
const swapES2015 = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

/*
Bubble sort 'visualization'
 
12   45   13   2   5   21  undef
j > j+1    ---> will increment up to i-l or 'length minus 1 to give us the last index.
                In the next loop the largest number will be in place and i will be smaller. preventing us from iterating over the last number again.              
                        <-- i Starting point is the length (it decrements to the left)
*/

function bubbleSort(arr) {
    //no swaps will be used to show that no swaps happened in the last iteration. Therefore return the array early, because no more swaps need to be made.
    let noSwaps;
    //Begin 'i' at the back of the array and decrement. The sorted number ends up at the ends so we don't need to iterate over them again. This allows us to leave them alone.
    for (let i = arr.length; i > 0; i--) {
        //set no swaps to be true in the first loop. With every iteration we will reset noSwaps to true. If it remains true at the en
        noSwaps = true
        //Create a nested loop which runs through the whole array for each digit of the array. ex: 1: 1,2,3,4,5,6,7 ; 2: 1,2,3,4,5,6,7 etc. This loop will be as long as i - 1 so that each subsequent loop gets smaller as to note iterate over pieces that have already been sorted. 
        for (let j = 0; j < i - 1; j++) {
            //J begins at the front of the array. J + 1 is the comparison. Both move forward together as they compare each and every pair of numbers over and over again. is arr[j] > arr[j+1] ? if so they swap places and both move on. 
            if (arr[j] > arr[j + 1]) {
                //the first number was bigger than the second number so run the swap functionality.
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                //set noSwaps to false as a swap has been made and we don't want to break the loop. We will return now to the top loop and reset noSwaps to true to check if any swaps will be made
                noSwaps = false
            }
        }
        //if noSwaps made it through an iteration without initiating the swap functionality. It means we're done. There's no need to iterate further.
        if (noSwaps) break;
    }
    //The nested j loop runs until i eventually gets down to 0. At which time the algorithm ends and returns the final array value
    return arr
}

//ES2015 syntax Bubble Sort - without comments.

/* function bubbleSort(arr) {
    const swap = (arr, idx1, idx2) => {
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
    }

    for (let i = arr.length; i > 0; i--) {
        for (let j = 0; j < i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, arr[j], arr[j + 1])
            }
        }
    }
    return arr;
} */