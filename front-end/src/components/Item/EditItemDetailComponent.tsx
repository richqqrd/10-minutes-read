import React, { useEffect, useState }  from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useBook, useUpdateBook} from '../../domain/hooks'
import { Book } from '../../domain/bookInterface'
import { fetchState } from '../../domain/FetchState'
import { ErrorComponent } from '../Error/ErrorComponent';






export const EditItemDetailComponent = function() {
    const { isbn: paramIsbn } = useParams<{isbn: string}>();
    const { book, state, error, getBook} = useBook();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [isbn, setIsbn] = useState("");
    const [abstract, setAbstract] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [price, setPrice] = useState("");
    const [numPages, setNumPages] = useState(0);
    const [cover, setCover] = useState("");
    const [likes, setLikes] = useState(0);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        getBook(paramIsbn!);
    }, []);

    useEffect(() => {
        if (state === 'success' && book) {
            setTitle(book.title);
            setSubtitle(book.subtitle ?? "");
            setIsbn(book.isbn);
            setAbstract(book.abstract ?? "");
            setAuthor(book.author ?? "");
            setPublisher(book.publisher ?? "");
            setPrice(book.price ?? "");
            setNumPages(book.numPages ?? 0) 
            setCover(book.cover ?? "");
            setLikes(book.likes ?? 0);
            setUserId(book.userId ?? "");
        }
    }, [state]);


    const updatedBook: Book = {
        title: title!,
        subtitle: subtitle,
        isbn: isbn!,
        abstract: abstract,
        author: author,
        publisher: publisher,
        price: (price),
        numPages: (numPages),
        cover: cover,
        likes: (likes),
        userId: (userId)
    };

    console.log(updatedBook)

    const { state: updatedState, error: updatedError, update } = useUpdateBook();


    const handleSubmit = function(ev: { preventDefault: () => void; }) {
        ev.preventDefault();
        update(paramIsbn!, updatedBook)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const fileUrl = URL.createObjectURL(event.target.files[0]);
            setCover(fileUrl);
        }
    };

    const handleCancel = function() {
        navigate(`/books/${isbn}`); 
    }
    useEffect(() => {
        if (updatedState === 'success'){
            navigate(`/books/${isbn}`);        
        }
        else if (updatedState === 'error'){
            <ErrorComponent error={updatedError!} />
        }
    }, [updatedState]);
    



    return (
        <div>
            {state === 'error' ? <ErrorComponent error={error!} /> : (
                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4 mt-4 ml-4 mr-4 mb-4'>
                    <div className='flex flex-col'>
                        <label className='font-bold'>title</label>
                        <input className="border p-2" type="text" name="title" value={title} onChange={(event) => setTitle(event.target.value)} required/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>subtible</label>
                        <input className="border p-2" type="text" name="subtitle" value={subtitle} onChange={(event) => setSubtitle(event.target.value)} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>isbn</label>
                        <input className="border p-2" type="text" name="isbn" value={isbn} onChange={(event) => setIsbn(event.target.value)} required/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>abstract</label>
                        <textarea className="border p-2" name="abstract" value={abstract} onChange={(event) => setAbstract(event.target.value)} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>author</label>
                        <input className="border p-2" type="text" name="author" value={author} onChange={(event) => setAuthor(event.target.value)} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>publisher</label>
                        <input className="border p-2" type="text" name="publisher" value={publisher} onChange={(event) => setPublisher(event.target.value)} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>price</label>
                        <input className="border p-2" type="text" name="price" value={price} onChange={(event) => setPrice(event.target.value)} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>numPages</label>
                        <input className="border p-2" type="number" name="numPages" value={numPages} onChange={(event) => setNumPages(parseInt(event.target.value))} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-bold'>cover</label>
                        <div className="flex items-center border p-2">
                            <img src={cover} alt="Current cover" className="mr-4 w-20 h-20 object-cover"/>
                            <input type="file" name="cover" onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className="flex justify-center mt-4 space-x-2 font-bold">
                        <button className="mt-10 bg-purple-600 rounded-lg text-white text-xs w-24 h-10" type="submit">Submit</button>
                        <button className="mt-10 bg-purple-600 rounded-lg text-white text-xs w-24 h-10" type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            )}
        </div>
    ); 
}