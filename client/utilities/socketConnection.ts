import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:8080';
// const ENDPOINT = 'https://connect-four-or-more.herokuapp.com/';
const socket = socketIOClient(ENDPOINT);

export default socket