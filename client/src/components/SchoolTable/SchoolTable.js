import './SchoolTable.css';

function SchoolTable({schools, rowClicked, selectedRow}) {
    // Sunoke table returning a list of mapped schools
    const TableRow = ({index, row, action}) => (
        <tr className={selectedRow === index ? "selected" : ""} onClick={e => action(index)}>
            <td>{row.institution}</td>
        </tr>
    );

    return (
        <table id="schoolTable">
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
