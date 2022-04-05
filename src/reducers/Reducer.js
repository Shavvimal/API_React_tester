const initState = {
}

const Reducer = (state=initState, action) => {
    switch(action.type) {
        case '':
            return ({
                ...state,
             })
        default:
            return state;
    }
}

export default Reducer;