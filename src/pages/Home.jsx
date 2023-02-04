import React from "react";
import '../scss/app.scss'
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaPreloader from "../components/PizzaBlock/PizzaPreloader";

function Home() {
    const [pizzaItems, setPizzaItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState({
        name: 'популярности', 
        sortBy: 'rating',
    });
    const [sortArrowToggle, setSortArrowToggle] = React.useState(true);

    React.useEffect( () => {
        setIsLoading(true);
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sortType.sortBy;
        const order = sortArrowToggle ? 'desc' : 'asc';
        fetch(`https://63c7e0cc075b3f3a91d4fb16.mockapi.io/pizzaItems?${category}&sortBy=${sortBy}&order=${order}`)
        .then( (response) => response.json() )
        .then( (json) => {
            setPizzaItems(json);
            setIsLoading(false);
        })
        window.scrollTo(0,0);
    }, [categoryId, sortType, sortArrowToggle]);
    return (
        <>
        <div className="content__top">
            <Categories activeIndex={categoryId} setActiveIndex={ (id) => setCategoryId(id)} />
            <Sort selectedSort={sortType} setSelectedSort={setSortType} sortArrowToggle={sortArrowToggle} setSortArrowToggle={setSortArrowToggle}/>
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