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

function App({fetchSchoolsStartAsync, fetchProgramStartAsync, schools, programs}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSchools, setCurrentSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  function searchSchools(name) {
    const filtered = schools.filter(school => school.institution.toLowerCase().includes(name.toLowerCase()));
    setFilteredSchools(filtered);
  }
  console.log(modalOpen)
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
    setFilteredSchools(schools);
    setCurrentSchools(schools.slice(0, 20));
  }, [schools])

  const onPageChanged = useCallback((event, page) => {
    event.preventDefault()
    setCurrentPage(page);
  }, [setCurrentPage]);

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  return (
    <div className="App">
      <Header />
      <div className="schools-wrapper">
        <div className="modal_app">
          <button onClick={toggleModal}>Show modal</button>
          <Modal showModal={modalOpen} toggle={toggleModal} />
        </div>

        <input type="text" id="searchBar" onChange={e => searchSchools(e.target.value)} placeholder="Search for schools.."></input>
        <div className="table-wrapper">
          <SchoolTable 
            schools={currentSchools}
          />
        </div>
        <div className="pagination-wrapper">
          <Pagination 
            totalRecords={filteredSchools.length}
            pageLimit={20}
            onPageChanged={onPageChanged}
            currentPage={currentPage}
          />
        </div>
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

