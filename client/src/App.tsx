import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NewNote } from './Components/NewNote';
import useLocalStorage from './Hooks/useLocalStorage'
import { useMemo } from 'react';
import {v4 as uuidV4} from 'uuid';
import NoteList from './Components/NoteList';

export type Note ={
  id:string
} & NoteData;

export type NoteData = {
  title:string,
  markdown:string,
  tags:Tag[]
};

export type Tag = {
  id:string,
  label:string
};


export type RawNote = {
  id:string,
} & RawNoteData;

export type RawNoteData = {
  id:string,
  tagIds:string[]
};

export default function App(){

  const [notes ,setNotes] = useLocalStorage<RawNote[]>("notes",[]);
  const [tags,setTags] = useLocalStorage<Tag[]>("TAGS",[]);


  const notesWithTags = useMemo(()=>{
    return notes.map(note=>{
      return {...note,tags:tags.filter(tag=>note.tagIds.includes(tag.id))}
    });
  },[notes,tags]);

  function onCreateNote({tags,...data}:NoteData){
    setNotes(prevNotes=>{
      return [...prevNotes,
        {...data,id: uuidV4() ,tagIds:tags.map(tag=>tag.id)}
      ];
    })
  };

  function addTag(tag:Tag){
    setTags(prev=>[...prev,tag]);
  }

  return( 
    <Container className='my-4 mx-4'>
      <Routes>
        <Route path="/" element={<NoteList availableTags={tags} notes={notesWithTags} />} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>}/>
          <Route path="edit" element={<h1>Edit</h1>}/>
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
  </Container>
)}