import { useEffect, useState } from 'react';
import { Book } from '../types/book'
import { getAllBooks, getBookById, createBook as createBookApi, updateBook as updateBookApi, deleteBook as deleteBookApi } from '../utils/api';
import { FetchState } from '../types/fetchState';


export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [state, setFetchState] = useState<FetchState>('initial');
    const [error, setError] = useState<Error | null>(null);
    const [lastRefresh, setLastRefresh] = useState(Date.now());

    useEffect(() => {
        setFetchState('loading');
        getAllBooks().then(fetchedBooks => {
            setBooks(fetchedBooks);
            setFetchState('success');
        }).catch(error => {
            setFetchState('error');
            setError(error);
        });

        const intervalId = setInterval(() => setLastRefresh(Date.now()), 60000);
        return () => clearInterval(intervalId);
    }, [lastRefresh]);

    const refresh = () => {
        setLastRefresh(Date.now())
    };

    return { books, state, error, refresh };
};


export const useBook = () => {
    const [book, setBook] = useState<Book>();
    const [state, setFetchState] = useState<FetchState>('initial');
    const [error, setError] = useState<Error | null>(null);

    const getBook = (isbn: string) => {
        setFetchState('loading');
        getBookById(isbn).then(fetchedBook => {
            setBook(fetchedBook);
            setFetchState('success');
        }).catch(error => {
            setFetchState('error');
            setError(error);
        });
    };

    return { book, state, error, getBook }
}


export const useCreateBook = () => {
    const [book, setBook] = useState<Book>();
    const [state, setFetchState] = useState<FetchState>('initial');
    const [error, setError] = useState<Error | null>(null);

    const create = (newBook: Book) => {
        setFetchState('loading');
        createBookApi(newBook).then(createdBook => {
            setBook(createdBook);
            setFetchState('success');
        }).catch(error => {
            setFetchState('error');
            setError(error);
        });
    };

    return { book, state, error, create };
};

export const useUpdateBook = () => {
    const [book, setBook] = useState<Book>();
    const [state, setFetchState] = useState<FetchState>('initial');
    const [error, setError] = useState<Error | null>(null);

    const update = (isbn: string, updateBook: Book) => {
        setFetchState('loading');
        updateBookApi(isbn, updateBook).then(updatedBook => {
            setBook(updateBook);
            setFetchState('success');
        }).catch(error => {
            setFetchState('error');
            setError(error);
        });
    };

    return { book, state, error, update };
}

export const useDeleteBook = () => {
    const [state, setFetchState] = useState<FetchState>('initial');
    const [error, setError] = useState<Error | null>(null);

    const deleteBook = (isbn: string) => {
        setFetchState('loading');
        deleteBookApi(isbn).then(() => {
            setFetchState('success');
        }).catch(error => {
            setFetchState('error');
            setError(error);
        });
    };

    return { state, error, deleteBook };
}