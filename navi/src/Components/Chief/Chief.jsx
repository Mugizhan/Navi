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
    const [foodStatus, setFoodStatus] = useState("");
    const [foodCategory, setFoodCategory] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [Edit, setEdit] = useState(false);
    const [Index, setIndex] = useState("0");
  
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
  
    useEffect(() => {
      fetchUser();
    }, []);
  
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
      try {
        const res = await axios.put(`${import.meta.env.VITE_REACT_APP_URI}/chief/${user._id}`, { chiefName, chiefPass });
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
      // if (!foodName || !foodPrice || !foodCategory || !foodImage || !foodStatus) {
      //   alert("Please fill out all fields");
      //   return;
      // }
  
      setLoading(true);
      try {
        const res = await axios.put(`${import.meta.env.VITE_REACT_APP_URI}/food/${user._id}`, { 
          foodname: foodName, 
          foodprice: foodPrice, 
          foodcategory: foodCategory, 
          foodstatus: foodStatus,
          foodimage: foodImage // Assuming foodImage is the URL
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
      setFoodStatus(foodItem.foodstatus);
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
          foodstatus: foodStatus,
          index: Index // Correctly passing the index
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
        const res = await axios.put(`${import.meta.env.VITE_REACT_APP_URI}/foodddelete/${user._id}`, {
          index: Index // Pass index in the request body
        });
        alert(res.data.message); // Alert success message
      } catch (err) {
        console.error(err); // Log any errors
        alert(err.response?.data?.message || "An error occurred"); // Alert error message
      }
    };  
    const Orders = () => {
    alert(user._id)
    navigate('/order', { state: { id: user._id,items: user.orders } });
  };

  return (
    <div className='bg-stone-200 min-h-screen overflow-x-hidden'>
      <div className='bg-red-500 w-screen'>
      <div className='pt-3 mx-5 pb-20 w-screen'>
        <div className='flex justify-between items-center'>
  <div> 
    
    <h1 className='head'>Puddy</h1>
  </div>
  <button onClick={Orders}>
  <div className='mr-10 flex flex-col flex items-center'>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="size-6">
  <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
  <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
</svg>


    <h1 className='text-white text-xs font-semibold'>Check Orders</h1>
  </div></button>
</div>

          <h2 className='text-white relative bottom-4 w-screen'>Order your Favourite food</h2>
          
          <div className='bg-white flex w-96 p-2 rounded-xl shadow-xl'>
            <div className='h-fit'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className='h-fit w-fit ml-5'>
              <input type='text' placeholder='Search' className='w-fit outline-transparent' />
            </div>
          </div>
          
        </div>

        <div className='h-screen bg-stone-200 h-fit rounded-t-2xl mt-2 flex flex-col'>
          <div className='flex justify-center'>
            <div>
              <img src={Bg} className='w-80 relative bottom-16 rounded-xl' alt="Background" />
            </div>
          </div>

    

          <div>
            <div className='flex flex-col m-5 h-fit flex gap-5'>
              <div className="flex mx-5">
                <div className="flex-1 mt-4">
                  <hr className="border-t border-gray-400" />
                </div>
                <div className="flex justify-center">
                  <span className="px-4 text-gray-400 text-lg">Product Entry</span>
                </div>
                <div className="flex-1 mt-4">
                  <hr className="border-t border-gray-400" />
                </div>
              </div>

              <div className='bg-white w-full py-5 rounded-xl shadow-xl flex'>
                <img src={Burger} className='w-28 h-40 mt-10 ml-5 mr-5 h-32 rounded-lg' alt="Briyani" />
                <form className='flex flex-col gap-3 w-fit' onSubmit={handleFoodAdd}>
                  <input
                    type='text'
                    placeholder='Food Name'
                    className='bg-stone-100 rounded-lg p-2 outline-transparent'
                    value={foodName}
                    onChange={e => setFoodName(e.target.value)}
                  />
                  <input
                    type='text'
                    placeholder='Food Price'
                    className='bg-stone-100 rounded-lg p-2 outline-transparent'
                    value={foodPrice}
                    onChange={e => setFoodPrice(e.target.value)}
                  />
                  <input
                    type='text'
                    placeholder='Image link'
                    className='bg-stone-100 ronded-lg p-2 outline-transparent'
                    value={foodImage}
                    onChange={e => setFoodImage(e.target.value)}
                  />
                  <select
                    className='bg-stone-100 rounded-lg p-2 outline-transparent text-gray-400 shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-500'
                    value={foodCategory}
                    onChange={e => setFoodCategory(e.target.value)}
                  >
                    <option value="" disabled>Choose a food category</option>
                    <option className="text-gray-800" value='breakfast'>Breakfast</option>
                    <option className="text-gray-800" value='lunch'>Lunch</option>
                    <option className="text-gray-800" value='dinner'>Dinner</option>
                  </select>
                  <input
                    type='submit'
                    value='Add'
                    className='bg-red-500 rounded-xl text-white p-2 outline-white'
                  />
                </form>
              </div>
            </div>
          </div>

          <div>
            <div className='flex flex-col m-5 h-fit flex gap-5'>
              <div className="flex mx-5">
                <div className="flex-1 mt-4">
                  <hr className="border-t border-gray-400" />
                </div>
                <div className="flex justify-center">
                  <span className="px-4 text-gray-400 text-lg">Product List</span>
                </div>
                <div className="flex-1 mt-4">
                  <hr className="border-t border-gray-400" />
                </div>
              </div>{/*product list*/}
              <div className='bg-white w-full py-5 rounded-xl shadow-xl flex'>
                <div className="px-4 text-gray-400 text-lg w-full flex flex-col flex gap-3"> 
                  <h1 className='text-black font-bold'>Food List</h1> 
                  <div>
                  <div className='mb-1'>
  {user && user.food && user.food.map((foodItem, index) => (
    <div key={index}  className='flex flex gap-5 bg-gradient-to-r from-slate-200 py-2 rounded-xl border shadow border-b-stone-200'>
      <div>
        <img src={foodItem.foodimage} className='w-16 h-16 rounded'/>
      </div>
      <div className='flex flex-col'>
        <p className='text-gray-500 text-xl font-bold'>{foodItem.foodname}</p>
        <p className='text-sm font-bold'><span className='text-red-400'>Rs.</span>{foodItem.foodprice}</p>
        <div>
  {foodItem.foodstatus === "Available" ? (
    <p className="text-green-600 text-sm">{foodItem.foodstatus}</p>
  ) : (
    <p className="text-red-600 text-sm">{foodItem.foodstatus}</p>
  )}
</div>

      </div>
      <div className='ml-auto flex items-center p-5'>
    {/* Move SVG here */}
    <button onClick={()=>{foodEdit(user._id,index)}}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
    </svg></button>
  </div>

    </div>
  ))}
 
</div>


</div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
     
      {
    Edit===false?<div></div>:<div>
      <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm p-20'>

        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm  flex justify-center items-center '>
        

          <div className='flex  bg-white w-fit m-2  rounded-xl'>
            <div classsName=' rounded-xl'>
            <img src={user.food[Index].foodimage} className='w-screen h-full  mr-5 rounded-l-xl' /></div>
        <form className='flex flex-col flex gap-2 w-full m-5'>
          <div className='flex justify-end '>
            <button onClick={()=>{setEdit(false)}}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
</button>
          </div>
          <input
                      type='text'
                      placeholder='Food Name'
                      className='bg-stone-100 rounded-lg p-2 outline-transparent'
                      value={foodName}
                      onChange={e => setFoodName(e.target.value)}
                    />
                    <input
                      type='text'
                      placeholder='Food Price'
                      className='bg-stone-100 rounded-lg p-2 outline-transparent'
                      value={foodPrice}
                      onChange={e => setFoodPrice(e.target.value)}
                    />
                    <input
                      type='text'
                      placeholder='Image link'
                      className='bg-stone-100 ronded-lg p-2 outline-transparent'
                      value={foodImage}
                      onChange={e => setFoodImage(e.target.value)}
                    />
                    <select
                      className='bg-stone-100 rounded-lg p-2 outline-transparent text-gray-400'
                      value={foodCategory}
                      onChange={e => setFoodCategory(e.target.value)}
                    >
                      <option selected>Category</option>
                    <option className="text-gray-800" value='breakfast'>Breakfast</option>
                    <option className="text-gray-800" value='lunch'>Lunch</option>
                    <option className="text-gray-800" value='dinner'>Dinner</option>
                    </select>
                        <select
                        className='bg-stone-100 rounded-lg p-2 outline-transparent text-gray-400'
                        value={foodStatus}
                        onChange={e => setFoodStatus(e.target.value)}
                        >
                        <option selected>Category</option>
                        <option className="text-gray-800 bg-green-200" value='Available'>Available</option>
                        <option className="text-gray-800 bg-red-200" value='Not Available'>Not Available</option>
        
                        </select>
                  
                  <div className='w-full flex gap-5'>
                  <input
        type="submit"
        value="Edit"
        onClick={handleUpdateFood}
        className="bg-green-500 rounded-xl shadow-xl text-white p-2 w-1/2 outline-white"
      />

                  <input
                    type='submit'
                    value='Delete'
                    className='bg-red-500 rounded-xl shadow-xl text-white p-2 w-1/2 outline-white'
                    onClick={deleteFood}
                  /></div>
                  
                </form>
                
        </div>
       
          </div>
        </div>
    </div>
  }
    </div>
  );
}

export default Admin;
