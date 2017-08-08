const Koa = require('koa');
const fs = require('fs');
const bodyParser = require('koa-bodyparser');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();

const app = new Koa();

// 这里可以用sync是因为启动时只运行一次，不存在性能问题:
var files = fs.readdirSync(__dirname + '/controllers');

// 过滤.js文件：
var js_files = files.filter((f) =>{
    return f.endsWith('.js');
});



// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(bodyParser());

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Welcome to home page</h1>';
});

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
};


// add router middleware:
app.use(router.routes());
addControllers(router);

app.listen(3000);
console.log('app started at port 3000...');