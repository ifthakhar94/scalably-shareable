import { NextIcon, PrevIcon } from '@/custom-icons/CustomIcons';
import Styles from './TablePagination.module.css';

const TablePagination = () => {
  return (
    <>
      <div className={Styles.tablePagination}>
        <div className="pagination_range">
          <span className={Styles.start_range}> 1 </span> - <span className={Styles.end_range}> 5 </span> of
          <span className={Styles.total_pages}> 50 </span> 件中
        </div>
        <div className="pagination_icons">
          <span className={Styles.prev_icon}>
            <PrevIcon />
          </span>
          <span className={Styles.next_icon}>
            <NextIcon />
          </span>
        </div>
      </div>
    </>
  );
};

export default TablePagination;
