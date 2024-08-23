import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
// import { useNavigate } from 'react-router-dom'
export default function Card(props) {
  // let navigate = useNavigate()
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  // let foodItem = props.item;
  const [qty, setqty] = useState(1)
  const [size, setsize] = useState("")

  // const handleClick = () => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/login")
  //   }
  // }
  // const handleqty = (e) => {
  //   setqty(e.target.value);
  // }
  // const handleOptions = (e) => {
  //   setsize(e.target.value);
  // }
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem.id) {
        food = item;

        break;
      }
    }
    // console.log(food)
    // console.log(new Date())
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id,   price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size:size })
      return
      }
      return
    }
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size:size })  
  }
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setsize(priceRef.current.value)
  }, [])
  
  return (
    <div>
      <div>
        <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "400px " }}>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "170px", objectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100"></div>
            <select className='m-2 h-100  bg-success rounded' onChange={(e) => setqty(e.target.value)}>
              {
                Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                  )
                })
              }
            </select>
            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setsize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <div className="d-inline h-100 fs-5 ">
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <button
            className="btn btn-success rounded-pill my-3 d-block mx-auto"
            style={{ width: '50%' }}
            onClick={handleAddToCart}>
            Add To Cart
          </button>                
          </div>
      </div>
    </div>
  )
            }
          

