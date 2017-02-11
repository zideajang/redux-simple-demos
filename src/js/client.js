import { applyMiddleware, createStore } from 'redux';

import axios from "axios";

import logger from "redux-logger";
import thunk from "redux-thunk";

const initialState = {
    fetching: false,
    fetched: false,
    users:{},
    error:null
}

const reducer = (state = {}, action)=>{
    switch (action.type) {
        case "FETCH_USERS_START":
            return {...state, fecthing:true}
            break;

        case "FETCH_USERS_ERROR":
             return {...state, fecthing:false, error:action.payload}
            return
            
        case "RECEIVE_USERS":{
            return {...state, fecthing:false, fetched:true, users:action.payload}
            break;
        }
        default:
            break;
    }

    return state;
}


const middleware = applyMiddleware(thunk, logger());

const store = createStore(reducer,middleware);

store.subscribe(()=>{
    console.log("store changed", store.getState())
})

store.dispatch((dispatch) =>{
    dispatch({
        type:"FETCH_USERS_START"

    })

    axios.get("http://localhost:4200/user")
        .then((response) => {
            dispatch({type:"RECEIVE_USERS", payload: response.data})
        })
        .catch((err)=>{
            dispatch({type:"RECEIVE_USERS", payload:err})
        })
})
