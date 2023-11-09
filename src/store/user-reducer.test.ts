import UserReducer, {UserReducerStateType, UserReducerActionType} from "./user-reducer";

const startState:UserReducerStateType = {name: 'Maksym', age: 37, countChildren: 3};
test ('Test for change user name', () => {
   const newUserName = 'Piter';
   const action:UserReducerActionType = {type: 'CHANGE-NAME', newName: newUserName};
   const endState = UserReducer(startState, action);
   expect(endState.name).toBe(newUserName);
   expect(endState.age).toBe(37);
   expect(endState.countChildren).toBe(3);
})

test('Test for change user age', () => {
   const newUserAge = 38;
   const action:UserReducerActionType = {type: 'CHANGE-AGE', newAge: newUserAge};
   const endState = UserReducer(startState, action);
   expect(endState.age).toBe(newUserAge);
})