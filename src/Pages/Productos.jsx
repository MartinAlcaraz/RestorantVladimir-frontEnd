import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../components/Product.jsx';
import NotFound from './NotFound.jsx';
import Loading from '../components/Loading.jsx';
import useFetch from '../Utils/useFetch.js';

function Productos({ categoria }) {

    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const requestHandler = (res, data) => {

        if (res.status == 200) {
            setProducts(data.data.products);
        } else {
            setProducts(null);
        }
    }

    const fetchData = async () => {
        switch (categoria) {
            case 'platos':
                sendHttpRequest('/api/products/category/plato', "GET", null, requestHandler);
                break;
            case 'bebidas':
                sendHttpRequest('/api/products/category/bebidas', "GET", null, requestHandler);
                break;
            case 'postres':
                sendHttpRequest('/api/products/category/postres', "GET", null, requestHandler);
                break;
            default:
                requestHandler({ status: 400 });
                break;
        }
    }

    // 1° se piden los datos 
    useEffect(() => {
        fetchData();
    }, [categoria]);

    if (errorMessage) {
        navigate('/error');
    }
    return (
        <div className='min-h-[90vh] p-2 pt-4 bg-secondary'>
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