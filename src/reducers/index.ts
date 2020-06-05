import { combineReducers } from "redux";
import todos from "./addTodos";
import todoFilter from "./filterTodos";

export default combineReducers({
    todos,
    todoFilter
});