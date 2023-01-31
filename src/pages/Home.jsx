import React from "react";
import '../scss/app.scss'
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaPreloader from "../components/PizzaBlock/PizzaPreloader";
const itemsLink = 'https://63c7e0cc075b3f3a91d4fb16.mockapi.io/pizzaItems';

function Home() {
    const [pizzaItems, setPizzaItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState(0);

    React.useEffect( () => {
        fetch(itemsLink)
        .then( (response) => response.json() )
        .then( (json) => {
            setPizzaItems(json);
            setIsLoading(false);
        })
        window.scrollTo(0,0);
    }, []);
    return (
        <>
        <div className="content__top">
            <Categories activeIndex={categoryId} setActiveIndex={ (id) => setCategoryId(id)} />
            <Sort selectedSort={sortType} setSelectedSort={setSortType} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
            {isLoading 
                ? [...new Array(6)].map( (_, index) => <PizzaPreloader key={index} /> ) 
                : pizzaItems.map( (pizzaItem) => <PizzaBlock key={pizzaItem.id} {...pizzaItem} /> )
            }
        </div>
        </>
    );
}

export default Home;