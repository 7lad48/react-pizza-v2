import React from "react";
const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

function Categories({activeIndex, setActiveIndex, setCurrentPage}) {
    const setCategory = (index) => {
        setActiveIndex(index)
        setCurrentPage(1);
    }
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, index) => {
                        return <li key={index} onClick={() => setCategory(index)} className={activeIndex === index ? 'active' : ''}>{category}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default Categories;
