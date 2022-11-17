import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Col, Row, Stack, Badge, Button } from "react-bootstrap";
import { useNote } from "./NoteLayout";

type NoteProps = {
    onDelete: (id:string) => void
};

export function Note({ onDelete }: NoteProps) {
    const note = useNote();
    const navigate = useNavigate();

    return <>
        <Row className = "align-items-center mb-4">
            <Col>
                <h1>{note.title}</h1>
                {note.tags.length > 0 && (
                    <Stack gap = {1} direction = "horizontal" className = "flex-wrap">
                        {note.tags.map(tag => (
                            <Badge className = "text-truncate" key = {tag.id}>
                                {tag.label}
                            </Badge>
                        ))}
                    </Stack>
                )}
            </Col>
            <Col xs = "auto">
                <Stack gap = {2} direction = "horizontal">
                    <Link to = {`/${note.id}/edit`}>
                        <Button variant = "primary">Edit</Button>
                    </Link>
                    <Button
                        onClick={() => {
                            onDelete(note.id)
                            navigate("/")
                        }}
                        variant="outline-danger"
                    >
                        Delete
                    </Button>
                    <Link to= "/">
                        <Button variant = "outline-secondary">Back</Button>
                    </Link>
                </Stack>
            </Col>
        </Row>
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
};

// Notes 📝
// ReactMarkdown is a component that allows the user to write markdown and have it rendered as HTML
// the Note function returns the note title, tags, and markdown
// useNote is a custom hook that returns the note object
// ` <Link to = {`/${note.id}/edit`}> ` is a link to the edit page that passes the note id as a parameter