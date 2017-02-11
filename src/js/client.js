import { applyMiddleware, createStore } from 'redux';

const reducer = (initialState = 0, action)=>{
    if(action.type === "INC"){
        return initialState + 1;
    }else if(action.type === "DEC"){
        return initialState - 1;
    }

    return initialState;
}

const logger = (store) => (next)=> (action)=>{
    console.log("action fired", action);
}

const middleware = applyMiddleware(logger);

const store = createStore(reducer,1, middleware);

store.subscribe(()=>{
    console.log("store changed", store.getState())
})

store.dispatch({type:"INC"})
store.dispatch({type:"INC"})
store.dispatch({type:"INC"})
store.dispatch({type:"INC"})
store.dispatch({type:"DEC"})
store.dispatch({type:"DEC"})
