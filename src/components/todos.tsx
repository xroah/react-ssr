import React from "react";
import { connect } from "react-redux";
import { ADD_TODO, TOGGLE_TODO, SET_FILTER, VisibilityFilters, FILTERS_MAP } from "../actions";

interface Todo {
    text: string,
    id: string | number,
    complete: boolean;
}

interface Props {
    list: Array<Todo>;
    filter: string;
    addTodo: (text: string) => void;
    toggleTodo: (id: string | number) => void;
    setFilter: (filter: string) => void;
}

interface State {
    currentText: string;
}

export default class Todos extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            currentText: ""
        };
    }

    onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            currentText: evt.target.value
        })
    }

    add = () => {
        const { currentText } = this.state;

        currentText && this.props.addTodo(currentText);
    }

    handleFilter = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.setFilter(evt.target.value);
    }

    render() {
        const {
            list,
            toggleTodo,
            filter
        } = this.props;
        
        return (
            <div>
                <select value={filter} onChange={this.handleFilter}>
                    {
                        Object.keys(VisibilityFilters).map(v => (
                            <option key={v} value={(VisibilityFilters as any)[v]}>
                                {(FILTERS_MAP as any)[v]}
                            </option>
                        ))
                    }
                </select>
                <ul>
                    {
                        list.map(todo => {
                            if (
                                (filter === VisibilityFilters.SHOW_COMPLETED && !todo.complete) ||
                                (filter === VisibilityFilters.SHOW_ACTIVE && todo.complete)
                            ) return null;

                            return (
                                <li key={todo.id}>
                                    <label>
                                        <input type="checkbox"
                                            checked={todo.complete}
                                            onChange={() => toggleTodo(todo.id)} />
                                        <span style={{
                                            textDecoration: todo.complete ? "line-through" : undefined
                                        }}>{todo.text}</span>
                                    </label>
                                </li>
                            );
                        })
                    }
                </ul>
                <input type="text" onChange={this.onChange} />
                <button onClick={this.add}>Add</button>
            </div>
        )
    }
}

export const ConnectedToDo = connect(
    (state: any) => ({
        filter: state.todoFilter,
        list: state.todos
    }),
    dispatch => ({
        addTodo(text: string) {
            dispatch({
                type: ADD_TODO,
                text
            })
        },
        toggleTodo(id: string | number) {
            dispatch({
                type: TOGGLE_TODO,
                id
            })
        },
        setFilter(filter: string) {
            dispatch({
                type: SET_FILTER,
                filter
            });
        }
    })
)(Todos);