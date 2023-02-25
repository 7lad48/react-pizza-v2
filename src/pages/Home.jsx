import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from "../redux/slices/filterSlice";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import PizzaBlock from "../components/PizzaBlock";
import PizzaPreloader from "../components/PizzaBlock/PizzaPreloader";
import Pagination from "../components/Pagination/Pagination";
import {SearchContext} from "../App";

function Home() {
    const dispatch = useDispatch();
    const categoryId = useSelector(state => state.filter.categoryId);
    const sortType = useSelector(state => state.filter.sort);

    const {searchValue} = React.useContext(SearchContext);
    const [pizzaItems, setPizzaItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }
    
    React.useEffect( () => {
        setIsLoading(true);
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sortType.sortBy;
        const sortOrder = sortType.type === 'desc' ? 'desc' : 'asc';
        const search = searchValue ? `&search=${searchValue}` : '';
        fetch(`https://63c7e0cc075b3f3a91d4fb16.mockapi.io/pizzaItems?${category}${search}&sortBy=${sortBy}&order=${sortOrder}`)
        .then( (response) => response.json() )
        .then( (json) => {
            setPizzaItems(json);
            setIsLoading(false);
        })
       // window.scrollTo(0,0);
    }, [categoryId, sortType, searchValue]);

    const skeletons = [...new Array(6)].map( (_, index) => <PizzaPreloader key={index} />);
    const items = pizzaItems
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
            <Categories activeIndex={categoryId} setActiveIndex={onChangeCategory} setCurrentPage={setCurrentPage} />
            <Sort />
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