import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Order = () => {
  const location = useLocation();
  const { items: initialItems = [], id = '' } = location.state || {};
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);

  const handleDeleteItem = async (orderIndex) => {
    try {
      setLoading(true);
      const res = await axios.put(`${import.meta.env.VITE_REACT_APP_URI}/deleteorders/${id}`, { orderIndex });

      if (res.data.message === 'Order deleted successfully') {
        setItems((prevItems) => prevItems.filter((_, index) => index !== orderIndex));
      }

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
      <div className="m-4 mt-5 flex flex-col gap-6">
        <div>
          <h1 className="head"><span className="text-black font-bold">Puddy's</span></h1>
          <p className="relative bottom-3 italic text-xl">Cart</p>
        </div>
        <div className="flex flex-col gap-5">
          {items.length > 0 ? (
            items.map((order, orderIndex) => (
              order && (
                <div key={orderIndex} className="p-4 bg-white shadow rounded">
                  <p className="mb-2">Table: {order.table}</p>
                  {order.orderItems && order.orderItems.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border rounded-lg shadow-lg">
                        <thead className="bg-gray-800 text-white">
                          <tr>
                            <th className="px-4 py-2">Food Name</th>
                            <th className="px-4 py-2">Quantity</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700">
                          {order.orderItems.map((item, itemIndex) => (
                            <tr key={itemIndex} className="bg-gray-100">
                              <td className="border px-4 py-2">{item.foodname}</td>
                              <td className="border px-4 py-2">{item.foodQuantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button
                        className="bg-red-500 hover:bg-green-600 text-white py-1 px-3 rounded-md mt-2"
                        onClick={() => handleDeleteItem(orderIndex)}
                        disabled={loading}
                      >
                        {loading ? 'Delivering...' : 'Oreder Placed'}
                      </button>
                    </div>
                  ) : (
                    <p>No order...</p>
                  )}
                </div>
              )
            ))
          ) : (
            <p>No order...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
