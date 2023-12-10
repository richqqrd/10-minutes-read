import React from 'react';
import { Book } from '../../domain/bookInterface';
import { TableItemComponent } from './TableItemComponent';


export const TableHeaderComponent = function({books}: {books: Book[]}) {
    return (
        <div className="books-container">
            {books.map(book => <TableItemComponent key={book.isbn} {...book} />)}
        </div>
    )
}
