import React from "react";
import { connect } from "react-redux";
import Board from "./Board";
import History from './History';


const Game = props => {

    const { winner, xIsNext } = props;
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <History />

            </div>
        </div>
    );
}

const mapStateToProps = state => {
    const { winner, xIsNext } = state.HandleCaro
    return { winner, xIsNext }
}

export default connect(mapStateToProps)(Game);