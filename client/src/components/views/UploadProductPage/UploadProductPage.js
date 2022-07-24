import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" }, 
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" }
]


function UploadProductPage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [continent, setContinenet] = useState(1);
    const [image, setImage] = useState([]);

    const titleChangeHandler = (e) => {
        setTitle(e.currentTarget.value);
    }

    const descriptionChangeHandler = (e) => {
        setDescription(e.currentTarget.value);
    }

    const priceChangeHandler = e => {
        setPrice(e.currentTarget.value);
    }

    const continentChangeHandler = e => {
        setContinenet(e.currentTarget.value);
        // console.log(e.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImage(newImages);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (!title || !description || !price || !continent || !image) {
            return alert("You have to fill out all sections")
        }

        // sending product data to server
        const body = {
            writer: props.user.userData._id,
            title: title,
            description: description,
            price: price,
            continents: continent,
            images: image,
        }

        Axios.post("/api/product", body)
            .then(response => {
                if(response.data.success) {
                    alert("We uploaded your data successfully.")
                    props.history.push('/');
                } else {
                    alert("We failed to upload your product.")
                }
            })
    }


    return(
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}>Upload Travel Package</Title>
            </div>
            <Form onSubmit={submitHandler}>
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>Destination</label>
                <Input onChange={titleChangeHandler} value={title} />
                <br />
                <br />
                <label>Description</label>
                <TextArea onChange={descriptionChangeHandler} value={description} />
                <br />
                <br />
                <label>Price($)</label>
                <Input type="number" onChange={priceChangeHandler} value={price} />
                <br />
                <br />
                <select onChange={continentChangeHandler} value={continent}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button type="submit" onClick={submitHandler}>submit</Button>
            </Form>
        </div>
       
    )
}

export default UploadProductPage;