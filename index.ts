import WebSocket, { WebSocketServer } from 'ws';

const PORT = process.env.PORT == undefined ? 4000 : parseInt(process.env.PORT)
const wss = new WebSocketServer({ port: PORT });

wss.on('connection', function connection(ws: WebSocket) {
    ws.on('error', console.error);

    ws.on('message', function message(data: WebSocket.RawData) {
        console.log('received: %s', data);
    });

    ws.send('something');
});