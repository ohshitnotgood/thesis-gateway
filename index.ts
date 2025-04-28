import WebSocket, { WebSocketServer } from 'ws';

const PORT = process.env.PORT == undefined ? 4000 : parseInt(process.env.PORT)
const wss = new WebSocketServer({ port: PORT });

let serverConnection: string | undefined = undefined
let clientConnection: string | undefined = undefined

wss.on('connection', function connection(ws: WebSocket) {
    ws.on('error', console.error);

    ws.on('message', function message(data: WebSocket.RawData) {
        ws.send(data)
    });
});
