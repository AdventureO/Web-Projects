function sayHi() {   // (1)
    console.log( "Привет" );
}

let func = sayHi;    // (2)
func();
console.log(typeof(func));