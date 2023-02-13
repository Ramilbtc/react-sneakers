import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Header from './components/Header'
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    axios.get('https://63e27ac7ad0093bf29d102bd.mockapi.io/items').then(res => {
      setItems(res.data)
    })
    axios.get('https://63e27ac7ad0093bf29d102bd.mockapi.io/cart').then(res => {
      setCartItems(res.data)
    })
    axios.get('https://63e27ac7ad0093bf29d102bd.mockapi.io/cart').then(res => {
      setFavorites(res.data)
    })
  }, [])

  const onAddToCart = (obj) => {
    axios.post('https://63e27ac7ad0093bf29d102bd.mockapi.io/cart', obj)
    setCartItems(prev => [...prev, obj])
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://63e27ac7ad0093bf29d102bd.mockapi.io/cart/${obj.id}`)
      } else {
        const { data }= await axios.post('https://63e27ac7ad0093bf29d102bd.mockapi.io/cart', obj)
        setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      alert('не удалось добавить в фавориты')
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://63e27ac7ad0093bf29d102bd.mockapi.io/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClose={() => setCartOpened(false)} items={cartItems} onRemove={onRemoveItem}/>}
      <Header  onClickCart={() => setCartOpened(true)}/>
      

      <Routes>
        <Route path="/" element={<Home
          items={items} 
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          onPlus={(obj) => onAddToCart(obj)} />}
        />
        <Route path="/favorites" element={
          <Favorites
            items={favorites}
            onAddToFavorite={onAddToFavorite}
          />}
        />
      </Routes>


      
    </div>
  );
}

export default App;
