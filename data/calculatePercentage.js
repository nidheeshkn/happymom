



function calculateIncreasingPercentages(numLevels) {
    if (numLevels <= 0) {
        throw new Error("Number of levels must be positive.");
    }

    // Calculate total weight for normalization
    const totalWeight = (numLevels * (numLevels + 1)) / 2;
    console.log(totalWeight);

    // Function to calculate weight for each level (lower level, higher weight)
    const weight = level => numLevels - level + 1;
    console.log(weight);

    // Calculate percentages for each level
    const percentages = [];
    for (let level = 0; level < numLevels; level++) {
        percentages.push(weight(level) / totalWeight);
    }

    return percentages;
}

// Example usage
const numberOfLevels = 4;
const percentages = calculateIncreasingPercentages(numberOfLevels);

console.log(percentages);
const amounts = [];
percentages.forEach((i, ind) => { 
    if(ind>0)
    // console.log(i);

    amounts.push(90*i);

});


console.log(amounts);

let total_amount=0;
amounts.forEach((i) => total_amount=total_amount+i);

console.log(total_amount);
