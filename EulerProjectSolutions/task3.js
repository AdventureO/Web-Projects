
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

const find_largest_prime_factor = (number) => {
    for (let i = Math.floor(Math.sqrt(number)); i >= 1; --i) {
        if (is_prime(i) && number % i === 0) {
            return i;
        }
    }
};


console.log(find_largest_prime_factor(600851475143));