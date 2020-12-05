const checkLeftRight = (board: string[][], row: number, col: number, amountToWin: string) => {
    const color = board[row][col]
    let leftCheck = col
    let rightCheck = col
    let rightStillMatched = true
    let leftStillMatched = true
    let localWinningPieces = [[row, col]]
    while (leftStillMatched || rightStillMatched) {
      if (leftCheck > 0 && board[row][leftCheck - 1] === color && color !== 'O') {
        leftCheck--
        localWinningPieces.push([row, leftCheck])
      } else leftStillMatched = false
      
      if (rightCheck < (board[0].length - 1) && board[row][rightCheck + 1] === color && color !== 'O') {
        rightCheck++
        localWinningPieces.push([row, rightCheck])
      } else rightStillMatched = false
    }

    if (localWinningPieces.length >= Number(amountToWin) && amountToWin !== '') {
    return localWinningPieces
    }

    return []
  }

  const checkUpDown = (board: string[][], row: number, col: number, amountToWin: string) => {
    let color = board[row][col]
    let upCheck = row
    let downCheck = row
    let upStillMatched = true
    let downStillMatched = true
    let localWinningPieces = [[row, col]]
    while (upStillMatched || downStillMatched) {
      if (upCheck > 0 && board[upCheck - 1][col] === color && color !== 'O') {
        upCheck--
        localWinningPieces.push([upCheck, col])
      } else upStillMatched = false
      
      if (downCheck < board.length - 1 && board[downCheck + 1][col] === color && color !== 'O') {
        downCheck++
        localWinningPieces.push([downCheck, col])
      } else downStillMatched = false
    }

    if (localWinningPieces.length >= Number(amountToWin) && amountToWin !== '') {
        return localWinningPieces
    }

    return []
  }

  const checkMinorDiagonal = (board: string[][], row: number, col: number, amountToWin: string) => {
    let color = board[row][col]
    let topRightCheck = [row, col]
    let bottomLeftCheck = [row, col]
    let upRightStillMatched = true
    let downLeftStillMatched = true
    let localWinningPieces = [[row, col]]
    while (upRightStillMatched || downLeftStillMatched) {
      if (topRightCheck[0] > 0 && topRightCheck[1] < (board[0].length - 1) && board[topRightCheck[0] - 1][topRightCheck[1] + 1] === color && color !== 'O') {
        topRightCheck = [topRightCheck[0] - 1, topRightCheck[1] + 1]
        localWinningPieces.push([topRightCheck[0], topRightCheck[1]])
      } else upRightStillMatched = false
      
      if (bottomLeftCheck[0] < (board.length - 1) && bottomLeftCheck[1] > 0 && board[bottomLeftCheck[0] + 1][bottomLeftCheck[1] - 1] === color && color !== 'O') {
        bottomLeftCheck = [bottomLeftCheck[0] + 1, bottomLeftCheck[1] - 1]
        localWinningPieces.push([bottomLeftCheck[0], bottomLeftCheck[1]])
      } else downLeftStillMatched = false
    }

    if (localWinningPieces.length >= Number(amountToWin) && amountToWin !== '') {
        return localWinningPieces
    }

    return []
  }

  const checkMajorDiagonal = (board: string[][], row: number, col: number, amountToWin: string) => {
    let color = board[row][col]
    let topLeftCheck = [row, col]
    let bottomRightCheck = [row, col]
    let upLeftStillMatched = true
    let downRightStillMatched = true
    let localWinningPieces = [[row, col]]
    while (upLeftStillMatched || downRightStillMatched) {
      if (topLeftCheck[0] > 0 && topLeftCheck[1] > 0 && board[topLeftCheck[0] - 1][topLeftCheck[1] - 1] === color && color !== 'O') {
        topLeftCheck = [topLeftCheck[0] - 1, topLeftCheck[1] - 1]
        localWinningPieces.push([topLeftCheck[0], topLeftCheck[1]])
      } else upLeftStillMatched = false
      
      if (bottomRightCheck[0] < (board.length - 1) && bottomRightCheck[1] < board[0].length - 1 && board[bottomRightCheck[0] + 1][bottomRightCheck[1] + 1] === color && color !== 'O') {
        bottomRightCheck = [bottomRightCheck[0] + 1, bottomRightCheck[1] + 1]
        localWinningPieces.push([bottomRightCheck[0], bottomRightCheck[1]])
      } else downRightStillMatched = false
    }

    if (localWinningPieces.length >= Number(amountToWin) && amountToWin !== '') {
        return localWinningPieces
    }

    return []
  }

  export const winDetection = (row: number, col: number, board: string[][], amountToWin: string) => {

    let upDown = checkUpDown(board, row, col, amountToWin)
    let leftRight = checkLeftRight(board, row, col, amountToWin)
    let minorDial = checkMinorDiagonal(board, row, col, amountToWin)
    let majorDial = checkMajorDiagonal(board, row, col, amountToWin)
    const localWinPieces = upDown.concat(leftRight, minorDial, majorDial)
    return localWinPieces
  }