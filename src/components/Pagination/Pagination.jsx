import React from 'react';
import styles from './Pagination.module.scss'

const Pagination = ({setPage, currentPage, lastPage}) => {
    const pageNumbers = [];
    for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i);
    }
    return (
        <>
        {pageNumbers.length > 1 && <div className={styles.pageItems}>
            <div onClick={() => setPage(currentPage - 1)} className={currentPage > 1 ? `${styles.btn} ${styles.btnPrev}` : `${styles.btn} ${styles.btnPrev} ${styles.btnDisabled}`}></div>
                {
                    pageNumbers.map((number, index) => (
                        
                        <div onClick={() => setPage(number)} key={number} className={currentPage === index+1 ? `${styles.pageItem} ${styles.active}` : `${styles.pageItem}`}>{number}</div>
                    ))
                }
            <div onClick={() => setPage(currentPage + 1)} className={currentPage !== lastPage ? `${styles.btn} ${styles.btnNext}` : `${styles.btn} ${styles.btnNext} ${styles.btnDisabled}`}></div>
        </div>}
        </>
    )
}
export default Pagination;