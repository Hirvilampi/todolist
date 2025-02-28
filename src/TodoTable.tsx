import { TodoTableProps } from "./types";

function TodoTable(props: TodoTableProps) {
  return(
    <>

      <table>
        <thead>
          <tr>
          <th>Date</th>
            <th>Description</th>
            
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {props.todos.map((todo, index) => (
            <tr key={index}>
                <td>{todo.date}</td>
              <td>{todo.description}</td>
              
              <td>
                <button onClick={() => props.handleDelete(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>       
    </>
  );
}

export default TodoTable;