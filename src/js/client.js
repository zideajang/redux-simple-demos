import { createStore } from 'redux';

const reducer = function(state, action){
    if(action.type == "INC"){
        // console.log(action.payload);
        // console.log(typeof action.payload);
        return state + action.payload
    }
    if(action.type == "DEC"){

        return state - action.payload;
    }

    return state;
}

const store = createStore(reducer,0);

store.subscribe(()=>{
    console.log(store.getState());
    console.log(typeof store.getState());
    console.log("store changed", store.getState())
})

store.dispatch({type:"INC", payload: 1});
store.dispatch({type:"INC", payload: 22});
store.dispatch({type:"DEC", payload: 10});
store.dispatch({type:"INC", payload: 52});
store.dispatch({type:"INC", payload: 1});