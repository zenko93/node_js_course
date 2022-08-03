// Readable - Чтение
// Writable - Запись
// Duplex - Readable + Writable
// Transform - Такой де как Duplex, но может изменять данные по мере чтения

// Читать и отправлять файл по кусочкам если он много весит

const fs = require('fs');
const path = require('path');

// fs.readFile(path.resolve(__dirname, 'test.txt'), (err, data) => {
//     if (err) {
//         throw err;
//     }
//
//     console.log(data)
// })

// const stream = fs.createReadStream(path.resolve(__dirname, 'test.txt'));
//
// // один чанк по дефолту 64кб
// stream.on('data', (chunk) => {
//     console.log(chunk)
// })
//
// stream.on('open', () => console.log('Started'))
// stream.on('end', () => console.log('Finished'))
// stream.on('error', (e) => console.log(e)) //очень важно, если не сделать может упать весь Nodejs процесс

// const writableStream = fs.createWriteStream(path.resolve(__dirname, 'test2.txt'));
//
// for (let i = 0; i < 20; i++) {
//     writableStream.write(i + '\n')
// }
//
// writableStream.end()
// writableStream.close()
// writableStream.destroy()
// writableStream.on('error')

const http = require('http');

http.createServer((req, res) => {
    // req - readable stream
    // res - writable stream
    const stream = fs.createReadStream(path.resolve(__dirname, 'test.txt'));

    stream.pipe(res)
})