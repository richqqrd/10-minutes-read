import React, { useState } from 'react';
import {Book} from '../../domain/bookInterface';

export const TableItemComponent = function({cover, title, isbn, author, publisher, price}: Book) {
    const [like, setLike] = useState(0);

    const handleImageClick = function(){
        setLike(like + 1);
    }

    const maxLength = 20;

    return (
        <div className="book-item">
            <img className="book-cover" src={cover}  alt="No Image!" />
            <p className="book-title">{title.length > maxLength ? title.substring(0, maxLength - 3) + "..." : title}</p> 
        </div>
    )
};
  
//TODO klickbare like funktion mit persistenter speicherung
//TODO condinatonl rendering 