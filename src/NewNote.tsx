import { NoteForm } from './NoteForm';
import { NoteData, Tag } from './App';

type NewNoteProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
};

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
    return (
        <>
            <h1 className = "mb-4">New Note</h1>
            <NoteForm 
            onSubmit = {onSubmit}
            onAddTag = {onAddTag}
            availableTags = {availableTags} 
            />
        </>
    )
};

// type NewNoteProps is a type alias for an object with a single property, onSubmit, which is a function that takes a NoteData object.
// function NewNote is a function component that takes a single prop, onSubmit, which is a function that takes a NoteData object.
// NoteForm is a component that takes a single prop, onSubmit, which is a function that takes a NoteData object.
// A component is a function that returns a React element.
// onSubmit is a prop that allows us to define a function that will be called when the form is submitted.
// onAddTag is a prop that allows us to define a function that will be called when a new tag is added.
// availableTags is a prop that allows us to define an array of tags that are available to be added to the note.