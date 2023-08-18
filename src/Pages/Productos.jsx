import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../components/Product.jsx';
import NotFound from './NotFound.jsx';
import Loading from '../components/Loading.jsx';
import useFetch from '../Utils/useFetch.js';

function Productos({ categoria }) {

    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState("sort=name");

    const options = [
        { text: "Nombre", val: "sort=name" },
        { text: "Menor precio", val: "sort=price" },
        { text: "Mayor precio", val: "sort=-price" },
    ];

    const navigate = useNavigate();

    const requestHandler = (res, data) => {

        if (res.status == 200) {
            setProducts(data.data.products);
        } else {
            setProducts(null);
        }
    }

    const fetchData = async (querySt) => {
        let queryString = "";

        if (querySt != undefined && querySt != "") {
            queryString = "?" + querySt;  //  =>  ?sort=price
        }

        switch (categoria) {
            case 'platos':
                sendHttpRequest('/api/products/category/plato' + queryString, "GET", null, requestHandler);
                break;
            case 'bebidas':
                sendHttpRequest('/api/products/category/bebidas' + queryString, "GET", null, requestHandler);
                break;
            case 'postres':
                sendHttpRequest('/api/products/category/postres' + queryString, "GET", null, requestHandler);
                break;
            default:
                requestHandler({ status: 400 });
                break;
        }
    }

    // 1° se piden los datos 
    useEffect(() => {
        setSelected("sort=name");
        fetchData(selected);
    }, [categoria]);

    if (errorMessage) {
        navigate('/error');
    }

    const handleChange = (e) => {
        setSelected(e.target.value);
        fetchData(e.target.value);
    };

    return (
        <div className='min-h-[90vh] p-2 pt-4 bg-secondary'>
            <div className='text-right pb-2'>
                <p className='inline'>Ordenar por </p>
                <select onChange={handleChange} value={selected}>
                    {
                        options.map(({ text, val }, index) => {
                            return <option value={val} className='text-sm' key={index}>{text}</option>
                        })
                    }
                </select>
            </div>
            {
                loading ? <Loading /> :
                    (
                        products == null ? <NotFound /> :
                            products.length == 0 ?
                                <div>No existen productos.</div> :
                                products.map((p, index) => {
                                    let img = new Image();
                                    img.src = p.imgURL;
                                    return img.onload = <Product key={index} imgURL={p.imgURL} _id={p._id} name={p.name} price={p.price} description={p.description} category={p.category} />
                                })
                    )
            }
        </div>
    )
}

export default React.memo(Productos);