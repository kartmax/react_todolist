import { TaskType } from './../Todolist';
import { ListTasksType } from "../App";
import { v1 } from 'uuid';
import { idTodoList1, idTodoList2 } from './todolistsReducer';


const initialState: ListTasksType = {
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


type ActionDeleteTaskType = {
   type: 'DELETE-TASK'
   idTodoList: string
   idTask: string
};
type ActionDeleteTasksGroupType = {
   type: 'DELETE-TASK-GROUP'
   idTodoList: string
};
export const DeleteTaskAC = (idTodoList: string, idTask: string): ActionDeleteTaskType => {
   return { type: "DELETE-TASK", idTodoList, idTask };
};
export const DeleteTasksGroupAC = (idTodoList: string): ActionDeleteTasksGroupType => {
   return { type: "DELETE-TASK-GROUP", idTodoList };
};

type ActionAddTaskType = {
   type: 'ADD-TASK'
   idTodolist: string
   titleNewTask: string
};
type ActionAddTasksGroupType = {
   type: 'ADD-TASK-GROUP'
   idTodolist: string
}
export const AddTaskAC = (idTodolist: string, titleNewTask: string): ActionAddTaskType => {
   return { type: "ADD-TASK", idTodolist, titleNewTask };
};
export const AddTasksGroupAC = (idTodolist: string): ActionAddTasksGroupType => {
   return { type: "ADD-TASK-GROUP", idTodolist };
};

type ActionChangeStatusTaskType = {
   type: 'CHANGE-STATUS-TASK'
   idTodoList: string
   idTask: string
   newStatus: boolean
};
export const ChangeStatusTaskAC = (idTodoList: string, idTask: string, newStatus: boolean): ActionChangeStatusTaskType => {
   return { type: 'CHANGE-STATUS-TASK', idTodoList, idTask, newStatus };
};

type ActionChangeTitleTaskType = {
   type: 'CHANGE-TITLE-TASK'
   idTodoList: string
   idTask: string
   newTitle: string
};
export const ChangeTitleTaskAC = (idTodoList: string, idTask: string, newTitle: string): ActionChangeTitleTaskType => {
   return { type: 'CHANGE-TITLE-TASK', idTodoList, idTask, newTitle };
};

type ActionTypes = ActionDeleteTaskType | ActionDeleteTasksGroupType | ActionAddTaskType | ActionAddTasksGroupType | ActionChangeStatusTaskType | ActionChangeTitleTaskType;



const tasksReducer = (state: ListTasksType = initialState, action: ActionTypes): ListTasksType => {
   switch (action.type) {
      case "DELETE-TASK":
         const copyState = { ...state };
         copyState[action.idTodoList] = copyState[action.idTodoList].filter(item => item.id !== action.idTask);
         return copyState;
      case 'DELETE-TASK-GROUP':
         const copyStateDeleteTasksGroup = { ...state };
         delete copyStateDeleteTasksGroup[action.idTodoList];
         return copyStateDeleteTasksGroup;
      case "ADD-TASK":
         const copyState_ = { ...state },
            newTask: TaskType = { id: v1(), title: action.titleNewTask, isDone: false };
         if (copyState_[action.idTodolist]) copyState_[action.idTodolist] = [newTask, ...copyState_[action.idTodolist]];
         return copyState_;
      case 'ADD-TASK-GROUP':
         return { [action.idTodolist]: [], ...state };
      case 'CHANGE-STATUS-TASK':
         const updateState = { ...state };
         updateState[action.idTodoList] = updateState[action.idTodoList].map(task => task.id === action.idTask ? {...task, isDone: action.newStatus} : task);
         return updateState;
      case 'CHANGE-TITLE-TASK':
         const updateState_ = { ...state };
         updateState_[action.idTodoList] = updateState_[action.idTodoList].map(task => task.id === action.idTask ? {...task, title: action.newTitle} : task);
         return updateState_;
      default:
         return state;
   }
}

export default tasksReducer;