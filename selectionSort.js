const selectionSortButton = document.querySelector('#selection-sort')


selectionSortButton.addEventListener('click', async () => {
    let arrayOfHeights = [];
    for (let bars of vizbars) {
        let barHeights = parseInt(bars.style.height)
        arrayOfHeights.push(barHeights)
    }

    await visualizedSelectionSort(arrayOfHeights)
})




const visualizedSelectionSort = async arr => {

    for (let i = 0; i < arr.length; i++) {

        let lowest = i

        //add red to the first item in our list 
        //-------------------------------------
        await sleep()
        vizbars[i].classList.add('red')
        //------------------------------------

        for (let j = i + 1; j < arr.length; j++) {

            //add red to our 'seeker' and remove red from the number right behind the seeker. unless that number is equal to arr[i] aka this first item in our list. We want to know where our first item is and where our seeker is.
            //-----------------------------------------------
            await sleep()
            vizbars[j].classList.add('red')
            if (vizbars[j - 1] != vizbars[i]) {
                vizbars[j - 1].classList.remove('red')
            }
            //-----------------------------------------------

            if (arr[j] < arr[lowest]) {

                //remove the blue color from the number which was previously the lowest and add the blue color to the number which is now lowest.
                //-----------------------------------------------------------
                await sleep()
                vizbars[lowest].classList.remove('blue')

                lowest = j;

                vizbars[lowest].classList.add('blue')
                //-----------------------------------------------------------
            }

            //remove the red color from the end element. We only want red to track our seeker and our first element or our 'i' element.
            //-----------------------------------------------
            vizbars[arr.length - 1].classList.remove('red')
            //-----------------------------------------------
        }


        if (lowest !== i) {

            //add a green color to the two values about to be swapped
            //-------------------------------------
            await sleep()
            vizbars[i].classList.add('green')
            vizbars[lowest].classList.add('green')
            //-------------------------------------

            //swap heights and add the color orange to the value that is now secure in the first spot of the array.
            //---------------------------------------------------
            let temp = arr[i];
            let temp1 = vizbars[i].style.height;

            arr[i] = arr[lowest];
            vizbars[i].style.height = vizbars[lowest].style.height;

            arr[lowest] = temp;
            vizbars[lowest].style.height = temp1
            //---------------------------------------------------
        }

        //before we move to the next pass of the nested loop we need to remove remaining colors from the last pass. And we need to add orange to the first or 'i' element.
        await sleep()
        vizbars[lowest].classList.remove('blue')
        vizbars[i].classList.remove('green')
        vizbars[lowest].classList.remove('green')

        vizbars[i].classList.add('orange')

    }

    return arr
}



//----------------------------------SELECTION SORT LOGIC ----------------------



function selectionSort(arr) {
    //loop through entire array
    for (let i = 0; i < arr.length; i++) {
        //Lowest will mark our starting index and the value at that index will be our lowest value that we must compare to all others in the second loop.
        let lowest = i
        for (let j = i + 1; j < arr.length; j++) {
            //set j = to i + 1 to avoid looping over already sorted items.
            if (arr[j] < arr[lowest]) {
                //if the value of the number we are at is less than our starting value
                //keep track of the index of that new low number.
                lowest = j;
            }
        }

        //once our inner loop has gone through one iteration we exit and prepare to return to the top for our next iteration, but before we do, we make a swap if it is found to be necessary
        if (lowest !== i) {
            //swapping logic. arr[i] is our starting position and lowest holds the index of the smallest number.
            let temp = arr[i];
            arr[i] = arr[lowest];
            arr[lowest] = temp;
        }
    }

    return arr
}

