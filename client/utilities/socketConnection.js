import socketIOClient from 'socket.io-client';
const ENDPOINT = 'https://connect-four-or-more.herokuapp.com/';
const socket = socketIOClient(ENDPOINT);

export default socket