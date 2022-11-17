import { useState, FormEvent, useRef } from "react";
import { Form, Stack, Col, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
    onSubmit: (note: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
};

export function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const navigate = useNavigate();

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,
            });
        
            navigate("..");
    };

    return ( 
        <Form onSubmit = {handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId = "title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref = {titleRef} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId = "tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                                onCreateOption = {label => {
                                    const newTag = {id:uuidV4(), label}
                                    onAddTag(newTag)
                                    setSelectedTags(prev => [...prev, newTag])
                                }}
                                value = {selectedTags.map(tag => {
                                    return {label: tag.label, value: tag.id}
                                })}
                                options = {availableTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange = {tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    }))
                                }}
                                isMulti />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId = "markdown">
                            <Form.Label>Body</Form.Label>
                            <Form.Control required as = "textarea" ref = { markdownRef } rows={15} />
                        </Form.Group>
                        <Stack direction = "horizontal" gap={2} className = "justify-content-end">
                            <Button type = "submit">Save</Button>
                            <Link to = "..">
                                <Button type = "button" variant = "outline-secondary">
                                    Cancel
                                </Button>
                            </Link>
                        </Stack>
                    </Col>
                </Row>
            </Stack>
        </Form>
    );
};

// React Bootstrap 🌙
// Form.Control is a component that renders a form control
// Form.Group is a component that wraps a form control and its label
// Form.Label is a component that renders a label for a form control
// controlId is a prop that associates a form control with its label

// Stack is a component that renders its children in a vertical stack
// Button is a component that renders a button, and its variant prop determines its style
// Row is a component that renders its children in a horizontal row
// Col is a component that renders its children in a column

// React Router ⭐
// Link is a component that renders a link to another page
// useNavigate is a hook that returns a function that navigates to another page

// React Select 🪐
// CreatableReactSelect is a component that renders a select control that allows users to create new options