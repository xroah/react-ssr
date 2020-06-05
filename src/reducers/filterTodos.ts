import { SET_FILTER, VisibilityFilters } from "../actions/index";

export default (
    state: any = VisibilityFilters.SHOW_ALL,
    action: any
) => {
    switch(action.type) {
        case SET_FILTER:
            return action.filter;
        default:
            return state;
    }
}