import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

import { useLocalStorage } from "./useLocalStorage";
import { NewNote } from "./NewNote";
import { NoteList } from "./NoteList";

// types are used to define the shape of an object
// type aliases are used to give a name to a type
// exporting a type allows us to use it in other files

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
          {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
        ];
    });
  };

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  };

  return (
    <Container className = "my-4"> 
      <Routes>
        <Route path = "/" element = { <NoteList availableTags={tags} /> } />            
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
        <Route path = "/:id">
          <Route index element = { <h1>Show</h1> } />
          <Route path = "edit" element = { <h1>Edit</h1> } />
        </Route>
        <Route path = "*" element = { <Navigate to = "/" /> } />        
      </Routes>
    </Container>
  );
};

// Container is a component that allows us to define a container
// Routes is a component that allows us to define a set of routes
// Route is a component that allows us to define a single route
// Navigate is a component that allows us to redirect to another route
// element is a prop that allows us to define the component that will be rendered when the route is matched
// path is a prop that allows us to define the path that will be matched
// index is a prop that allows us to define the route that will be matched when the path is empty


export default App