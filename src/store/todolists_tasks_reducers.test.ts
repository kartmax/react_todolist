import todolistsReducer, { DeleteTodoListAC, AddTodoListAC } from "./todolistsReducer";
import tasksReducer, { DeleteTasksGroupAC, AddTasksGroupAC } from "./tasksReducer";
import { v1 } from "uuid";
import { ListTasksType, TodoListType } from "../App";

const idTodoList1 = v1();
const idTodoList2 = v1();

const startStateTodoList: Array<TodoListType> = [
   { id: idTodoList1, title: 'TodoList1', filter: "all" },
   { id: idTodoList2, title: 'TodoList2', filter: "all" }
];

const idTask1 = v1(),
      idTask2 = v1(),
      idTask3 = v1(),
      idTask4 = v1();

const startStateTasks:ListTasksType = {
   [idTodoList1] : [
      {id: idTask1, title: 'Task 1', isDone: false},
      {id: idTask2, title: 'Task 2', isDone: false}
   ],
   [idTodoList2] : [
      {id: idTask3, title: 'Task 3', isDone: false},
      {id: idTask4, title: 'Task 4', isDone: false}
   ]
}

test('Test for DELETE todolist and tasks of this todolist', () => {
   const idTodoList = idTodoList1,
         actionTodoLists = DeleteTodoListAC(idTodoList),
         actionTasks = DeleteTasksGroupAC(idTodoList),
         finishStateTodoList = todolistsReducer(startStateTodoList, actionTodoLists),
         finishStateTasks = tasksReducer(startStateTasks, actionTasks);

   expect(finishStateTodoList.length).toBe(startStateTodoList.length - 1);
   expect(finishStateTasks[idTodoList]).toBeFalsy();
})

test('Test for ADD todolist and empty tasks of this todolist', () => {
   const idTodoList = v1(),
         titleTodoList = 'New TodoList',
         actionTodoLists = AddTodoListAC(idTodoList, titleTodoList),
         actionTasks = AddTasksGroupAC(idTodoList),
         finishStateTodoList = todolistsReducer(startStateTodoList, actionTodoLists),
         finishStateTasks = tasksReducer(startStateTasks, actionTasks);

   expect(finishStateTodoList.length).toBe(startStateTodoList.length + 1);
   expect(finishStateTasks[idTodoList1]).toBe(startStateTasks[idTodoList1]);
   expect(finishStateTasks[idTodoList]).toStrictEqual([]);
})