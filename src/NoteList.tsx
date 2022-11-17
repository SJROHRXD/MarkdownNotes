import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Row, Col, Stack, Button, Form, Card, Badge } from "react-bootstrap";
import styles from "./noteList.module.css";

import { Tag } from "./App";

type SimplifiedNote = {
    tags: Tag[];
    title: string;
    id: string;
};

type NoteListProps = {
    availableTags: Tag[];
    notes: SimplifiedNote[];
};

export function NoteList({ availableTags, notes }: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (
                (title === "" ||
                    note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length === 0 ||
                    selectedTags.every(tag =>
                        note.tags.some(noteTag => noteTag.id === tag.id)
                ))
            );
        });
    }, [title, selectedTags, notes]);

    // useMemo is used to prevent the filteredNotes array from being recreated
    // useMemo returns a memoized value that is stored in the filteredNotes variable
    // useMemo is a hook that only runs when the title, selectedTags, or notes variables change (its dependencies update)
    // *can be used to keep expensive, resource intensive functions from needlessly running

    // NoteList is a function that takes in availableTags and notes as props and returns a NoteList component

    // filteredNotes is an array of notes that have been filtered by the title and selectedTags
    // *loop through all selected tags, check if the note has the selected tag, and if it does, return true

    return <>
        <Row className = "align-items-center mb-4">
            <Col><h1>Notes</h1></Col>
            <Col xs = "auto">
                <Stack gap = {2} direction = "horizontal">
                    <Link to = "/new">
                        <Button variant = "primary">Create</Button>
                    </Link>
                    <Button variant = "outline-secondary">Edit Tags</Button>
                </Stack>
            </Col>
        </Row>
        <Form>
            <Row className = "mb-4">
                <Col>
                    <Form.Group controlId = "title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type = "text" value = {title} onChange = {event => setTitle(event.target.value)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId = "tags">
                        <Form.Label>Tags</Form.Label>
                        <ReactSelect
                            value = {selectedTags.map(tag => {
                                return {label: tag.label, value: tag.id}
                            })}
                            options={availableTags.map(tag => {
                                return { label: tag.label, value: tag.id }
                            })}
                            onChange = {tags => {
                                setSelectedTags(tags.map(tag => {
                                    return { label: tag.label, id: tag.value }
                                }))
                            }}
                            isMulti
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
        <Row xs = {1} sm = {2} lg = {3} xl = {4} className = "g-3">
            {filteredNotes.map(note => (
                <Col key = {note.id}>
                    <NoteCard id = {note.id} title = {note.title} tags = {note.tags} />
                </Col>
            ))}
        </Row>
    </>
};

// ReactSelect is a component that allows the user to select tags from a dropdown menu
// ReactSelect value is set to the selectedTags array
// ReactSelect options are set to the availableTags array
// ReactSelect onChange is set to setSelectedTags
// isMulti allows the user to select multiple tags

function NoteCard({ id, title, tags }: SimplifiedNote) {
    return <Card as = {Link} to = {`/${id}`} className = {`h-100 text-reset text-decoration-none ${styles.card}`}>
        <Card.Body>
            <Stack gap = {2} className = "align-items-center justify-content-center h-100">
                <span className = "fs-5">{title}</span>
                {tags.length > 0 && (
                    <Stack gap = {1} direction = "horizontal" className = "justify-content-center flex-wrap">
                        {tags.map(tag => (
                            <Badge className = "text-truncate" key = {tag.id}>
                                {tag.label}
                            </Badge>
                        ))}
                    </Stack>
                )}
            </Stack>
        </Card.Body>
    </Card>
};

// Notes 📝
// NoteCard is a function that takes in id, title, and tags as props and returns a NoteCard component
// NoteCard is a child component of NoteList
// *if there are tags, map through the tags and return a Badge component for each tag

// The key prop is used to uniquely identify each element in the array, tag.id is used as the key prop
// tag.label is used as the text for the Badge component