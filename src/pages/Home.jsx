import React from "react"

import Card from "../components/Card"


function Home({ items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onPlus, onAddToCart, isLoading }) {

    const renderItems = () => {
        const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        return (isLoading ? [...Array(10)] : filtredItems).map((item, index) => (
            <Card 
                key={index}
                favorited={false}
                setSearchValue={setSearchValue}
                onFavorite={onAddToFavorite}
                onPlus={(obj) => onAddToCart(obj)}
                loading={isLoading} 
                {...item}
            />
        ))
    }

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : `Все кроссовки`}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search"/>
                    {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="Remove"/> }
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    )
}

export default Home;