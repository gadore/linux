'use strict'

var s = "hello";

function greet(name){
    console.log(s + ',' + name + '!');
}

function another(){
    process.nextTick(function () {
        console.log('\nHere is another~');
    });
}

module.exports = {
    Greet : greet,
    Another : another
}

