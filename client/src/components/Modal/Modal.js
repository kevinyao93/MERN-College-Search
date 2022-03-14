import React, {useState, useEffect} from "react";

import './Modal.css';

// Modal for filtering and changing all the values
function Modal({showModal, toggle, schools, highest_degree, locale, carnegie, setFilteredSchools}) {
    // Initialize default options for the filter
    const defaultOptions = {
        sortingDirection: true,
        excludedDegrees: [],
        excludedCarnegie: [],
        excludedLocales: [],
    }
    const [filterOptions, setFilterOptions] = useState(defaultOptions);

    useEffect(() => {
        // Check the filter options and filter the schools depending on the values
        let filteredSchools = schools.filter((school) => {
            if (filterOptions.excludedDegrees.includes(school.highest_degree)) return false;
            if (filterOptions.excludedCarnegie.includes(school.ccsizset)) return false;
            if (filterOptions.excludedLocales.includes(school.locale)) return false;
            return true;
        })
        // Sort the schools depending on the input
        if (filterOptions.sortingDirection) {
            filteredSchools.sort((a, b) => {
                let fa = a.institution.toLowerCase(),
                    fb = b.institution.toLowerCase();
        
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
        } else {
            filteredSchools.sort((a, b) => {
                let fa = a.institution.toLowerCase(),
                    fb = b.institution.toLowerCase();
        
                if (fa > fb) {
                    return -1;
                }
                if (fa < fb) {
                    return 1;
                }
                return 0;
            });
        }
        setFilteredSchools(filteredSchools);
    }, [schools, filterOptions])

    function toggleCheckBox(target, value) {
        // Flip the value within the options depending on the check box
        const index = filterOptions[target].indexOf(parseInt(value));
        let updatedOptions = filterOptions
        if (index !== -1) {
            updatedOptions[target].splice(index, 1);
        } else {
            updatedOptions[target].push(parseInt(value));
        }
        setFilterOptions({...updatedOptions});
    }

    // Setup the layout for the modal
    return(
        <>
            <div className={showModal ? "overlay" : "hide"} onClick={toggle} />      
            <div className={showModal ? "modal" : "hide"}>
                <button onClick={toggle}>X</button>
                <h1>Filter/Sort</h1>
                <form>
                    <div className="form-group">
                        <div className="half_col">
                            <div>
                                <label className="modal_label">Sort Direction: </label>
                                <select 
                                    onChange={e => setFilterOptions({...filterOptions, sortingDirection:e.target.value === 'true'})} 
                                    className="form-control" 
                                    value={filterOptions.sortingDirection}
                                >
                                    <option value={true}>A-Z</option>
                                    <option value={false}>Z-A</option>
                                </select>
                            </div>
                            <br />
                            <label className="modal_label">Highest Degree: </label>
                            <br />
                            {Object.keys(highest_degree).map((degree, index) => {
                                return (
                                    <div key={index}>
                                        <label>{highest_degree[degree]}: </label>
                                        <input
                                            type="checkbox"
                                            checked={!filterOptions.excludedDegrees.includes(parseInt(degree))}
                                            onChange={e => toggleCheckBox("excludedDegrees", degree)} />
                                    </div>
                                )
                            })}
                            <br/>
                            <label className="modal_label">Locale: </label>
                            {Object.keys(locale).map((l_value, index) => {
                                return (
                                    <div key={index}>
                                        <label>{locale[l_value].abbr}: </label>
                                        <input
                                            type="checkbox"
                                            checked={!filterOptions.excludedLocales.includes(parseInt(l_value))}
                                            onChange={e => toggleCheckBox("excludedLocales", l_value)} />
                                    </div>
                                )
                            })}
                        </div>


                        <div className="half_col">
                            <label className="modal_label">Carnegie Classification: </label>
                            {Object.keys(carnegie).map((c_value, index) => {
                                return (
                                    <div key={index}>
                                        <label>{carnegie[c_value]}: </label>
                                        <input
                                            type="checkbox"
                                            checked={!filterOptions.excludedCarnegie.includes(parseInt(c_value))}
                                            onChange={e => toggleCheckBox("excludedCarnegie", c_value)} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );


}

export default Modal;