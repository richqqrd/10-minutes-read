import React, {} from 'react';
import {Book} from '../../domain/bookInterface';
import noImage from '../../no-image.png';
import { NavLink } from 'react-router-dom';




export const ItemComponent = function({title, subtitle, isbn, abstract, author, publisher, price, numPages, cover, likes, userId}: Book) {
    const maxLength = 15;
    
    return (
        <div className="relative bg-gray-100 rounded-lg m-2 border border-transparent hover:border-purple-600">
        <NavLink to={`/books/${isbn}`}>
                <div>
                    <img className="h-36" src={cover ? cover : noImage}/>
                    <p className="text-xs mb-1">{author && author.length > maxLength ? author.substring(0, maxLength - 3) + "..." : author}</p>
                    <p className="font-bold text-xs text-center mx-2">{title.length > maxLength ? title.substring(0, maxLength - 3) + "..." : title}</p> 
                    <p className="text-sm text-purple-600 mb-1">{price}</p>
                </div>
            </NavLink>
        </div>
    );
}