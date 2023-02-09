import React from 'react';
import styles from './Card.module.scss'

function Card({ onPlus, onFavorite, title, imageUrl, price }) {
    const [isAdded, setIsAdded] = React.useState(true)
    const [isFavorite, setIsFavorite] = React.useState(false)

    const onClickPlus = () => {
        onPlus({ title, imageUrl, price })
        setIsAdded(!isAdded)
    }

    const onClickFavorite = () => {
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg" } alt="unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена: </span>
                    <b>{price}</b>
                </div>
                <img 
                    className={styles.plus} 
                    onClick={onClickPlus} 
                    src={isAdded ? "/img/btn-plus.svg" : "/img/btn-cheked.svg"} alt="Plus"
                />
            </div> 
        </div>
    )
}

export default Card;

