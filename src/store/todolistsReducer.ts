import { v1 } from "uuid";
import { TodoListType, FilterValueType } from "../App";

export const idTodoList1 = v1();
export const idTodoList2 = v1();

const initialState: Array<TodoListType> = [
   { id: idTodoList1, title: 'Developing', filter: 'all' },
   { id: idTodoList2, title: 'Design', filter: 'all' }
];


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
   id: string
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
export const AddTodoListAC = (id: string, title: string): ActionAddTodoListType => {
   return {type : 'ADD-TODO-LIST', id, title};
};
export const ChangeFilterAC = (id: string, filter: FilterValueType): ActionChangeFilterType => {
   return {type : 'CHANGE-FILTER', id, filter};
};


const todolistsReducer = (state:Array<TodoListType> = initialState, action: ActionsType):Array<TodoListType> => {
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
            id: action.id,
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
         return state;
   }
}

export default todolistsReducer;