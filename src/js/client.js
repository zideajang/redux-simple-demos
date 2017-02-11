import { combineReducers, createStore } from 'redux';

const usersReducer = (state = {}, actions) =>{
    switch (actions.type) {
        case "CHANGE_NAME":
            state = {...state, name: actions.payload}
            // state.name = actions.payload;
            break;

        case "CHANGE_AGE":
            state = { ...state, age:actions.payload }
            // state.age = actions.payload;
            break;
    }
    return state;
}


const tutsReducer = function(state = [], actions){
    
    return state;
}

const reducer = combineReducers({
    user:usersReducer,
    tuts:tutsReducer
})

const store = createStore(reducer,0);

store.subscribe(()=>{
    console.log(store.getState());
    console.log(typeof store.getState());
    console.log("store changed", store.getState())
})

store.dispatch({type:"CHANGE_NAME", payload:"mathew"});
store.dispatch({type:"CHANGE_AGE", payload: 28});
