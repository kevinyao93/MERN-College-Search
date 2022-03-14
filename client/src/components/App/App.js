import Header from '../Header/Header'
import './App.css';

import {useState, useCallback} from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSchools } from "../../redux/schools/schools.selector";
import { selectPrograms } from "../../redux/programs/programs.selector";

import { fetchSchoolsStartAsync } from "../../redux/schools/schools.actions";
import { fetchProgramStartAsync } from "../../redux/programs/programs.actions";

import React, { useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import SchoolTable from '../SchoolTable/SchoolTable';
import Modal from '../Modal/Modal';
import Details from '../Details/Details';

const highest_degree = {
  0: "Non-degree-granting",
  1: "Certificate Degree",
  2: "Associate Degree",
  3: "Bachelor's Degree",
  4: "Graduate Degree"
}

const locale = {
  11: {abbr:"City: Large", description: "City: Large (population of 250,000 or more)"},
  12: {abbr: "City: Midsize", description: "City: Midsize (population of at least 100,000 but less than 250,000)"},
  13: {abbr: "City: Small", description: "City: Small (population less than 100,000)"},
  21: {abbr: "Suburb: Large", description: "Suburb: Large (outside principal city, in urbanized area with population of 250,000 or more)"},
  22: {abbr: "Suburb: Midsize", description: "Suburb: Midsize (outside principal city, in urbanized area with population of at least 100,000 but less than 250,000)"},
  23: {abbr: "Subrb: Smaller", description: "Suburb: Small (outside principal city, in urbanized area with population less than 100,000)"},
  31: {abbr: "Town: Fringe", description: "Town: Fringe (in urban cluster up to 10 miles from an urbanized area)"},
  32: {abbr: "Town: Distant", description: "Town: Distant (in urban cluster more than 10 miles and up to 35 miles from an urbanized area)"},
  33: {abbr: "Town: Remote", description: "Town: Remote (in urban cluster more than 35 miles from an urbanized area)"},
  41: {abbr: "Rural: Fringe", description: "Rural: Fringe (rural territory up to 5 miles from an urbanized area or up to 2.5 miles from an urban cluster)"},
  42: {abbr: "Rural: Fringe", description: "Rural: Distant (rural territory more than 5 miles but up to 25 miles from an urbanized area or more than 2.5 and up to 10 miles from an urban cluster)"},
  43: {abbr: "Rural: Remote", description: "Rural: Remote (rural territory more than 25 miles from an urbanized area and more than 10 miles from an urban cluster)"},
}

const carnegie = {
  0: "Not classified",
  1: "Two-year, very small",
  2: "Two-year, small",
  3: "Two-year, medium",
  4: "Two-year, large",
  5: "Two-year, very large",
  6: "Four-year, very small, primarily nonresidential",
  7: "Four-year, very small, primarily residential",
  8: "Four-year, very small, highly residential",
  9: "Four-year, small, primarily nonresidential",
  10: "Four-year, small, primarily residential",
  11: "Four-year, small, highly residential",
  12: "Four-year, medium, primarily nonresidential",
  13: "Four-year, medium, primarily residential",
  14: "Four-year, medium, highly residential",
  15: "Four-year, large, primarily nonresidential",
  16: "Four-year, large, primarily residential",
  17: "Four-year, large, highly residential",
  18: "Exclusively graduate/professional",
}

function App({fetchSchoolsStartAsync, fetchProgramStartAsync, schools, programs}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [searchedSchools, setSearchedSchools] = useState([]);
  const [currentSchools, setCurrentSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState({});
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    fetchSchoolsStartAsync();
    fetchProgramStartAsync();
  }, [fetchSchoolsStartAsync, fetchProgramStartAsync]);

  useEffect(() => {
    let start = (currentPage - 1) * 20;
    let end = currentPage * 20;
    setCurrentSchools(schools.slice(start, end));
  }, [currentPage])

  useEffect(() => {
    setSearchedSchools(schools);
  }, [schools])

  useEffect(() => {
    console.log(filteredSchools);
    setSearchedSchools(filteredSchools);
  }, [filteredSchools])

  useEffect(() => {
    setCurrentSchools(searchedSchools.slice(0, 20));
  }, [searchedSchools])

  useEffect(() => {
    setSelectedSchool(currentSchools[0]);
  }, [currentSchools])

  const onPageChanged = useCallback((event, page) => {
    event.preventDefault()
    setCurrentPage(page);
  }, [setCurrentPage]);

  function searchSchools(name) {
    const filtered = schools.filter(school => school.institution.toLowerCase().includes(name.toLowerCase()));
    setSearchedSchools(filtered);
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function rowClicked(index) {
    setSelectedSchool(currentSchools[index]);
  }

  return (
    <div className="App">
      <Header />
      <div className="schools-wrapper">
        <div className="modal_app">
          <button id="filterButton" onClick={toggleModal}>Filter/Sort</button>
          <Modal 
            showModal={modalOpen} 
            toggle={toggleModal} 
            schools={schools}
            highest_degree={highest_degree}
            locale={locale}
            carnegie={carnegie}
            setFilteredSchools={setFilteredSchools} />
        </div>

        <input type="text" id="searchBar" onChange={e => searchSchools(e.target.value)} placeholder="Search for schools.."></input>
        <div className="table-wrapper">
          <SchoolTable 
            schools={currentSchools}
            rowClicked={rowClicked}
          />
        </div>
        <div className="details-wrapper">
          <Details 
            selectedSchool={selectedSchool}
            programs={programs}
            highest_degree={highest_degree}
            locale={locale}
            carnegie={carnegie}
          />
        </div>
        {searchedSchools.length > 0 &&
          <div className="pagination-wrapper">
            <Pagination 
              totalRecords={searchedSchools.length}
              pageLimit={20}
              onPageChanged={onPageChanged}
              currentPage={currentPage}
            />
          </div>
        }
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  schools: selectSchools,
  programs: selectPrograms,
});

const mapDispatchToProps = dispatch => ({
  fetchSchoolsStartAsync: () => dispatch(fetchSchoolsStartAsync()),
  fetchProgramStartAsync: () => dispatch(fetchProgramStartAsync()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

