import './App.css'
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import ToDoList from './TodoList';

function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <ToDoList />
    </Container>
  )
}

export default App
