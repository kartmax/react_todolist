import { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from "@mui/material/TextField";

type AddItemFromType = {
   placeholder: string
   size: "small" | "medium" | undefined
   addItemHandler: (title: string) => void
}

function AddItemForm(props: AddItemFromType) {
   const [title, setTitle] = useState<string>('');
   const [error, setError] = useState<string | null>(null);

   const {
      placeholder,
      size,
      addItemHandler
   } = props;

   const addNewTask_CleaneTitleNewTask = (title: string) => {
      if (title.trim() === '') {
         setError('Field is required');
      } else {
         addItemHandler(title.trim());
         setTitle('');
      }
   }
   const updateTitleNewTask = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
   const inputKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      e.code === 'Enter' && addNewTask_CleaneTitleNewTask(title);
   };
   const btnClickHandler = () => {
      addNewTask_CleaneTitleNewTask(title);
   } 

   return (
      <div>
         <TextField
            label={placeholder} 
            value={title} 
            onChange={updateTitleNewTask}
            onKeyDown={inputKeyDownHandler}
            error={!!error}
            helperText={error}
            size={size}
         />
         <IconButton onClick={btnClickHandler} aria-label="add" color='primary'>
            <AddCircleIcon />
         </IconButton>
      </div>
   )
}

export default AddItemForm;