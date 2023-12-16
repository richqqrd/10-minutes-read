import React, { useEffect, useState } from 'react';
import { Book } from '../../domain/bookInterface';
import { TableItemComponent } from './TableItemComponent';
import {useBooks } from '../../domain/hooks'
import {fetchState} from '../../domain/FetchStateEnum'
import { LoadingComponent } from '../../components/Loading/LoadingComponent';





export const TableHeaderComponent = function() {
    const { books, state, error, refresh } = useBooks();

    useEffect(() => {
      refresh()
    }, []);

    if (state === fetchState.loading){
        return <LoadingComponent />
      }
    
    else if (state === fetchState.error){
        return <div>ERROR...</div>
      }
    else {
        return (
            <div className="books-container">
                {books.map(book => <TableItemComponent key={book.isbn} {...book} />)}
            </div>
        )
    }
}
