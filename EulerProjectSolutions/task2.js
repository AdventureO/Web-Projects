let sum = 0;

const findAllFib = (factor_1, factor_2, measure) => {
    if (factor_2 > measure) {
        return;
    } else if (factor_2 % 2 === 0) {
        sum += factor_2;
    }
    return findAllFib(factor_2, factor_2 + factor_1, measure);
};


findAllFib(1, 1, 4 * 1e6);
console.log(sum);