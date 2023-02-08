import React from "react";
import '../scss/app.scss'
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaPreloader from "../components/PizzaBlock/PizzaPreloader";
import Pagination from "../components/Pagination/Pagination";
import {SearchContext} from "../App";



function Home() {
    const {searchValue} = React.useContext(SearchContext);
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
        const search = searchValue ? `&search=${searchValue}` : '';
        fetch(`https://63c7e0cc075b3f3a91d4fb16.mockapi.io/pizzaItems?${category}${search}&sortBy=${sortBy}&order=${order}`)
        .then( (response) => response.json() )
        .then( (json) => {
            setPizzaItems(json);
            setIsLoading(false);
            
        })
       // window.scrollTo(0,0);
    }, [categoryId, sortType, sortArrowToggle, searchValue]);

    const skeletons = [...new Array(6)].map( (_, index) => <PizzaPreloader key={index} />);
    const items = pizzaItems
        //---filter(frontendSide)----
        // .filter( (pizzaItem) => {
        //     if(pizzaItem.title.toLowerCase().includes(searchValue.toLowerCase())) {
        //         return true;
        //     }
        // })
        //-----------------
        .map( (pizzaItem) => <PizzaBlock key={pizzaItem.id} {...pizzaItem} />);
    //---pagination(frontendSide)----
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pizzaItemsPerPage] = React.useState(8);
    const lastItemIndex = currentPage * pizzaItemsPerPage;
    const firstItemIndex = lastItemIndex - pizzaItemsPerPage;
    const displayedPizzaItems = items.slice(firstItemIndex, lastItemIndex);
    const lastPage = Math.ceil(pizzaItems.length / pizzaItemsPerPage);
    const setPage = pageNumber => {
        if(pageNumber > 0 && pageNumber <= lastPage){
            setCurrentPage(pageNumber);
        }
    }
    //-----------------
    return (
        <>
        <div className="content__top">
            <Categories activeIndex={categoryId} setActiveIndex={ (id) => setCategoryId(id)} setCurrentPage={setCurrentPage} />
            <Sort selectedSort={sortType} setSelectedSort={setSortType} sortArrowToggle={sortArrowToggle} setSortArrowToggle={setSortArrowToggle}/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
            {isLoading 
                ? skeletons
                : displayedPizzaItems.length > 0 ? displayedPizzaItems : 'Пиццы не найдены'
            }
        </div>
        <Pagination setPage={setPage} currentPage={currentPage} lastPage={lastPage}/>
        </>
    );
}

export default Home;