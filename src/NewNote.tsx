import { NoteForm } from './NoteForm';
import { NoteData } from './App';

type NewNoteProps = {
    onSubmit: (data: NoteData) => void;
};

export function NewNote({ onSubmit }: NewNoteProps) {
    return (
    <>
        <h1 className = "mb-4">New Note</h1>
        <NoteForm onSubmit = {onSubmit} />
    </>
    )
};

// Type NewNoteProps is a type alias for an object with a single property, onSubmit, which is a function that takes a NoteData object.
// Function NewNote is a function component that takes a single prop, onSubmit, which is a function that takes a NoteData object.
// NoteForm is a component that takes a single prop, onSubmit, which is a function that takes a NoteData object.
// A component is a function that returns a React element.
// onSubmit is a prop that allows us to define a function that will be called when the form is submitted.