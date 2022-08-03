const Emitter = require('events');

const emitter = new Emitter();

// emitter.once('message', (data, second, third) => { // похволяет сгенерировать событие единожды
//     console.log('You sended a message ' + data)
//     console.log('Second arg ' + second)
// })
const callBack = (data, second, third) => {
    console.log('You sended a message ' + data)
    console.log('Second arg ' + second)
}
emitter.on('message', callBack);
emitter.removeListener('message', callBack);

const MESSAGE = process.env.message || '';

if (MESSAGE) {
    emitter.emit('message', MESSAGE, 123)
} else {
    emitter.emit('message', 'Вы не указали сообщение')
}

// Когда удобно использовать?
// http
// websockets
// long pulling
// clusters