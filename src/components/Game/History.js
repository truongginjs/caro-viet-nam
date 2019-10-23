import React from "react";
import { connect } from 'react-redux';
import { changeSort, jumpTo } from '../../actions/History.action'

const History = props => {

    const { isAscending, histories, stepNumber, myJumpTo, myChangeSort } = props;
    const moves = histories.map((his, index) => {
        const desc = index ?
            `value: ${his.value}; index: (${his.i} : ${his.j})` :
            'Go to game start';
        return (
            <li key={String(index)}>
                <button type="button" className={(stepNumber === index) ? "btn-active" : ""} onClick={() => myJumpTo(index)}>{desc}</button>
            </li>
        );
    });



    return (<>
        <ol>{(isAscending) ? moves : moves.reverse()}</ol>
        <button type="button" onClick={() => myChangeSort()}>{isAscending ? "ascending" : "decreasing"}</button>
    </>)
}



const mapStateToProps = state => {
    const { isAscending, histories, stepNumber } = state.HandleCaro;
    return { isAscending, histories, stepNumber }
}

const mapDispatchToProps = ({
    myChangeSort: changeSort,
    myJumpTo: jumpTo
})



export default connect(mapStateToProps, mapDispatchToProps)(History)