import styles from '../page.module.scss';

interface PageNavigationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    incidentsLength: number;
}
export default function PageNavigation({currentPage, totalPages, incidentsLength, setCurrentPage}: PageNavigationProps) {
    return(
        <div className={styles.pagination}>
            <div className={styles.info}>
            Page {currentPage} of {totalPages} ({incidentsLength} total)
            </div>
            <div className={styles.controls}>
            <button
                className={styles.button}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}>
                Previous
            </button>
            <button
                className={styles.button}
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}>
                Next
            </button>
            </div>
        </div>
    );
  };