import React, {useState, useEffect} from 'react';

export default function DisplayBooks (props){
  const{data,onUpdate}=props;
  const [shelvesData, setShelvesData] = useState(data.shelf);
  const [brokenThumbnail]=useState(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'
  )

  useEffect(()=>{
    if (data.shelf !== shelvesData){
      onUpdate(data, shelvesData);
    }
  },[shelvesData,data,onUpdate]);


  function handleValue (e){
    let value=e.target.value;
    setShelvesData(value);
  };

  const styles={
    width: 128,
    height: 193,
    backgroundImage: `url( 
      ${data.imageLinks?
      data.imageLinks.thumbnail:
      brokenThumbnail}
      )`,
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={styles}
        ></div>

        <div className="book-shelf-changer">
          <select
            defaultValue={shelvesData}
            onChange={handleValue}
          >
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{data.title}</div>
      <div className="book-authors">{data.authors}</div>
    </div>
  );
};
