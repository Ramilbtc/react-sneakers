import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Header from './components/Header'
import Drawer from './components/Drawer/';
import AppContext from './pages/context';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';


function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)


  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const cartResponce = await axios.get('https://63e27ac7ad0093bf29d102bd.mockapi.io/cart')
        const favoritesResponce = await axios.get('https://63e27ac7ad0093bf29d102bd.mockapi.io/cart')
        const itemsResponce = await axios.get('https://63e27ac7ad0093bf29d102bd.mockapi.io/items')

        setIsLoading(false)

        setCartItems(cartResponce.data)
        setFavorites(favoritesResponce.data)
        setItems(itemsResponce.data)
      } catch (error) {
        alert('Ошибка при запросе данных')
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const onAddToCart = async(obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems(prev => prev.filter(item => Number(item.id)!== Number(obj.id)))
        await axios.delete(`https://63e27ac7ad0093bf29d102bd.mockapi.io/cart/${obj.id}`)
      } else {
        setCartItems(prev => [...prev, obj])
        await axios.post('https://63e27ac7ad0093bf29d102bd.mockapi.io/cart', obj)
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину!')
      console.error(error)
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://63e27ac7ad0093bf29d102bd.mockapi.io/cart/${obj.id}`)
        setFavorites(prev => prev.filter(item => Number(item.id)!== Number(obj.id)))
      } else {
        const { data } = await axios.post('https://63e27ac7ad0093bf29d102bd.mockapi.io/cart', obj)
        setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      alert('не удалось добавить в фавориты')
      console.error(error)
    }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://63e27ac7ad0093bf29d102bd.mockapi.io/cart/${id}`)
      setCartItems(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      alert('Не удалось удалить товар из корзины!')
      console.error(error)
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems }}>
      <div className="wrapper clear">
        <div>
          <Drawer onClose={() => setCartOpened(false)} items={cartItems} onRemove={onRemoveItem} opened={cartOpened}/>
        </div>

        <Header  onClickCart={() => setCartOpened(true)}/>

        <Routes>
          <Route path="/" element={<Home
            items={items}
            cartItems={cartItems} 
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            onPlus={(obj) => onAddToCart(obj)} />}
            isLoading={isLoading}
          />
          <Route path="/favorites" element={
            <Favorites
            />}
          />

          <Route path="/orders" element={
            <Orders
            />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
