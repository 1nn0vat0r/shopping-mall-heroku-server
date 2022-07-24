import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems, removeMyPickItem } from "../../../_actions/user_actions";
import { Empty } from "antd";
import MyPickBlock from "./Sections/MyPickBlock";

function MyPickPage (props) {
    const dispatch = useDispatch();
    const [myPicks, setMyPicks] = useState()
    // console.log('mypick', myPicks, 'props', props.user)

    useEffect(() => {
        let myPickItems = [];

        if(props.user.userData && props.user.userData.mypick) {
            if(props.user.userData.mypick.length > 0) {
                props.user.userData.mypick.forEach(item => {
                    myPickItems.push(item.id)
                })

                dispatch(getCartItems(myPickItems, props.user.userData.mypick))
                    .then(response => { setMyPicks(response.payload) })
                    
            }
        }
    }, [props.user.userData])

    const removeFromMyPick = (productId) =>{
        dispatch(removeMyPickItem(productId))
    }
    

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Picks</h1>
            {props.user.userData && props.user.userData.mypick.length < 1 ? 
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem' }}>
                    <br />
                    <Empty description={false} />
                    <h3 style={{ color: '#888' }}>No Items in the My Picks</h3>
                </div>
                :
                <div>
                    <MyPickBlock products={myPicks} removeItem={removeFromMyPick} />
                </div>
            }
            
        </div>

    )
};

export default MyPickPage;
