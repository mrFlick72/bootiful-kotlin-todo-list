import React from 'react';
import TodoRepository from "./domain/repository/TodoRepository";
import TodoItemList from "./component/TodoItemList";
import NewTodoItem from "./component/NewTodoItem";
import HeaderRow from "./component/HeaderRow";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.todoRepository = new TodoRepository();
        this.state = {todoItems: []};
        this.newTodoInputRef = React.createRef();
        this.deleteTodoItem = this.deleteTodoItem.bind(this);
        this.newTodoInputOnClickHandler = this.newTodoInputOnClickHandler.bind(this);
    }

    componentDidMount() {
        this.todoRepository.readAll(new Date().getTime()).then(response => {
            this.setState({todoItems: response})
        });
    }

    newTodoInputOnClickHandler() {
        let inputValue = this.newTodoInputRef.current.value;
        this.todoRepository.insert({"todo": inputValue})
            .then((response) => {
                let splittedLocation = response.headers.get("Location").split("/");
                this.todoRepository.read(splittedLocation[splittedLocation.length - 1])
                    .then(value => {
                        this.setState((prevState) => ({
                            todoItems: [...prevState.todoItems, value]
                        }))
                    })
            })
    };

    deleteTodoItem(todoId) {
        this.todoRepository.delete(todoId)
            .then(result => {
                this.setState((prevState) => ({
                    todoItems: prevState.todoItems.filter(todoItem => todoItem.id !== todoId)
                }))
            });
    }

    render() {
        return (
            <div className="container">
                <HeaderRow title="Todo List App"/>

                <div className="row">
                    <div className="col-12">
                        <NewTodoItem newTodoInputRef={this.newTodoInputRef}
                                     newTodoInputOnClickHandler={this.newTodoInputOnClickHandler}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <TodoItemList deleteTodoItem={this.deleteTodoItem} todoItems={this.state.todoItems}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default App