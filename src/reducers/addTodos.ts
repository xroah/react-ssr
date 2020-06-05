import {
    ADD_TODO,
    TOGGLE_TODO
} from "../actions";

let uuid = 10000;

export default (
    state: any = [],
    action: any
) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    id: uuid++,
                    complete: false
                }
            ];
        case TOGGLE_TODO:
            return state.map((t: any) => {
                if (t.id === action.id) {
                    t.complete = !t.complete;
                }

                return t;
            });

        default:
            return state;
    }
}