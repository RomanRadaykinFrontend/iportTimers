import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import Order from "./Order";
import {v1} from "uuid";
import {restoreState, saveState} from './localStorage';

export type OrdersArrayType = Array<TimerType>

type TimerType = {
    id: string
    nameOfOrder: string
    hours: number
    minutes: number
    timeEnd: number
    seconds: number
}

function App() {

    let defaultOrdersArray: Array<any> = [];

    let [ordersArray, setOrdersArray] = useState<OrdersArrayType>(restoreState('state', defaultOrdersArray));
    let [inputText, setInputText] = useState<string>('');

    const save = () => {
        saveState('state', ordersArray);
    };


    const changeNameOrder = (e: ChangeEvent<HTMLInputElement>) => {
        inputText = e.currentTarget.value;
        setInputText(inputText)
    }

    const addUsualOrder = () => {
        let date = new Date();
        let timeEnd = (date.getHours()*60) * 60 + date.getMinutes() * 60 + date.getSeconds() + 10800;

        let newOrder: TimerType = {
            id: v1(),
            nameOfOrder: inputText,
            hours: 3,
            minutes: 0,
            seconds: 0,
            timeEnd: timeEnd
        }
        setOrdersArray([...ordersArray, newOrder]);
        setInputText('');
        save()

    }

    const addExpressOrder = () => {
        let date = new Date();
        let timeEnd = (date.getHours()*60) * 60 + date.getMinutes() * 60 + date.getSeconds() + 3600;

        let newOrder: TimerType = {
            id: v1(),
            nameOfOrder: inputText,
            hours: 1,
            minutes: 0,
            seconds: 0,
            timeEnd: timeEnd
        }
        setOrdersArray([...ordersArray, newOrder]);
        setInputText('');
        save()
    }


    const deleteOrder = (orderID: string) => {
        let newOrdersArray: OrdersArrayType = ordersArray.filter(order => order.id !== orderID);
        setOrdersArray(newOrdersArray)
        save()
    }

    useEffect(() => {
        const id = setInterval(() => {
            let newArr = ordersArray.map(order => {

                if(order.minutes === 0 && order.hours === 0 && order.seconds === 0){
                    return order
                } else {
                    let date = new Date();
                    let timeLeft = order.timeEnd - ((date.getHours()*60) * 60 + date.getMinutes() * 60 + date.getSeconds());
                    let timeLeftHours = Math.floor(timeLeft / 3600);
                    let timeLeftMinutes = Math.floor((timeLeft - (timeLeftHours * 3600)) / 60);
                    let timeLeftSeconds = (timeLeft - (timeLeftHours * 3600)) % 60;
                    return {
                        id: order.id,
                        nameOfOrder: order.nameOfOrder,
                        hours: timeLeftHours,
                        minutes: timeLeftMinutes,
                        seconds: timeLeftSeconds,
                        timeEnd: order.timeEnd
                    }
                }
            });
            setOrdersArray(newArr)
        }, 1000);
        return () => clearInterval(id)
    })


    return (
        <div className="App">
            <div className={'controlsWrapper'}>
                <input className={'inputStyle item'} placeholder='Введи номер ЗН' type='text' value={inputText} onChange={changeNameOrder}/>
                <button className={'expressButton item'} onClick={addExpressOrder}>1 час</button>
                <button className={'usualButton item'} onClick={addUsualOrder}>3 часа</button>
            </div>

            <div className={'timersWrapper'}>
                {
                    ordersArray.map(order => {
                        return (
                            <div>
                                <Order nameOfOrder={order.nameOfOrder} hours={order.hours} minutes={order.minutes} seconds={order.seconds} deleteOrder={deleteOrder} id={order.id}/>
                                {save()}
                            </div>

                        )

                    })
                }
            </div>
        </div>
    );
}

export default App;
