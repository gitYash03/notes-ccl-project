import NotesForm from "./NoteForm";
import {NoteData} from "../App"

type NewNoteProps = {
    onSubmit:(data:NoteData) => void;
};

export function NewNote({onSubmit}:NewNoteProps){
    return (
        <>
        <h1>New Note</h1>
        <NotesForm onSubmit={onSubmit}/>
        </>
    )
}