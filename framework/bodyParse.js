module.exports = (req, res) => {
    let body = '';

    req.on = (event, chunk) => {
        if (event === 'data') {
            return body += chunk
        }

        if (event === 'end') {
            if (body) {
                req.body = JSON.parse(body);
            }
        }
    }
}