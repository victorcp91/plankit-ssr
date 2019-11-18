import React, { useState, useRef, useEffect } from 'react';

import sunIcon from '../assets/icons/sunIcon.svg';
import wateringCanIcon from '../assets/icons/wateringCanIcon.svg';
import shovelIcon from '../assets/icons/shovelIcon.svg';
import treeIcon from '../assets/icons/treeIcon.svg';
import carrotIcon from '../assets/icons/carrotIcon.svg';
import orangeIcon from '../assets/icons/orangeIcon.svg';
import flowerIcon from '../assets/icons/flowerIcon.svg';
import wheatIcon from '../assets/icons/wheatIcon.svg';
import warningIcon from '../assets/icons/warningIcon.svg';

import filtersList from '../libs/filters.json';
import { Theme } from '../libs/variables';

const filters = props => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [leftArrow, setLeftArrow] = useState(false);
  const [rightArrow, setRightArrow] = useState(true);

  const [filters, setFilters] = useState({
    direct_light: false,
    half_shadow: false,
    indirect_light: false,
    shadow: false,
    marshy_ground: false,
    moist_ground: false,
    dry_ground: false,
    sprinkler_watering: false,
    ground_planting: false,
    aerial_plant: false,
    water_plant: false,
    small_size: false,
    midsize: false,
    large: false,
    tree: false,
    vegetable_leaves: false,
    vegetable: false,
    herbs: false,
    pancs: false,
    hide_vegetable_garden: false,
    show_fruitiful: true,
    only_fruitful: false,
    hide_fruitful: false,
    show_floriferous: true,
    only_floriferous: false,
    hide_floriferous: false,
    show_bindweed: true,
    only_bindweed: false,
    hide_bindweed: false,
    thorns: false,
    poisonous: false,
    hide_dangerous: false
  });

  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  useEffect(() => {
    let filterTimer = setTimeout(()=> {
      // props.setFilters(getActiveFilters());
    },1500);
    return () => {
      clearTimeout(filterTimer)
    };
  }, [filters]);
  
  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setSelectedSection(null);
    }
  };

  const handleFiltersScroll = event => {
    if(event.currentTarget.scrollLeft > 0){
      setLeftArrow(true);
    } else {
      setLeftArrow(false);
    }
    if(event.currentTarget.scrollLeft + event.currentTarget.offsetWidth < event.currentTarget.scrollWidth){
      setRightArrow(true);
    } else {
      setRightArrow(false);
    }
  };

  const selectSection = value => {
    setSelectedSection(value);
  };

  const getFilterIcon = (icon) => {
    switch(icon){
      case 'sunIcon':
        return sunIcon;
      case 'wateringCanIcon':
        return wateringCanIcon;
      case 'shovelIcon':
        return shovelIcon;
      case 'treeIcon':
        return treeIcon;
      case 'carrotIcon':
        return carrotIcon;
      case 'orangeIcon':
        return orangeIcon;
      case 'flowerIcon':
        return flowerIcon;
      case 'wheatIcon':
        return wheatIcon;
      case 'warningIcon':
        return warningIcon;
      default:
        return warningIcon;
    }
  }

  const changeFilter = e => {
    const target = e.currentTarget;
    e.persist();

    const currentValue = filters[target.name];
    if(target.name === 'hide_vegetable_garden' && !currentValue){
      setFilters(filters => ({...filters,
        vegetable_leaves: false,
        vegetable: false,
        herbs: false,
        pancs: false,
        hide_vegetable_garden: !currentValue
      }));
    } else if(target.name === 'vegetable_leaves' ||
    target.name === 'vegetable' ||
    target.name === 'herbs' ||
    target.name === 'pancs'){
      setFilters(filters => ({...filters,
        hide_vegetable_garden: false,
        [target.name]: !currentValue
      }));
    } else if(target.name === 'hide_dangerous' && !currentValue){
      setFilters(filters => ({...filters,
        thorns: false,
        poisonous: false,
        hide_dangerous: !currentValue
      }));
    } else if(target.name === 'thorns' || target.name === 'poisonous'){
      setFilters(filters => ({...filters,
        hide_dangerous: false,
        [target.name]: !currentValue
      }));
    } else if(target.name === 'fruitful' ||
      target.name === 'floriferous' ||
      target.name === 'bindweed') {
        if(target.value.includes('show')) {
          setFilters(filters => ({...filters,
            [`hide_${target.name}`]: false,
            [`only_${target.name}`]: false,
            [`show_${target.name}`]: true
          }));
        } else if(target.value.includes('only')) {
          setFilters(filters => ({...filters,
            [`hide_${target.name}`]: false,
            [`show_${target.name}`]: false,
            [`only_${target.name}`]: true
          }));
        } else if(target.value.includes('hide')){
          setFilters(filters => ({...filters,
            [`only_${target.name}`]: false,
            [`show_${target.name}`]: false,
            [`hide_${target.name}`]: true
          }));
        }
    } else{
      setFilters(filters => ({...filters, [target.name]: !currentValue} ));
    }
  }

  const filterSectionActive = section => {
    const options = filtersList.filter(f => f.title === section)[0].options;
    if(options){
      const filters = getActiveFilters();
      for (let i = 0; i < options.length; i++) {
        if (filters.includes(options[i].title)) {
          return true;
        }
      }  
    }
    return false;
  }
  const filterSectionHidden = section => {
    const options = filtersList.filter(f => f.title === section)[0].options;
    if(options){
      const filters = getActiveFilters();
      for (let i = 0; i < options.length; i++) {
        if (filters.includes(options[i].title) && options[i].title.includes('hide')) {
          return true;
        }
      }  
    }
    return false;
  }

  const getActiveFilters = () => {
    const filtersList = Object.keys(filters).filter(key => filters[key] && !key.includes('show'));
    for(let i = 0; i < filtersList.length; i++){
      if(filtersList[i].includes('only')){
        filtersList[i] = filtersList[i].split('only_')[1];
      }
    }
    return filtersList;
  }

  const generateFilters = () => {
    const section = filtersList.filter(filter => filter.title === selectedSection)[0]
    if(section) {
      switch (section.options_type){
        case 'choose':
          return section.options.map(option => (
            <div key={option.title} className="checkItem">
              <input
                type="radio"
                id={option.title}
                name={section.title}
                defaultChecked={filters[option.title]}
                value={option.title}
                className="radioInput"
                onChange={changeFilter}
              />
              <label
                htmlFor={option.title}
                className="radioStyle"
              />
              <label
                htmlFor={option.title}
                className={`inputText
                ${option.title.includes('hide') ? "hide": ''}`}
                >{option.text}</label>
              <style jsx>{`
              .checkItem {
                margin: 10px 0;
                position: relative;
              }
              .radioInput {
                margin-right: 10px;
                width: 20px;
                height: 20px;
                opacity: 0;
                display: inline-block;
                vertical-align: middle;
              }
              .radioInput:checked + .inputStyle::after {
                content: '';
                display: block;
                width: 10px;
                position: absolute;
                height: 10px;
                left: 25%;
                top: 25%;
                background-color: ${Theme.green};
              }
              .radioInput:checked + .radioStyle::after {
                content: '';
                display: block;
                width: 10px;
                position: absolute;
                height: 10px;
                left: 25%;
                top: 25%;
                background-color: ${Theme.green};
                border-radius: 50%;
              }
              .radioStyle {
                position: absolute;
                width: 20px;
                height: 20px;
                left: 0px;
                background-color: ${Theme.gray};
                cursor: pointer;
                border-radius: 50%;
              }
              `}</style>
            </div>
          ));
        case 'check':
          return section.options.map(option => (
            <div key={option.title} className="checkItem">
              <input
                type="checkbox"
                id={option.title}
                name={option.title}
                className="checkInput"
                onChange={changeFilter}
                checked={filters[option.title]}
              />
               <label
                htmlFor={option.title}
                className="inputStyle"
                name={option.title}
                value={filters[option.title]}
              />
              <label
                htmlFor={section.title}
                className={`inputText
                ${option.title.includes('hide') ? "hide" : ''}`}
                >{option.text}</label>
              <style jsx>{`
                .checkItem {
                  margin: 10px 0;
                  position: relative;
                }
                .checkInput {
                  margin-right: 10px;
                  width: 20px;
                  height: 20px;
                  opacity: 0;
                  display: inline-block;
                  vertical-align: middle;
                }
                .checkInput:checked + .inputStyle::after{
                  content: '';
                  display: block;
                  width: 10px;
                  position: absolute;
                  height: 10px;
                  left: 25%;
                  top: 25%;
                  background-color: ${Theme.green};
                }
                .checkInput:checked + .radioStyle::after {
                  content: '';
                  display: block;
                  width: 10px;
                  position: absolute;
                  height: 10px;
                  left: 25%;
                  top: 25%;
                  background-color: ${Theme.green};
                  border-radius: 50%;
                }
                .inputStyle {
                  position: absolute;
                  width: 20px;
                  height: 20px;
                  left: 0px;
                  background-color: ${Theme.gray};
                  cursor: pointer;
                }
              `}</style>
            </div>
          ));
        default:
          return null;
      }
    }
  };

  return (
    <div className="container" ref={wrapperRef}>
      <div
        className="filtersSelectors"
        onScroll={handleFiltersScroll}>
        {leftArrow && <span className="previous" />}
        {filtersList.map((filter,index) => (
          <button
            key={filter.title}
            className={`selector
              ${selectedSection === filter.title ? "selected" : ''}
              ${filtersList.length -1 === index ?  "last" : ''}`}
            onClick={() => selectSection(filter.title)}
            >
            <span
              className={`${filterSectionActive(filter.title) ? "active" : ''}
              ${filterSectionHidden(filter.title) ? "hidden" : ''}`}/>
            <span className="iconContainer">
              <img className="icon" src={getFilterIcon(filter.icon)} alt={filter.title}/>
            </span>
            <span className="filterLabel">{filter.label}</span>
          </button>
        ))}
        {rightArrow && <span className="next" />}
      </div>
      <div className={`iconFields ${selectedSection ? "active" : ''}`}>
        {generateFilters()}
      </div>
      <style jsx>{`
      .container {
        width: 100%;
        position: relative;
        box-sizing: border-box;
      }
      @media only screen and (min-width: 600px) {
        .container {
          flex-wrap: wrap;
          margin: 20px auto 50px auto;
          width: 100%;
          max-width: calc(80% + 40px);
        }
      }
      @media only screen and (min-width: 875px) {
        .container {
          margin: 0 auto 50px auto;
        }
      }
      .filtersSelectors {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
        overflow-x: scroll;
        overflow-y: hidden;
      }
      .previous {
        display: block;
        position: absolute;
        z-index: 1;
        box-sizing: border-box;
        width: 30px;
        height: 100%;
        background-image: linear-gradient(to left, transparent 0, ${Theme.backgroundLightGray} 20%);
        top: 0;
        left: 0;
      }
      @media only screen and (min-width: 600px) {
        .previous {
          display: none;
        }
      }
      .previous:after {
        content: '';
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        border-bottom: 2px solid black;
        border-left: 2px solid black;
        top: 50%;
        left: 5px;
        transform: translate(50%, -50%) rotate(45deg);
      }
      .next {
        display: block;
        position: absolute;
        box-sizing: border-box;
        width: 30px;
        height: 100%;
        background-image: linear-gradient(to right, transparent 0, ${Theme.backgroundLightGray} 20%);
        top: 0;
        right: 0;
      }
      @media only screen and (min-width: 600px) {
        .next {
          display: none;
        }
      }
      .next:after {
        content: '';
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        border-bottom: 2px solid black;
        border-right: 2px solid black;
        top: 50%;
        right: 5px;
        transform: translate(-50%, -50%) rotate(-45deg);
      }
      @media only screen and (min-width: 600px) {
        .filtersSelectors {
          flex-wrap: wrap;
        }
      }
      .selector {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin: 35px 3.5%;
        padding: 0;
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
      .selector.last {
        padding-right: 40px;
      }
      @media only screen and (min-width: 600px) {
        .selector {
          margin: 20px;
        }
        .selector.last {
          padding-right: 0;
        }
      }
      .selector .active {
        display: block;
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: ${Theme.green};
        border-radius: 50%;
        position: absolute;
        top: 0px;
        right: 0px;
      }
      .selector .hidden {
        position: absolute;
        border-top: 2px solid ${Theme.red};
        height: 0;
        width: calc(100% + 12px);
        top: 50%;
        right: -6px;
        transform: rotate(-45deg);
      }
      .iconContainer {
        background-color: ${Theme.lightGray};
        box-shadow: inset 1px 1px 5px ${Theme.lightShadow};
        border-radius: 50%;
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color 0.5s cubic-bezier(0.63, 1.235, 1, 0.965);
      }
      .icon {
        width: 32px;
      }
      .filterLabel {
        margin-top: 5px;
        font-size: 14px;
        position: absolute;
        bottom: -25px;
        color: ${Theme.gray};
        transition: color 0.5s cubic-bezier(0.63, 1.235, 1, 0.965);
      }
      .selector:hover .iconContainer {
        background-color: ${Theme.gray};
      }
      .selector:hover .filterLabel {
        color: ${Theme.black};
      }
      .selector.selected .iconContainer {
        background-color: ${Theme.gray};
      }
      .selector.selected .filterLabel {
        color: ${Theme.black};
      }
      .iconFields {
        z-index: 1;
        width: 100%;
        top: 120%;
        position: absolute;
        background-color: rgba(247, 247, 247, .8);
        padding: 0px;
        margin: 0;
        box-sizing: border-box;
        transition: max-height 0.5s ease-in-out;
        max-height: 0;
        overflow: hidden;
      }
      @media only screen and (min-width: 875px) {
        .iconFields {
          width: 120%;
          left: -10%;
        }
      }
      .iconFields.active {
        max-height: 500px;
        padding: 20px 50px;
      }
      

      `}</style>
    </div>
  )
};

export default filters;