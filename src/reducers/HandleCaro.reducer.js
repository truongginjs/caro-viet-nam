import { calculateWinner } from '../rule'
import { ADD_CARO, JUMP_TO, CHANGE_SORT } from "../constants/action-types";

const initialState = {
    histories: [{ value: null, i: null, j: null }],
    stepNumber: 0,
    xIsNext: true,
    winner: null,
    winnerSquares: Array(20).fill(Array(20).fill(null)),
    squares: Array(20).fill(Array(20).fill(null)),
    isAscending: true
};

const PlayCaro = {
    doTurn: (state, index) => {
        const { histories, stepNumber, xIsNext, winner, squares } = state;
        const { i, j } = index
        const newHistories = histories.slice(0, stepNumber + 1)
        const newSquares = [];
        squares.map(value => newSquares.push(value.slice()));


        if (winner || newSquares[i][j]) return state;

        newSquares[i][j] = xIsNext ? 'X' : 'O';
        const winnerS = calculateWinner(i, j, newSquares)

        return {
            ...state,
            histories: newHistories.concat({ value: xIsNext ? 'X' : 'O', i, j }),
            xIsNext: !xIsNext,
            winner: winnerS[i][j],
            winnerSquares: winnerS,
            stepNumber: newHistories.length,
            squares: newSquares
        };
    },
    jumpTo: (state, step) => {
        const { histories } = state
        const newSquares = Array(20).fill(null).map(() => Array(20).fill(null))

        if (step > 0) {
            for (let index = 1; index <= step; index++) {
                const his = histories[index]
                newSquares[his.i][his.j] = his.value
            }
        }

        const index = histories[step]
        const winnerS = calculateWinner(index.i || 0, index.j || 0, newSquares)

        return {
            ...state,
            squares: newSquares,
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            winner: winnerS[index.i || 0][index.j || 0],
            winnerSquares: winnerS
        };
    },
    changeSort: (state) => ({ ...state, isAscending: !state.isAscending })

}
export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ADD_CARO: return PlayCaro.doTurn(state, action.index)
        case JUMP_TO: return PlayCaro.jumpTo(state, action.step)
        case CHANGE_SORT: return PlayCaro.changeSort(state)

        default: return state;
    }
}