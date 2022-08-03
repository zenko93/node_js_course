const os = require('os');
const cluster = require('cluster');

// console.log(os.platform());
// console.log(os.arch());
// console.log(os.cpus().length);

if (cluster.isMaster) { // проверка на главный прцесс
    for (let i = 0; i < os.cpus().length - 2; i++) {
        cluster.fork() // запускает дочерний процесс
    }

    cluster.on('exit', worker => {
        console.log(`Воркер с pid=${worker.process.pid} умер`)
        cluster.fork()
    })
} else {
    console.log(`Воркер с pid=${process.pid} запущен`)

    setInterval(() => {
        console.log(`Воркер с pid=${process.pid} еще работет`)
    }, 5000)
}