let interval;

function WebSocket(io) {
    io.on('connection', (socket) => {
        socket.on('disconnect', () => {
            clearInterval(interval);
        });
    });
}

module.exports = WebSocket;