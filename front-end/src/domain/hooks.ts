import React, { useEffect, useState } from 'react';
import { Book } from '../domain/bookInterface'
import { getAllItems,  getItemById, createItem,  updateItem, deleteItem  } from '../domain/API';
import { fetchState } from './FetchStateEnum'




export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [state, setFetchState] = useState<fetchState>(fetchState.initial);
    const [error, setError] = useState<Error | null>(null);
    const [lastRefresh, setLastRefresh] = useState(Date.now());


        useEffect(() => {
            setFetchState(fetchState.loading);
            getAllItems().then(fetchedBooks => {
                setBooks(fetchedBooks);
                setFetchState(fetchState.success);
              }).catch(error => {
                  setFetchState(fetchState.error);
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
    const [state, setFetchState] = useState<fetchState>(fetchState.initial);
    const [error, setError] = useState<Error | null>(null);

    const getBook = (isbn: string) => {
        setFetchState(fetchState.loading);
    getItemById(isbn).then(fetchedBook => {
        setBook(fetchedBook);
        setFetchState(fetchState.success);
    }).catch(error => {
        setFetchState(fetchState.error);
        setError(error);
    });
    };

    return {book, state, error, getBook}
}

export const useCreateBook = () => {
    const [book, setBook] = useState<Book>();
    const [state, setFetchState] = useState<fetchState>(fetchState.initial);
    const [error, setError] = useState<Error | null>(null);




    const createBook = (newBook: Book) => {
        setFetchState(fetchState.loading);
        createItem(newBook).then(createdBook => {
            setBook(createdBook);
            setFetchState(fetchState.success);
        }).catch(error => {
            setFetchState(fetchState.error);
            setError(error);
        })
    };

    return { book, state, error, createBook }
}

export const useUpdateBook = () => {
    const [book, setBook] = useState<Book>();
    const [state, setFetchState] = useState<fetchState>(fetchState.initial);
    const [error, setError] = useState<Error | null>(null);

    const update = (isbn: string, updateBook: Book) => {
        setFetchState(fetchState.loading);
        updateItem(isbn, updateBook).then(updatedBook => {
            setBook(updateBook);
            setFetchState(fetchState.success);
        }).catch(error => {
            setFetchState(fetchState.error);
            setError(error);
        });
    };

    return { book, state, error, update}
}

export const useDeleteBook = () => {
    const [state, setFetchState] = useState<fetchState>(fetchState.initial);
    const [error, setError] = useState<Error | null>(null);

    const deleteBook = (isbn: string) => {
        setFetchState(fetchState.loading);
        deleteItem(isbn).then(() => {
            setFetchState(fetchState.success);
        }).catch(error => {
            setFetchState(fetchState.error);
            setError(error);
        });
    };

    return { state, error, deleteBook}

}

    