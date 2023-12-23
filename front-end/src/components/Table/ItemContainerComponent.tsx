import React, { useEffect } from 'react';
import { ItemComponent } from './ItemComponent';
import {useBooks } from '../../domain/hooks'
import {fetchState} from '../../domain/FetchStateEnum'
import { LoadingComponent } from '../Loading/LoadingComponent';
import { ErrorComponent } from '../Error/ErrorComponent';






export const ItemContainerComponent = function() {
    const { books, state, error, refresh } = useBooks();

    useEffect(() => {
      refresh()
    }, []);

    if (state === fetchState.loading){
        return <LoadingComponent />
      }
    else if (state === fetchState.error){
        return <ErrorComponent error={error!} />
      }
    else {
        return (
            <div className='flex flex-wrap justify-center p-4'>
                {books.map(book => <ItemComponent key={book.isbn} {...book} />)}
            </div>
        )
    }
}
