import { useState, useEffect } from 'react';

import './Pagination.css';


function Pagination({totalRecords, pageLimit, onPageChanged, currentPage}) {
    // Create a simple Pagination for a certain number of pages
    const [totalPages, setTotalPage] = useState(0);
    useEffect(() => {
        // Set the total number of pages depending on how many records are provided and how many elements each page should have.
        setTotalPage(Math.ceil(totalRecords / pageLimit))
    }, [pageLimit, totalRecords])

    // Create option to create a smaller number of pages with skipped elements.
    const range = (from, to, step = 1) => {
        let i = from;
        const range = [];

        while (i <= to) {
            range.push(i);
            i += step;
        }

        return range;
    };

    const pages = range(1, totalPages) || [];
    // Setup pages and add in functionality to navigate
    return (
        <nav aria-label="nav-pagination">
          <ul className="pagination">
            <li key={'previous'} className="page-item">
                <a
                    href="/"
                    className="page-link"
                    aria-label="Previous"
                    onClick={(e) => onPageChanged(e, currentPage > 1 ? currentPage - 1 : currentPage)}
                >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                </a>
            </li>
            {pages.map((page, index) => {   
              return (
                <li
                  key={index}
                  className={`page-item${currentPage === page ? " active" : ""}`}
                >
                  <a
                    className="page-link"
                    href="/"
                    onClick={(e) => onPageChanged(e, page)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
            <li key={'next'} className="page-item">
                <a
                    className="page-link"
                    href="/"
                    aria-label="Next"
                    onClick={(e) => onPageChanged(e, currentPage < totalPages ? currentPage + 1: currentPage)}
                >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                </a>
            </li>
          </ul>
        </nav>
    )
}

export default Pagination;
