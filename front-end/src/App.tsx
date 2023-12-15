import React, { useEffect, useState } from 'react';
import './App.css';
import { AppHeaderComponent } from './components/AppHeader/AppHeaderComponent';
import { TableHeaderComponent } from './components/Table/TableHeaderComponent';
import { Book } from './domain/bookInterface'
import { getAllItems as fetchItems } from './domain/API';
import {useBooks } from './domain/hooks'
import {fetchState} from './domain/FetchStateEnum'

function App() {
  //const [books, setBooks] = useState<Book[]>([]);
  const { books, state, error, refresh } = useBooks();

  useEffect(() => {
    refresh()
  }, []);

  if (state === fetchState.loading){
    return <div>LOADING ITEMS...</div>
  }

  else if (state === fetchState.error){
    return <div>ERROR...</div>
  }

  else if (state === fetchState.success) {
    return (
      <div className="App">
        <header className="App-header">
          <AppHeaderComponent />
        </header>
        <body className="App-table">
          <TableHeaderComponent books={books}/>
        </body>
      </div>
    );
  }

  else {
    return <div></div>
  }
}

export default App;
