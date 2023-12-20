import React, { useEffect, useState }  from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {useBook} from '../../domain/hooks'
import { useUpdateBook } from '../../domain/hooks'
import { Book } from '../../domain/bookInterface'
import { fetchState } from '../../domain/FetchStateEnum'






export const EditItemDetailComponent = function() {

    const { isbn: paramIsbn } = useParams<{isbn: string}>();
    const { book, state, error } = useBook(paramIsbn!);
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
        if (state === fetchState.success && book) {
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
    }, [state, book]);


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

    const { state: updatedState, error: updatedError, update } = useUpdateBook(paramIsbn!, updatedBook);


    const handleSubmit = function(ev: { preventDefault: () => void; }) {
        ev.preventDefault();
        update()
    }

    const handleCancel = function() {
        navigate(`/books/${isbn}`); 
    }
    useEffect(() => {
        if (updatedState === fetchState.success){
            navigate(`/books/${isbn}`);        
        }
    }, [updatedState]);
    



    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={title} onChange={(event) => setTitle(event.target.value)} />
            <input type="text" name="subtitle" value={subtitle} onChange={(event) => setSubtitle(event.target.value)} />
            <input type="text" name="isbn" value={isbn} onChange={(event) => setIsbn(event.target.value)} />
            <textarea name="abstract" value={abstract} onChange={(event) => setAbstract(event.target.value)} />
            <input type="text" name="author" value={author} onChange={(event) => setAuthor(event.target.value)} />
            <input type="text" name="publisher" value={publisher} onChange={(event) => setPublisher(event.target.value)} />
            <input type="text" name="price" value={price} onChange={(event) => setPrice(event.target.value)} />
            <input type="number" name="numPages" value={numPages} onChange={(event) => setNumPages(parseInt(event.target.value))} />
            <input type="text" name="cover" value={cover} onChange={(event) => setCover(event.target.value)} />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
    ); 
}