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

const find_prime = (index) => {

    let number = 0;
    let count = 0;
    while (count < index) {
        number++;
        if (is_prime(number)) {
            count ++;
        }
    }

    return number;
};

console.log(find_prime(10001));