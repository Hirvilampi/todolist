import { Todo } from "./types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerToolbar, DatePickerToolbarProps, PickersCalendarHeaderProps } from "@mui/x-date-pickers";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import MenuItem from '@mui/material/MenuItem';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import { FormControl, InputLabel, Select, Stack } from "@mui/material";



// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const CustomCalendarHeaderRoot = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 16px',
    alignItems: 'center',
});

function CustomCalendarHeader(props: PickersCalendarHeaderProps<Dayjs>) {
    const { currentMonth, onMonthChange } = props;

    const selectNextMonth = () => onMonthChange(currentMonth.add(1, 'month'), 'left');
    const selectPreviousMonth = () =>
        onMonthChange(currentMonth.subtract(1, 'month'), 'right');


    return (
        <CustomCalendarHeaderRoot>
            <Stack spacing={1} direction="row">
                <IconButton onClick={selectPreviousMonth} title="Previous month">
                    <ChevronLeft />
                </IconButton>
            </Stack>
            <Typography variant="body2">{currentMonth.format('MMMM YYYY')}</Typography>
            <Stack spacing={1} direction="row">
                <IconButton onClick={selectNextMonth} title="Next month">
                    <ChevronRight />
                </IconButton>
            </Stack>
        </CustomCalendarHeaderRoot>
    );
}


function TodoList(props: PickersCalendarHeaderProps<Dayjs>) {
    const [todo, setTodo] = useState<Todo>({ description: '', date: '', priority: 'High' });
    const [todos, setTodos] = useState<Todo[]>([]);
    const gridRef = useRef<AgGridReact<Todo>>(null);
    const [dayValue, setDayValue] = useState<Dayjs | null>(null);

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

    const handleDateChange = (newValue: Dayjs | null) => {
        setDayValue(newValue);
        setTodo({ ...todo, date: newValue ? newValue.format('YYYY-MM-DD') : '' });
    };

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
        let listlenght: number;
        if (typeof gridRef.current?.api.getSelectedNodes().length === "number") {
            listlenght = gridRef.current?.api.getSelectedNodes().length;
        } else {
            listlenght = 0;
        }
        if (listlenght > 0) {
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

    const StyledButton = styled(IconButton)(({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
    }));
    const StyledDay = styled(PickersDay)(({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.secondary.light,
        ...theme.applyStyles('light', {
            color: theme.palette.secondary.dark,
        }),
    }));

    const CustomToolbar = ({
        value,
        ...props
    }: DatePickerToolbarProps<Dayjs>) => {
        return (
            <Box
                className={props.className}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'center',
                    padding: 2,
                    backgroundColor: '#3c54b4',
                    color: 'white',
                }}
            >
                <Typography variant="h6" fontWeight="bold" color="#a3a6d3">
                    {value ? value.format('YYYY') : '----'}
                </Typography>

                <Typography variant="h4">
                    {value ? value.format('ddd, MMM DD') : '---, --- --'}
                </Typography>
            </Box>
        );
    };

    return (
        <>
            <Stack direction="row" spacing={1} alignItems={"center"}>
                <TextField
                    label="Description"
                    type="text"
                    onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                    value={todo.description}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        defaultValue={dayjs('2021-01-19')}
                        label="date"
                        slotProps={{
                            actionBar: {
                                actions: ['today', 'cancel', 'accept'],
                            },
                            openPickerIcon: { fontSize: 'large' },
                            openPickerButton: { color: 'primary' },
                            textField: {

                                focused: true,
                                color: 'primary',
                            },
                        }}
                        slots={{
                            toolbar: CustomToolbar,
                            calendarHeader: CustomCalendarHeader,
                            openPickerIcon: EditCalendarRoundedIcon,
                            openPickerButton: StyledButton,
                            day: StyledDay,
                        }}
                        value={dayValue}
                        onChange={handleDateChange}
                    />
                </LocalizationProvider>

                <FormControl sx={{ minWidth: 90 }}>
                    <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={todo.priority}
                        label="Priority"
                        onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
                    >
                        <MenuItem value={"None"}> <em>None</em></MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                        <MenuItem value={"Normal"}>Normal</MenuItem>
                        <MenuItem value={"Low"}>Low</MenuItem>
                    </Select>
                </FormControl>

                <Button sx={{ minWidth: 40 }} variant="contained" onClick={addTodo}>Add</Button>
                <Button sx={{ minWidth: 40 }} variant="contained" onClick={handleDelete}>Delete</Button>
            </Stack>

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
