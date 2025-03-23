import './App.css'
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import { Link, Outlet } from 'react-router-dom';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Home from './Home';
import TodoList from './TodoList';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (

    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
        <Tab label="HOME" wrapped component={Link} to="/" />
        <Tab label="TODOS" wrapped component={Link} to="/todolist" />
      </Tabs>
    <CustomTabPanel value={value} index={0}>
      <Home />
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
      <TodoList />
    </CustomTabPanel>

  </Box>
///    <>
//      <div className="centr">
//
//<Tab>
//        <nav>
//          <Link to={"/"}>HOME</Link>
//          <Link to={"/TodoList"}>TODOS</Link>
//        </nav>
//        </Tab>
//        <Container maxWidth="xl">
//          <CssBaseline />
//          <main>
//          <Outlet />
//          </main>     
//        </Container>
//      </div>
//    </>




    //    
    //                  <ToDoList />
    //     
    //    

  )
}

export default App
