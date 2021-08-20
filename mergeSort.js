const mergeBtn = document.querySelector('#merge-sort')



/* const testArr1 = [23, 78, 34, 9, 11, 14, 2, 112, 990, 45, 1, 55, 5, 24, 1, 11, 12, 13, 15, 18] */

mergeBtn.addEventListener('click', async () => {
    let arrayOfHeights = [];
    for (let bars of vizbars) {
        let barHeights = parseInt(bars.style.height)
        arrayOfHeights.push(barHeights)
    }

    const animations = await getMergeSortAnimations(arrayOfHeights);
    for (let i = 0; i < animations.length; i++) {

        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = vizbars[barOneIdx].style;
            const barTwoStyle = vizbars[barTwoIdx].style;
            const color = i % 3 === 0 ? 'rgb(52, 167, 255)' : 'rgb(255, 127, 127)';
            await sleep()
            barOneStyle.background = color;
            barTwoStyle.background = color;

        } else {
            await sleep()
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = vizbars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
            if (vizbars.length < limit) {
                vizbars[barOneIdx].innerHTML = newHeight;
            }
        }
    }

})


//-----------------------------visualized iterative merge-------------------------



const getMergeSortAnimations = async array => {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    console.log(auxiliaryArray)
    //pass in the array, beginning index, and array length, auxiliaryArray is = to array, animations = []
    await mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);

    return animations;
}

//mainArray = array with all of the values      
//auxiliaryArray = array with all of the values   
//animations = array of two values [starting index, auxiliaryArray value at that index]

const mergeSortHelper = async (
    mainArray, //
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) => {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);

    await mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);

    await mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);

    await doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);

}

const doMerge = async (
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
) => {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    console.log(animations)

    //k used as index to determine where to insert into the main array and animation array pairs.
    //i used for traversal from beginning to middle of array
    //j used for traversal from middle to end of array
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }

    /* //shows the mergeSort visualization of heights
    //removes the previous blue and red colors from previous comparisons
    //---------------------------------------------
    await sleep()
    for (let i = 0; i < mainArray.length; i++) {
        vizbars[i].style.height = `${mainArray[i]}px`
        vizbars[i].classList.remove('red')
    }
    //--------------------------------------------- */
}


//---------------------------------------Iterative Merge Sort--------------------------

const iterativeMergeSort = async arr => {
    //Create two arrays for sorting
    let sorted = Array.from(arr);
    let n = sorted.length;
    let buffer = new Array(n);

    for (let size = 1; size < n; size *= 2) {
        for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
            //Get the two sub arrays
            let left = leftStart,
                right = Math.min(left + size, n),
                leftLimit = right,
                rightLimit = Math.min(right + size, n);

            //Merge the sub arrays
            await iterativeMerge(left, right, leftLimit, rightLimit, sorted, buffer);
        }
        //Swap the sorted sub array and merge them
        let temp = sorted;
        sorted = buffer;
        buffer = temp;
    }

    //turn the bars orange once the process is complete
    //------------------------------------------------
    for (let i = 0; i < sorted.length; i++) {
        vizbars[i].classList.add('orange')
    }
    //-----------------------------------------------

    return sorted;
}

const iterativeMerge = async (left, right, leftLimit, rightLimit, sorted, buffer) => {
    let i = left;
    //Compare the two sub arrays and merge them in the sorted order
    while (left < leftLimit && right < rightLimit) {
        if (sorted[left] <= sorted[right]) {

            //add a red bar to the left side of the comparisons
            //----------------------------------
            await sleep()
            vizbars[left].classList.add('red')
            buffer[i++] = sorted[left++];
            //----------------------------------

        } else {

            //add a blue bar to the right side of the comparisons
            //--------------------------------------
            await sleep()
            vizbars[right].classList.add('blue')
            //--------------------------------------

            buffer[i++] = sorted[right++];
        }
    }

    //If there are elements in the left sub arrray then add it to the result
    while (left < leftLimit) {

        //add a red bar to the left side of the comparisons after other array is exhausted
        //------------------------------------
        await sleep()
        vizbars[left].classList.add('red')
        //-----------------------------------

        buffer[i++] = sorted[left++];
    }

    //If there are elements in the right sub array then add it to the result
    while (right < rightLimit) {

        //add a blue bar to the left side of the comparisons after other array is exhausted
        //-------------------------------------
        await sleep()
        vizbars[right].classList.add('blue')
        //-------------------------------------

        buffer[i++] = sorted[right++];
    }



}




//----------------------------------------------------- Recursive Merge Sort------------------------------------------------------

