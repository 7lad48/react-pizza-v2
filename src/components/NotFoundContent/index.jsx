import React from 'react';
import styles from './NotFoundContent.module.scss';
import emptyImage from '../../assets/img/pizza-logo.svg';
const NotFoundContent = () => {

    return (<div className={styles.content}>
        <h2 className={styles.title}>Страница не найдена <span className={styles.icon}>😕</span></h2>
        <p className={styles.description}>Такой страницы не существует на этом сайте.</p>
        <img src={emptyImage} alt="not found logo"/>
    </div>)
}

export default NotFoundContent;