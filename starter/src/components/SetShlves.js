import DisplayBooks from './DisplayBooks';

export default function SetShelves (props) {
  return (
     <>
        {props.data.map((bookData)=>(
          <li key={bookData.id}>
            <DisplayBooks 
               data={bookData} 
               onUpdate={props.onUpdate}/>
          </li>
        ))}
     </>
  );
};

