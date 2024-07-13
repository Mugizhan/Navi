import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items: initialItems = [], id = '', table = '' } = location.state || {};
  const [items, setItems] = useState(initialItems);
  const [finalItem, setFinalItem] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    calculateFinalPrice();
  }, [items]);

  const Login = () => {
    navigate('/login');
  };

  const Home = () => {
    navigate(`/client/${id}/${table}`);
  };

  const increaseQuantity = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, foodQuantity: item.foodQuantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index && item.foodQuantity > 0 ? { ...item, foodQuantity: item.foodQuantity - 1 } : item
      )
    );
  };

  const remove = (foodname) => {
    setItems((prevItems) => prevItems.filter(item => item.foodname !== foodname));
  };

  const calculateFinalPrice = () => {
    const total = items.reduce((sum, item) => sum + item.foodprice * item.foodQuantity, 0);
    setFinalPrice(total);
  };

  const addToFinalItem = () => {
    setFinalItem(items);
  };
  console.log(finalItem)

  const placeOrder = async () => {
    setLoading(true);
    const orderItems = items.map(item => ({
      foodname: item.foodname,
      foodQuantity: item.foodQuantity,
    }));

    const orderData = {
      orderItems,
      table,
    };

    try {
      const res = await axios.put(`${import.meta.env.VITE_REACT_APP_URI}/orders/${id}`, orderData);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      <div className="fixed bottom-0 w-full">
        <div className="flex justify-between items-center bg-red-500 p-5 rounded-t-2xl">
          <div className="flex space-x-20">
            <div onClick={Home}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </div>
            <div className="text-white font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
              </svg>
            </div>
            <div onClick={Login}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7 cursor-pointer">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="m-4 mt-5 flex flex-col gap-6">
        <div>
          <h1 className="head"><span className="text-black font-bold">Puddy's</span></h1>
          <p className="relative bottom-3 italic text-xl">Cart</p>
        </div>

        <div className='flex flex-col gap-5'>
          <h2 className='text-black text-2xl'>Subtotal <span className='text-3xl'>₹ {finalPrice}</span>/-</h2>
          <button className='bg-yellow-300 flex justify-center p-3 text-xl rounded-full w-full shadow-xl border-white' onClick={placeOrder} disabled={loading}>
            {loading ? 'Placing Order...' : 'Proceed to Order'}
          </button>
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white rounded-lg shadow-xl px-4 py-2"
          onClick={addToFinalItem}
        >
          Finalize Cart
        </button>
        <div className='bg-white w-full py-5 rounded-xl shadow-xl flex'>
          <div className="px-4 text-gray-400 text-lg w-full flex flex-col gap-3">
            <div>
              <div className=''>
                {items.map((foodItem, index) => (
                  <div key={index} className='flex gap-5 mb-5 bg-gradient-to-r from-slate-200 rounded-xl border shadow border-b-stone-200 w-full h-full'>
                    <div>
                      <img src={foodItem.foodimage} className='w-36 h-36 rounded' alt={foodItem.foodname} />
                    </div>
                    <div className='flex flex-col'>
                      <p className='text-gray-500 text-xl font-bold'>{foodItem.foodname}</p>
                      <p className='text-2xl font-bold'><span className='text-red-400 text-sm'>Rs.</span>{foodItem.foodprice}</p>

                      <form className="flex gap-2 w-full m-5">
                        <div className="flex items-center mt-2">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(index)}
                            className="bg-gray-200 px-2 py-1.5 rounded-l-lg focus:outline-none"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            readOnly
                            value={foodItem.foodQuantity}
                            className="w-12 text-center bg-gray-100 px-2 py-1 border-t border-b focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => increaseQuantity(index)}
                            className="bg-gray-200 px-2 py-1.5 rounded-r-lg focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex space-x-4">
                          <button
                            type="button"
                            className="bg-red-500 text-white rounded-lg px-4 py-2"
                            onClick={() => remove(foodItem.foodname)}
                          >
                            Delete
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
