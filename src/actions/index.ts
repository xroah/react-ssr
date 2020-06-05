export const VisibilityFilters = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_COMPLETED: "SHOW_COMPLETED",
    SHOW_ACTIVE: "SHOW_ACTIVE"
}

export const FILTERS_MAP = {
    SHOW_ALL: "所有",
    SHOW_COMPLETED: "已完成",
    SHOW_ACTIVE: "进行中"
};

export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const SET_FILTER = "SET_FILTER";

export function createTodo(text: string) {
    return {
        type: ADD_TODO,
        text
    };
}

export function toggleTo(id: string | number) {
    return {
        type: TOGGLE_TODO,
        id
    };
}

export function setFilter(filter: string) {
    return {
        type: SET_FILTER,
        filter
    };
}