import  React, { useEffect, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import socket from './utilities/socketConnection'
import { AppState } from './index'
import PlayerInput from './components/PlayerInput'
import Game from './components/Game'
import OnlineInput from './components/OnlineInput'
import SpeedGameTimerPlayerOne from './components/SpeedGameTimerPlayerOne'
import SpeedGameTimerPlayerTwo from './components/SpeedGameTimerPlayerTwo'
import { setPlayerOne, setPlayerTwo, setAmountToWin, setRecievedOnlineColumnClicked, setOnlineRerenderCounter, setPlayerTurn, setOtherOnlinePlayerName, setStartSpeedPlay, setSpeedPlay, setSpeedTimer, setChangeTurnsDisabled, setPlayerOneReadyToPlay } from './actions/index'

const App: React.FC = () => {
    const amountToWin: string = useSelector((state: AppState) => state.amountToWin)
    const view: string = useSelector((state: AppState) => state.view)
    const roomCode: string = useSelector((state: AppState) => state.roomCode)
    const secondPlayerRoomCode = useSelector((state: AppState) => state.secondPlayerRoomCode)
    const playerOne: string[] = useSelector((state: AppState) => state.playerOne)
    const playerTwo: string[] = useSelector((state: AppState) => state.playerTwo)
    const otherPlayer = useSelector((state: AppState) => state.otherPlayer)
    const onlineOrNot = useSelector((state: AppState) => state.playingOnlineOrNot)
    const speedPlay = useSelector((state: AppState) => state.speedPlay)
    const startSpeedPlay: boolean = useSelector((state: AppState) => state.startSpeedPlay)
    const readyToPlay: boolean = useSelector((state: AppState) => state.readyToPlay)
    const playerOneReadyToPlay: boolean = useSelector((state: AppState) => state.playerOneReadyToPlay)
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (playerOne[0] !== '') dispatch(setPlayerTurn(playerOne))
    }, [playerOne])


  useEffect(() => {
   
    socket.on('receive-move', (receivedColumn: number, onlineRerenderCounter: number) => {
        dispatch(setRecievedOnlineColumnClicked(receivedColumn))
        dispatch(setOnlineRerenderCounter(onlineRerenderCounter))
    })

    socket.on('second-player-joined', (player1: string, player2: string, roomCode: string) => {
        dispatch(setPlayerTwo(player2))
        dispatch(setOtherOnlinePlayerName(player2))
        socket.emit('send-playerOne-name', player1, roomCode)
    })

    socket.on('get-playerOne-name', (player1: string, amountToWinFromOnline: string, speedPlay: boolean, speedTimer: number, playerOneReady: boolean) => {
        dispatch(setPlayerOne(player1))
        dispatch(setOtherOnlinePlayerName(player1))
        dispatch(setAmountToWin(amountToWinFromOnline))
        dispatch(setSpeedPlay(speedPlay))
        dispatch(setSpeedTimer(speedTimer))
        if (playerOneReady) dispatch(setPlayerOneReadyToPlay(true))
    })
    
    socket.on('receive-start-timer', () => {
        dispatch(setStartSpeedPlay(true))
    })
    
    socket.on('receive-player-one-ready', () => {
        dispatch(setPlayerOneReadyToPlay(true))
    })

    socket.on('change-turns', (playerOne: string[], playerTwo: string[]) => {
        let copyPlayerOne = playerOne.slice()
        dispatch(setPlayerOne(playerTwo.slice()))
        dispatch(setPlayerTwo(copyPlayerOne))
    })
    
    socket.on('receive-start-timer-change-turns', (timer: number) => {
        dispatch(setSpeedTimer(timer))
        dispatch(setStartSpeedPlay(false))
    })

    return () => {
        socket.disconnect()
    }
  }, []) 
        
    useEffect(() => {
        if (secondPlayerRoomCode.length) socket.emit('join-room', secondPlayerRoomCode, playerTwo)
    }, [secondPlayerRoomCode])

    const startSpeedTimer = (e: MouseEvent) => {
        dispatch(setStartSpeedPlay(true))
        dispatch(setChangeTurnsDisabled(1))
        if (onlineOrNot) socket.emit('start-timer', roomCode || secondPlayerRoomCode)
    }
   
    return (
        <div >
            <div className='title'>
                <div className="divHoldingNamesAndColor">
                    <span className="connect">Connect</span>
                    <span className="connect4">{ amountToWin.length ? amountToWin : 4 }</span>
                </div>
                <div className="divHoldingNamesAndColor" >
                    {view === 'game' && <span className='namesAndColor'>{playerOne[0]}   </span>}
                    {view === 'game' && <span className={`circle${playerOne[1]} circleToBottom`}></span>}
                    {view === 'game' && speedPlay && startSpeedPlay && 
                    <span>
                        <SpeedGameTimerPlayerOne />
                    </span>}
                </div>
                <div >
                    {view === 'game' && <span className='namesAndColor'>{playerTwo[0]}   </span>}
                    {view === 'game' && <span className={`circle${playerTwo[1]} circleToBottom`}></span>}
                    {view === 'game' && speedPlay && startSpeedPlay && 
                    <span>
                        <SpeedGameTimerPlayerTwo />
                    </span>}
                </div>
                <div>
                    {speedPlay && view === 'game' ? 
                        !startSpeedPlay && otherPlayer && readyToPlay && playerOneReadyToPlay ?
                        <button className="button2 LatoText2" onClick={startSpeedTimer}>Start Speed Play</button>
                        : !startSpeedPlay && !onlineOrNot ?
                        <button className="button2 LatoText2" onClick={startSpeedTimer}>Start Speed Play</button> : null
                        : null
                    }
                </div>
            </div>
            { !otherPlayer && view === 'game' && onlineOrNot && <p>Waiting for other player to join</p> }
            { view === 'input' && <PlayerInput /> }
            { view === 'onlineInput' && <OnlineInput /> }
            { view === 'game' && <Game /> }
        </div>
    );
}

export default App;