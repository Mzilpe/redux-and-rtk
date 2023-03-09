const createSlice = require('@reduxjs/toolkit').createSlice;
const cakeActions = require('../cake/cakeSlice').cakeActions;

const initialState = {
    noOfIcecream: 20
}

const icecreamSlice = createSlice({
    name: 'icecream',
    initialState,
    reducers: {
        ordered: (state) => {
            state.noOfIcecream--;
        },
        restocked: (state, action) => {
            state.noOfIcecream = state.noOfIcecream + action.payload;
        }
    },
    // extraReducers:{
    //     ['cake/ordered']: (state) => {
    //         state.noOfIcecream--;
    //     }
    // },
    extraReducers: (builder) =>{
        builder.addCase(cakeActions.ordered, ( state ) => { 
            state.noOfIcecream-- 
        })
    }

})

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;