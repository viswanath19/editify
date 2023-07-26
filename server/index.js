const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
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