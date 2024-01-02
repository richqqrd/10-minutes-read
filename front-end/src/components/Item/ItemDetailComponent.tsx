import React, {useEffect }  from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {useBook, useDeleteBook, useUpdateBook} from '../../domain/hooks'
import {fetchState} from '../../domain/FetchState'
import { LoadingComponent } from '../Loading/LoadingComponent';
import { ErrorComponent } from '../Error/ErrorComponent';
import { Book } from '../../domain/bookInterface';
import noImage from '../../no-image.svg';





export const ItemDetailComponent = function() {
    const { isbn } = useParams<{isbn: string}>();
    const { book, state, error, getBook } = useBook();
    const navigate = useNavigate();
    const { state: deleteState, error: deleteError, deleteBook } = useDeleteBook();
    const {book: updateBook, state: updateState, error: updateError, update} = useUpdateBook();
    
    useEffect(() => {
        getBook(isbn!);
    },[updateBook])

    useEffect(() => {
        if (deleteState === 'error'){
            <ErrorComponent error={deleteError!} />
        }
        if (updateState === 'error'){
            <ErrorComponent error={updateError!} />
        }
    }, [deleteState, updateState])

    const handleDelete = function() {
        deleteBook(isbn!);
    }

    const handleLike = function(e: React.MouseEvent){
        if (state === 'success'){
            const newBook: Book = {
                title: book!.title,
                subtitle: book!.subtitle,
                isbn: book!.isbn,
                abstract: book!.abstract,
                author: book!.author,
                publisher: book!.publisher,
                price: book!.price,
                numPages: book!.numPages,
                cover: book!.cover,
                likes: book!.likes! + 1,
                userId: book!.userId
            };

        update(book!.isbn, newBook);
    }
}

    useEffect(() => {
        if (deleteState === 'success'){
            navigate(`/books`);        
        }
    }, [deleteState]);

    if (state === 'loading'){  
        return <LoadingComponent />
      }
    else if (state === 'error'){
        return <ErrorComponent error={error!} />
    }
    else {
        return (
            <div className='pb-12'>
                <div className="flex">
                    <div className="pl-4 object-cover w-1/2 justify-center items-center">
                        <img src={book?.cover ? book.cover : noImage} className="w-64 h-64 object-cover"></img>
                    </div>
                    <div className="text-left pt-12">
                        <div className="text-2xl font-bold">{book?.title}</div>
                        <div>{book?.subtitle}</div>
                        <div className="text-base underline">{book?.author}</div> 
                        <div className="text-2xl font-bold pt-3">{book?.price}</div>
                        <div className={"flex justify-start space-x-4 font-bold pt-3"}>
                            <button className="t-3 bg-purple-600 rounded-lg text-white text-xs w-24 h-10"onClick={handleLike}>Like book</button>
                            <button className='t-3 bg-purple-600 rounded-lg text-white text-xs w-24 h-10'><Link to={`/books/${isbn}/edit`}>Edit book</Link></button>
                            <button className="t-3 bg-purple-600 rounded-lg text-white text-xs w-24 h-10"onClick={handleDelete}>Delete book</button>
                        </div>
                    </div>
            </div>
            <div className="grid grid-cols-2">
                <div className="text-left pl-15 pr-5">
                    <div className="text-lg font-bold mb-5">Beschreibung</div>
                    <div className='text-left'>{book?.abstract}</div>
                </div>
                <div className="text-left">
                    <div className="text-lg font-bold mb-5">Details</div>
                    <div><span>Seiten: </span>{book?.numPages}</div>
                    <div><span>Publisher: </span>{book?.publisher}</div>
                    <div><span>Likes: </span>{book?.likes}</div>
                </div>
            </div>
        </div>
        )
    }
}
