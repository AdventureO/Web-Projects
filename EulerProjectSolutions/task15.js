let perimeter = 1;
let routes = 1;

let move = function (x, y) {
    if (x < perimeter && y < perimeter) {
        routes += 1;
        move(x + 1, y);
        move(x, y + 1);
    }
};

move(0,0);

// console.log(routes);

let pattern = [];

for (let i = 1; i <= 20; i++) {
    routes = 1;
    perimeter = i;
    move(0,0);
    pattern.push([i, routes]);
}

console.log(pattern);