//O(n log n)
function mergeSort(arr) {
    //Merge sort takes advantage of recursion so we need to return a base case.
    //in this case our base is = to an array of length 1.
    if (arr.length <= 1) return arr;
    //to access the midpoint of each subsequent array we divide the array's length by 2 and floor the result.
    let midpoint = Math.floor(arr.length / 2)
    //we use this midpoint to slice the array. Slice accepts up to two arguments. in this first part, begin from index 0 and go to the midpoint.
    let left = mergeSort(arr.slice(0, midpoint)); //log n - because we can have an array of 32 but after 4 levels of recursion we'd be down to the base case. 2^4=32 (2*2=4,4*2=8,8*2=16,16*2=32)
    //for the right side, begin from the midpoint to the end of the array. With slice, if no second argument is given it will slice from the index given to the end of the array.
    let right = mergeSort(arr.slice(midpoint));
    //once we reach our base case, we will run our merge function on the separate arrays, sorting them.
    return merge(left, right);  //n - because it has to iterate through all of the indiviual arrays created.
}


//merge functionality for putting two arrays together. both arrays must be sorted.
function merge(arr1, arr2) {
    //create a container for the final sorted array
    let results = [];
    //create markers to be incremented as needed
    // [2, 5, 8, 9]   [3, 10, 19]
    // m1             m2
    let marker1 = 0;
    let marker2 = 0;
    //create a while loop which will run until marker 1 or marker 2 are equal to the length of their respective array. Once that has been reached it tells us that one of them have gotten to the end. We break the while loop and enter one of our other while loops.
    while (marker1 < arr1.length && marker2 < arr2.length) {
        //if value at marker 2 is less than that of marker 1. Push the smaller value into the results array.
        if (arr2[marker2] < arr1[marker1]) {
            results.push(arr2[marker2])
            //increment the marker to move compare different numbers and eventually reach the end of the while loop
            marker2++
        } else {
            results.push(arr1[marker1])
            //increment the marker to move compare different numbers and eventually reach the end of the while loop
            marker1++
        }
    }
    //if the arrays were different sizes and arr1 has not been traversed yet...place the rest of its contents into the results array
    while (marker1 < arr1.length) {
        results.push(arr1[marker1])
        marker1++
    }
    //if the arrays were different sizes and arr2 has not been traversed yet...place the rest of its contents into the results array
    while (marker2 < arr2.length) {
        results.push(arr2[marker2])
        marker2++
    }

    return results;
}







// -----------------------iterative merge sort---------------------------


const visualizedMergeSort = async arr => {

    /* //assigns a gradient to the entire array of vizbars.
    await sleep()
    vizbars.forEach(bar => {
        let index = arr.indexOf(parseInt(bar.style.height))
        bar.style.background = `rgb(${index + 50},${index + 100},${index + 140})`
    }) */

    if (arr.length <= 1) return arr;

    let midpoint = Math.floor(arr.length / 2)

    await sleep()
    vizbars[midpoint].classList.add('red')
    await sleep()
    vizbars[midpoint].classList.remove('red')

    let left = await visualizedMergeSort(arr.slice(0, midpoint));

    let right = await visualizedMergeSort(arr.slice(midpoint));

    /*   for (let i = 0; i < arr.length; i++) {
          if (parseInt(vizbars[i].style.height) === arr[i]) {
              await sleep()
              vizbars[i].classList.add('orange')
              vizbars[results.length].style.height('orange')
              //array - results
          }
      } */


    return visualizedMerge(left, right, arr);
}

const visualizedMerge = async (arr1, arr2, unsorted) => {
    let results = [];
    let marker1 = 0;
    let marker2 = 0;


    while (marker1 < arr1.length && marker2 < arr2.length) {
        if (arr2[marker2] < arr1[marker1]) {
            results.push(arr2[marker2])
            marker2++

            for (let i = 0; i < unsorted.length; i++) {
                if (parseInt(vizbars[i].style.height) === arr2[marker2]) {
                    await sleep()
                    vizbars[i].classList.add('blue')
                }
            }


        } else {
            results.push(arr1[marker1])
            marker1++

            for (let i = 0; i < unsorted.length; i++) {
                if (parseInt(vizbars[i].style.height) === arr1[marker1]) {
                    await sleep()
                    vizbars[i].classList.add('green')
                }

            }

        }
    }
    while (marker1 < arr1.length) {
        results.push(arr1[marker1])
        marker1++


        for (let i = 0; i < unsorted.length; i++) {
            if (parseInt(vizbars[i].style.height) === arr1[marker1]) {
                await sleep()
                vizbars[i].classList.add('green')
            }
        }


    }
    while (marker2 < arr2.length) {
        results.push(arr2[marker2])
        marker2++

        for (let i = 0; i < unsorted.length; i++) {
            if (parseInt(vizbars[i].style.height) === arr2[marker2]) {
                await sleep()
                vizbars[i].classList.add('blue')
            }
        }

    }






    return results
}

//full array is only found in arrayofheights and the vizbars heights
//arrayofheights and vizbars heights will not be orderered....unless we can.
//results array at max is only half of the arrays total length and the right side will never be touched
//we get our height from the results array. unfortunately the array does not grow to size until the end. is there another way to track height?
//the order of the marker pushes?


