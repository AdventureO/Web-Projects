
const sum_natural_numb = (amount) => {

    let sum = 0;
    for( let i = 1; i <= amount; i++) {
        sum += Math.pow(i, 2)
    }
    return sum;

};

const square_natural_numb = (amount) => {
    let sum = 0;
    for( let i = 1; i <= amount; i++) {
        sum += i;
    }
    return Math.pow(sum, 2);
};

const sum_square_difference = (amount) => {
    return square_natural_numb(amount) - sum_natural_numb(amount)
};

console.log(sum_square_difference(100));