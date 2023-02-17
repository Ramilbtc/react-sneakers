import React from "react";
import axios from 'axios'

import AppContext from "../pages/context";
import Info from "./info";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, items = [], onRemove }) {
    const { cartItems, setCartItems } = React.useContext(AppContext)
    const [ orderId, setOrderId ] = React.useState(null)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post('https://63e27ac7ad0093bf29d102bd.mockapi.io/cart', {items: cartItems})
            setOrderId(data.id)

            for (let i = 0; i < cartItems; i++) {
                const item = cartItems[i]
                await axios.delete('https://63e27ac7ad0093bf29d102bd.mockapi.io/cart' + item.id)
                await delay(1000)
            }

            setIsOrderComplete(true)
            setCartItems([])
        } catch (error) {
            alert('не удалось создать заказ!')
        }
        setIsLoading(false)
    }

    return (
    <div className="overlay">
        <div className="drawer">
            <h3 className="mb-30 d-flex justify-between">
                Корзина 
                <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove"/>
            </h3>

            {items.length > 0 ? (
                <div className="d-flex flex-column flex">
                    <div className="items">
                        {items.map(obj => (
                            <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                <div style={{ backgroundImage: `url(${obj.imageUrl})` }} 
                                    className="cartItemImg">
                                </div>

                                <div className="mr-20 flex">
                                    <p className="mb-5">{obj.title}</p>
                                    <b>{obj.price}</b>
                                </div>
                                <img className="removeBtn" onClick={() => onRemove(obj.id)} src="/img/btn-remove.svg" alt="Remove"/>
                            </div>))
                        }
                    </div>

                    <div className="cartTotalBlock">
                        <ul>
                        <li className="d-flex">
                            <span>Итого:</span>
                            <div></div>
                            <b>21 498 руб.</b>
                        </li>
                        <li className="d-flex">
                            <span>Налог 5%:</span>
                            <div></div>
                            <b>1074 руб.</b>
                        </li>
                        </ul>
                        <button onClick={onClickOrder} disabled={isLoading} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/> </button>
                    </div>
                </div>
            ) : (
                <Info 
                    title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
                    description={isOrderComplete ? `Ваш заказ ${orderId} передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"}
                    image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg" }
                />
            )}
            
        </div>
    </div>
)}
        
export default Drawer;