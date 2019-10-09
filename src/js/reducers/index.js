// src/js/reducers/index.js
import { ADD_CARO, JUMP_STEP } from "../constants/action-types";
import { calculateWinner } from '../../rule'

const initialState = {
  history: [{ value: null, i: null, j: null }],
  stepNumber: 0,
  xIsNext: true,
  winner: null,
  winnerSquares: Array(20).fill(Array(20).fill(null)),
  squares: Array(20).fill(Array(20).fill(null))
};

const rootReducer = (state = initialState, action) => {


  switch (action.type) {
    case ADD_CARO: {
      const { history, stepNumber, xIsNext, winner, squares } = state;
      const { i, j } = action.index
      const newHistory = history.slice(0, stepNumber + 1)
      const newSquares = [];
      squares.map(value => newSquares.push(value.slice()));


      if (winner || newSquares[action.index.i][action.index.j]) return state;

      newSquares[i][j] = xIsNext ? 'X' : 'O';
      const winnerS = calculateWinner(i, j, newSquares)
      const newState = {
        history: newHistory.concat({ value: xIsNext ? 'X' : 'O', i, j }),
        xIsNext: !xIsNext,
        winner: winnerS[i][j],
        winnerSquares: winnerS,
        stepNumber: newHistory.length,
        squares: newSquares
      };
      return newState;
    }
    case JUMP_STEP: {
      const { history } = state
      const { step } = action
      const newSquares = Array(20).fill(null).map(() => Array(20).fill(null))

      if (step > 0) {
        for (let index = 1; index <= step; index++) {
          const his = history[index]
          newSquares[his.i][his.j] = his.value
        }
      }

      const index = history[step]
      const winnerS = calculateWinner(index.i || 0, index.j || 0, newSquares)


      const newState = {
        squares: newSquares,
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        winner: winnerS[index.i || 0][index.j || 0],
        winnerSquares: winnerS
      };
      return newState;
    }
    default:
      return state;
  }


}

export default rootReducer;
