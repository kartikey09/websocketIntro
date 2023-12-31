const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH']
    }
});

io.on('connection', (socket)=>{
    socket.on('send_message', (data)=>{
        console.log(data);
        socket.broadcast.emit('recieve_message', data);
    })
});

server.listen(3002, ()=>{
    console.log('LISTENING ON PORT 3002');
})