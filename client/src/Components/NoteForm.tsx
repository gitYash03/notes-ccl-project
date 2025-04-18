import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";
import {v4 as uuid} from "uuid"

type NoteFormProps = {
    onSubmit:(data:NoteData) => void
    onAddTag:(data:Tag) => void
    availableTags:Tag[]
};

export default function NoteForm({ onSubmit, onAddTag, availableTags } : NoteFormProps){

    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags,setSelectedTags]=useState<Tag[]>([]);
    const navigate = useNavigate();

    function handleSubmit(e:FormEvent){
        e.preventDefault();

        onSubmit({
            title:titleRef.current!.value,
            markdown:markdownRef.current!.value,
            tags:selectedTags
        })

        navigate("..");

    }

return(
    <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
            <Row>
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required ref={titleRef} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="tags">
                    <CreatableSelect
                        onCreateOption={label => {
                        const newTag = { id: uuid(), label }
                        onAddTag(newTag)
                        setSelectedTags(prev => [...prev, newTag])
                        }}
                        value={selectedTags.map(tag => {
                        return { label: tag.label, value: tag.id }
                        })}
                        options={availableTags.map(tag => {
                        return { label: tag.label, value: tag.id }
                        })}
                        onChange={tags => {
                        setSelectedTags(
                            tags.map(tag => {
                            return { label: tag.label, id: tag.value }
                            })
                        )
                        }}
                        isMulti
                    />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="markdown">
                        <Form.Label>Body</Form.Label>
                        <Form.Control required as="textarea" ref={markdownRef} rows={15} />
                    </Form.Group>
                    <Stack direction="horizontal" gap={2} className="justify-content-end my-2">
                        <Button type="submit">Save</Button>
                        <Link to="..">
                            <Button type="button" variant="outline-secondary">Cancel</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
        </Stack>
    </Form>
)
}