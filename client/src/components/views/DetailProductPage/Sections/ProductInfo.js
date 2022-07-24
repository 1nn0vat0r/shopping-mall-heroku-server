import React from "react";
import { Button, Descriptions } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";
import { addToMyPick } from "../../../../_actions/user_actions";

function ProductInfo (props) {
    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(addToCart(props.detail._id))
    }

    const myPickHandler = () => {
        dispatch(addToMyPick(props.detail._id))
    }

    return (
        <div>
            <Descriptions title="Product Info" bordered>
                <Descriptions.Item label="Price" span={3}>{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="Sold" span={3}>{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="View" span={3}>{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="Description" span={3}>{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" sharpe="round" onClick={myPickHandler} style={{ marginRight: '1rem' }}>Add to My Pick</Button>
                <Button size="large" sharpe="round" type="danger" onClick={clickHandler}>Add to Cart</Button>
            </div>
        </div>
    )
};

export default ProductInfo;