const fs = require('fs');
const path = require('path');


// fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir2', 'dir3'), { recursive: true }) // Создает папку

// fs.mkdir(path.resolve(__dirname, 'dir'), (err) => {
//     if (err) {
//         console.log(err)
//         return;
//     }
//     console.log('Folder created')
// }) // Создает папку
//
// fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {
//     if (err) {
//         throw err;
//     }
// }) // delete folder

// fs.writeFile(path.resolve(__dirname, 'test.txt'), '5 sdfs 3 5 10', (err) => {
//     if (err) {
//         throw err;
//     }
//
//     fs.appendFile(path.resolve(__dirname, 'test.txt'), 'Добавить в конец', (err) => {
//         if (err) {
//             throw err;
//         }
//
//         fs.appendFile(path.resolve(__dirname, 'test.txt'), 'Добавить в конец', (err) => {
//             if (err) {
//                 throw err;
//             }
//         }) // Добавляет данные в файл
//     }) // Добавляет данные в файл
// }) // Записывает данные в файл (перезатирает)

const writeFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => {
        return fs.writeFile(path, data, (err) => {
            if (err) {
                return reject(err.message)
            }

            resolve()
        })
    })
}

const appendFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => {
        return fs.appendFile(path, data, (err) => {
            if (err) {
                return reject(err.message)
            }

            resolve()
        })
    })
}

const readFileAsync = async (path) => {
    return new Promise((resolve, reject) => {
        return fs.readFile(path, {encoding: "utf-8"}, (err, data) => {
            if (err) {
                return reject(err.message)
            }

            resolve(data)
        })
    })
}

const removeFileAsync = async (path) => {
    return new Promise((resolve, reject) => {
        return fs.rm(path, (err) => {
            if (err) {
                return reject(err.message)
            }

            resolve()
        })
    })
}

// writeFileAsync(path.resolve(__dirname, 'test.txt'), 'data')
//     .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), 'add'))
//     .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '2'))
//     .then(() => readFileAsync(path.resolve(__dirname, 'test.txt')))
//     .then(data => console.log(data))
//     .catch(err => console.log(err))


// removeFileAsync(path.resolve(__dirname, 'test.txt'))
//     .then(() => console.log('file deleted'))

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const text = process.env.TEXT || '';

writeFileAsync(path.resolve(__dirname, 'test.txt'), text)
    .then(() => readFileAsync(path.resolve(__dirname, 'test.txt')))
    .then(data => data.split(' ').length)
    .then(count => writeFileAsync(path.resolve(__dirname, 'count.txt'), `Counted words ${count}`))
    .then(() => removeFileAsync(path.resolve(__dirname, 'test.txt')))