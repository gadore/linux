'use strict'

//node.js有唯一全局对象，global
//process 当前进程对象

// //导入自定义js模块
// var model = require('./model/hello');
// var s = 'Michael';
// model.Another();
// model.Greet(s);




// //判断当前运行环境
// console.log('\nthe environment is: ')
// if (typeof(window) === 'undefined') {
//     console.log('node.js');
// } else {
//     console.log('browser');
// }




// 导入文件模块
// var fs = require('fs');

// //读取txt文档（异步）
// fs.readFile('sourse/simple.txt','utf-8',function(err,data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// });

// //读取图片文件时，若不定义读取格式，默认返回一个Buffer对象
// fs.readFile('sourse/simple.png',function(err,data){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//         console.log(data.length + 'bytes');
//     }
// });

// //读取文件（同步）
// try{
//     var data = fs.readFileSync('sourse/simple.txt','utf-8');
//     console.log(data);
// } catch(err){
//     console.log('error comes out!');
// }

// //写文件
// var data = 'Bubu has a very cute face when she gets angry, I love it.';
// fs.writeFile('sourse/output.txt',data,function(err){
//     if (err){
//         console.log(err);
//     } else{
//         console.log('write OK.');
//     }
// });

// //写文件（同步）
// var data = 'SyncFileWrite has been written~Yeah,give me five!';
// fs.writeFileSync('sourse/syncOutpPut.txt',data);

// //获取文件相关信息(异步)
// fs.stat('sourse/simple.txt',function(err,stat){
//     if (err){
//         console.log(err);
//     } else{
//         //是否是文件
//         console.log('ifFile: ' + stat.isFile());
//         //是否1是目录
//         console.log('isDirectory: ' + stat.isDirectory());
//         if(stat.isFile()){
//             //文件大小
//             console.log('Size: ' + stat.size)
//             //创建时间
//             console.log('birth time: ' + stat.birthtime);
//             //修改时间，Data对象
//             console.log('modfied time: ' + stat.mtime);
//         }
//     }
// });

 // //获取文件相关信息(同步)
// fs.stat('sourse/simple.txt',function(err,stat){
//     console.log('isFile: ' + stat.isFile());
//     console.log('isDirectory: ' + stat.isDirectory());
//     console.log('size: ' + stat.size);
//     console.log('birth time: ' + stat.birthtime);
//     console.log('modfied time: ' + stat.mtime);
// });


// //********服务器运行期反复执行的逻辑代码，必须使用异步代码。********// //




//从文件流读取文本内容实例
// var rs = fs.createReadStream('sourse/simple.txt','utf-8');
// rs.on('data',function(chunk){//数据已经可以读取
//     console.log('DATA:');
//     console.log(chunk);
// });
// rs.on('end',function(){//文件流已经到末尾
//     console.log('END');
// });
// rs.on('error',function(err){//事件出错
//     console.log('ERROR:' + err);
// });



// //要以流的形式写入文件
// var ws1 = fs.createWriteStream('files/output1.txt','utf-8');
// ws1.write('使用Stream写入文本数据...\n');
// ws1.write('END.');
// ws1.end();

// var ws2 = fs.createWriteStream('sourse/output2.txt');
// ws2.write(new Buffer('使用Stream写入二进制数据...\n','utf-8'));
// ws2.write(new Buffer('END.','utf-8'));
// ws2.end();



// //流串pipe
// var rs = fs.createReadStream('sourse/simple.txt');
// var ws = fs.createWriteStream('sourse/copied.txt');

// rs.pipe(ws);//相当于复制，把simple里边的文档存到copied文档里，相当于复制





// var http = require('http'),
//     url  = require('url'),
//     path = require('path'),
//     fs   = require('fs');
// var server = http.createServer(function(request,response){
//     //回调函数接收request和response对象，
//     //获取HTTP请求的mothod和url
//     console.log(request.method + ': ' + request.url);
//     //将HTTP响应200写入response，同时设置Content-Type：text/html
//     response.writeHead(200,{'content-Type': 'text/html'});
//     //将HTTP响应的HTML内容写入response
//     response.end('<h1>Hello world!</h1>');
// });

// //让服务器监听8080端口
// server.listen(8080);
// console.log('Server is running at http://127.0.0.1:8080/');
// // console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

// //解析当前目录
// var workDir = path.resolve('.');
// //组合完整的文件路径 
// var filepath = path.join(workDir,'files','index.html');



var
    http = require('http'),
    url  = require('url'),
    path = require('path'),
    fs   = require('fs');

//从命令行参数获取root目录，默认是当前目录
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);

//创建服务器
var server = http.createServer(function (request,response) {
    //获取URL的path
    var pathname = url.parse(request.url).pathname;
    //获得对应的本地文件路径
    var filepath = path.join(root,pathname);
    //获取文件状态
    fs.stat(filepath,function(err,stats){
        if(!err && stats.isFile()){
            //没有出错并且文件存在
            console.log('200' + request.url);
            //发送200响应
            response.writeHead(200);
            //将文件流导向response
            fs.createReadStream(filepath).pipe(response);
        } else{
            //出错或者文件不存在
            console.log('404' + request.url);
            //发送404响应
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');



