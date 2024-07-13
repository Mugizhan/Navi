import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Vadivel from '../image/01.png';
import Loading from '../image/loading.gif';
import Cart from './Cart'
const Userpage = () => {
  const navigate = useNavigate();
  const { id,table } = useParams();
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(1); // Example state for quantity

    const AddItem = (e) => {
      e.preventDefault();
      if (!user || !user.food || !user.food[index]) {
        console.error('Invalid user or food data');
        return;
      }
  
      const newItem = {
        foodimage: user.food[index].foodimage,
        foodname: user.food[index].foodname,
        foodprice: user.food[index].foodprice,
        foodQuantity: quantity
      };
  
      setItems((prevItems) => [...prevItems, newItem]);
      setQuantity(1); // Reset quantity after adding item
      setEdit(false);
    };
  console.log(id)
  console.log(table)
  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_URI}/client/${id}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50 w-screen h-screen">
        <img src={Vadivel} className="w-52" alt="Loading" />
        <img src={Loading} alt="Loading animation" />
      </div>
    );
  }

  const Login = () => {
    navigate('/login');
  };

  const foodEdit = (id, index) => {
    setEdit(true);
    setIndex(index);
    setQuantity(0); // Reset quantity when editing a new item
  };

  const increaseQuantity = (e) => {
    e.preventDefault();
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = (e) => {
    e.preventDefault();
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const goToCart = (e) => {
    e.preventDefault();
    navigate('/cart', { state: { items, id, table } });
  };



  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      <div className="fixed bottom-0 w-full">
        <div className="flex justify-between items-center bg-red-500 p-5 rounded-t-2xl">
          <div className="flex space-x-20">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </div>
            <div className="text-white font-bold" onClick={goToCart}>
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
      <div className="m-3 mt-5 flex flex-col gap-6">
        <div>
          <h1 className="head"><span className="text-black font-bold">Puddy</span></h1>
          <p className="relative bottom-3 italic">@{user.shopname}</p>
        </div>
        <div className="w-screen h-fit flex items-center gap-2">
          <div className="bg-white border border-gray-200 flex w-80 p-3 rounded-xl shadow-xl">
            <div className="h-fit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="h-fit ml-5">
              <input type="text" placeholder="Search" className="w-full outline-none" />
            </div>
          </div>
          <div className="bg-red-500 p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7">
              <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
            </svg>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <div className="bg-red-500 p-3 text-white px-5 font-semibold rounded-xl shadow-xl">
            <h1>All</h1>
          </div>
          <div className="bg-gray-200 p-3 text-gray-500 font-semibold px-5 rounded-xl shadow-xl">
            <h1>Breakfast</h1>
          </div>
          <div className="bg-gray-200 p-3 text-gray-500 font-semibold px-5 rounded-xl shadow-xl">
            <h1>Lunch</h1>
          </div>
          <div className="bg-gray-200 p-3 text-gray-500 font-semibold px-5 rounded-xl shadow-xl">
            <h1>Dinner</h1>
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-200px)]">
          <div className="grid grid-cols-2 gap-5 m-2 ">
            {user && user.food && user.food.map((foodItem, index) => (
              <button onClick={()=>{foodEdit(user._id,index)}}><div key={index} className=" shadow-2xl rounded-xl">
                <img src={foodItem.foodimage} className="w-full h-40 rounded-t-xl" alt={foodItem.foodname} />
                <div className="p-3 flex flex-col justify-center">
                  <p className="text-black text-xl font-bold">{foodItem.foodname}</p>
                  <p className="text-gray-500 text-sm">{foodItem.foodcategory}</p>
                  <p className="text-lg font-semibold text-gray-500"><span className="text-red-400 text-xs">Rs.</span>{foodItem.foodprice}</p>
                  {foodItem.foodstatus === "Available" ? (
                    <p className="text-green-600 text-sm">{foodItem.foodstatus}</p>
                  ) : (
                    <p className="text-red-600 text-sm">{foodItem.foodstatus}</p>
                  )}
                </div>
              </div></button>
            ))}
          </div>
        </div>
      </div>
      <div>
   {edit ? (
  <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm p-20">
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="flex bg-gray-50 w-fit m-2 rounded-xl">
        <div className="rounded-xl">
          <img
            src={user.food[index].foodimage}
            className="w-screen h-full mr-5 rounded-l-xl"
            alt="Food"
          />
        </div>
        <form className="flex flex-col flex gap-2 w-full m-5">
          <div className="flex justify-end">
            <button type="button" onClick={() => setEdit(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="red"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-bold">
              {user.food[index].foodname}
            </h1>
            <h1 className="text-gray-500 font-bold">
              <span className="text-red-500">Rs.</span>
              {user.food[index].foodprice}
            </h1>

            <div className="flex items-center mt-2">
              <button
                type="button"
                onClick={decreaseQuantity}
                className="bg-gray-200 px-2 py-1.5 rounded-l-lg focus:outline-none"
              >
                -
              </button>
              <input
                type="text"
                readOnly
                value={quantity}
                className="w-12 text-center bg-gray-100 px-2 py-1 border-t border-b focus:outline-none"
              />
              <button
                type="button"
                onClick={increaseQuantity}
                className="bg-gray-200 px-2 py-1.5 rounded-r-lg focus:outline-none"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setEdit(false)}
              className="bg-red-500 text-white rounded-lg px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={AddItem}
              className="bg-green-500 text-white rounded-lg px-4 py-2"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
) : (
  <div></div>
)}

  </div>

 
    </div>
  );
};

export default Userpage;
