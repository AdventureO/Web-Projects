const chain_length = (n, length) => {
    if (n === 1) {
        return length;
    } else if (n % 2 === 0) {
        return chain_length(n / 2, ++length);
    } else {
        return chain_length(3 * n  + 1, ++length);
    }

};

const longest_collatz_sequence = (number) => {
    let max = 0;
    let num = 1;
    for (let i = 2; i < number; ++i){
        let temp = chain_length(i, 1);
        if (temp > max){
            max = temp;
            num = i;
        }
    }
    return num;
};

console.log(longest_collatz_sequence(1000000));