import Image from "next/image"
import Link from "next/link"
import styles from "../styles/PizzaList.module.css"
const PizzaCard = ({pizza}) => {
    return (
        <div className={styles.container}>
            <Link href={`/product/${pizza._id}`} passHref>
              <Image src="/img/pizza.png" alt="" width="500" height="500"/>
            </Link>

           <h1 className={styles.title}>{pizza.title}</h1>
           <span className={styles.price}>${Number(pizza.prices)}</span>
           <p className={styles.desc}>
             {pizza.desc}
           </p>
        </div>
    )
}

export default PizzaCard
