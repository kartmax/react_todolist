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

import { AddTodoListAC } from './store/todolistsReducer';
import { AddTasksGroupAC } from './store/tasksReducer';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';


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
   const listTodoList = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoList);

   const addNewTodoList = (title: string) => {
      const idNewTodoList = v1();
      dispatch(AddTodoListAC(idNewTodoList, title));
      dispatch(AddTasksGroupAC(idNewTodoList));
   }

   const todolists = listTodoList.map(l => {
      return (
         <Grid key={l.id} item sm={6} md={4} style={{ width: "100%" }}>
            <TodoList
               idTodoList={l.id}
               title={l.title}
               filter={l.filter}
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