import React, { useState } from 'react';
import { Book } from '../../domain/bookInterface'
import { useCreateBook } from '../../domain/hooks'
import { useNavigate } from 'react-router-dom';


export const AddItemComponent = function() {

    const  {createBook, error } = useCreateBook();
    const navigate = useNavigate();


    


    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [isbn, setIsbn] = useState("");
    const [abstract, setAbstract] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [price, setPrice] = useState("");
    const [numPages, setNumPages] = useState("");
    const [cover, setCover] = useState("");
    const [likes, setLikes] = useState("");
    const [userId, setUserId] = useState("");

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
            numPages: parseInt(numPages),
            cover: cover,
            likes: parseInt(likes),
            userId: userId
        };

        createBook(newBook);
    }
    const handleCancel = function() {
        navigate(`/books`); 
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" />
            <input type="text" name="subtitle" value={subtitle} onChange={(event) => setSubtitle(event.target.value)} placeholder="Subtitle" />
            <input type="text" name="isbn" value={isbn} onChange={(event) => setIsbn(event.target.value)} placeholder="ISBN" />
            <textarea name="abstract" value={abstract} onChange={(event) => setAbstract(event.target.value)} placeholder="Abstract" />
            <input type="text" name="author" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="Author" />
            <input type="text" name="publisher" value={publisher} onChange={(event) => setPublisher(event.target.value)} placeholder="Publisher" />
            <input type="number" name="price" value={price} onChange={(event) => setPrice(event.target.value)} placeholder="Price" />
            <input type="number" name="numPages" value={numPages} onChange={(event) => setNumPages(event.target.value)} placeholder="Number of Pages" />
            <input type="text" name="cover" value={cover} onChange={(event) => setCover(event.target.value)} placeholder="Cover URL" />
            <input type="number" name="likes" value={likes} onChange={(event) => setLikes(event.target.value)} placeholder="Likes" />
            <input type="number" name="userId" value={userId} onChange={(event) => setUserId(event.target.value)} placeholder="User ID" />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
    );
}