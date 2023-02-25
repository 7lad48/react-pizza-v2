import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import {setSortType, setOrder} from "../../redux/slices/filterSlice";
import styles from './Sort.module.scss';
const sortList = [
    { name: 'популярности', sortBy: 'rating', type: 'desc'},
    { name: 'цене', sortBy: 'price', type: 'desc'},
    { name: 'алфавиту', sortBy: 'title', type: 'asc'},
];

function Sort() {
    const dispatch = useDispatch();
    const sort = useSelector(state => state.filter.sort);
    const sortOrder = sort.type === 'desc';
    const [open, setOpen] = React.useState(false);

    const onSelectSortCategory = (sortItem) => {
        dispatch(setSortType(sortItem));
        setOpen(false);
    }
    const toggleArrow = () => {
        if(sortOrder){
            dispatch(setOrder('asc'));
        } else {
            dispatch(setOrder('desc'));
        }
    }
    return (
        <div className={styles.sort}>
            <div className={styles.sort__label}>
                <b>Сортировка по:</b>
                <span onClick={() => {setOpen(!open)}}>{sort.name}</span>
            </div>
            <div onClick={() => {toggleArrow()}} className={sortOrder ? styles.arrow : `${styles.arrow} ${styles.active}`}>
                    <svg width="10" height="7">
                            <path
                                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                                fill="#fe5f1e"
                            />
                    </svg>
            </div>
            {open && (
            <div className={styles.sort__popup}>
                <ul>
                    {
                        sortList.map((element, index) => {
                        return <li key={index} onClick={() => {onSelectSortCategory(element)}} className={sort.sortBy === element.sortBy ? 'active' : ''}>{element.name}</li>
                        })
                    }
                </ul>
            </div>
            )}
        </div>
    )
}

export default Sort;