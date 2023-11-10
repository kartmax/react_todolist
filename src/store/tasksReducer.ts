import { TaskType } from './../Todolist';
import { ListTasksType } from "../App";
import { v1 } from 'uuid';

type ActionDeleteTaskType = {
   type: 'DELETE-TASK'
   idTodoList: string
   idTask: string
};
export const DeleteTaskAC = (idTodoList: string, idTask: string): ActionDeleteTaskType => {
   return {type: "DELETE-TASK", idTodoList, idTask};
};

type ActionAddTaskType = {
   type: 'ADD-TASK'
   idTodolist: string
   titleNewTask: string
};
export const AddTaskAC = (idTodolist: string, titleNewTask: string): ActionAddTaskType => {
   return {type: "ADD-TASK", idTodolist, titleNewTask};
};

type ActionChangeStatusTaskType = {
   type: 'CHANGE-STATUS-TASK'
   idTodoList: string
   idTask: string
   newStatus: boolean
};
export const ChangeStatusTaskAC = (idTodoList: string, idTask: string, newStatus: boolean): ActionChangeStatusTaskType => {
   return {type: 'CHANGE-STATUS-TASK', idTodoList, idTask, newStatus};
};

type ActionChangeTitleTaskType = {
   type: 'CHANGE-TITLE-TASK'
   idTodoList: string
   idTask: string
   newTitle: string
};
export const ChangeTitleTaskAC = (idTodoList: string, idTask: string, newTitle: string): ActionChangeTitleTaskType => {
   return {type: 'CHANGE-TITLE-TASK', idTodoList, idTask, newTitle};
};

type ActionTypes = ActionDeleteTaskType | ActionAddTaskType | ActionChangeStatusTaskType | ActionChangeTitleTaskType;

const tasksReducer = (state: ListTasksType, action: ActionTypes): ListTasksType => {
   switch (action.type) {
      case "DELETE-TASK":
         const copyState = { ...state };
         copyState[action.idTodoList] = copyState[action.idTodoList].filter(item => item.id !== action.idTask);
         return copyState;
      case "ADD-TASK":
         const copyState_ = { ...state },
               newTask: TaskType = { id: v1(), title: action.titleNewTask, isDone: false };
         copyState_[action.idTodolist] = [ newTask, ...copyState_[action.idTodolist] ];
         return copyState_;
      case 'CHANGE-STATUS-TASK':
         const updateState = { ...state },
               findTask = updateState[action.idTodoList].find(task => task.id === action.idTask);
         if (findTask) findTask.isDone = action.newStatus;
         return updateState;
      case 'CHANGE-TITLE-TASK':
         const updateState_ = { ...state },
               findTask_ = updateState_[action.idTodoList].find(task => task.id === action.idTask);
         if (findTask_) findTask_.title = action.newTitle;
         return updateState_;
      default:
         throw new Error('I do not know this action type');
   }
}

export default tasksReducer;