import React from "react";

function Categories({categoryId}) {
    console.log(categoryId);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((category, index) => {
                        return <li key={index} onClick={() => setActiveIndex(index)} className={activeIndex === index ? 'active' : ''}>{category}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default Categories;
