'use strict'

var s = "hello";

var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};


// function another(){
//     process.nextTick(function () {
//         console.log('\nHere is another~');
//     });
// };

module.exports = {
    "GET /hello/:name": fn_hello
    // ,Another : another
}

