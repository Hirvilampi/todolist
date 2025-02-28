import { useState } from "react";
import { Todo } from "./types";
import TodoTable from "./TodoTable";
import Header from "./header";


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
        <Header/>
            <input
                name="description"
                placeholder="Description"
                onChange={handleChange}
                value={todo.description}

            />
            <input
                name="date"
                placeholder="Date"
                onChange={handleChange}
                value={todo.date}

            />
            <button onClick={addTodo}>Add</button>
            <TodoTable todos={todos} handleDelete={handleDelete} />
        </>
    );
}

export default TodoList;