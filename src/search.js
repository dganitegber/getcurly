import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Search() {
    // const [greetee, setGreetee] = useState("World");
    const [products, setProducts] = useState([]); //array for db return
    const [product, setProduct] = useState(); //state for user input

    useEffect(() => {
        let ignore = false;
        console.log("different lable", product);
        if (!product) {
            (async () => {
                try {
                    const { data } = await axios.get("/getLastProducts.json");
                    console.log(data);
                    console.log(product);
                    setProducts(data);

                    // "http://flame-egg.glitch.me/?q=" + country
                    if (!ignore) {
                        console.log(data);
                    }
                } catch (e) {
                    console.log(e);
                }
            })();
        } else {
            console.log("product", products);
            axios.post("/getinput/" + product + ".json").then(data => {
                console.log("data", data);
                setProducts(data.data);
            });
        }
        return () => {
            ignore = true;
        };
    }, [product]);

    // useEffect(() => {});

    // const onChange = ({ target }) => {
    //     // console.log('target: ', target);
    //     setGreetee(target.value);
    // };

    console.log("products", products);
    const onProductSearch = ({ target }) => {
        setProduct(target.value);
        console.log("target.value", target.value);
    };

    return (
        <div className="mainSearch">
            <h1>Search Products</h1>
            <input
                className="registerfield"
                onChange={onProductSearch}
                type="text"
                placeholder="Search a Product"
            />
            <div className="latestProductContainter">
                {products.map(product => {
                    return (
                        <div key={product.id} className="latestProduct">
                            {" "}
                            <div>{product.name}</div> <div>{product.type}</div>
                            <div>{product.brand}</div>
                            <div>{product.cg_approved}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
//
