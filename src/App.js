import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Visibility from './components/Visibility';
import axios from 'axios';

function App() {
  const [visibility, setvisibility] = useState('none')
  const [search, setsearch] = useState("")
  const [cocktailList, setcocktailList] = useState([])

  useEffect(()=>{
    fetchCocktailName() // eslint-disable-next-line
  },[])


  const fetchCocktailName = async () => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
    try {
      const data = await axios.get(url);
      console.log(data.data.drinks)
      setcocktailList(data.data.drinks)
    } catch (error) {
      console.log(error)
    }
  }

  const setDisplays = () => {
    setvisibility('unset')
  }
  const removeDisplay = () => {
    setvisibility('none')
  }


  return (
    <>
      <div className="App">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Find Your Favourite Cocktail</h1>
          <div className='search_box'>
            <input type='text' placeholder='Search with cocktail name...' onChange={(e) => setsearch(e.target.value)} />
            <button onClick={fetchCocktailName}>Search</button>
          </div>
        </form>
        <div className='card_container'>
          {
            cocktailList.map((val, index) => {
              return (
                <div className='details_card'>
                  <img src={val.strDrinkThumb} alt='cocktail' />
                  <h4>{val.strDrink}</h4>
                  <div className='more_details'>
                    <p>Alcoholic : <span>{val.strAlcoholic}</span></p>
                    <p>Category : <span>{val.strCategory}</span></p>
                  </div>
                  <button className='btn' onClick={setDisplays}>More Info..</button>
                  <Visibility visibility={visibility} hide={removeDisplay} 
                    title={val.strDrink} description={val.strInstructions}
                  />
                </div>
              )
            })
          }
        </div>
      </div>

    </>
  );
}

export default App;
