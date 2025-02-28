import { TodoTableProps } from "./types";

function TodoTable(props: TodoTableProps) {
  return (
    <>
      <div className="table-container">
        <div className="TodoTable">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>


              </tr>
            </thead>
            <tbody>
              {props.todos.map((todo, index) => (
                <tr key={index}>
                  <td className="date-column">{todo.date}</td>
                  <td className="right-border-column">{todo.description}</td>

                  <td className="delete-colum">
                    <button onClick={() => props.handleDelete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default TodoTable;