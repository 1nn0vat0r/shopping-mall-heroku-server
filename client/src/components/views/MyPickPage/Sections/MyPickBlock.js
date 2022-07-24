import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { addToCart } from "../../../../_actions/user_actions";

function MyPickBlock (props) {

    const dispatch = useDispatch();
    
    const clickHandler = (productId) => {
        dispatch(addToCart(productId))
    }

    const renderItems = () => (
       
       props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <a href={`/product/${product._id}`}>
                        <img style={{ width: '150px' }} alt="product" src={`http://localhost:5000/${product.images[0]}`} />
                    </a>
                </td>
                <td>
                    {product.title} 
                </td>
                <td>
                    <Button size="large" sharpe="round" type="danger" onClick={() => clickHandler(product._id)}>
                        Add to Cart
                    </Button>
                </td>
                <td>
                    <Button size="large" sharpe="round" onClick={() => props.removeItem(product._id)}>
                        Remove
                    </Button>
                </td>
            </tr>
        ))
         
    )

    return (
        <div>
            <table>
                <colgroup>
                    <col width="30%"></col>
                    <col width="30%"></col>
                    <col width="20%"></col>
                    <col width="20%"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Destination</th>
                        <th>Add to Cart</th>
                        <th>Remove from My Picks</th>
                    </tr>
                </thead>
                    
                <tbody>
                    {renderItems()} 
                </tbody>
                        
            </table>
        </div>
    )
} 

export default MyPickBlock;