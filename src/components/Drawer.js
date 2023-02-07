function Drawer(props) {
    return (
    <div className="overlay">
        <div className="drawer">
            <h3 className="mb-30 d-flex justify-between">
                Корзина 
                <img onClick={props.onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Remove"/>
            </h3>

            <div className="items">
                <div className="cartItem d-flex align-center mb-20">
                {/* <img className="mr-20" width={70} height={70} src="/img/sneakers/1.jpg" alt="Sneakers"/> */}

                <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }} className="cartItemImg"></div>

                <div className="mr-20 flex">
                    <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
                    <b>12999 руб.</b>
                </div>
                <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>
                </div>

                <div className="cartItem d-flex align-center mb-20">
                {/* <img className="mr-20" width={70} height={70} src="/img/sneakers/1.jpg" alt="Sneakers"/> */}

                <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }} className="cartItemImg"></div>

                <div className="mr-20 flex">
                    <p className="mb-5">Мужские Кроссовки Nike Air Max 270</p>
                    <b>12999 руб.</b>
                </div>
                <img className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>
                </div>
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
                <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/> </button>
            </div>
        </div>
    </div>
)}
        
export default Drawer;