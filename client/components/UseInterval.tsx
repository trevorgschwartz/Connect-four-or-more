
import { useEffect, useRef } from 'react'

function useInterval(callback: any, delay: number | null) {
    const savedCallback: any = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    
    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      } else return
    }, [delay]);
}

export default useInterval