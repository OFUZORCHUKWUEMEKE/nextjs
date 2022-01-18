import styles from "../styles/PizzaList.module.css"
import PizzaCard from "./PizzaCard"

const PizzaList = ({pizzaList}) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
            <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio iste excepturi accusamus sit porro nam? Voluptatibus harum hic tempore voluptas vero! Itaque repellat vel amet odio ex! Quae vel excepturi beatae rem earum quasi.
            </p>
            <div className={styles.wrapper}>
              {pizzaList.map((pizza)=>(
                  <PizzaCard pizza={pizza} key={pizza._id}/>
              ))}
            </div>
        </div>
    )
}

export default PizzaList
