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
  const [edit, setEdit] = useState(false); // Use camelCase for consistency
  const [editIndex, setEditIndex] = useState(null); // Store index as state
  const [editName, setEditFoodName] = useState(""); // Use camelCase for consistency
  const [editPrice, setEditFoodPrice] = useState(""); // Use camelCase for consistency
  const [editImage, setEditFoodImage] = useState(""); // Use camelCase for consistency
  const [editCategory, setEditFoodCategory] = useState(""); // Use camelCase for consistency

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_URI}/users`);
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
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
    const userData = {
      chiefname: chiefName,
      chiefpassword: chiefPass
    };

    try {
      const res = await axios.put(`${import.meta.env.VITE_REACT_APP_URI}/chief/${user?._id}`, userData);
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
      const res = await axios.put(`${import.meta.env.VITE_REACT_APP_URI}/food/${user?._id}`, {
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

  const foodEdit = (index) => {
    setEdit(true);
    setEditIndex(index);

    const foodItem = user?.food[index];
    setEditFoodName(foodItem.foodname);
    setEditFoodPrice(foodItem.foodprice);
    setEditFoodImage(foodItem.foodimage);
    setEditFoodCategory(foodItem.foodcategory);
  };

  const handleUpdateFood = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(`${import.meta.env.VITE_REACT_APP_URI}/foodEdit/${user?._id}`, {
        foodname: editName,
        foodprice: editPrice,
        foodcategory: editCategory,
        foodimage: editImage,
        index: editIndex
      });
      alert(res.data.message);
      setEdit(false);
      setEditIndex(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async () => {
    if (editIndex === null) {
      alert("No item selected to delete");
      return;
    }

    try {
      const res = await axios.put(`${import.meta.env.VITE_REACT_APP_URI}/fooddelete/${user?._id}`, {
        index: editIndex
      });
      alert(res.data.message);
      setEdit(false);
      setEditIndex(null);
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
                  <path fillRule="evenodd" d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm-1.125-2.25h6.75V11.25h-6.75v.75Zm6.75 1.5h-6.75v.75h6.75v-.75Zm-6.75 1.5h6.75v-.75h-6.75v.75Zm0 1.5h6.75v-.75h-6.75v.75Z"></path>
                </svg>
                <p className='text-white'>QR</p>
              </div>
            </button>
            <button onClick={handleBack}>
              <div className='flex flex-col items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
                  <path fillRule="evenodd" d="M4.154 11.883H18.31l-3.405 3.406a.94.94 0 1 0 1.33 1.33l5.14-5.14a.941.941 0 0 0 0-1.33l-5.14-5.14a.94.94 0 0 0-1.33 1.33l3.405 3.406H4.154a.94.94 0 0 0 0 1.883Z"></path>
                </svg>
                <p className='text-white'>Back</p>
              </div>
            </button>
          </div>
        </div>
        <div className='flex justify-between items-center p-20'>
          <div className='w-1/3 mx-10'>
            <div>
              <div className='w-72 h-72 bg-white rounded-lg shadow-xl border border-blue-500 overflow-hidden'>
                <img src={Cheif} alt='chief' className='w-full' />
              </div>
              <input
                type='text'
                className='text-center my-5 w-72 bg-transparent border-b-2 focus:outline-none'
                placeholder='Enter chiefname'
                value={chiefName}
                onChange={(e) => setChiefName(e.target.value)}
              />
              <input
                type='text'
                className='text-center my-5 w-72 bg-transparent border-b-2 focus:outline-none'
                placeholder='Enter chiefpassword'
                value={chiefPass}
                onChange={(e) => setChiefPass(e.target.value)}
              />
              <button
                onClick={handleChiefAdd}
                className='w-72 h-10 text-xl text-white bg-blue-500 rounded-lg shadow-xl border border-blue-500 focus:outline-none hover:bg-blue-700'>
                {loading ? "Loading..." : "Add Chief"}
              </button>
            </div>
          </div>
          <div className='w-1/3 mx-10'>
            <div className='w-72 h-72 bg-white rounded-lg shadow-xl border border-blue-500 overflow-hidden'>
              <img src={Burger} alt='burger' className='w-full' />
            </div>
            <input
              type='text'
              className='text-center my-5 w-72 bg-transparent border-b-2 focus:outline-none'
              placeholder='Enter foodname'
              value={edit ? editName : foodName} // Use editName when editing
              onChange={(e) => edit ? setEditFoodName(e.target.value) : setFoodName(e.target.value)} // Set state based on edit mode
            />
            <input
              type='text'
              className='text-center my-5 w-72 bg-transparent border-b-2 focus:outline-none'
              placeholder='Enter foodprice'
              value={edit ? editPrice : foodPrice} // Use editPrice when editing
              onChange={(e) => edit ? setEditFoodPrice(e.target.value) : setFoodPrice(e.target.value)} // Set state based on edit mode
            />
            <input
              type='text'
              className='text-center my-5 w-72 bg-transparent border-b-2 focus:outline-none'
              placeholder='Enter foodimage'
              value={edit ? editImage : foodImage} // Use editImage when editing
              onChange={(e) => edit ? setEditFoodImage(e.target.value) : setFoodImage(e.target.value)} // Set state based on edit mode
            />
            <input
              type='text'
              className='text-center my-5 w-72 bg-transparent border-b-2 focus:outline-none'
              placeholder='Enter foodcategory'
              value={edit ? editCategory : foodCategory} // Use editCategory when editing
              onChange={(e) => edit ? setEditFoodCategory(e.target.value) : setFoodCategory(e.target.value)} // Set state based on edit mode
            />
            {edit ? (
              <div className='flex space-x-4'>
                <button
                  onClick={handleUpdateFood}
                  className='w-36 h-10 text-xl text-white bg-blue-500 rounded-lg shadow-xl border border-blue-500 focus:outline-none hover:bg-blue-700'>
                  {loading ? "Loading..." : "Update"}
                </button>
                <button
                  onClick={() => { setEdit(false); setEditIndex(null); }}
                  className='w-36 h-10 text-xl text-white bg-red-500 rounded-lg shadow-xl border border-red-500 focus:outline-none hover:bg-red-700'>
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleFoodAdd}
                className='w-72 h-10 text-xl text-white bg-blue-500 rounded-lg shadow-xl border border-blue-500 focus:outline-none hover:bg-blue-700'>
                {loading ? "Loading..." : "Add Food"}
              </button>
            )}
          </div>
          <div className='w-1/3 mx-10'>
            <div className='w-72 h-72 bg-white rounded-lg shadow-xl border border-blue-500 overflow-hidden'>
              <img src={user?.food[editIndex]?.foodimage || ''} alt='food' className='w-full' /> {/* Display food image if available */}
            </div>
            <button
              onClick={deleteFood}
              className='w-72 h-10 text-xl text-white bg-red-500 rounded-lg shadow-xl border border-red-500 focus:outline-none hover:bg-red-700'>
              Delete
            </button>
            <div className='flex space-x-4'>
              {user?.food.map((item, index) => (
                <button
                  key={index}
                  onClick={() => foodEdit(index)}
                  className='w-36 h-10 text-xl text-white bg-blue-500 rounded-lg shadow-xl border border-blue-500 focus:outline-none hover:bg-blue-700'>
                  Edit
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
