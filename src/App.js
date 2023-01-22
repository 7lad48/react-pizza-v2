import React from "react";

import './scss/app.scss'
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Sort from "./components/Sort/Sort";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";


function App() {
    const [pizzaItems, setPizzaItems] = React.useState([]);
    React.useEffect( () => {
        fetch('https://63c7e0cc075b3f3a91d4fb16.mockapi.io/pizzaItems')
        .then( (response) => response.json() )
        .then( (json) => setPizzaItems(json) )
    }, []);
    return (
        <div className="wrapper">
        <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {
                            pizzaItems.map((pizzaItem) => {
                                return <PizzaBlock key={pizzaItem.id} {...pizzaItem} />
                            })
                        }
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
