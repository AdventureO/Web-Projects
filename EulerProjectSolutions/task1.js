
const find_multiples_sum = (multiples_array, measure) => {
    let multiples_sum = 0;
    for (let number = 1; number < measure; number++) {
        for (let nat_num = 0; nat_num < multiples_array.length; nat_num++ ) {
            if (number % multiples_array[nat_num] === 0) {
                multiples_sum += number;
                break;
            }
        }
    }

    return multiples_sum;
};


console.log(find_multiples_sum([3, 5], 1000));