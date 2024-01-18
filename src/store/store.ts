import { combineReducers, createStore } from "redux";
import todolistsReducer from "./todolistsReducer";
import tasksReducer from "./tasksReducer";

const rootReducer = combineReducers({
   todoList: todolistsReducer,
   tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>;
 
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;