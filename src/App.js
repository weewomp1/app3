import logo from './logo.svg';
import './App.css';
import searchIcon from './icons8-search-90.svg'
import {useState, useEffect} from 'react'
// import { url } from 'inspector';
// import { url } from 'inspector';

// https://api.jikan.moe/v3/search/anime?q=naruto

const API_URL = 'https://api.jikan.moe/v3/search/anime?q='




function Title( {props} ) {

  var titleStyle = {
    backgroundImage: `url(${props.image_url})`,
    backgroundSize: 'cover'
  }

  return (
    <div className="title" style={titleStyle}>
      <h2>{props.title}</h2>
      <h4 className='synopsis'>
      {/* {props.synopsis} */}
      </h4>
      <div className="data">
        <h4 className='rating'>
          {props.rated}
        </h4>
        <h4 className='type'>
          {props.type}
        </h4>
        <ul className='score'>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
          <li>*</li>
        </ul>
      </div>
    </div>
  )
}



function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [titles, setTitles] = useState([]);

  const Search = async (title) => {
    const titles = await fetch(API_URL + title)
    const result = await titles.json()
    setTitles(result.results);
    console.log(result.results)
  }

  useEffect(() => {
    Search('naruto');
  }, [])

  return (
    <div className="App">

    <div className="search">
      <input type="text" className="search" placeholder='Anime Franchise' value={searchTerm} onChange={
        (e) => setSearchTerm(e.target.value)
      }/>
      <img src={searchIcon} onClick={() => Search(searchTerm)}/>
    </div>




      <div className="container">
        <div className="titles">
            {
              (titles.length > 0) ? (
               titles.map((props) => 
                <Title props={props}/>
               )
              ) : (
                <div className='empty'>
                  <h2>No results.</h2>
                </div>
                
               )
            }
        </div>
      </div>

    </div>
  );
}

export default App;
