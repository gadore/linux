
const Koa = require('koa');
const router = require('koa-router')();
// 创建一个Koa对象表示web app本身:
const app = new Koa();

// log request URL:
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

//add url-router:
router.get('/hello/:name',async(ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello,${name}!</h1>`;
});
router.get('/',async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});
//add router middleware:
app.use(router.router());

// // 对于任何请求，app将调用该异步函数处理请求：
// app.use(async (ctx, next) => {
//     await next();
//     // 设置response的Content-Type:
//     ctx.response.type = 'text/html';
//     // 设置response的内容:
//     ctx.response.body = '<h1>Hello, koa2!</h1>';
// });

// app.use(async (ctx, next) => {
//     if (ctx.request.path === '/') {
//         ctx.response.body = 'index page';
//     } else {
//         await next();
//     }
// });

// app.use(async (ctx, next) => {
//     if (ctx.request.path === '/test') {
//         ctx.response.body = 'TEST page';
//     } else {
//         await next();
//     }
// });

// app.use(async (ctx, next) => {
//     if (ctx.request.path === '/error') {
//         ctx.response.body = 'ERROR page';
//     } else {
//         await next();
//     }
// });

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');

