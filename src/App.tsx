import { useState } from 'react';
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

export type FilterValueType = 'all' | 'completed' | 'active';
export type TodoListType = {
   id: string
   title: string
   filter: FilterValueType
}
export type ListTasksType = {
   [key:string] : Array<TaskType>
}

const idTodoList1 = v1();
const idTodoList2 = v1();

const initListTodoList: Array<TodoListType> = [
   { id: idTodoList1, title: 'Developing', filter: 'all' },
   { id: idTodoList2, title: 'Design', filter: 'all' }
];
const initListTasks:ListTasksType = {
   [idTodoList1]: [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Django', isDone: false }
   ],
   [idTodoList2]: [
      { id: v1(), title: 'Figma', isDone: true },
      { id: v1(), title: 'Sketch', isDone: false },
      { id: v1(), title: 'Photoshop', isDone: false }
   ],
}

function App() {
   const [listTodoList, setListTodoList] = useState<Array<TodoListType>>(initListTodoList);
   const [tasks, setTasks] = useState<ListTasksType>(initListTasks);

   // test
   const removeTask = (idTodoList: string, idDelete: string) => {
      tasks[idTodoList] = tasks[idTodoList].filter(item => item.id !== idDelete);
      setTasks({ ...tasks });
   }
   // test
   const addTask = (idTodoList:string, title:string) => {
      const newTask: TaskType = { id: v1(), title: title, isDone: false };
      tasks[idTodoList] = [newTask, ...tasks[idTodoList]];
      setTasks({ ...tasks });
   }
   // test
   const changeStatus = (idTodoList:string, id:string, isDone:boolean) => {
      const findTask = tasks[idTodoList].find(task => task.id === id);
      if (findTask) findTask.isDone = isDone;
      setTasks({ ...tasks });
   }
   // test
   const changeValue = (idTodoList: string, id: string, value: string) => {
      const findTask = tasks[idTodoList].find(task => task.id === id);
      if (findTask) findTask.title = value;
      setTasks({ ...tasks });
   }

   // test
   const changeFilter = (idTodoList: string, valueFilter: FilterValueType) => {
      const findTodoList = listTodoList.find(l => l.id === idTodoList);
      if (findTodoList) {
         findTodoList.filter = valueFilter;
         setListTodoList([...listTodoList]);
      }
   }

   // test
   const deleteTodoList = (idTodoList:string) => {
      setListTodoList(listTodoList.filter(list => list.id !== idTodoList));
      delete tasks[idTodoList];
      setTasks({ ...tasks });
   }

   // test
   const changeTitleTodoList = (idTodoList:string, title:string) => {
      const findTodoList = listTodoList.find(list => list.id === idTodoList);
      if(findTodoList) findTodoList.title = title;
      setListTodoList([ ...listTodoList ]);
   }

   // test
   const addNewTodoList = (title:string) => {
      const newTodoList:TodoListType = {
         id: v1(),
         title,
         filter: 'all'
      };
      setListTodoList([newTodoList, ...listTodoList]);
      setTasks({ [newTodoList.id] : [], ...tasks });
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
         <Grid key={l.id} item sm={6} md={4} style={{width:"100%"}}>
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
            <Grid container spacing={3} rowSpacing={3}>
               {todolists.length > 0 ? todolists : 'Not found'}
            </Grid>
         </div>
      </Container>
      </>
   ) 
}

export default App;