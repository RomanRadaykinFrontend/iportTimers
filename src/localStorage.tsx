import { OrdersArrayType } from "./App";


export function saveState(key: string, state: OrdersArrayType){
    const saveState = JSON.stringify(state);
    localStorage.setItem(key, saveState)
}


export function restoreState(key: string, defaultState: OrdersArrayType) {
    const state = localStorage.getItem(key);
    if (state !== null) defaultState = JSON.parse(state);
    return defaultState;
}
