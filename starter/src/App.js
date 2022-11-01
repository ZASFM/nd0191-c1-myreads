import React, {useState, useEffect } from 'react';
import "./App.css";
import * as BooksAPI from './BooksAPI';
import SetShelves from './components/SetShelves';
import SearchPage from './components/SearchPage';


export default function App() {
  const [showSearchPage, setShowSearchpage]=useState(false);
  const [booksData, setBooksData]=useState([]);

  useEffect(()=>{
    BooksAPI.getAll()
       .then((allBooks)=>{
         setBooksData(allBooks);
    });
  },[]);

  function handleClick(){
    setShowSearchpage(preVal=>!preVal);
  }

  function separateShelf(shelfName){
    if(booksData!==[]){
      const shelf=booksData.filter((data)=>data.shelf===shelfName);
      return shelf;
    }else{
      return;
    }
  };

  function updateShelf(book, shelf){
    BooksAPI.update(book, shelf)
      .then(()=>{
        const updatetdBook={...book, shelf};
        setBooksData((preVal)=>
           preVal.filter((books)=>books.id !== book.id)
             .concat(updatetdBook)
      );
    });
  };

  return (
    <div className="app">
      {showSearchPage ? 
         <SearchPage
            handleClose={handleClick}
            updateBookShelf={updateShelf}
            books={booksData}
         />
      : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                     {booksData!==[] && 
                         <SetShelves
                           data={separateShelf('currentlyReading')}
                           onUpdate={updateShelf}
                        />
                      }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                     {booksData!==[] && 
                        <SetShelves
                           data={separateShelf('wantToRead')}
                           onUpdate={updateShelf}
                        />
                     }
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                     {booksData!==[] && 
                        <SetShelves
                           data={separateShelf('read')}
                           onUpdate={updateShelf}
                        />
                     }
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <a onClick={handleClick}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}
