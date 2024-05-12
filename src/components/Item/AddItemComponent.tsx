import React, { useState, useContext, useEffect } from 'react';
import { Book } from '../../domain/bookInterface'
import { useCreateBook } from '../../domain/hooks'
import { useNavigate } from 'react-router-dom';
import { ErrorComponent } from '../Error/ErrorComponent'
import { UserContext } from '../../userContext';



export const AddItemComponent = function() {
    const { accessToken } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken === "") {
            navigate(`/books`); 
        }
    }, []);

    
    const  {state, error, createBook } = useCreateBook();
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [isbn, setIsbn] = useState("");
    const [abstract, setAbstract] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [price, setPrice] = useState("");
    const [numPages, setNumPages] = useState(0);
    const [cover, setCover] = useState("");


    const handleSubmit = function(ev: { preventDefault: () => void; }) {
        ev.preventDefault();

        const newBook: Book = {
            title: title,
            subtitle: subtitle,
            isbn: isbn,
            abstract: abstract,
            author: author,
            publisher: publisher,
            price: price,
            numPages: numPages,
            cover: cover,
            likes: 0,
            userId: "1"
        };
        createBook(newBook);
        navigate(`/books/${isbn}`); 
    }

    const handleCancel = function() {
        navigate(`/books`); 
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const fileUrl = URL.createObjectURL(event.target.files[0]);
            setCover(fileUrl);
        }
    };

    return (
        <div>
            {state === `error` ? <ErrorComponent error={error!} /> : (
                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4 mt-4 ml-4 mr-4 mb-4'>
                    <div className='flex flex-col'>
                        <label className='font-bold'>title</label>
                        <input className="border p-2" type="text" name="title" onChange={(event) => setTitle(event.target.value)} required />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>subtible</label>
                        <input className="border p-2" type="text" name="subtitle" onChange={(event) => setSubtitle(event.target.value)} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>isbn</label>
                        <input className="border p-2" type="text" name="isbn"onChange={(event) => setIsbn(event.target.value)} required />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>abstract</label>
                        <textarea className="border p-2" name="abstract" onChange={(event) => setAbstract(event.target.value)} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>author</label>
                        <input className="border p-2" type="text" name="author"onChange={(event) => setAuthor(event.target.value)} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>publisher</label>
                        <input className="border p-2" type="text" name="publisher" onChange={(event) => setPublisher(event.target.value)} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>price</label>
                        <input className="border p-2" type="text" name="price" pattern="\d*" onChange={(event) => setPrice(event.target.value)} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>numPages</label>
                        <input className="border p-2" type="number" name="numPages" onChange={(event) => setNumPages(parseInt(event.target.value))} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>cover</label>
                        <input className="border p-2" type="file" name="cover" onChange={handleFileChange} />
                    </div>
                    <div className="flex justify-center mt-4 space-x-2 font-bold">
                        <button className="mt-3 bg-purple-600 rounded-lg text-white text-xs w-24 h-10" type="submit">Submit</button>
                        <button className="mt-3 bg-purple-600 rounded-lg text-white text-xs w-24 h-10" type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            )}
        </div>
    ); 
}