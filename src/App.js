import Card from './components/Card'
import React from 'react';
import Header from './components/Header'
import Drawer from './components/Drawer';

const arr = []

function App() {
  const [items, setItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    fetch('https://63e27ac7ad0093bf29d102bd.mockapi.io/items').then(res => {
      return res.json()
    }).then(json => {
      setItems(json)
    })
  }, [])

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClose={() => setCartOpened(false)}/>}
      <Header  onClickCart={() => setCartOpened(true)}/>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"/>
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((obj) => (
            <Card 
              title={obj.title} 
              price={obj.price} 
              imageUrl={obj.imageUrl} 
              onPlus={() => console.log('Нажали плюс')} 
              onFavorite={() => console.log('Добавили в закладки')} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
