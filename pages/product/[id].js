import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import styles from "../../styles/Product.module.css";
const Product = ({pizza}) => {
    const [price,setPrice] = useState(pizza.prices)
     
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [extras, setExtras] = useState([]);
    const dispatch = useDispatch()
    const changePrice = (number) => {
        setPrice(price + number);
      };
    
      const handleSize = (sizeIndex) => {
        const difference = pizza.prices[sizeIndex] - pizza.prices[size];
        setSize(sizeIndex);
        changePrice(difference);
      };

      
  const handleChange = (e, option) => {
    const checked = e.target.checked; 

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };
  const handleClick = ()=>{
      dispatch(addProduct({pizza,extras,price,quantity} ))
  }
  console.log(extras)

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={pizza.img} layout="fill" />
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>{pizza.title}</h1>
                <span className={styles.price}>${Number(pizza.prices)}</span>
                <p className={styles.desc}>{pizza.desc}</p>
                <h3 className={styles.choose}>Choose the size</h3>
                <div className={styles.sizes}>
                    <div className={styles.size}onClick={() => handleSize(0)}>
                        <Image src="/img/size.png" layout="fill" />
                        <span className={styles.number}>small</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(1)}>
                        <Image src="/img/size.png" layout="fill" />
                        <span className={styles.number}>medium</span>
                    </div>
                    <div className={styles.size}   onClick={() => handleSize(2)}>
                        <Image src="/img/size.png" layout="fill" />
                        <span className={styles.number}>large</span>
                    </div>
                </div>
                <h3 className={styles.choose}>Choose additional ingredients</h3>
                <div className={styles.ingredients}>
                    {pizza.extraOptions.map((options)=>(
                           <div className={styles.option}>
                              <input type="checkbox" id="double" className={styles.checkbox}  onChange={(e) => handleChange(e, options)}/>
                              <label htmlFor={options.text} name={options.text}>{options.text}</label>
                            </div>
                                       
                    ))}

                </div>
                <div className={styles.add}>
                    <input type="number" defaultValue={1} className={styles.qauntity}   onChange={(e) => setQuantity(e.target.value)}/>
                    <button className={styles.button} onClick={handleClick}>Add To Cart</button>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({params})=>{
    const res = await axios.get(`http://localhost:3000/api/products/${params.id}`)
    return{
        props:{
            pizza : res.data
        }
    }
}

export default Product   
