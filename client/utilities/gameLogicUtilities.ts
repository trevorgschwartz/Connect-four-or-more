export const emptyBoard = Array.apply(null, Array(6)).map(() => Array(7).fill("O"));

export const changePlayerTurn = (playerTurn: string[], player1: string[], player2: string[]) => {
    if (playerTurn[0] === player1[0]) {
        return player2
    } else return player1
}

export const copyBoardAndPlacePiece = (board: string[][], playerTurn: string[], column: number, i: number) => {
    let newBoard = board.map(row => row.slice())
    newBoard[i][column] = playerTurn[1]
    return newBoard
}