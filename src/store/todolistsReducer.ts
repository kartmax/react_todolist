import { TodoListType, FilterValueType } from "../App";
import { v1 } from "uuid";

export type ValueActionType = 'DELETE' | 'CHANGE-TITLE' | 'ADD-TODO-LIST' | 'CHANGE-FILTER';

type ActionDeleteType = {
   type : 'DELETE'
   id: string
};
type ActionChangeTitleType = {
   type : 'CHANGE-TITLE'
   id: string
   title: string
};
type ActionAddTodoListType = {
   type : 'ADD-TODO-LIST'
   title: string
};
type ActionChangeFilterType = {
   type : 'CHANGE-FILTER'
   id: string
   filter: FilterValueType
};
type ActionsType = ActionDeleteType | ActionChangeTitleType | ActionAddTodoListType | ActionChangeFilterType;

export const DeleteTodoListAC = (id: string): ActionDeleteType => {
   return {type: 'DELETE', id};
};
export const ChangeTitleAC = (id: string, title: string): ActionChangeTitleType => {
   return {type : 'CHANGE-TITLE', id, title};
};
export const AddTodoListAC = (title: string): ActionAddTodoListType => {
   return {type : 'ADD-TODO-LIST', title};
};
export const ChangeFilterAC = (id: string, filter: FilterValueType): ActionChangeFilterType => {
   return {type : 'CHANGE-FILTER', id, filter};
};

const todolistsReducer = (state:Array<TodoListType>, action: ActionsType):Array<TodoListType> => {
   switch (action.type) {
      case 'DELETE':
         return state.filter(todolist => todolist.id !== action.id);
      case 'CHANGE-TITLE':
         const copyState = [ ...state ];
         const findTodoList = copyState.find(list => list.id === action.id);
         if(findTodoList) findTodoList.title = action.title;
         return copyState;
      case 'ADD-TODO-LIST':
         const newTodoList:TodoListType = {
            id: v1(),
            title: action.title,
            filter: 'all'
         };
         return [newTodoList, ...state];
      case 'CHANGE-FILTER':
         const copyState_ = [...state];
         const findTodoList_ = copyState_.find(l => l.id === action.id);
         if (findTodoList_) findTodoList_.filter = action.filter;
         return copyState_;
      default:
         throw new Error('I do not khow this value type - ');
   }
}

export default todolistsReducer;