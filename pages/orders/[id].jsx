import axios from "axios";
import Image from "next/image";
import styles from "../../styles/Order.module.css";
const Order = ({order}) => {
     const status =   order.status
    const statusClass=(index)=>{
        if(index - status<1)return styles.done
        if(index - status==1)return styles.inProgress
        if(index - status > 1)return styles.undone
    }
    return (
        <div className={styles.container}>
            <div className={styles.left}>
             <div cla ssName={styles.row}>
                 <table className={styles.table}>
                <tr className={styles.tr}>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Address</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>
                        <span className={styles.id}>{order._id}</span>
                    </td>
                    <td>
                        <span className={styles.name}>
                           {order.customer}
                        </span>
                    </td>
                    <td>
                        <span className={styles.Address}>{order.address}</span>
                    </td>
                    <td>
                        <span className={styles.total}>{order.price}</span>
                    </td>
                    <td>
                        <span className={styles.total}>{order.total}</span>
                    </td>
                </tr>
              </table>
           </div>
                <div className={styles.row}>
                    <div className={statusClass(1)}>
                        <Image src="/img/paid.png" width={30} height={30} alt=""/>
                        <span>Payment</span>
                        <div className={styles.checkedIcon}>
                            <Image  className={styles.checkedIcon}  src="/img/checked.png" width ={20} height={20} />
                        </div>
                    </div>
                    <div className={statusClass(2)}>
                        <Image src="/img/bake.png" width={30} height={30} alt=""/>
                        <span>Preparing</span>
                        <div className={styles.checkedIcon}>
                            <Image  className={styles.checkedIcon}src="/img/checked.png" width ={20} height={20} />
                        </div>
                    </div>
                    <div className={statusClass(3)}>
                        <Image src="/img/bike.png" width={30} height={30} alt=""/>
                        <span>On The Way</span>
                        <div className={styles.checkedIcon}>
                            <Image className={styles.checkedIcon} src="/img/checked.png" width ={20} height={20} />
                        </div>
                    </div>
                    <div className={statusClass(4)}>
                        <Image src="/img/delivered.png" width={30} height={30} alt=""/>
                        <span>Delivered</span>
                        <div className={styles.checkedIcon}>
                            <Image className={styles.checkedIcon} src="/img/checked.png" width ={20} height={20} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
            <div className={styles.wrapper}>
                  <h2 className={styles.title}>CART TOTAL</h2>
                  <div className={styles.totalText}>
                      <b className={styles.totalTextTitle}>SubTotal:</b>${order.total}
                  </div>
                  <div className={styles.totalText}>
                      <b className={styles.totalTextTitle}>Discount:</b>${order.total}
                  </div>
                  <div className={styles.totalText}>
                      <b className={styles.totalTextTitle}>Total:</b>${order.total}
                  </div>
                  <button disabled className={styles.button}>Paid</button>
              </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({params})=>{
    const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`)
    return{
        props:{
            order : res.data
        }
    }
}

export default Order
