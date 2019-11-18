import React, { useState, useEffect } from 'react';

import searchIcon from '../assets/icons/searchIcon.svg';

const search = React.memo(props => {
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let searchTermTimer = setTimeout(()=> {
      // props.searchTerm(searchTerm.toLocaleLowerCase());
    },1500);
    return () => {
      clearTimeout(searchTerm)
    };
  }, [searchTerm]);
  

  const handleSearchTerm = e => {
    setSearchTerm(e.currentTarget.value);
  }

  const handleSort = e => {
    props.order(e.currentTarget.value);
  }


  return(
  <div className={`container ${props.hideSort ? "onlySearch": ""}`}>
    <div className="searchInputContainer">
      <img className="searchIcon" src={searchIcon} alt="search icon"/>
      <input
        className="searchInput"
        placeholder={props.placeholder}
        type="text"
        value={searchTerm}
        onChange={handleSearchTerm} 
        />
    </div>
    {props.hideSort ? null :
    <select
      className="selectInput"
      name="ordenar"
      id="sort"
      onChange={handleSort} 
      defaultValue=""
      >
      <option value="">Ordenar</option>
      <option value="ascending">Ordem Alfabética Crescente</option>
      <option value="descending">Ordem Alfabética Decrescente</option>
      {props.activeSection === 'channels' ? <option value="byDate">Mais Recente</option> : null}
    </select>}
    <style jsx>{`
    .container{
      margin: 20px auto;
      width: 100%;
      max-width: 80%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    @media only screen and (min-width: 875px) { 
      .container{
        margin: 50px auto 0 auto;
      }
    }
    .searchInput, .selectInput{
      margin-bottom: 20px;
      box-sizing: border-box;
      box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.1);
      background-color: #ebebeb;
      border: none;
      padding: 10px;
      font-size: 14px;
      white-space: pre-line;
    }
    .searchInputContainer{
      width: 50%;
      min-width: 250px;
      position: relative;
    }
    .searchIcon{
      position: absolute;
      left: 20px;
      top: 13px;
      width: 13px;
      opacity: .5;
    }
    .searchInput{
      width: 100%;
      padding-left: 40px; 
    }
    .selectInput{
      width: 20%;
      min-width: 235px;
      text-align: center;
      text-indent: 10px;
      color: rgba(0,0,0,.5);
    }
    `}</style>
  </div>
  );
});

export default search;