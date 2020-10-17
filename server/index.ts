import express, { Application } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import http from 'http'
import socketIo from 'socket.io';


const PORT = process.env.PORT || 8080;
const app: Application = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist')));

const server = http.createServer(app);
const io = socketIo(server)

const rooms: any = {}
let counter = 1

io.on('connection', (socket) => {
    
    socket.on('create-room', (roomCode: string, playerName: string, amountToWin: string) => {

        socket.join(roomCode)

        !rooms.hasOwnProperty(roomCode) ? rooms[roomCode] = {} : null

        rooms[roomCode]['users'] ? (rooms[roomCode]['users'][socket.id] = true) : (rooms[roomCode]['users'] = { [socket.id]: true });
        rooms[roomCode]['names'] = { playerOne : playerName }
        rooms[roomCode]['amountToWin'] = amountToWin
    });

    socket.on('join-room', (roomCode: string, playerName) => {

        socket.join(roomCode)
        
        rooms[roomCode]['users'][socket.id] = true
        rooms[roomCode]['names'].playerTwo = playerName
        socket.to(roomCode).emit('second-player-joined', rooms[roomCode]['names'].playerOne, playerName, roomCode)
    })

    socket.on('send-move', (column: number, room: string) => {
        socket.to(room).broadcast.emit('receive-move', column, counter++)
    })

    socket.on('reset-board', (playerOne, room) => {
        socket.to(room).broadcast.emit('reset-board', playerOne)
    })

    socket.on('reset-unfinished-board', (player, agree, playerOne, room) => {
        socket.to(room).broadcast.emit('reset-unfinished-board', player, agree, playerOne)
    })

    socket.on('send-playerOne-name', (player1, roomCode) => {
        socket.to(roomCode).broadcast.emit('get-playerOne-name', player1, rooms[roomCode]['amountToWin'])
    })

    socket.on('change-turns', (roomCode, playerOne, playerTwo) => {
        socket.to(roomCode).broadcast.emit('change-turns', playerOne, playerTwo)
    }) 

    socket.on('cancel-agree-to-reset', (roomCode)=> {
        socket.to(roomCode).broadcast.emit('cancel-agree-to-reset-to-other-player')
    })
  });

server.listen(PORT, () => console.log('Server is listening... '));