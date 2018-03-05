const is_prime = (number) => {
    if (number <= 1) {
        return false;
    } else {
        for (let i = 2; i < number; i++) {
            if (number % i === 0) {
                return false;
            }
        }
        return true;
    }
};

const summation_of_primes = (measure) => {

    let sum = 0;
    for (let i = 1; i < measure; i++) {
        if (is_prime(i)) {
            sum += i;
        }
    }
    return sum;
};

console.log(summation_of_primes(2000000));