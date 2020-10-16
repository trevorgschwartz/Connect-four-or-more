import React, { FunctionComponent } from 'react'
import Slot from './Slot'

interface LinkStateProp{
    row: string[]
    dropPieces: number
}

interface LinkDispatchProp{
    placePiece: (column: number) => void,
    setDropPieces: (num: number) => void,
}

type Props = LinkDispatchProp & LinkStateProp

const Rows:FunctionComponent<Props> = ({ row, dropPieces, placePiece, setDropPieces }) => {

  return (
    <div className="row">
      {row.map((slot, i) => <Slot key={i} column={i} slot={slot} placePiece={placePiece} dropPieces={dropPieces} setDropPieces={setDropPieces}/>)}
    </div>
  )
}

export default Rows