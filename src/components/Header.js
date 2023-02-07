function Header(props) {
    console.log(props)
    return (
        <header className="d-flex justify-between align-center p-40">
            <div className="d-flex align-center">
                <img className="mr-10" width={40} height={40} src="/img/logo.png" />
                <div>
                    <h3 className="text-uppercase">React Sneakers</h3>
                    <p className="opacity-5">Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul clasName="d-flex flex-column">
                <li onClick={props.onClickCart} className="mt-30 cu-p">
                    <img width={18} height={18} src="/img/cart.svg"/>
                    <span>1205 руб.</span>
                </li>
                <li>
                    <img width={18} height={18} src="/img/user.svg"/>
                </li>
            </ul>
        </header>
    )
}

export default Header;
