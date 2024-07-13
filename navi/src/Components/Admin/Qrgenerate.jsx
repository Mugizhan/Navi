import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Bg from '../image/img1.png';

const Qrgenerate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState("");
    const [table, setTable] = useState("");
    const [user, setUser] = useState(null);
    const BASE_URL =import.meta.env.VITE_REACT_BASE_URL;

    const back = () => {
        setLoading(true);
        navigate('/admin');
        setLoading(false);
    };

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_URI}/users`);
            setUser(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const generateQr = async (e) => {
        e.preventDefault();
        setLoading(true);
        const id = user._id;
        try {
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(`${BASE_URL}/${id}/${table}`)}&size=150x150`;
            setImg(qrUrl);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);// Navigate to '/admin'
        }
    };
    
    
    

    const downloadQr = () => {
        fetch(img)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'qrcode.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className='bg-stone-200 min-h-screen overflow-x-hidden'>
            {loading && (
                <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
                    Wait please...
                </div>
            )}

            <div className='bg-red-500 w-screen'>
                <div className='pt-3 mx-5 pb-20 w-screen'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h1 className='head'>Puddy</h1>
                        </div>
                        <button onClick={back}>
                            <div className='mr-10 flex flex-col items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
                                    <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                </svg>
                                <h1 className='text-white text-xs'>Back</h1>
                            </div>
                        </button>
                    </div>
                    <h2 className='text-white relative bottom-4 w-screen'>Order your Favourite food</h2>
                </div>
                <div className='h-fit rounded-t-2xl flex flex-col items-center bg-stone-200'>
                    <img src={Bg} className='w-80 relative bottom-16 rounded-xl' alt="Background" />
                    <div className='flex flex-col items-center'>
                        <h1 className='text-lg font-bold text-gray-400'>QR GENERATOR</h1>
                        <div className='bg-white w-fit m-3 p-2 rounded-xl'>
                            <div className='rounded-xl'>
                                {img && <img src={img} className='w-full h-1/2 rounded' alt='Generated QR Code' />}
                            </div>
                            <form className='flex flex-col gap-5 m-5' onSubmit={generateQr}>
                                <input
                                    type='text'
                                    placeholder='Enter the table Number'
                                    className='bg-stone-100 rounded-lg p-2 outline-transparent'
                                    onChange={e => setTable(e.target.value)}
                                />
                                <input
                                    type="submit"
                                    value="Generate Qr"
                                    disabled={loading}
                                    className="bg-green-500 rounded-xl font-semibold shadow-xl text-white p-2 outline-white"
                                />
                                <input
                                    type='button'
                                    value='Download Qr'
                                    className='bg-red-500 rounded-xl shadow-xl font-semibold text-white p-2 outline-white'
                                    onClick={downloadQr}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Qrgenerate;
