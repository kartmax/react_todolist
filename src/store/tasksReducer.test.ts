import tasksReducer, { DeleteTaskAC, AddTaskAC, ChangeStatusTaskAC, ChangeTitleTaskAC } from "./tasksReducer";
import { ListTasksType } from "../App";
import { v1 } from "uuid";

const idList1 = v1(),
      idList2 = v1();

const idTask1 = v1(),
      idTask2 = v1(),
      idTask3 = v1(),
      idTask4 = v1();

const startState:ListTasksType = {
   [idList1] : [
      {id: idTask1, title: 'Task 1', isDone: false},
      {id: idTask2, title: 'Task 2', isDone: false}
   ],
   [idList2] : [
      {id: idTask3, title: 'Task 3', isDone: false},
      {id: idTask4, title: 'Task 4', isDone: false}
   ]
}

test('Test for delete task', () => {
   const idTodoList = idList1,
         idTask = idTask1,
         action = DeleteTaskAC(idTodoList, idTask),
         finishState = tasksReducer(startState, action);
   expect(finishState[idTodoList].length).toBe(1);
   expect(finishState[idTodoList][0].title).toBe('Task 2');
})

test('Test for add new task', () => {
   const idTodoList = idList1,
         titleNewTask = 'Title new task';
   const action = AddTaskAC(idTodoList, titleNewTask);
   const finishState = tasksReducer(startState, action);
   expect(finishState[idTodoList].length).toBe(startState[idTodoList].length + 1);
   expect(finishState[idTodoList][0].title).toBe(titleNewTask);
})

test('Test for change status task', () => {
   const idTodoList = idList1,
         idTask = idTask1,
         newStatus = true;
   const action = ChangeStatusTaskAC(idTodoList, idTask, newStatus);
   const finishState = tasksReducer(startState, action);
   expect(finishState[idTodoList][0].isDone).toBe(newStatus);
   expect(finishState[idTodoList][1].isDone).toBe(false);
})

test('Test for change title task', () => {
   const idTodoList = idList1,
         idTask = idTask1,
         newTitle = 'Update title task';
   const action = ChangeTitleTaskAC(idTodoList, idTask, newTitle);
   const finishState = tasksReducer(startState, action);
   expect(finishState[idTodoList][0].title).toBe(newTitle);
   expect(finishState[idTodoList][1].title).toBe('Task 2');
})