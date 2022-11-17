import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

import { useLocalStorage } from "./useLocalStorage";
import { NewNote } from "./NewNote";
import { NoteList } from "./NoteList";
import { NoteLayout } from "./NoteLayout";
import { Note } from "./Note";

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes, 
          { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
        ];
    });
  };

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  };

  return (
    <Container className = "my-4"> 
      <Routes>
        
        <Route
          path = "/"
          element = {
          <NoteList 
            notes = {notesWithTags}
            availableTags = {tags}
            />
          }
        />
        
        <Route
          path = "/new"
          element = {
            <NewNote 
              onSubmit = {onCreateNote}
              onAddTag = {addTag}
              availableTags = {tags}
            />
          }
        />
        
        <Route path = "/:id" element = { <NoteLayout notes = {notesWithTags} /> }>
          <Route index element = { <Note /> } />
          <Route path = "edit" element = { <h1>Edit</h1> } />
        </Route>
        
        <Route path = "*" element = { <Navigate to = "/" /> } />      
        
      </Routes>
    </Container>
  );
};

// Routes 🚑
// App returns routes for the NoteList, NewNote, and NoteLayout components

// Route path = "/" is the default route, "/" is the default path

// Route path = "/new" is the route for the NewNote component

// Route path = "/:id" is a dynamic route
  // Route index element = { <Note /> } is the default route
  // Route path = "edit" element ... UPDATE!

// Route path = "*" is a catch-all route

// Types 🚓
// Types are used to define the shape of an object
// Type Aliases are used to give a name to a type

// Components 🚗
// Routes is a component that allows us to define a set of routes
// Navigate is a component that allows us to redirect to another route

// Props 🚲
// element is a prop that allows us to define the component that will be rendered when the route is matched
// path is a prop that allows us to define the path that will be matched
// index is a prop that allows us to define the route that will be matched when the path is empty

export default App