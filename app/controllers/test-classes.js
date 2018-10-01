// "use strict";

// // Food is a base class
// class Food {

//     constructor  { }

//     toString () {
//         return `${this.name} | ${this.protein}g P :: ${this.carbs}g C :: ${this.fat}g F`
//     }

//     print () {
//       console.log( this.toString() );
//     }
// }

// const chicken_breast = new Food('Chicken Breast', 26, 0, 3.5);

// chicken_breast.print(); // 'Chicken Breast | 26g P :: 0g C :: 3.5g F'
// console.log(chicken_breast.protein); // 26 (LINE A)

// "use strict";

// function foo () {  console.log('Foo!');  }

// console.log(foo.prototype); // Points to an object called 'foo'
// console.log(foo.prototype.constructor); // Points to the function, 'foo'

// foo.prototype.constructor(); // Prints 'Foo!' -- just proving that 'foo.prototype.constructor' does, in fact, point to our original function 

class Foo {
    constructor(prop) {
        this.prop = prop;
    }
    static staticMethod() {
        return 'classy';
    }
    prototypeMethod() {
        return 'prototypical';
    }
}
const foo = new Foo(123);