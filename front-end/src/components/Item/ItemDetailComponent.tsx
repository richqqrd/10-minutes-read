import React, { useEffect, useState }  from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {useBook, useDeleteBook} from '../../domain/hooks'
import {fetchState} from '../../domain/FetchStateEnum'
import { LoadingComponent } from '../Loading/LoadingComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';






export const ItemDetailComponent = function() {
    const { isbn } = useParams<{isbn: string}>();
    const { book, state, error } = useBook(isbn ?? '');
    const navigate = useNavigate();

    const { book: deleteItemBook, state: deleteState, error: deleteError, deleteBook } = useDeleteBook(isbn!);

    const handleDelete= function() {
        deleteBook();
    }

    useEffect(() => {
        if (state === fetchState.success){
            navigate(`/books`);        
        }
    }, [deleteState]);


    if (state === fetchState.loading){
        return <LoadingComponent />
      }
    
    else if (state === fetchState.error){
        return <div>ERROR...</div>
      }
    else {
        return (
            <div>
                <Link to="/books" className="back-to-books-button">Zurück zur Übersicht</Link>
                <div className="item-detail-container">
                    <div className="item-detail-cover">
                        <img src={book?.cover}></img>
                    </div>
                    <div className="item-detail-attributes">
                        <div className="item-detail-attributes-title">{book?.title}</div>
                        <div className="item-detail-attributes-subtitle">{book?.subtitle}</div>
                        <div className="item-detail-attributes-author">{book?.author}</div> 
                        <div className="item-detail-attributes-price">{book?.price}</div>
                        <div className={"book-item-button"}>
                            <button className="book-button"><FontAwesomeIcon icon={faShoppingCart}/> Add to cart</button>
                            <button className="book-button"><Link to={`/books/${isbn}/edit`} className="edit-book-button">Buch bearbeiten</Link></button>
                            <button className="book-button" onClick={handleDelete}>Buch löschen</button>
                        </div>
                    </div>
            </div>
            <div className="item-detail-below">
                <div className="item-detail-beschreibung">
                    <div className="item-detail-beschreibung-text">Beschreibung</div>
                    <div className="item-detail-beschreibung-content">{book?.abstract}</div>
                </div>
                <div className="item-detail-detail">
                    <div className="item-detail-detail-text">Details</div>
                    <div className="item-detail-detail-content">
                        <div><span className="item-detail-detail-seiten">Seiten: </span>{book?.numPages}</div>
                        <div><span className="item-detail-detail-publisher">Publisher: </span>{book?.publisher}</div>
                        <div><span className="item-detail-detail-likes">Likes: </span>{book?.likes}</div>

                    </div>
                </div>
            </div>
        </div>

        )
    }
}

//TODO beschreibung button adden
//TODO itemDetail screen fetchen lieber im loaeder machen im router
//TODO fehler wenn backend nicht online ist
//TODO change fetchState to connectionState
//TODO nur update wenn ein unterschied ist
