import React, { ChangeEvent } from "react";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Checkbox, IconButton } from "@mui/material";
import EditableSpan from "./EditableSpan";

type TaskPropsType = {
    handleDelete: (idTodoList: string, idDelete: string) => void;
    changeStatus: (idTodoList: string, id: string, isDone: boolean) => void;
    changeValue: (idTodoList: string, id: string, value: string) => void;
    task: TaskType;
    title: string;
    idTodoList: string;
}

const Task = React.memo((props: TaskPropsType) => {
    const {
        handleDelete,
        changeStatus,
        changeValue,
        task,
        title,
        idTodoList
    } = props;

    const removeTask = () => handleDelete(idTodoList, task.id);
    const changeStatusTask = (e: ChangeEvent<HTMLInputElement>) => changeStatus(idTodoList, task.id, e.currentTarget.checked);
    const changeTitle = () => changeValue(idTodoList, task.id, title);

    return (
        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox checked={task.isDone} onChange={changeStatusTask} />
            <EditableSpan title={task.title} changeTitle={changeTitle} />
            <IconButton aria-label="remove task" size="medium" onClick={removeTask}>
                <RemoveCircleIcon fontSize="inherit" />
            </IconButton>
        </li>
    )
});

export default Task;