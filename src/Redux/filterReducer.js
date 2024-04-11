const filterReducer = (state, action) => {
    switch(action.type){
        case "filter/filterChanged": {
            return {
                ...state,
                status: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

export default filterReducer;