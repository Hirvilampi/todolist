export type Todo = {
    description: string;
    date: string;
    priority: string;
}

export type TodoTableProps = {
    todos: Todo[];
    handleDelete: (row: number) => void;
}

export type DayValue = {
    date: string;
}