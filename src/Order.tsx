import React from 'react';
import './App.css';

type OrderProps = {
    nameOfOrder: string
    hours: number
    minutes: number
    seconds: number
    deleteOrder: (id: string) => void
    id: string
}

function Order(props: OrderProps) {
    return(
        <div className={'spanWrapper'}>
            <div>
                <span className={'nameOfOrder'}>{props.nameOfOrder} </span>
            </div>
            <div>
                <span>{props.hours}:</span>
                <span>{props.minutes}:</span>
                <span>{props.seconds}</span>
            </div>
            <div>
                <button className={'buttonDel'} onClick={() => props.deleteOrder(props.id)}>X</button>
            </div>

        </div>
    )
}

export default Order