const express = require('express');
const { createServer } = require('node:http');
const { join, matchesGlob } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});


io.on('connection', (socket) => {
    console.log(`a user connected, ${socket.id}`);
    io.emit('connection',socket.id);
    socket.on('message',(msg)=>{
        console.log(`new message from ${socket.id} `,msg);
        let id = socket.id;
        io.emit('new-message',{msg,id});
    })
  });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});