import React from 'react'

const Square = (props) => {
    const { winner, value, onClick } = props;
    return (<button type="button" className={winner ? "square square-winner" : "square"} onClick={() => onClick()}>{value}</button>)
}
// {(props.winner) ?  : "square square-winner"}
export default Square;