import './App.scss';
import TodoList, { TaskType } from './Todolist';
import AddItemForm from './AddItemFrom';
import { v1 } from 'uuid';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Container, Grid } from '@mui/material';
import ButtonAppBar from './TopBarMenu';

import { DeleteTodoListAC, ChangeTitleAC, AddTodoListAC, ChangeFilterAC } from './store/todolistsReducer';
import { DeleteTaskAC, AddTaskAC, AddTasksGroupAC, ChangeStatusTaskAC, ChangeTitleTaskAC, DeleteTasksGroupAC } from './store/tasksReducer';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './store/store';


export type FilterValueType = 'all' | 'completed' | 'active';
export type TodoListType = {
   id: string
   title: string
   filter: FilterValueType
}
export type ListTasksType = {
   [key: string]: Array<TaskType>
}


function App() {
   const dispatch = useDispatch();
   const listTodoList = useSelector<AppRootState, Array<TodoListType>>(state => state.todoList);
   const tasks = useSelector<AppRootState, ListTasksType>(state => state.tasks);

   const removeTask = (idTodoList: string, idDelete: string) => dispatch(DeleteTaskAC(idTodoList, idDelete));
   const addTask = (idTodoList: string, title: string) => dispatch(AddTaskAC(idTodoList, title));
   const changeStatus = (idTodoList: string, id: string, isDone: boolean) => dispatch(ChangeStatusTaskAC(idTodoList, id, isDone));
   const changeValue = (idTodoList: string, id: string, value: string) => dispatch(ChangeTitleTaskAC(idTodoList, id, value));
   const changeFilter = (idTodoList: string, valueFilter: FilterValueType) => dispatch(ChangeFilterAC(idTodoList, valueFilter));
   const deleteTodoList = (idTodoList: string) => {
      dispatch(DeleteTodoListAC(idTodoList));
      dispatch(DeleteTasksGroupAC(idTodoList));
   }
   const changeTitleTodoList = (idTodoList: string, title: string) => dispatch(ChangeTitleAC(idTodoList, title));
   const addNewTodoList = (title: string) => {
      const idNewTodoList = v1();
      dispatch(AddTodoListAC(idNewTodoList, title));
      dispatch(AddTasksGroupAC(idNewTodoList));
   }

   const todolists = listTodoList.map(l => {
      const filterTasks = () => {
         switch (l.filter) {
            case 'completed':
               return tasks[l.id].filter(task => task.isDone);
            case 'active':
               return tasks[l.id].filter(task => !task.isDone);
            default:
               return tasks[l.id];
         }
      }

      return (
         <Grid key={l.id} item sm={6} md={4} style={{ width: "100%" }}>
            <TodoList
               idTodoList={l.id}
               title={l.title}
               tasks={filterTasks()}
               handleDelete={removeTask}
               handleFilter={changeFilter}
               addTask={addTask}
               changeStatus={changeStatus}
               filter={l.filter}
               deleteTodoList={deleteTodoList}
               changeValue={changeValue}
               changeTitleTodoList={changeTitleTodoList}
            />
         </Grid>
      )
   }
   )

   return (
      <>
         <ButtonAppBar />
         <Container fixed >
            <div className="App">
               <div className='form-add-new-todolist'>
                  <AddItemForm
                     placeholder='ADD New TodoList'
                     size='small'
                     addItemHandler={addNewTodoList}
                  />
               </div>
               <Grid container spacing={3} rowSpacing={3} paddingBottom={6}>
                  {todolists.length > 0 ? todolists : 'Not found'}
               </Grid>
            </div>
         </Container>
      </>
   )
}

export default App;