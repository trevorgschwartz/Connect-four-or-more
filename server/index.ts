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
    
    socket.on('create-room', (roomCode: string, playerName: string, amountToWin: string, speedPlay, speedTimer) => {

        socket.join(roomCode)

        if (!rooms.hasOwnProperty(roomCode)) rooms[roomCode] = {}

        rooms[roomCode]['users'] = { [socket.id]: 'playerOne' }
        rooms[roomCode]['names'] = { playerOne : playerName }
        rooms[roomCode]['amountToWin'] = amountToWin
        rooms[roomCode]['speedPlay'] = speedPlay
        rooms[roomCode]['speedTimer'] = speedTimer
    });

    socket.on('join-room', (roomCode: string, playerName) => {

        socket.join(roomCode)
        
        rooms[roomCode]['users'][socket.id] = 'playerTwo'
        rooms[roomCode]['names'].playerTwo = playerName
        socket.to(roomCode).emit('second-player-joined', rooms[roomCode]['names'].playerOne, playerName, roomCode)
    })
    
    socket.on('send-speedPlay', (roomCode: string, speedPlay: boolean, speedTimer) => {

        rooms[roomCode]['speedPlay'] = speedPlay
        rooms[roomCode]['speedTimer'] = speedTimer
    })
    
    socket.on('start-timer', (roomCode: string) => {
        socket.to(roomCode).emit('receive-start-timer')
    })
    
    socket.on('change-turns-new-timer', (roomCode: string, timer) => {
        socket.to(roomCode).emit('receive-start-timer-change-turns', timer)
    })
    
    socket.on('player-one-ready', (roomCode: string) => {
        rooms[roomCode]['playerOneReady'] = true
        socket.to(roomCode).emit('receive-player-one-ready')
    })

    socket.on('send-move', (column: number, room: string) => {
        socket.to(room).broadcast.emit('receive-move', column, counter++)
    })

    socket.on('reset-board', (playerOne, room) => {
        socket.to(room).broadcast.emit('reset-board', playerOne, rooms[room]['speedTimer'])
    })

    socket.on('reset-unfinished-board', (player, agree, playerOne, roomCode) => {
        socket.to(roomCode).broadcast.emit('reset-unfinished-board', player, agree, playerOne, rooms[roomCode]['speedTimer'])
    })

    socket.on('send-playerOne-name', (player1, roomCode) => {
        socket.to(roomCode).broadcast.emit('get-playerOne-name', player1, rooms[roomCode]['amountToWin'], rooms[roomCode]['speedPlay'], rooms[roomCode]['speedTimer'], rooms[roomCode]['playerOneReady'])
    })

    socket.on('change-turns', (roomCode, playerOne, playerTwo) => {
        socket.to(roomCode).broadcast.emit('change-turns', playerOne, playerTwo)
    }) 

    socket.on('cancel-agree-to-reset', (roomCode)=> {
        socket.to(roomCode).broadcast.emit('cancel-agree-to-reset-to-other-player')
    })

    socket.on('disconnect', () => {
        Object.entries(rooms).forEach((row: any) => {
          if (!!row[1]['users'][socket.id]) {
            socket.to(row[0]).broadcast.emit('user-left-room');
            if (row[1]['users'][socket.id] === 'playerOne') delete rooms[row[0]]['names']['playerOne']
            else delete rooms[row[0]]['names']['playerTwo'] 
            delete rooms[row[0]]['users'][socket.id];
            if (!Object.keys(rooms[row[0]]['users']).length) delete rooms[row[0]];
          }
        });
      });
  });

server.listen(PORT, () => console.log('Server is listening... '));