import React, { useEffect, useState } from 'react';
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import { continents, price } from './Sections/Data';
import RadioBox from './Sections/RadioBox';
import SearchBox from './Sections/SearchBox';

function LandingPage() {
    const [products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(8);
    const [postSize, setPostSize] = useState(0);
    const [filters, setFilters] = useState({
        continents: [],
        price: [],
    });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: limit,
        }
        getProducts(body);
        
    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
                .then(response => {
                    if(response.data.success) {
                        if (body.loadMore) {
                            setProducts([...products, ...response.data.productInfo])
                        } else {
                            setProducts(response.data.productInfo)
                        }
                        setPostSize(response.data.postSize)
                    } else {
                        alert("failed to load products.")
                    }
                })    
    }

    const loadMoreHandler = () => {
        let skip = Skip + limit;
        let body = {
            skip: skip,
            limit: limit,
            loadMore: true,
        };
        getProducts(body);

        setSkip(skip);
    }

    const rederCards = products.map((product, index) => {
        // console.log('products', product)
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card  
                    cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images} /></a>}    
                >
                    <Meta title={product.title} description={`$${product.price}`} />
                </Card>
            </Col>
        )
    })

    const showFilteredResults = (filters) => {
        let body ={
            skip: 0,
            limit: limit,
            filters: filters,
        }

        getProducts(body);
        setSkip(0);
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];
        for (let key in data) {
            if(data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {
        const newFilters = { ...filters };
        newFilters[category] = filters;
        
        if(category === "price") {
            let priceValues = handlePrice(filters);
            newFilters[category] = priceValues;
        }
        showFilteredResults(newFilters);
        setFilters(newFilters);
        console.log("searchBox click")
    }

    const updateSearchTerm = (newSearchTerm) => {
        let body = {
            skip: 0,
            limit: limit,
            filters: filters,
            searchTerm: newSearchTerm
        }

        setSkip(0);
        setSearchTerm(newSearchTerm);
        getProducts(body);

    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere <Icon type="car" style={{ marginLeft: '1rem' }}/></h2>
            </div>
            
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")} />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")} />
                </Col>
            </Row>

            <div style={{ display: "flex", justifyContent: "flex-end", margin: "1rem auto" }}>
                <SearchBox refreshFunction={updateSearchTerm} />
            </div>
            
            <Row gutter={[16, 16]}>
                {rederCards}
            </Row>
            { postSize >= limit &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <button onClick={loadMoreHandler}>More Trips</button>
                </div>
            }
            
            
        </div>
    )
}

export default LandingPage
