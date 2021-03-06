const fs = require('fs');

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path} `);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    var files = fs.readdirSync(__dirname +'/controllers');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

// for(var f of js_files) {
//     console.log(`process controllers :${f}...`);
//     let mapping = require(__dirname + '/controllers/' +f);
//     for (var url in mapping) {
//         if (url.startsWith('GET ')) {
//             //如果url类似“GET XXX”:
//             var path = url.substring(4);
//             router.get(path, mapping[url]);
//             console.log(`register URL mapping: GET ${path}`);
//         } else if(url.startsWith('POST ')) {
//             //如果url类似“POST XXX”:
//             var path = url.substring(5);
//             router.post(path, mapping[url]);
//             console.log(`register URL mapping: POST ${path}`);
//         } else {
//             // 无效的URL；
//             console.log(`invalid URL :${url}`);
//         }
//     }
// }

// addControllers(router);

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};

