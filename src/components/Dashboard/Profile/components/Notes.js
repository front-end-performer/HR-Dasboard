import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNotes, getNotes, deleteNote } from '../../../../actions';
import axios from '../../../../axios';
import { Button, Col, Card, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';

const Notes = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const [data, setData] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);
    }

    const GetNotesFromRedux = useSelector(
        state => state.getNotes
    );

    useEffect(() => {
        dispatch(getNotes());
    }, [data]);

    const keyCheck = (e) => {
        if (event.code === 'Enter') {
            e.preventDefault();
            console.log('key', event.code);
            dispatch(addNotes(value));
            setValue('');
        }
    };

    const deleteNote = (id) => {
        axios.post(`/delete-notes/${id}`).then(({ data }) => {
            setData(
                data
            );
        })
    }


    if (!GetNotesFromRedux) {
        return null;
    }


    return (
        <Col xl={12}>
            <FormGroup>
                <Label style={{padding: '20px 0'}} for="exampleTextArea">Your Notes</Label>
                <Input
                    type="text"
                    value={value}
                    onKeyDown={keyCheck}
                    onChange={e => handleChange(e)}
                    name="textarea"
                    id="exampleTextArea" />
            </FormGroup>
            <Button
                onClick={() => dispatch(addNotes(value))}
                color="secondary"
                size="md">Add note
            </Button>
            <div className="notes_conatiner">
                {GetNotesFromRedux.map(not => {
                    return (
                        <Alert onClick={() => deleteNote(not.id)} key={not.id} color="primary">
                            <p>{not.note}</p>
                        </Alert>
                    );
                })}
            </div>
        </Col>
    )
}


export default Notes;