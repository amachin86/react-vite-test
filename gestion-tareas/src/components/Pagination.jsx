import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ tasksPerPage, totalTasks, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <MuiPagination 
            count={pageNumbers.length} 
            onChange={(event, value) => paginate(value)} 
            color="primary" 
        />
    );
};

export default Pagination;