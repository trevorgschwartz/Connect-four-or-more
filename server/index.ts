import express, { Application, Request, Response } from 'express';
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


console.log('hit')

io.on('connection', (socket) => {
    
    socket.on('create-room', (roomCode: string, playerName: string, amountToWin: string) => {

        socket.join(roomCode)

        !rooms.hasOwnProperty(roomCode) ? rooms[roomCode] = {} : null

        rooms[roomCode]['users'] ? (rooms[roomCode]['users'][socket.id] = true) : (rooms[roomCode]['users'] = { [socket.id]: true });
        rooms[roomCode]['names'] = { playerOne : playerName }
        rooms[roomCode]['amountToWin'] = amountToWin
        setTimeout(() => {
            console.log("rooms", rooms)
        }, 1000)
    });

    socket.on('join-room', (roomCode: string, playerName) => {

        socket.join(roomCode)
        
        rooms[roomCode]['users'][socket.id] = true
        rooms[roomCode]['names'].playerTwo = playerName
        setTimeout(() => {
            console.log("rooms", rooms)
        }, 1000)
        socket.to(roomCode).emit('second-player-joined', rooms[roomCode]['names'].playerOne, playerName, roomCode)
    })

    socket.on('send-move', (column: number, room: string) => {
        socket.to(room).broadcast.emit('receive-move', column, counter++)
    })

    socket.on('reset-board', (playerOne, room) => {
        console.log('reset-board hit')
        socket.to(room).broadcast.emit('reset-board', playerOne)
    })

    socket.on('reset-unfinished-board', (player, agree, playerOne, room) => {
        console.log('reset-unfinished-board hit')
        socket.to(room).broadcast.emit('reset-unfinished-board', player, agree, playerOne)
    })

    socket.on('send-playerOne-name', (player1, roomCode) => {
        socket.to(roomCode).broadcast.emit('get-playerOne-name', player1, rooms[roomCode]['amountToWin'])
    })

    socket.on('change-turns', (roomCode, playerOne, playerTwo) => {
        console.log('server change-turns hit')
        socket.to(roomCode).broadcast.emit('change-turns', playerOne, playerTwo)
    }) 
  
    // socket.on('send-text-update', (room, text) => {
    //   socket.to(room).broadcast.emit('text-update', text);
    //   rooms[room]['textEditor'] = text;
    // });
  
    // socket.on('send-canvas-update', (room, url) => {
    //   socket.to(room).broadcast.emit('canvas-update', url);
    //   rooms[room]['whiteboard'] = url;
    // });
  
    // socket.on('send-code-update', (room, data) => {
    //   socket.to(room).broadcast.emit('code-update', data);
    //   rooms[room]['codeEditor'] = data;
    // });
  
    // socket.on('send-prompt-update', (room, prompt) => {
    //   socket.nsp.to(room).emit('prompt-update', prompt);
    //   rooms[room]['prompt'] = prompt;
    // });
  
    // socket.on('send-timer-update', (room, bool) => {
    //   socket.nsp.to(room).emit('timer-update', bool);
    // });
  
    // socket.on('disconnect', () => {
    //   Object.entries(rooms).forEach((row: any) => {
    //     if (!!row[1]['users'][socket.id]) {
    //       socket.to(row[0]).broadcast.emit('user-left-room', `Client ${socket.id} left the room`);
    //       delete rooms[row[0]]['users'][socket.id];
    //       if (!Object.keys(rooms[row[0]]['users']).length) delete rooms[row[0]];
    //     }
    //   });
    // });
  });

server.listen(PORT, () => console.log('Server is listening... '));