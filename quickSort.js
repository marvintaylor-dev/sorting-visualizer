let quick_sort = document.querySelector('#quick-sort')


quick_sort.addEventListener('click', async () => {
    let arrayOfHeights = [];
    for (let bars of vizbars) {
        let size = parseInt(bars.style.height)
        arrayOfHeights.push(size)
    }


    await quickSortVisualized(arrayOfHeights)

    //make all remaining bars orange to demonstrate the algo is finished
    for (let i = 0; i < vizbars.length; i++) {
        vizbars[i].classList.add('orange')
    }
})


//accepts an array, left(start), right{end} arguments. Initially it is called with just an array and is later recursively called with the other inputs.
async function quickSortVisualized(arr, left = 0, right = arr.length - 1) {
    //if left index is greater than the right index create a pivot index. For this we call the helper function pivot.
    if (left < right) {
        //see pivot function for explanation.
        let pivotIdx = await pivotVisualized(arr, left, right);

        await sleep()
        vizbars[pivotIdx].classList.add('red');

        await sleep()
        vizbars[pivotIdx].classList.remove('red');



        await quickSortVisualized(arr, left, pivotIdx - 1),
            await quickSortVisualized(arr, pivotIdx + 1, right)


    }

    return arr
}



//pivot accepts the array, left, and right value
async function pivotVisualized(arr, start = 0, end = arr.length - 1) {
    //pivotValue is equal the value at array[start]. Do no confuse this with arr[0]. Start's value will change with the recursive calls.
    let pivotValue = arr[start];
    //pivotIndex is equal to start. Start is only a number. Which means pivotIdx is what the name suggests. An index number.
    //the pivot index is where the current pivot will swap to once a full iteration of the array has been made.
    let pivotIdx = start;

    //show the current bar being used as a comparision in red
    vizbars[start].classList.add('red')
    //iterate from the start value + 1 (to avoid comparing the pivotValue to itself) to the end.
    for (let i = start + 1; i <= end; i++) {
        //every time the pivotValue is greater than the next value in the array. increase the pivot index.
        if (pivotValue > arr[i]) {
            pivotIdx++;
            await sleep()
            vizbars[pivotIdx].classList.add('purple')
            //run swap with the arr value, the pivot index, and the value of i when the condition was met.
            //we do this so every number smaller than the pivot is lined up next to it so that when we exit the loop we can make the 'final' swap.
            await swapVisualized(arr, pivotIdx, i);
        }
    }

    for (let i = 0; i < vizbars.length; i++) {
        vizbars[i].classList.remove('purple')
    }
    //once we've reached the end of the loop we finally swap the pivot with the value at arr[pivotIdx].
    await swapVisualized(arr, start, pivotIdx);
    //we return the pivot index to be used in the next recursive calls

    //remove red to only show the one number being compared
    vizbars[start].classList.remove('red')
    //add orange to show that the bar is in it's sorted place
    vizbars[pivotIdx].classList.add('orange')

    return pivotIdx;
}

//swap does just as the name suggests and swaps the value at idx1 with the value at idx2
async function swapVisualized(arr, idx1, idx2) {
    await sleep()
    vizbars[idx1].classList.add('blue')
    vizbars[idx2].classList.add('blue')

    await sleep()
    let temp = arr[idx1];
    arr[idx1] = arr[idx2];

    vizbars[idx1].style.height = vizbars[idx2].style.height

    arr[idx2] = temp;

    vizbars[idx2].style.height = `${temp}px`

    //adjust the inner number of the bar if there are 40 bars or less and a swap has been made
    if (vizbars.length < limit) {
        for (let i = 0; i < vizbars.length; i++) {
            vizbars[i].innerHTML = parseInt(vizbars[i].style.height)
        }
    }

    await sleep()
    vizbars[idx1].classList.remove('blue')
    vizbars[idx2].classList.remove('blue')
}





//----------------------------Quick Sort Algorithm ---------------------

//accepts an array, left(start), right{end} arguments. Initially it is called with just an array and is later recursively called with the other inputs.
function quickSortAlgo(arr, left = 0, right = arr.length - 1) {
    //if left index is greater than the right index create a pivot index. For this we call the helper function pivot.
    if (left < right) {
        //see pivot function for explanation.
        let pivotIdx = pivot(arr, left, right);

        //these are our recursive calls 
        //the first recursive call goes from the start to the pivotIdx - 1
        //the second call goes from the pivotIdx + 1 to the end 
        quickSortAlgo(arr, left, pivotIdx - 1)
        quickSortAlgo(arr, pivotIdx + 1, right)
    }
    return arr
}



//pivot accepts the array, left, and right value
function pivot(arr, start = 0, end = arr.length - 1) {
    //pivotValue is equal the value at array[start]. Do no confuse this with arr[0]. Start's value will change with the recursive calls.
    let pivotValue = arr[start];
    //pivotIndex is equal to start. Start is only a number. Which means pivotIdx is what the name suggests. An index number.
    //the pivot index is where the current pivot will swap to once a full iteration of the array has been made.
    let pivotIdx = start;

    //iterate from the start value + 1 (to avoid comparing the pivotValue to itself) to the end.
    for (let i = start + 1; i <= end; i++) {
        //every time the pivotValue is greater than the next value in the array. increase the pivot index.
        if (pivotValue > arr[i]) {
            pivotIdx++;
            //run swap with the arr value, the pivot index, and the value of i when the condition was met.
            //we do this so every number smaller than the pivot is lined up next to it so that when we exit the loop we can make the 'final' swap.
            swap(arr, pivotIdx, i);
        }
    }
    //once we've reached the end of the loop we finally swap the pivot with the value at arr[pivotIdx].
    swap(arr, start, pivotIdx);
    //we return the pivot index to be used in the next recursive calls
    return pivotIdx;
}

//swap does just as the name suggests and swaps the value at idx1 with the value at idx2
function swap(arr, idx1, idx2) {
    let temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
}

