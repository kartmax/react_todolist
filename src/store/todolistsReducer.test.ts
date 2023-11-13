import todolistsReducer, { DeleteTodoListAC, ChangeTitleAC, AddTodoListAC, ChangeFilterAC } from "./todolistsReducer";
import { TodoListType, FilterValueType } from "../App";
import { v1 } from "uuid";

const idTodoList1 = v1();
const idTodoList2 = v1();

const startState: Array<TodoListType> = [
   { id: idTodoList1, title: 'TodoList1', filter: "all" },
   { id: idTodoList2, title: 'TodoList2', filter: "all" }
];

test('Test for DELETE TodoList', () => {
   const finishState = todolistsReducer(startState, DeleteTodoListAC(idTodoList1));
   expect(finishState.length).toBe(1);
   expect(finishState[0].id).toBe(idTodoList2);
   expect(finishState[0].filter).toBe('all');
})

test('Test for CHANGE TITLE todolist', () => {
   const newTitle = 'TestTitle';
   const finishState = todolistsReducer(startState, ChangeTitleAC(idTodoList1, newTitle));
   expect(finishState[0].title).toBe(newTitle);
   expect(finishState[1].title).toBe('TodoList2');
})

test('Task for ADD new todolist', () => {
   const idNewList = v1();
   const titleNewList = 'Title New List';
   const finishState = todolistsReducer(startState, AddTodoListAC(idNewList, titleNewList));
   expect(finishState[0].title).toBe(titleNewList);
   expect(finishState.length).toBe(startState.length + 1);
})

test('Task for CHANGE FILTER for todolist', () => {
   const newValueFilter:FilterValueType = 'completed';
   const finishState = todolistsReducer(startState, ChangeFilterAC(idTodoList1, newValueFilter));
   expect(finishState[0].filter).toBe(newValueFilter);
   expect(finishState[1].filter).toBe('all');
})