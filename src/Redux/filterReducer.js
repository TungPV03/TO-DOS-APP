import { produce } from "immer";

const filterReducer = produce((draft, action) => {
    switch(action.type){
        case "filter/filterChanged": {
            draft.status = action.payload;
            break;
        }
        default: {
            break;
        }
    }
})

export default filterReducer;