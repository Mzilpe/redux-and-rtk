const redux = require('redux');
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';


// Action creatorrs

const orderCake = () => {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

const restockCake = (qty=1) =>{
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}
const orderIcecream = (qty = 1) => {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

const restockIcecream = (qty=1) =>{
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

const initialState = {
    noOfCakes : 10,
    noOfIcecreams: 20
}

//( previousState, action ) => newState
// SIngle Rediucer
// const reducer = ( state = initialState, action ) => {
//     switch(action.type) {
//         case CAKE_ORDERED:
//             return {
//                 ...state,
//                 noOfCakes: state.noOfCakes - 1,
//             }
//         case CAKE_RESTOCKED:
//             return {
//                 ...state,
//                 noOfCakes: state.noOfCakes + action.payload
//             }
//         case ICECREAM_ORDERED:
//             return {
//                 ...state,
//                 noOfIcecreams: state.noOfIcecreams - 1,
//             }
//         case ICECREAM_RESTOCKED:
//             return {
//                 ...state,
//                 noOfIcecreams: state.noOfIcecreams + action.payload
//             }
//         default:
//             return state;
//     }
// }

const cakeReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                noOfCakes: state.noOfCakes - 1,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                noOfCakes: state.noOfCakes + action.payload
            }
        default:
            return state;
    }
}

const icecreamReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                noOfIcecreams: state.noOfIcecreams - 1,
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                noOfIcecreams: state.noOfIcecreams + action.payload
            }
        case CAKE_ORDERED:
            return {
                ...state,
                noOfIcecreams: state.noOfIcecreams - 1,
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
        cake: cakeReducer,
        icecream: icecreamReducer
    });

const store = redux.createStore(rootReducer, 
    // applyMiddleware(logger)
    );

console.log('Initial State', store.getState());

const unsubscribe = store.subscribe(()=>{ 
    console.log('Updated State', store.getState());
})

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(4))

const actions = bindActionCreators({orderCake, restockCake, orderIcecream, restockIcecream}, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIcecream();
actions.orderIcecream();
actions.orderIcecream();
actions.restockIcecream(3);

unsubscribe()