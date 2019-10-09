import React, { Component } from "react";
import {connect} from 'react-redux'
import Board from "./Board";
import History from './History'
import {calculateWinner} from '../rule'

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{ value: null, i: null, j: null }],
            stepNumber: 0,
            xIsNext: true,
            winner: null,
            winnerSquares: Array(20).fill(Array(20).fill(null)),
            squares: Array(20).fill(Array(20).fill(null))
        };
    }

    handleClick(i, j) {
        const { winner, history, stepNumber, xIsNext, squares } = this.state;

        const newHistory = history.slice(0, stepNumber + 1)
        const newSquares = [];
        squares.map(value => newSquares.push(value.slice()));


        if (winner || newSquares[i][j]) return;
        newSquares[i][j] = xIsNext ? 'X' : 'O';
        const winnerS = calculateWinner(i, j, newSquares)
        this.setState({
            history: newHistory.concat({ value: xIsNext ? 'X' : 'O', i, j }),
            xIsNext: !xIsNext,
            winner: winnerS[i][j],
            winnerSquares: winnerS,
            stepNumber: newHistory.length,
            squares: newSquares
        });
    }

    jumpTo(step) {
        const { history } = this.state
        const newSquares = Array(20).fill(null).map(() => Array(20).fill(null))

        if (step > 0) {
            for (let index = 1; index <= step; index++) {
                const his = history[index]
                newSquares[his.i][his.j] = his.value
            }
        }

        const index = history[step]
        const winnerS = calculateWinner(index.i || 0, index.j || 0, newSquares)


        this.setState({
            squares: newSquares,
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            winner: winnerS[index.i || 0][index.j || 0],
            winnerSquares: winnerS
        });
    }

    render() {
        const { history, winner, xIsNext, squares, stepNumber, winnerSquares } = this.state;
        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${xIsNext ? 'X' : 'O'}`;
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={squares} winnerSquares={winnerSquares} handleClick={(i, j) => this.handleClick(i, j)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <History listHistory={history} stepNumber={stepNumber} jumpTo={(move) => this.jumpTo(move)} />

                </div>
            </div>
        );
    }
}

