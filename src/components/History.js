import React, { Component } from "react";

export const Default = "History component";
export class History extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAscending: false        }
    }

    changeSoft() {
        const {isAscending} = this.state
        this.setState({
            isAscending: !isAscending
        })
    }

    render() {
        const { isAscending } = this.state;
        const { listHistory, stepNumber, jumpTo } = this.props;
        const moves = listHistory.map((his, index) => {
            const desc = index ?
                `value: ${his.value}; index: (${his.i} : ${his.j})` :
                'Go to game start';
            return (
                <li key={String(index)}>
                    <button type="button" className={(stepNumber === index) ? "btn-active" : ""} onClick={() => jumpTo(index)}>{desc}</button>
                </li>
            );
        });



        return (<div>
            <ol>{(isAscending)?moves:moves.reverse()}</ol>
            <button type="button" onClick={() => this.changeSoft()}>{isAscending ? "ascending" : "decreasing"}</button>
        </div>)
    }
}


