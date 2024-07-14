import React, { useState, useEffect } from 'react';
import Bg from '../image/img1.png';
import Cheif from '../image/cheif.png';
import Burger from '../image/Burger.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Admin = () => {
  const navigate = useNavigate();
  const [chiefName, setChiefName] = useState("");
  const [chiefPass, setChiefPass] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [Edit, setEdit] = useState(false);
  const [Index, setIndex] = useState("0");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://navi-backend-rbza.onrender.com/users');
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.response ? err.response.data.message : "Network Error");
        console.log(err);
      }
    };

    fetchUser();
  }, []); // Fetch user data on component mount

  const handleBack = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleChiefAdd = async (e) => {
    e.preventDefault();
    if (!chiefName || !chiefPass) {
      alert("Please fill out all fields");
      return;
    }

    setLoading(true);
    const User = {
      chiefname: chiefName,
      chiefpassword: chiefPass
    };

    try {
      const res = await axios.put(`${import.meta.env.VITE_REACT_APP_URI}/chief/${user._id}`, User);
      alert(res.data.message);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert(err.message || "An error occurred");
    }
  };

  const handleFoodAdd = async (e) => {
    e.preventDefault();
    if (!foodName || !foodPrice || !foodCategory || !foodImage) {
      alert("Please fill out all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(`${import.meta.env.VITE_REACT_APP_URI}/food/${user._id}`, {
        foodname: foodName,
        foodprice: foodPrice,
        foodcategory: foodCategory,
        foodimage: foodImage
      });
      alert(res.data.message);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert(err.message || "An error occurred");
    }
  };

  const foodEdit = (id, index) => {
    setEdit(true);
    setIndex(index);

    const foodItem = user.food[index];
    setFoodName(foodItem.foodname);
    setFoodPrice(foodItem.foodprice);
    setFoodImage(foodItem.foodimage);
    setFoodCategory(foodItem.foodcategory);
  };

  const handleUpdateFood = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`${import.meta.env.VITE_REACT_APP_URI}/foodEdit/${user._id}`, {
        foodname: foodName,
        foodprice: foodPrice,
        foodcategory: foodCategory,
        foodimage: foodImage,
        index: Index // Pass index for updating specific food item
      });
      alert(res.data.message);
      setEdit(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async () => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_REACT_APP_URI}/fooddelete/${user._id}`, {
        index: Index // Pass index for deleting specific food item
      });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  const GenerateQr = () => {
    navigate('/qr');
  };

  return (
    <div className='bg-stone-200 min-h-screen overflow-x-hidden'>
      <div className='bg-red-500 w-screen'>
        <div className='pt-3 mx-5 pb-20 w-screen'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='head'>Puddy</h1>
            </div>
            <button onClick={GenerateQr}>
              <div className='mr-10 flex flex-col flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
                  <path fill-rule="evenodd" d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm-1.875 7.875c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Z"></path>
                </svg>
                <span>Generate QR</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-24 w-full'>
        <div className='flex-row'>
          <div className='m-5 p-5 rounded-2xl' style={{ backgroundColor: '#ededed' }}>
            <h1 className='text-xl font-bold'>Add Chief</h1>
            <form className='m-3'>
              <input type='text' onChange={(e) => setChiefName(e.target.value)} placeholder='Add chief name' className='border-2 border-gray-500 w-80 py-2 px-2 mt-1 mb-3 rounded-xl focus:outline-none' />
              <input type='password' onChange={(e) => setChiefPass(e.target.value)} placeholder='Add chief password' className='border-2 border-gray-500 w-80 py-2 px-2 mb-3 rounded-xl focus:outline-none' />
              <button onClick={handleChiefAdd} className='bg-green-500 text-white py-2 px-6 mb-3 rounded-3xl focus:outline-none'>Add</button>
            </form>
          </div>
          <div className='m-5 p-5 rounded-2xl' style={{ backgroundColor: '#ededed' }}>
            <h1 className='text-xl font-bold'>Add Food</h1>
            <form className='m-3'>
              <input type='text' onChange={(e) => setFoodName(e.target.value)} value={foodName} placeholder='Food name' className='border-2 border-gray-500 w-80 py-2 px-2 mt-1 mb-3 rounded-xl focus:outline-none' />
              <input type='number' onChange={(e) => setFoodPrice(e.target.value)} value={foodPrice} placeholder='Food price' className='border-2 border-gray-500 w-80 py-2 px-2 mb-3 rounded-xl focus:outline-none' />
              <input type='text' onChange={(e) => setFoodCategory(e.target.value)} value={foodCategory} placeholder='Food category' className='border-2 border-gray-500 w-80 py-2 px-2 mb-3 rounded-xl focus:outline-none' />
              <input type='url' onChange={(e) => setFoodImage(e.target.value)} value={foodImage} placeholder='Food image URL' className='border-2 border-gray-500 w-80 py-2 px-2 mb-3 rounded-xl focus:outline-none' />
              {Edit ? (
                <button onClick={handleUpdateFood} className='bg-yellow-500 text-white py-2 px-6 mb-3 rounded-3xl focus:outline-none'>Update</button>
              ) : (
                <button onClick={handleFoodAdd} className='bg-green-500 text-white py-2 px-6 mb-3 rounded-3xl focus:outline-none'>Add</button>
              )}
            </form>
          </div>
        </div>
        <div className='m-5 p-5 ml-10 rounded-2xl' style={{ backgroundColor: '#ededed' }}>
          <h1 className='text-xl font-bold'>All Chiefs</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {user &&
              user.chief.map((chief, index) => (
                <div key={index} className='bg-white rounded-xl shadow-md p-4 flex flex-col items-center'>
                  <img src={Cheif} alt='chief' className='w-20 h-20 rounded-full mb-2' />
                  <h3 className='text-lg font-bold'>{chief.chiefname}</h3>
                </div>
              ))}
          </div>
        </div>
        <div className='m-5 p-5 ml-10 rounded-2xl' style={{ backgroundColor: '#ededed' }}>
          <h1 className='text-xl font-bold'>All Foods</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {user &&
              user.food.map((food, index) => (
                <div key={index} className='bg-white rounded-xl shadow-md p-4 flex flex-col items-center'>
                  <img src={food.foodimage || Burger} alt='food' className='w-20 h-20 rounded-full mb-2' />
                  <h3 className='text-lg font-bold'>{food.foodname}</h3>
                  <p className='text-gray-500'>Price: ${food.foodprice}</p>
                  <div className='mt-2 flex'>
                    <button onClick={() => foodEdit(food._id, index)} className='bg-yellow-500 text-white py-1 px-4 mr-2 rounded-lg focus:outline-none'>Edit</button>
                    <button onClick={deleteFood} className='bg-red-500 text-white py-1 px-4 rounded-lg focus:outline-none'>Delete</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <button onClick={handleBack} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl mt-5 ml-96 focus:outline-none'>Back</button>
    </div>
  );
};

export default Admin;
