'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import db from '@/lib/db';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
export default function Home() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState(new Array());
  const submit = () => {
    
    if (content !== '' && title !== '') {
    try {  
        axios
          .post('/api/notes', {
            id: uuidv4(),
            content,
            title,
          })
          .then(function (response) {
            console.log(response);
            location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('Content or title missing')
    }
  };
  useEffect(() => {
    const response = axios.get('/api/notes').then(function (response) {
      setNotes(response.data.data);
      notes.push(response.data.data);
    });
  }, []);
  return (
    <div className="grid items-center justify-center h-screen w-screen lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-7 grid-cols-3 grid-rows-3 ">
      {notes.map((data) => {
        return (
          <div
            className="ml-2 bg-gray-400 rounded-md grid justify-center "
            key={data.id}
          >
            <p className="font-bold text-3xl  ">{data.title}</p>

            <span>{data.content}</span>
            <br />
            <p className='font-bold'>{data.createdAt.slice(data.createdAt.lenght,10)}</p>
            <br />

            <Button
              onClick={() => {
                axios.post('/api/notes/delete', {
                  id: data.id,
                });
                location.reload();
              }}
              className=" w-14 h-7 bg-rose-600 mb-1"
            >
              Sil
            </Button>
          </div>
        );
      })}

      <div className="fixed bottom-2 left-2">
        <Input
          placeholder="Başlığı gir"
          className="w-72"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Notunu gir"
          className="w-72  mt-2"
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="default" className="mt-2" onClick={submit}>
          Gönder
        </Button>
      </div>
    </div>
  );
}
