import React, { FunctionComponent } from 'react'
import Slot from './Slot'

interface LinkStateProp{
    row: string[]
}

interface LinkDispatchProp{
    placePiece: (column: number) => void
}

type Props = LinkDispatchProp & LinkStateProp

const Rows:FunctionComponent<Props> = ({ row, placePiece }) => {

  return (
    <div className="row">
      {row.map((slot, i) => <Slot key={i} column={i} slot={slot} placePiece={placePiece} />)}
    </div>
  )
}

export default Rows