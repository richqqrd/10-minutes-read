import React from 'react';
import { Book } from '../../domain/bookInterface';
import { TableItemComponent } from './TableItemComponent';


export const TableHeaderComponent = function({books}: {books: Book[]}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Cover</th>
                    <th>Title</th>
                    <th>ISBN</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Price</th>
                    <th>Likes</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => <TableItemComponent key={book.id} {...book} />)}
            </tbody>
        </table>
    )
}
