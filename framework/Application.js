const http = require('http');
const EventEmitter = require('events');

module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }

    listen(port, callback) {
        this.server.listen(port, callback)
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];

            Object.keys(endpoint).forEach(method => {

                this.emitter.on(this._getRouteMask(path, method), (req, res) => { // слушаем событие
                    const handler = endpoint[method];
                    handler(req, res)
                })
            })
        })
    }

    _createServer() {
        return http.createServer((req, res) => {
            let body = "";

            req.on('data', (chunk) => {
                body += chunk;
            })

            req.on('end', () => {
                if (body) {
                    req.body = JSON.parse(body);
                }

                this.middlewares.forEach(middleware => middleware(req, res))
                const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res) // генерируем событие по той же маске что и слушаем это событие

                if(!emitted) { //возвращается булеан - так что если нет какого то ендпоинта запрос закрывается и не висит бесконечно
                    res.end()
                }
            })
        })
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`
    }
}




// res.writeHead(200, {
//     'Content-type': 'text/html; charset=utf-8'
// }) // чтобы браузер читал кириллицу

// res.writeHead(200, {
//     'Content-type': 'application/json'
// }) // отправка JSON файлов
//
// if (req.url === '/users') { // через if/else никто не делает еедпоинты, для этого есть фрэймворки по типу Express
//     return res.end(JSON.stringify([
//         { id: 1, name: 'NodeJs' }
//     ]))
// }
//
// if (req.url === '/posts') {
//     return res.end('POSTS')
// }