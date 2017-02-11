import { applyMiddleware, createStore } from 'redux';

import axios from "axios";

import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

const initialState = {
    fetching: false,
    fetched: false,
    users:{},
    error:null
}

const reducer = (state = initialState, action)=>{
    switch (action.type) {
        case "FETCH_USERS_PENDING":
            return {...state, fecthing:true}
            break;

        case "FETCH_USERS_REJECTED":
             return {...state, fecthing:false, error:action.payload}
            return
            
        case "RECEIVE_USERS_FULFILLED":{
            console.log(action.payload);
            console.log(111111);
            return {...state, fecthing:false, fetched:true, users:action.payload}
            break;
        }
        default:
            break;
    }

    return state;
}


const middleware = applyMiddleware(promise(),thunk, logger());

const store = createStore(reducer,middleware);

store.subscribe(()=>{
    console.log("store changed", store.getState())
})

store.dispatch({
    type:"FETCH_USERS",
    payload: axios.get("http://localhost:4200/user")
})

// store.dispatch((dispatch) =>{
//     dispatch({
//         type:"FETCH_USERS_START"

//     })

//     axios.get("http://localhostkaka:4200/user")
//         .then((response) => {
//             dispatch({type:"RECEIVE_USERS", payload: response.data})
//         })
//         .catch((err)=>{
//             dispatch({type:"FETCH_USERS_ERROR", payload:err})
//         })
// })
