import { useState } from "react";
import { Todo } from "./types";
import TodoTable from "./TodoTable";
import Header from "./Header";


function TodoList() {
    const [todo, setTodo] = useState<Todo>({ description: '', date: '' });
    const [todos, setTodos] = useState<Todo[]>([]);


    const addTodo = () => {
        setTodos([...todos, todo]);
        setTodo({ description: '', date: '' });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTodo({ ...todo, [name]: value });
    }

    const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({ description: event.target.value, date: event.target.value });
    }

    const handleDelete = (index: number) => {
        const theseTodos = todos.filter((todo, i) => i !== index);
        setTodos(theseTodos);

    }



    return (
        <>
            <Header />
            <div className="TodoList">
                <div className="table-container">
                    <div className="border-text">Add todo:</div>          
                    <table>
                    <td className="TodoList-table-bottom"></td>
                        <td className="TodoList-table-bottom">
                            Description:
                            <input
                                name="description"
                                placeholder=""
                                onChange={handleChange}
                                value={todo.description}
                                size="14"
                            />
                            Date:
                            <input
                                name="date"
                                placeholder=""
                                onChange={handleChange}
                                value={todo.date}
                                size="14"
                            />                    
                            <button className="button-adjust" onClick={addTodo}>Add</button>
                            
                        </td>
                        <td className="TodoList-table-bottom"></td>

                    </table>

                </div>
            </div>
            <TodoTable todos={todos} handleDelete={handleDelete} />
        </>
    );
}

export default TodoList;