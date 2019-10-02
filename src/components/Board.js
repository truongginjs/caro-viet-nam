import React, { Component } from 'react'
import { Square } from './Square'

export class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(20).fill(Array(20).fill(null)),
            xNext: true,
            winner: null
        }
    }

    renderSquare(i, j) {

        return (
            <Square key={20 * i + j}
                value={this.state.squares[i][j]}
                onClick={() => this.handleClick(i, j)}
            />
        );
    }
    handleClick(i, j) {
        if (this.state.winner || this.state.squares[i][j]) return;
        let squares = [];
        this.state.squares.map(value => squares.push(value.slice()))
        squares[i][j] = this.state.xNext ? 'X' : 'O';
        this.setState({ squares: squares, xNext: !this.state.xNext, winner: calculateWinner(i, j, squares) });
    }

    render() {
        let status;
        if (this.state.winner) {
            status = 'Winner: ' + this.state.winner;
        } else {
            status = 'Next player: ' + (this.state.xNext ? 'X' : 'O');
        }

        const arr = Array(20).fill(null)

        return (

            <div>
                <div className="status">{status}</div>
                {
                    arr.map((_, i) => <div className="board-row" key={i}>{arr.map((_, j) => this.renderSquare(i, j))}</div>)
                }
                <button type="button" onClick={() => {

                    this.setState({ squares: Array(20).fill(Array(20).fill(null)), winner: null, xNext: true })
                }}>Restart </button>

            </div>
        );
    }

}


const calculateWinner = (i, j, squares) => {
    let count = 0;
    const pValue = squares[i][j]
    let index = { i: i, j: (j - 4 < 0) ? 0 : j - 4 }
    //check row
    while (index.j <= j) {
        let run = { i: index.i, j: index.j }
        while (count < 5) {

            if (!checkIndex(run) || pValue !== squares[run.i][run.j]) {
                count = 0
                break
            }
            run.j++
            count++
        }

        if (count !== 0) {
            if (index.j > 0 && index.j + 5 < 20) {
                const start = squares[index.i][index.j - 1]
                const end = squares[index.i][index.j + 5]
                if (start && end)
                    if (pValue !== start && pValue !== end) {
                        count = 0
                        break
                    }
            }

            return squares[i][j]


        }

        index.j++;
    }

    //check column
    index = { i: (i - 4 < 0) ? 0 : i - 4, j: j }
    while (index.i <= i) {
        let run = { i: index.i, j: index.j }
        while (count < 5) {
            if (!checkIndex(run) || squares[i][j] !== squares[run.i][run.j]) {
                count = 0
                break
            }
            run.i++
            count++
        }

        if (count !== 0) {
            if (index.i > 0 && index.i + 5 < 20) {
                const start = squares[index.i - 1][index.j]
                const end = squares[index.i + 5][index.j]
                if (start && end)
                    if (pValue !== start && pValue !== end) {
                        count = 0
                        break
                    }
            }

            return squares[i][j]


        }
        index.i++;
    }
    //check diagonal up right
    if (19 - i < 4 || j < 4) {
        if (19 - i < j) {
            index = { i: 19, j: j - 19 + i }
        }
        else {
            index = { i: i + j, j: 0 }
        }
    } else {
        index = { i: i + 4, j: j - 4 }
    }

    while (index.j <= j) {
        let run = { i: index.i, j: index.j }
        while (count < 5) {
            if (!checkIndex(run) || squares[i][j] !== squares[run.i][run.j]) {
                count = 0
                break
            }
            run.i--;
            run.j++;
            count++
        }


        if (count !== 0) {
            if (index.i > 0 && index.i + 5 < 20 && index.j > 0 && index.j + 5 < 20) {
                const start = squares[index.i + 1][index.j - 1]
                const end = squares[index.i - 5][index.j + 5]
                if (start && end)
                    if (pValue !== start && pValue !== end) {
                        count = 0
                        break
                    }
            }

            return squares[i][j]


        }
        index.i--;
        index.j++;
    }

    // //check diagonal down right
    if (i < 4 || j < 4) {
        if (i < j) {
            index = { i: 0, j: j + 4 - i }
        }
        else {
            index = { i: i + 4 - j, j: 0 }
        }
    } else {
        index = { i: i - 4, j: j - 4 }
    }

    while (index.j <= j) {
        let run = { i: index.i, j: index.j }
        while (count < 5) {
            if (!checkIndex(run) || squares[i][j] !== squares[run.i][run.j]) {
                count = 0
                break
            }
            run.i++;
            run.j++;
            count++
        }

        if (count !== 0) {
            if (index.i > 0 && index.i + 5 < 20 && index.j > 0 && index.j + 5 < 20) {
                const start = squares[index.i - 1][index.j - 1]
                const end = squares[index.i + 5][index.j + 5]
                if (start && end)
                    if (pValue !== start && pValue !== end) {
                        count = 0
                        break
                    }
            }

            return squares[i][j]


        }
        index.i++;
        index.j++;
    }
    return null;
}

const checkIndex = (index) => {
    if (index.i >= 0 && index.i < 20 && index.j >= 0 && index.j < 20) {
        return true
    }
    return false

}

// const checkRudeVN=(index,value,start,end)=>{
//     if (index.i > 0 && index.i + 5 < 20 && index.j > 0 && index.j + 5 < 20) {        
//         if (start && end)
//             if (value !== start && value !== end) {
//                 return true
//             }
//     }
//     return false
// }