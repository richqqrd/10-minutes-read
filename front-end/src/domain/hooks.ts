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


export const useBook = (isbn: string) => {
    const [book, setBook] = useState<Book>();
    const [state, setFetchState] = useState<fetchState>(fetchState.initial);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setFetchState(fetchState.loading);
    getItemById(isbn).then(fetchedBook => {
        setBook(fetchedBook);
        setFetchState(fetchState.success);
    }).catch(error => {
        setFetchState(fetchState.error);
        setError(error);
    });
    }, [isbn]);

    return {book, state, error }
}

export const useCreateBook = () => {
    const [error, setError] = useState<Error | null>(null);

    const createBook = (newBook: Book) => {
        const response = createItem(newBook);
        console.log(response);
    }

    return { createBook, error }
}

export const useUpdateBook = (isbn: string, updateBook: Book) => {
    const [book, setBook] = useState<Book>();
    const [state, setFetchState] = useState<fetchState>(fetchState.initial);
    const [error, setError] = useState<Error | null>(null);

    const update = () => {
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

export const useDeleteBook = (isbn: string) => {
    const [book, setBook] = useState<Book>();
    const [state, setFetchState] = useState<fetchState>(fetchState.initial);
    const [error, setError] = useState<Error | null>(null);

    const deleteBook = () => {
        setFetchState(fetchState.loading);
        deleteItem(isbn).then(deletedBook => {
            setBook(deletedBook);
            setFetchState(fetchState.success);
        }).catch(error => {
            setFetchState(fetchState.error);
            setError(error);
        });
    };

    return { book, state, error, deleteBook}

}

    