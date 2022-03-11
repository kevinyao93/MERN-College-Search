import { useState, useEffect } from 'react';

import './SchoolTable.css';

function SchoolTable({schools}) {

    const TableRow = ({index, row, action}) => (
        <tr onClick={e => action(index)}>
            <td>{row.institution}</td>
        </tr>
    );

    function rowClicked(index) {
        console.log(index);
    }
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
