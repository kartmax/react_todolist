export type UserReducerStateType = {
   name: string
   age: number
   countChildren: number
}

export type UserReducerActionTypesType = "CHANGE-NAME" | "CHANGE-AGE" | "CHANGE-COUNT-CHILDREN";
export type UserReducerActionType = {
   type: UserReducerActionTypesType
   [key: string]: string | number
}

const UserReducer = (state: UserReducerStateType, action: UserReducerActionType) => {
   switch (action.type) {
      case 'CHANGE-NAME':
         return {
            ...state,
            name: action.newName
         }
      case 'CHANGE-AGE':
         return {
            ...state,
            age: action.newAge
         }
      default:
         return state;
   }
}

export default UserReducer;