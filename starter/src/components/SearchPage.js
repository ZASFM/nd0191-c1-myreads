import React, {useState} from 'react';
import SetShelves from './SetShelves';
import * as BooksAPI from '../BooksAPI';

export default function SearchPage (props){
  const [getSearchData, setGetSearchData] = useState([]);
  const [input]=useState('');

  function setValue (input){
    if(input!==''){
      initSearch(input);
    }else if(input===''){
      initSearch('');
      //console.log('empty');
   }
    //console.log(input);
  };

  async function initSearch (input){
    BooksAPI.search(input)
       .then((books) => {
         if (books && !books.error) {
            setGetSearchData(
              books.map((book) => {
                const targetBook = props.books.find((bookSearch) => bookSearch.id === book.id);
                if (targetBook) {
                  return { ...book, shelf: targetBook.shelf };
                }  
                return { ...book, shelf: 'none' };
              })
            );
          } else {
            setGetSearchData([])
          }
       });
    };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a
          className="close-search"
          onClick={props.handleClose}
        >
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            name='searchField'
            placeholder="Search by title, author, or ISBN"
            value={input.searchField}
            onChange={(e)=>{
              setValue(e.target.value)
              setValue(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <SetShelves 
           data={getSearchData} 
           onUpdate={props.updateBookShelf} 
        />
      </div>
    </div>
  );
};
