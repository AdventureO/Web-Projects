
const find_divisors = (n) => {
    let divisors = [],max = n;
    let i = 1;

    while (i < max) {
        if (n % i === 0) {
            divisors.push(i);
            let j = n / i;
            if (i !== j) {
                divisors.push(j);
            }
            max = j;
        }
        i++;
    }
    return divisors;
};


const divisible_triangular_number = (number) => {
    let n = 1;
    let sum = 0;
    while (find_divisors(sum).length <= number){
        sum += n;
        n++;
    }
    return sum;
};


console.log(divisible_triangular_number(500));