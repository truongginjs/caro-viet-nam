import React from 'react'

export const Default = "Square component";

export const Square = (props) => {
    const { winner, value, onClick } = props;
    return (<button type="button" className={winner ? "square square-winner" : "square"} onClick={() => onClick()}>{value}</button>)
}
// {(props.winner) ?  : "square square-winner"}