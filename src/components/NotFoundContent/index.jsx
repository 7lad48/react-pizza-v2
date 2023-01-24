import React from 'react';
import styles from './NotFoundContent.module.scss';

const NotFoundContent = () => {
    
    return (
        <div className={styles.content}>
            <h2 className={styles.title}>Корзина пустая <icon className={styles.icon}>😕</icon></h2>
            <p>Вероятней всего, вы не заказывали ещё пиццу.<br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
            <img src="" alt="Empty cart" />
        </div>
    )
}

export default NotFoundContent;

<div class="container container--cart">
                <div class="cart cart--empty">
                    <h2>Корзина пустая <icon>😕</icon></h2>
                    
                    <a href="/" class="button button--black">
                    <span>Вернуться назад</span>
                    </a>
                </div>
            </div>