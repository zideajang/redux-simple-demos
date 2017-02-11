import { applyMiddleware, createStore } from 'redux';

const reducer = (initialState = 0, action)=>{
    if(action.type === "INC"){
        return initialState + 1;
    }else if(action.type === "DEC"){
        return initialState - 1;
    }else if(action.type === "ERROR"){
        throw new Error("I am a error")
    }

    return initialState;
}

const logger = (store) => (next)=> (action)=>{
    console.log("action fired", action);
    //做一些修改
    // action.type = "DEC"
    //向下传递
    next(action);
}

const error = (store) => (next) => (action)=>{
    try{
        next(action)
    }catch(e){
        console.log("i got a error", e);
    }
}

const middleware = applyMiddleware(logger, error);

const store = createStore(reducer,1, middleware);

store.subscribe(()=>{
    console.log("store changed", store.getState())
})

store.dispatch({type:"INC"})
store.dispatch({type:"INC"})
store.dispatch({type:"INC"})
store.dispatch({type:"INC"})
store.dispatch({type:"ERROR"})
store.dispatch({type:"DEC"})
store.dispatch({type:"DEC"})
