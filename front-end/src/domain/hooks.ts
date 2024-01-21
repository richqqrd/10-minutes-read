import React, { useEffect, useState } from 'react';
import { Book } from '../domain/bookInterface'
import { User } from '../user';
import { getAllItems,  getItemById, createItem,  updateItem, deleteItem, login } from '../domain/API';
import { fetchState } from './FetchState'




export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [state, setFetchState] = useState<fetchState>('initial');
    const [error, setError] = useState<Error | null>(null);
    const [lastRefresh, setLastRefresh] = useState(Date.now());

        useEffect(() => {
            setFetchState('loading');
            getAllItems().then(fetchedBooks => {
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

    return { books, state, error, refresh};
};


export const useBook = () => {
    const [book, setBook] = useState<Book>();
    const [state, setFetchState] = useState<fetchState>('initial');
    const [error, setError] = useState<Error | null>(null);

    const getBook = (isbn: string) => {
        setFetchState('loading');
    getItemById(isbn).then(fetchedBook => {
        setBook(fetchedBook);
        setFetchState('success');
    }).catch(error => {
        setFetchState('error');
        setError(error);
    });
    };

    return {book, state, error, getBook}
}

export const useCreateBook = () => {
    const [book, setBook] = useState<Book>();
    const [state, setFetchState] = useState<fetchState>('initial');
    const [error, setError] = useState<Error | null>(null);




    const createBook = (newBook: Book) => {
        setFetchState('loading');
        createItem(newBook).then(createdBook => {
            setBook(createdBook);
            setFetchState('success');
        }).catch(error => {
            setFetchState('error');
            setError(error);
        })
    };

    return { book, state, error, createBook }
}

export const useUpdateBook = () => {
    const [book, setBook] = useState<Book>();
    const [state, setFetchState] = useState<fetchState>('initial');
    const [error, setError] = useState<Error | null>(null);

    const update = (isbn: string, updateBook: Book) => {
        setFetchState('loading');
        updateItem(isbn, updateBook).then(updatedBook => {
            setBook(updateBook);
            setFetchState('success');
        }).catch(error => {
            setFetchState('error');
            setError(error);
        });
    };

    return { book, state, error, update}
}

export const useDeleteBook = () => {
    const [state, setFetchState] = useState<fetchState>('initial');
    const [error, setError] = useState<Error | null>(null);

    const deleteBook = (isbn: string) => {
        setFetchState('loading');
        deleteItem(isbn).then(() => {
            setFetchState('success');
        }).catch(error => {
            setFetchState('error');
            setError(error);
        });
    };

    return { state, error, deleteBook}
}

export const useLoginUser = () => {
    const [state, setFetchState] = useState<fetchState>('initial');
    const [error, setError] = useState<Error | null>(null);
    const [outputUser, setUser] = useState<User>();


    const loginUser = (user: User) => {
        setFetchState('loading');
        login(user).then(response => {
            setUser(response);
            setFetchState('success');
        }).catch(error => {
            setFetchState('error');
            setError(error);
        });
    };

    return { outputUser, state, error, loginUser}
}

    