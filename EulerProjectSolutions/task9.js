
const special_pythagorean_triplet = (sum) => {

    let c = sum;
    while (c >= 3) {
        for (let b = c - 1; b >= 2; --b) {
            for (let a = b - 1; a >= 1; --a) {
                if (a + b + c === sum && Math.pow(a, 2) + Math.pow(b, 2) === Math.pow(c, 2)) {
                    return a * b * c;
                }
            }
        }
        c--;
    }
};

console.log(special_pythagorean_triplet(1000));