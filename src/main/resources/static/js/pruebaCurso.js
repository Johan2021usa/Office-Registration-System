/*Declared variables combining html
it can only be declared once and modified multiple times*/
let sayHello = "<H1>Hello, Johan</H1>>";

/*Oldest way to declare a variable
* var declaration can be declared and modified multiple times.*/
var usVar;
usVar ="Oldest way to declare a variable";

//way to declare a constant, only can be defined once and it cannot be modified.
const myNumber = 14;

// Using document.write to insert directly information in the document html
// document.write(sayHello, usVar, myNumber);
// document.write("Hello world");
//
// //Combine document.write with html
// document.write("<button onclick='document.write(sayHello)'>show variable</button>");
//
// //Basic way yo show information in the browser console
// console.log(sayHello + "Hello Johan");

//Advance console.log
// console.error(sayHello); //This sort helps us to identify errors.
// console.table([sayHello,myNumber,usVar]); // it shows elements inside a table
//---------------------------------------------------------------------------------------------
//If statement
a=20;
b=10;
if (a>b){
    console.log("Johan is the best");
    document.write("Johan is the best");
}