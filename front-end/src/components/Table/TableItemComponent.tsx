import React, { useState } from 'react';
import {Book} from '../domain/bookInterface';
import likeImage from '../like.png';



export const TableItemComponent = function({id, cover, title, isbn, author, publisher, price}: Book) {

    const [like, setLike] = useState(0);

    const handleImageClick = function(){
        setLike(like + 1);
    }

    return (
        <tr>
            <td>{id}</td>
            <td><img className="App-table-cover" src={cover}  alt="No Image!" /></td>
            <td>{title}</td>
            <td>{isbn}</td>
            <td>{author}</td>
            <td>{publisher}</td>
            <td>{price}</td>
            <td>
                <img className="App-table-cover" src={likeImage} alt="Like image" onClick={handleImageClick}/>
                <span>{like}</span>
            </td>
        </tr>
    )
};
  
