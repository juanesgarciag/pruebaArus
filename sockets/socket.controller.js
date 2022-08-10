
const socketController = (socket) => {
    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    // Recibir desde el cliente
    socket.on('', (payload) => {
        console.log(payload);
    })

}

export {socketController};