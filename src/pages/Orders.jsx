import React from "react";
import axios from 'axios'
import Card from "../components/Card"
import AppContext from "./context";

function Orders() {
    const [orders, setOrders] = React.useState([])
    const { onAddToFavorite, onAddToCart } = React.useContext(AppContext)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
      (async () => {
        try {
          const { data } = await axios.get('https://63e27ac7ad0093bf29d102bd.mockapi.io/items')
          setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
          setIsLoading(false)
        } catch (error) {
          alert('Ошибка при запросе заказов')
          console.error(error)
        }
      })()
    }, [])

    return (
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои заказы</h1>
        </div>

        <div className="d-flex flex-wrap">
          {(isLoading ? [...Array(10)] : orders).map((item, index) => (
              <Card 
                key={index}
                loading={isLoading}
                {...item}/>
          ))}
        </div>
      </div>
    )
}

export default Orders;