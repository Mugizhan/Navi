import {useState} from 'react';
import Breakfast from './image/Breakfast.png';
import Lunch from './image/Lunch.png';
import Dinner from './image/Dinner.png';

const Home = () => {

const [i,seti]=useState(0)
 
  const Plus=()=>{
  seti(i+1)
  if(i>=2){
    seti(0)
  }
  }
  const Minus=()=>{
    seti(i-1)
    if(i==0){
      seti(2)
    }

  }

const Handle=(data)=>{
  alert(data)

}


  return (
    <div>
      <div className='flex justify-center'>
        <div className='mt-20 flex flex-col'>
          <div>
            <h1 className='flex justify-center text-4xl mt-10 font-bold text-yellow-500'>
              <span className="text-xl text-white">Starts @</span>{data[i].price} ₹
            </h1>
          </div>
          <div className='flex  justify-center flex flex-col '>
           <div className='flex'>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" onClick={Minus} viewBox="0 0 24 24" fill="orange" class="size-6">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clip-rule="evenodd" />
</svg>
</div>
            <div className="w-80 relative bottom-15">
              <img src={data[i].img} alt="Breakfast" />
            </div>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={Plus}  viewBox="0 0 24 24" fill="orange" class="size-6">
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clip-rule="evenodd" />
</svg>

            </div>
            </div>
          </div>
          <div className='flex justify-end ml-5 '>
            <div>
              <h1 className='text-2xl flex justify-end text-yellow-500 tracking-wide font-bold'>
              {data[i].name}
              
              </h1>
              
             
            
              <div className='w-52 mt-3 mb-10'>
              <p className='text-white text-right font-light  text-base'>
                {data[i].description}
               <br/> <input type="submit" className=' bg-gradient-to-r from-yellow-400 to-orange-400 px-10 p-2 mt-5 rounded-full font-bold text-black' onClick={()=>{Handle(data[i].name)}} value="ORDER"/>
              </p>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const data=[
  {
    name:'Breakfast',
    img:Breakfast,
    description:'Start your day right: Fresh, fluffy idly, crispy dosa, savory pongal, and delightful poori await you',
    price:3.50
  },
  {
    name:'Lunch',
    img:Lunch,
    description:'Elevate your lunch: Aromatic biryani, spicy sambar, tangy rasam, and creamy curd rice await you!',
    price:100.50
  },
  {
    name:'Dinner',
    img:Dinner,
    description:'Unwind with dinner: Flavorful dosas, hearty uttapams, fluffy parotta, and soft chapatis await you!',
    price:10.50
  }
]

export default Home;
