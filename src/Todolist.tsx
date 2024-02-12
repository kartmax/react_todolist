import React, { useCallback } from "react";
import { FilterValueType } from "./App";
import AddItemForm from "./AddItemFrom";
import EditableSpan from "./EditableSpan";
import { Button, ButtonGroup, IconButton, Paper } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./store/store";

import { useDispatch } from "react-redux";
import { DeleteTodoListAC, ChangeTitleAC, ChangeFilterAC } from './store/todolistsReducer';
import { DeleteTaskAC, AddTaskAC, ChangeStatusTaskAC, ChangeTitleTaskAC, DeleteTasksGroupAC } from './store/tasksReducer';
import Task from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    idTodoList: string
    title: string
    filter: FilterValueType
}

const TodoList = React.memo(
    (props: PropsType) => {
        const {
            idTodoList,
            title,
            filter,
        } = props;

        const dispatch = useDispatch();
        const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[idTodoList]);

        const handleDelete = useCallback((idTodoList: string, idDelete: string) => dispatch(DeleteTaskAC(idTodoList, idDelete)), [dispatch]);
        const addTask = useCallback((idTodoList: string, title: string) => dispatch(AddTaskAC(idTodoList, title)), [dispatch]);
        const changeStatus = useCallback((idTodoList: string, id: string, isDone: boolean) => dispatch(ChangeStatusTaskAC(idTodoList, id, isDone)), [dispatch]);
        const changeValue = useCallback((idTodoList: string, id: string, value: string) => dispatch(ChangeTitleTaskAC(idTodoList, id, value)), [dispatch]);
        const handleFilter = (idTodoList: string, valueFilter: FilterValueType) => dispatch(ChangeFilterAC(idTodoList, valueFilter));
        const deleteTodoList = (idTodoList: string) => {
            dispatch(DeleteTodoListAC(idTodoList));
            dispatch(DeleteTasksGroupAC(idTodoList));
        }
        const changeTitleTodoList = useCallback((idTodoList: string, title: string) => dispatch(ChangeTitleAC(idTodoList, title)), [dispatch]);

        const funcFilterTasks = (tasks: Array<TaskType>) => {
            switch (filter) {
                case 'completed':
                    return tasks.filter(task => task.isDone);
                case 'active':
                    return tasks.filter(task => !task.isDone);
                default:
                    return tasks;
            }
        }
        const tasksFiltered = funcFilterTasks(tasks);

        const listTasks = tasksFiltered && tasksFiltered.map(task => 
            <Task
                key={task.id}
                changeStatus={changeStatus}
                changeValue={changeValue}
                handleDelete={handleDelete}
                idTodoList={idTodoList}
                title={title}
                task={task}
            />
        );
        const onAllClickHandler = () => handleFilter(idTodoList, 'all');
        const onActiveClickHandler = () => handleFilter(idTodoList, 'active');
        const onCompletedClickHandler = () => handleFilter(idTodoList, 'completed');
        const btnDeleteTodoListHandler = () => deleteTodoList(idTodoList);
        const addNewTask = useCallback((title: string) => addTask(idTodoList, title), [addTask, idTodoList]);
        const changeTitleTodoListHandler = useCallback((title: string) => {
            changeTitleTodoList(idTodoList, title)
        }, [changeTitleTodoList, idTodoList]);

        return (
            <Paper variant="outlined" style={{ padding: "15px", height: '100%' }}>
                <div className="wrap-todo-list">
                    <div>
                        <div className="wrap-title-todolist">
                            <EditableSpan title={title} changeTitle={changeTitleTodoListHandler} />
                            <IconButton onClick={btnDeleteTodoListHandler} aria-label="Remove TodoList" color='primary'>
                                <Delete />
                            </IconButton>
                        </div>
                        <br />
                        <AddItemForm placeholder="New task" size="small" addItemHandler={addNewTask} />
                        {listTasks && listTasks.length > 0
                            ? <ul>{listTasks}</ul>
                            : <p style={{ paddingLeft: '7px' }}>Not found</p>}
                    </div>
                    <ButtonGroup variant="outlined" aria-label="button group filter task">
                        <Button size="small" variant={filter === 'all' ? 'contained' : 'outlined'} onClick={onAllClickHandler}>All</Button>
                        <Button size="small" variant={filter === 'active' ? 'contained' : 'outlined'} onClick={onActiveClickHandler}>Active</Button>
                        <Button size="small" variant={filter === 'completed' ? 'contained' : 'outlined'} onClick={onCompletedClickHandler}>Completed</Button>
                    </ButtonGroup>
                </div>
            </Paper>
        )
    });

export default TodoList;