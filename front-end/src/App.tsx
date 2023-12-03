import React, { useEffect, useState } from 'react';
import './App.css';
import { AppHeaderComponent } from './components/AppHeaderComponent';
import { TableHeaderComponent } from './components/TableHeaderComponent';
import { Book } from './domain/bookInterface'
import { exampleBook } from './domain/ExampleBook';
import { getAllItems as fetchItems } from './domain/API';





function App() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchItems().then(fetchedBooks => {
      setBooks(fetchedBooks);
    });
  }, []);


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

export default App;
