import './App.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Visibility from './components/Visibility';
import axios from 'axios';

function App() {
  const [visibility, setvisibility] = useState(false)
  const [search, setsearch] = useState("")
  const [cocktailList, setcocktailList] = useState([])
  const [tempData, settempData] = useState([])

  useEffect(() => {
    fetchCocktailName() // eslint-disable-next-line
  }, [])


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

  const setDisplays = (title, desc) => {
    let tempData = [title, desc]
    settempData(item => [1, ...tempData])
    return setvisibility(true)
  }
  const removeDisplay = () => {
    setvisibility(false)
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
                  <button className='btn' onClick={() => setDisplays(val.strDrink, val.strInstructions)}>More Info..</button>
                </div>
              )
            })
          }
          {
            visibility === true && <Visibility hide={removeDisplay}
              title={tempData[1]} description={tempData[2]}
            />
          }
        </div>
      </div>

    </>
  );
}

export default App;
