const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const EventEmitter = require("node:events");

const app = express();

const emitter = new EventEmitter();

/*Registering event listerner and we can add multiple event listeners for same event*/
emitter.on("server_started",(...args) => {
    console.log("event server_started",args);
});

/* Event Emitting */
emitter.emit("server_started","viswa",20);

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`User COnnected ${socket.id}`);

    socket.on("send_message", (data) => {
        console.log("recevied editor content as>>",data);
        socket.broadcast.emit("received_editor_content", data);
    });
});

server.listen(3001,()=>{
    console.log("Server Started On Port 3001");
})