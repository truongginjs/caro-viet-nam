import React, { Component } from 'react'
import { Square } from './Square'

export const Default = "Board component";
export class Board extends Component {

    renderSquare(i, j) {
        const {squares,winnerSquares,handleClick} = this.props;
        return (
            <Square key={20 * i + j}
                value={squares[i][j]}
                winner={winnerSquares[i][j]}
                onClick={() => handleClick(i, j)}
            />
        );
    }

    render() {
        const arr = Array(20).fill(null)
        return (
            <div>
                {arr.map((t1, index) => <div className="board-row" key={String(index)}>{arr.map((t2, j) => this.renderSquare(index, j))}</div>)}
            </div>
        );
    }

}




