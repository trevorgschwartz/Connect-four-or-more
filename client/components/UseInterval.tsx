
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../index'

function useInterval(callback: any, delay: number, player: string) {
    const speedTimer: number = useSelector((state: AppState) => state.speedTimer)
    const playerTurn = useSelector((state: AppState) => state.playerTurn)
    const gameWon = useSelector((state: AppState) => state.gameWon)
    const savedCallback: any = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        var id = setInterval(tick, delay);
        if (speedTimer < 1) clearInterval(id)
        if (playerTurn[0] !== player) clearInterval(id)
        if (gameWon[0]) clearInterval(id)
        return () => clearInterval(id);
      } else return
    }, [speedTimer, delay, playerTurn, gameWon]);
}

  export default useInterval