import { useState, FormEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Stack, Col, Row, Button } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import { NoteData, Tag } from "./App";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>;

export function NoteForm({ 
        onSubmit,
        onAddTag,
        availableTags,
        title = "",
        markdown = "",
        tags = [],
    }: NoteFormProps) {        
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
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
            <Stack gap = {4}>
                <Row>
                    <Col>
                        <Form.Group controlId = "title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref = { titleRef } required defaultValue = { title } />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId = "tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                                onCreateOption = {label => {
                                    const newTag = { id: uuidV4(), label }
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
                </Row>

                <Row>
                    <Form.Group controlId = "markdown">
                        <Form.Label>Body</Form.Label>
                        <Form.Control
                            defaultValue = { markdown }
                            required as = "textarea"
                            ref = { markdownRef }
                            rows = {15}
                        />
                    </Form.Group>
                    <Stack direction = "horizontal" gap = {2} className = " justify-content-end">
                        <Button type = "submit">Save</Button>
                        <Link to = "..">
                            <Button type = "button" variant = "outline-secondary">
                                Cancel
                            </Button>
                        </Link>
                    </Stack>
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

// onSubmit is a prop that is called when the form is submitted
// handleSubmit is a function that is called when the form is submitted and calls onSubmit with the form data
// useRef is a hook that returns a mutable ref object whose .current property is initialized to the passed argument (initialValue)
// useState is a hook that returns a stateful value, and a function to update it