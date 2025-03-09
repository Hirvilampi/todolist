
import { Todo } from "./types";
import TodoTable from "./TodoTable";
import Header from "./Header";
import { AgGridReact } from "ag-grid-react"
import {
    AllCommunityModule,
    ModuleRegistry
} from 'ag-grid-community';
import { ColDef } from "ag-grid-community";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// Import useRef
import { useRef, useState } from 'react';


// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);


function TodoList() {
    const [todo, setTodo] = useState<Todo>({ description: '', date: '', priority: 'High' });
    const [todos, setTodos] = useState<Todo[]>([]);
    const gridRef = useRef<AgGridReact<Todo>>(null);



    const [columnDefs] = useState<ColDef<Todo>[]>([
        { field: "description", filter: "agTextColumnFilter", floatingFilter: true, editable: true, },
        {
            field: "date", sortable: true, filter: "agTextColumnFilter", floatingFilter: true,
            editable: true,
        },
        {
            field: "priority", sortable: true, filter: true, floatingFilter: true, editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['High', 'Normal', 'Low'],
            },
            cellStyle: (params) => params.value === "High" ? { color: "red" } : { color: "black" },
        },


    ]);



    const addTodo = () => {
        if (!todo.description) {
            alert("You have to have description");
        } else
            setTodos([...todos, todo]);
        setTodo({ description: '', date: '', priority: '' });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //     const { name, value } = event.target;
        //     setTodo({ ...todo, [name]: value });
        setTodo({ ...todo, [event.target.name]: event.target.value });
    }

    const handleDelete = () => {
        if (gridRef.current?.api.getSelectedNodes().length > 0) {
            setTodos(
                todos.filter(
                    (todo, index) => index !== Number(gridRef.current?.api.getSelectedNodes()[0].id)
                )
            )
        } else {
            alert("Select a row first!")
        }
    }

    const getRowHeight = (params: any) => {
        return 40; // Set a fixed row height of 50px
    };



    return (



        <>
            <div className="ag-theme-material" style={{ padding: '15px' }}>
                <input
                    placeholder="Description"
                    onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                    value={todo.description}
                />

                <input
                    placeholder="Date"
                    type="date"
                    onChange={(e) => setTodo({ ...todo, date: e.target.value })}
                    value={todo.date}
                />
                <label htmlFor="model"></label>
                <select id="model" value={todo.priority} onChange={(e) => setTodo({ ...todo, priority: e.target.value })} >
                    <option value="">Select priority</option>
                    <option value="High">High</option>
                    <option value="Normal">Normal</option>
                    <option value="Low">Low</option>
                </select>


                <button onClick={addTodo}>Add</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            <div className="ag-theme-material" style={{ width: 650, height: 500 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={todos}
                    columnDefs={columnDefs}
                    rowSelection="single"
                    animateRows={true}
                    domLayout='autoHeight'
                    getRowHeight={getRowHeight}

                />
            </div>



        </>


    );
}

export default TodoList;