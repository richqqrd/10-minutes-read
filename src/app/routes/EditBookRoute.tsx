import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBook, useUpdateBook } from '../../hooks/useBooks';
import { Book } from '../../types/book';
import { Error } from '../../components/Error/Error';
import { UserContext } from '../../context/userContext';

const EditBookRoute = () => {
    const { isbn: paramIsbn } = useParams<{ isbn: string }>();
    const { book, state, error, getBook } = useBook();
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
    const { accessToken } = useContext(UserContext);
    const [updateError, setUpdateError] = useState<Error | null>(null);

    useEffect(() => {
        if (accessToken === "") {
            navigate(`/books/${paramIsbn}`);
        }
    }, [accessToken, navigate, paramIsbn]);

    useEffect(() => {
        if (paramIsbn) {
            getBook(paramIsbn);
        }
    }, [paramIsbn, getBook]);

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
    }, [state, book]);

    const updatedBook: Book = {
        title: title,
        subtitle: subtitle,
        isbn: isbn,
        abstract: abstract,
        author: author,
        publisher: publisher,
        price: price,
        numPages: numPages,
        cover: cover,
        likes: likes,
        userId: userId
    };

    const { state: updatedState, error: updatedError, update } = useUpdateBook();

    const handleSubmit = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault();
        if (paramIsbn) {
            update(paramIsbn, updatedBook);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const fileUrl = URL.createObjectURL(event.target.files[0]);
            setCover(fileUrl);
        }
    };

    const handleCancel = () => {
        navigate(`/books/${isbn}`);
    }

    useEffect(() => {
        if (updatedState === 'success') {
            navigate(`/books/${isbn}`);
        }
        else if (updatedState === 'error' && updatedError) {
            setUpdateError(updatedError);
        }
    }, [updatedState, updatedError, navigate, isbn]);

    return (
        <div>
            {state === 'error' && error ? (
                <Error error={error} />
            ) : updateError ? (
                <Error error={updateError} />
            ) : (
                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4 mt-4 ml-4 mr-4 mb-4'>
                    <div className='flex flex-col'>
                        <label className='font-bold'>subtitle</label> {/* Tippfehler korrigiert */}
                        <input className="border p-2" type="text" name="subtitle" value={subtitle} onChange={(event) => setSubtitle(event.target.value)} />
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditBookRoute;