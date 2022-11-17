import { Navigate, useParams, Outlet, useOutletContext } from "react-router-dom";
import { Note } from "./App";

type NoteLayoutProps = {
    notes: Note[];
};

export function NoteLayout({ notes }: NoteLayoutProps) {
    const { id } = useParams();
    const note = notes.find(note => note.id === id);

    if (note == null) return <Navigate to = "/" replace />

    return <Outlet context = {note} />
};

export function useNote() {
    return useOutletContext<Note>();
};

// Notes 📝
// useParams is a hook that returns parameters from the current route and returns an object

// find is an array method that returns the first element in the array that satisfies the provided testing function

// replace is a boolean that indicates whether the current entry should be replaced in the history stack
// <Navigate to = "/" replace /> is a component that navigates to the root route and replaces the current entry in the history stack

// Outlet is a component that renders the child route of the current route
// useOutletContext is a hook that returns the context of the current route
// context is a prop that can be passed to the Outlet component