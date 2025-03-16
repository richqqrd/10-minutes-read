import React, { useEffect } from 'react';
import { BookCard } from '../../components/Book/BookCard';
import { useBooks } from '../../hooks/useBooks';
import Loading from '../../components/Loading/Loading';
import { Error } from '../../components/Error/Error';

const BooksRoute = () => {
  const { books, state, error, refresh } = useBooks();

  useEffect(() => {
    refresh()
  }, [refresh]);

  if (state === 'loading') {
    return <Loading />
  }
  else if (state === 'error' && error) {
    return <Error error={error} />
  }

  return (
    <div className='flex flex-wrap justify-center p-4'>
      {books.map(book => <BookCard key={book.isbn} {...book} />)}
    </div>
  )
};

export default BooksRoute;