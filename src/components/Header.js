import { Link } from 'react-router-dom'

function Header(props) {
    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img className="mr-10" width={40} height={40} src="/img/logo.png" alt="logo"/>
                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            
            <ul clasName="d-flex flex-row">
                <li onClick={props.onClickCart} className="mb-10 cu-p">
                    <img width={18} height={18} src="/img/cart.svg" alt="cart"/>
                    <span>1205 руб.</span>
                </li>
                <li className="mb-10 cu-p">
                    <Link to="/favorites">
                        <img width={18} height={18} src="/img/heart.svg" alt="heart"/>
                    </Link>
                </li>
                <li className="mb-10 cu-p">
                    <img width={18} height={18} src="/img/user.svg" alt="user"/>
                </li>
            </ul>
        </header>
    )
}

export default Header;
