import { TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {   
    const {
        title,
        changeTitle,
    } = props;

    const [editMode, setEditMode] = useState<boolean>(false);

    const activateEditMode = () => setEditMode(true);
    const activateViewMode = () => setEditMode(false);
    const changeHandlerInput = (e: ChangeEvent<HTMLInputElement>) => changeTitle(e.currentTarget.value);
    const keydownHandlerInput = (e: KeyboardEvent<HTMLInputElement>) => { if (e.code === 'Enter') setEditMode(false); }

    return (
        editMode
            ? <TextField size="small" label='Title' value={title} onChange={changeHandlerInput} onBlur={activateViewMode} onKeyDown={keydownHandlerInput} autoFocus />
            // ? <input value={title} onChange={changeHandlerInput} onBlur={activateViewMode} onKeyDown={keydownHandlerInput} autoFocus />
            : <span onDoubleClick={activateEditMode}>{title} </span>
    )
});

export default EditableSpan;