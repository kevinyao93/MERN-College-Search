import { useState, useEffect } from 'react';

import './SchoolTable.css';

function SchoolTable({schools, rowClicked}) {

    const TableRow = ({index, row, action}) => (
        <tr onClick={e => action(index)}>
            <td>{row.institution}</td>
        </tr>
    );

    return (
        <table id="myTable">
            <tbody>
                {schools.map((school, index) =>  {
                    return (
                        <TableRow key={index} index={index} row={school} action={rowClicked}/>
                    );
                })}
            </tbody>
        </table> 
    );
}

export default SchoolTable;
