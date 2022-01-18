import Image from "next/image";
import styles from "../styles/Cart.module.css";
import {useSelector,useDispatch} from 'react-redux'
import { useState } from "react";
import { useRouter } from "next/router";
import OrderDetail from "../components/OrderDetail";
import axios from "axios";
import { reset } from "../redux/cartSlice";


const Cart = () => {
    const [open, setOpen] = useState(false);
    const [cash, setCash] = useState(false);
    const cart = useSelector(state=>state.cart)
    console.log(cart)
    const amount  = cart.total
    const dispatch = useDispatch();
    const router = useRouter();   

    const createOrder = async (data)=>{
      try{
        const res = await axios.post("http://localhost:3000/api/orders",data)
        if(res.status===201){
          dispatch(reset())
          router.push(`/orders/${res.data._id}`)
        }
      }catch(err){
        console.log(err)
      }
    }
    return (
        <div className={styles.container}>
          <div className={styles.left}>
            <table className={styles.table}>
                <tr className={styles.trtitle}>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Extras</th>
                    <th>Price</th>
                    <th>Quantity</th>
                     <th>Total</th>
                </tr>
                {cart.product.map((product,index)=>(
                         <tr className={styles.tr} key={product.pizza._id}>
                         <td>
                             <div className={styles.imgContainer}>
                                 <Image src={product.pizza.img}
                                  layout="fill"
                                  objectFit="cover"
                                  alt=""
                                 />
                             </div>
                         </td>
                         <td>
                             <span className={styles.name}>{product.pizza.title}</span>
                         </td>
                         <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                  </td>
                  <td>
                    <span className={styles.price}>${product.price}</span>
                  </td>
                  <td>
                    <span className={styles.quantity}>{product.quantity}</span>
                  </td>
                  <td>
                  <span className={styles.total}>
                    ${product.price * product.quantity}
                  </span>
                  </td>
              </tr>
            ))}
                
         </table>
        </div>
          <div className={styles.right}>
              <div className={styles.wrapper}>
                  <h2 className={styles.title}>CART TOTAL</h2>
                  <div className={styles.totalText}>
                      <b className={styles.totalTextTitle}>SubTotal:</b>{cart.total}
                  </div>
                  <div className={styles.totalText}>
                      <b className={styles.totalTextTitle}>Discount:</b>$
                  </div>
                  <div className={styles.totalText}>
                      <b className={styles.totalTextTitle}>Total:</b>{cart.total}
                  </div>
                  {open? (
                    <div className={styles.paymentMethods}>
                       <button className={styles.paybutton} onClick={()=>setCash(true)}>CASH ON DELIVERY</button>
                    </div>
                 
                  ):(
                    <button onClick={()=>setOpen(true)} className={styles.button}>CHECKOUT NOW!</button>
                  )}
                  
              </div>
          </div>
          {cash && (
            <OrderDetail total={cart.total} createOrder={createOrder}/>
          )}
        </div>
    )  
}

export default Cart
