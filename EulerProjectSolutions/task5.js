const smallest_multiple = (number, divisiblers) => {

    let score = 0;
    while (score != divisiblers.length) {
        for (let i = 0; i < divisiblers.length; i++) {
            if (number % i === 0) {
                score += 1;
            } else {
                score = 0;
                break;
            }
        }
        number += 1;
    }
};

console.log(smallest_multiple(2520, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 14, 15, 16, 17, 18, 19, 20]));