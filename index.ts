import WebSocket, { WebSocketServer } from 'ws';

const PORT = process.env.PORT == undefined ? 4000 : parseInt(process.env.PORT)
const wss = new WebSocketServer({ port: PORT });

let serverConnection: WebSocket | undefined = undefined
let clientConnection: WebSocket | undefined = undefined

let isClientWaitingForResponse = false
let isServerWaitingForResponse = false


console.log(`Starting connection at ws://localhost:${PORT}`)
wss.on('connection', function connection(ws: WebSocket) {
    if (serverConnection != undefined && clientConnection != undefined) {
        ws.send("cannot accept any more new clients")
        ws.close()
    }

    ws.on('error', console.error);

    ws.on('message', (message: string) => {


        if (message == "connect_server") {
            if (serverConnection == undefined) {
                serverConnection = ws
                ws.send("ack_server")
                startServerListening()
            } else {
                ws.send("already exists a server connection")
                ws.close()
            }

        } else if (message == "connect_client") {
            if (clientConnection == undefined) {
                clientConnection = ws
                ws.send("ack_client")
                startClientListening()
            } else {
                ws.send("already exists a client connection")
                ws.close()
            }
        }
    })
});

function startClientListening() {
    console.log("listening for the client")
    clientConnection?.on("message", (message: string) => {
        serverConnection?.send(message)
    })

    clientConnection?.on("close", () => {
        clientConnection = undefined
    })
}



function startServerListening() {
    console.log("listening for the server")
    serverConnection?.on("message", (message: string) => {
        clientConnection?.send(message)
    })

    serverConnection?.on("close", () => {
        serverConnection = undefined
    })
}


