import React, { useEffect, useState } from 'react';
import { TableItemComponent } from './TableItemComponent';
import {useBooks } from '../../domain/hooks'
import {fetchState} from '../../domain/FetchStateEnum'
import { LoadingComponent } from '../../components/Loading/LoadingComponent';
import { AddItemComponent } from './AddItemComponent';
import { Link } from 'react-router-dom';






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
          <div className="underHeader">
          <Link to="/books/add" className="new-book-link">Neues Buch hinzufügen</Link>
            <div className="books-container">
                {books.map(book => <TableItemComponent key={book.isbn} {...book} />)}
            </div>
          </div>
        )
    }
}
