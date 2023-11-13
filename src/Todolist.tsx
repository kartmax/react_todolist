import { ChangeEvent } from "react";
import { FilterValueType } from "./App";
import AddItemForm from "./AddItemFrom";
import EditableSpan from "./EditableSpan";
import { Button, ButtonGroup, Checkbox, IconButton, Paper } from "@mui/material";
import { Delete } from "@mui/icons-material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export type TaskType = {
   id: string
   title: string
   isDone: boolean
}

type PropsType = {
   idTodoList: string
   title: string
   tasks: Array<TaskType>
   handleDelete: (idTodoList: string, id: string) => void
   handleFilter: (idTodoList: string, valueFilter: FilterValueType) => void
   addTask: (idTodoList: string, title: string) => void
   changeStatus: (idTodoList: string, id: string, isDone: boolean) => void
   filter: FilterValueType
   deleteTodoList: (idTodoList: string) => void
   changeValue: (idTodoList: string, id: string, value: string) => void
   changeTitleTodoList: (idTodoList: string, title: string) => void
}

function TodoList(props: PropsType) {
   const {
      idTodoList,
      title,
      tasks,
      handleDelete,
      handleFilter,
      addTask,
      changeStatus,
      filter,
      deleteTodoList,
      changeValue,
      changeTitleTodoList
   } = props;

   const listTasks = tasks && tasks.map(task => {
      const removeTask = () => handleDelete(idTodoList, task.id);
      const changeStatusTask = (e: ChangeEvent<HTMLInputElement>) => changeStatus(idTodoList, task.id, e.currentTarget.checked);

      const changeTitle = (title:string) => {
         changeValue(idTodoList, task.id, title)
      }

      return (
         <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox checked={task.isDone} onChange={changeStatusTask} />
            <EditableSpan title={task.title} changeTitle={changeTitle}/>
            <IconButton aria-label="remove task" size="medium" onClick={removeTask}>
               <RemoveCircleIcon fontSize="inherit" />
            </IconButton>
         </li>
      )
   });
   const onAllClickHandler = () => handleFilter(idTodoList, 'all');
   const onActiveClickHandler = () => handleFilter(idTodoList, 'active');
   const onCompletedClickHandler = () => handleFilter(idTodoList, 'completed');
   const btnDeleteTodoListHandler = () => deleteTodoList(idTodoList);
   const addNewTask = (title:string) => addTask(idTodoList, title);
   const changeTitleTodoListHandler = (title:string) => {
      changeTitleTodoList(idTodoList, title)
   }

   return (
      <Paper variant="outlined" style={{padding: "15px", height:'100%'}}>
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
                  : <p style={{paddingLeft:'7px'}}>Not found</p>}
            </div>
            <ButtonGroup variant="outlined" aria-label="button group filter task">
               <Button size="small" variant={filter === 'all' ? 'contained' : 'outlined'} onClick={onAllClickHandler}>All</Button>
               <Button size="small" variant={filter === 'active' ? 'contained' : 'outlined'} onClick={onActiveClickHandler}>Active</Button>
               <Button size="small" variant={filter === 'completed' ? 'contained' : 'outlined'} onClick={onCompletedClickHandler}>Completed</Button>
            </ButtonGroup>
         </div>
      </Paper>
   )
}

export default TodoList;