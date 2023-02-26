import React from "react";
import debounce from 'lodash.debounce'
import styles from './Search.module.scss'
import {SearchContext} from "../../App";

function Search() {
    const [value,setValue] = React.useState('');
    const {setSearchValue} = React.useContext(SearchContext);
    const placeholder = 'Поиск пиццы ...';
    const inputRef = React.useRef();

    const onClearBtn = () =>{
        setValue('');
        setSearchValue('');
        inputRef.current.focus();
        //точно так же работает, если обернуть в label input и svg крестика)
    }
    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str);
        },600), [],
    );
    const onChangeInput = (event) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }
    return (
        <div className={styles.searchBox}>
            
                <svg className={`${styles.icon} ${styles.iconSearch}`} viewBox="0 0 50 50">
                    <path  d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/>
                </svg>
                <input ref={inputRef} value={value} onChange={onChangeInput} className={styles.input} placeholder={placeholder} />
                {value && <svg onClick={() => onClearBtn()} className={`${styles.icon} ${styles.iconClear}`} viewBox="0 0 20 19.84">
                    <path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z"/>
                </svg>}
            

        </div>
    );
}

export default Search;