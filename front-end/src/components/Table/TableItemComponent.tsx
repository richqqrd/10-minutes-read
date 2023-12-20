import React, { useEffect, useState } from 'react';
import {Book} from '../../domain/bookInterface';
import noImage from '../../no-image.png';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import unlike_icon from '../../icon-unlike.svg'
import like_icon from '../../icon-like.svg'
import {updateItem} from '../../domain/API';
import { NavLink } from 'react-router-dom';



export const TableItemComponent = function({title, subtitle, isbn, abstract, author, publisher, price, numPages, cover, likes, userId}: Book) {
    const [like, setLike] = useState(false);

    const handleLikeClick = function(e: React.MouseEvent){
        e.stopPropagation();
        updateLike(!like)
        setLike(!like);
    }


    const updateLike = function(like: boolean){
        let newLikes = undefined;
        if (like){
            newLikes = (likes || 0) + 1;
        } else {
            newLikes = likes !== undefined ? likes - 1 : 0;
        }

        if (newLikes < 0) {
            newLikes = 0;
        }
        const newBook: Book = {
            title: title,
            subtitle: subtitle,
            isbn: isbn,
            abstract: abstract,
            author: author,
            publisher: publisher,
            price: price,
            numPages: numPages,
            cover: cover,
            likes: newLikes,
            userId: userId
        };

        updateItem(isbn, newBook);
    }

    const maxLength = 20;

    return (

    <NavLink to={`/books/${isbn}`}>
        <div className="book-item">
            <div className={`book-item-content`}>
                <div className="book-cover-container">
                    <img className="book-cover" src={cover ? cover : noImage}/>
                    <img className={`book-like-icon ${like ? 'liked' : ''}`} src={like ? like_icon : unlike_icon} alt="Like" onClick={handleLikeClick}/>                
                </div>
                <p className="book-author">{author && author.length > maxLength ? author.substring(0, maxLength - 3) + "..." : author}</p>
                <p className="book-title ">{title.length > maxLength ? title.substring(0, maxLength - 3) + "..." : title}</p> 
                <p className="book-price">{price}</p>
            </div>
        </div>
    </NavLink>
    )
};