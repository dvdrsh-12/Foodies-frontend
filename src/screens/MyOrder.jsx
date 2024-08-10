import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const { email } = JSON.parse(localStorage.getItem('user'));

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("https://foodies-backend-6kl3.onrender.com/api/myorderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const result = await response.json();
            setOrderData(result.orderData?.order_data || []);
        } catch (error) {
            console.error("Failed to fetch order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? orderData.flat().reverse().map((item, index) => (
                        item.Order_date ? (
                            <div key={index} className='m-auto mt-5'>
                                <div>{item.Order_date}</div>
                                <hr />
                            </div>
                        ) : (
                            <div key={index} className='col-12 col-md-6 col-lg-3'>
                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                            <span className='m-1'>{item.qty}</span>
                                            <span className='m-1'>{item.size}</span>
                                            <span className='m-1'>{item.Order_date}</span>
                                            <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                ₹{item.price}/-
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )) : <div>No orders found</div>}
                </div>
            </div>
            <Footer />
        </>
    );
}
