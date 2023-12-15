import React, { useEffect, useState } from 'react';
import { Book } from '../domain/bookInterface'
import { getAllItems  } from '../domain/API';
import { fetchState } from './FetchStateEnum'



export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [state, setFetchState] = useState<fetchState>(fetchState.initial);
    const [error, setError] = useState<Error | null>(null);
    const [lastRefresh, setLastRefresh] = useState(Date.now());


        useEffect(() => {

            console.log("update");
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
    