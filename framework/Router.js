module.exports = class Router { // реализация простейшего фрэймворка по типу Express
    constructor() {
        this.endpoints = {}
    }

    request(method = "GET", path, handler) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {}
        }

        // /users [GET, POST, PUT] /posts [GET, POST, PUT, DELETE]
        const endpoint = this.endpoints[path];

        if (endpoint[method]) {
            throw Error(`[${method}] is already exist by this path ${path}`)
        }

        endpoint[method] = handler;
    }

    get(path, handler) {
        this.request('GET', path, handler)
    }

    post(path, handler) {
        this.request('POST', path, handler)
    }

    put(path, handler) {
        this.request('PUT', path, handler)
    }

    delete(path, handler) {
        this.request('DELETE', path, handler)
    }
}