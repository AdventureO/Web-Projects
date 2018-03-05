
const is_palindrome = (string) => {
    return string === string.split('').reverse().join('');
};

const find_palindrome = (st1, end1, st2, end2) => {
    let biggest_palindrome = 0;
    for (let i = st1; i <= end1; ++i){
        for (let j = st2; j <= end2; ++j){
            let temp_palindrome = i * j;
            if (is_palindrome(temp_palindrome.toString()) && temp_palindrome > biggest_palindrome) {
                biggest_palindrome = temp_palindrome;
            }
        }
    }
    return biggest_palindrome;
};

console.log(find_palindrome(100, 999, 100, 999));