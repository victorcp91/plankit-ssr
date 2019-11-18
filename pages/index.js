import React, { useEffect, useState } from 'react';
import Switch from "react-switch";
import Head from 'next/head';
import Api from '../libs/Api';
import Header from '../components/Header';
import MainSlider from '../components/MainSlider';
import PresentationArea from '../components/PresentationArea';
import Search from '../components/Search';
import Filters from '../components/Filters';
import Channels from '../components/Channels';
import { comparableString } from '../libs/Utils';

import * as actionTypes from '../store/actions';
import { useSelector, useDispatch } from 'react-redux';

const Home = ({ initialFeaturedPosts, channels }) => {

  const [filteredPlants, setFilteredPlants] = useState(null);
  const [hideFilters, setHideFilters] = useState(null);
  const [findFilters, setFindFilters] = useState(null);
  const [loadingChannels, setLoadingChannels] = useState(false);
  const [loadingPlants, setLoadingPlants] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [foundPosts, setFoundPosts] = useState(null);
  const [sortMethod, setSortMethod] = useState('');
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [activeSection, setActiveSection] = useState('channels');
  
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setLoadingChannels(true);
  //   Api.getChannels().then(res => {
  //     setChannels(res);
  //     console.log(res);
  //     setLoadingChannels(false);
  //   });
  //   Api.getFeaturedPosts().then((res) => {
  //     setFeaturedPosts(res);
  //   })
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       Api.getUserData(user.uid).then(userData => {
  //         setUser({ ...userData });
  //       });
  //     } else {
  //       deleteUser();
  //     }
  // })}, [featuredPosts]);

  useEffect(() => {
    setFeaturedPosts(initialFeaturedPosts);
    if(channels.length){
      console.log(channels);
      dispatch({ type: actionTypes.SET_CHANNELS, channels});
    }
  }, []);

  const currentChannels = useSelector(state =>  state.channels);
  
  // useEffect(() => {
  //   let filterTimer = setTimeout(()=> {
  //     if(searchTerm){
  //       if(activeSection === 'plants'){
  //         setLoadingPlants(true);
  //         Api.getFilteredPlants(findFilters, searchTerm).then(res => {
  //           setPlants(res);
  //           setLoadingPlants(false);
  //         })
  //       } else {
  //         setLoadingChannels(true);
  //         Api.getSearchedChannels(searchTerm).then(res => {
  //           setChannels(res.channels);
  //           if(res.posts && res.posts.length){
  //             setFoundPosts(res.posts);
  //             res.posts.forEach(post => {
  //               setChannelPosts(post.channel, [post]);
  //             })
  //           }
  //           setLoadingChannels(false);
  //         })
  //       }
  //     } else {
  //       setFoundPosts(null);
  //     }
  //   },1500);
  //   return () => {
  //     clearTimeout(filterTimer)
  //   };
  // }, [searchTerm]);


  const toogleSection = () => {
    if(activeSection === 'channels'){
      setActiveSection('plants');
      if(!props.plants.length){
        setLoadingPlants(true);
        Api.getPlants().then((res) => {
          setPlants(res);
          setLoadingPlants(false);
        });
      }
    } else {
      setActiveSection('channels');
    }
  }

  const setCurrentSearchTerm = term => {
    setSearchTerm(term);
  }

  const filterChannels = () => {

    const tags = (names, key) => {
      let contains = false;
      names.forEach(tag => {
        if(comparableString(tag).includes(key)){
          contains = true;
        }
      });
      return contains;
    }

    let filteredChannels = currentChannels;
    if (searchTerm) {
      let keywords = searchTerm;
      const finalKeywords = comparableString(keywords).split(' '); 
      finalKeywords.forEach(key => {
        filteredChannels = filteredChannels.filter(channel => (comparableString(channel.name).includes(key) ||
        tags(channel.tags, key)));
      });
    }
    if(filteredChannels) {

      switch(sortMethod){
        case 'ascending':
          filteredChannels = filteredChannels.sort((a,b) => {
            if ( a.name < b.name ){
              return -1;
            }
            if ( a.name > b.name ){
              return 1;
            }
            return 0;
          });
          break;
        case 'descending':
          filteredChannels = filteredChannels.sort((a,b) => {
            if ( a.name < b.name ){
              return 1;
            }
            if ( a.name > b.name ){
              return -1;
            }
            return 0;
          });
          break;
        case 'byDate':
          break;
        default:
          break;
      }

      return filteredChannels;
    } return false;
    
  }

  const filterPosts = () => {
    let filteredPosts = foundPosts;
    if (searchTerm) {
      let keywords = searchTerm;
      const finalKeywords = comparableString(keywords).split(' '); 
      finalKeywords.forEach(key => {
        filteredPosts = filteredPosts.filter(post => (comparableString(post.title).includes(key) ||
        comparableString(post.description).includes(key)));
      });
    }
    if(filteredPosts) {
      switch(sortMethod){
        case 'ascending':
          filteredPosts = filteredPosts.sort((a,b) => {
            if ( a.title < b.title ){
              return -1;
            }
            if ( a.title > b.title ){
              return 1;
            }
            return 0;
          });
          break;
        case 'descending':
          filteredPosts = filteredPosts.sort((a,b) => {
            if ( a.title < b.title ){
              return 1;
            }
            if ( a.title > b.title ){
              return -1;
            }
            return 0;
          });
          break;
        case 'byDate':
          filteredPosts = filteredPosts.sort((a,b) => moment(b.createdAt).format('YYYYMMDD') - moment(a.createdAt).format('YYYYMMDD'));
          break;
        default:
          filteredPosts = filteredPosts.sort((a,b) => moment(b.createdAt).format('YYYYMMDD') - moment(a.createdAt).format('YYYYMMDD'));
          break;
      }
      return filteredPosts;
    } return [];
  }

  const orderedPosts = () => {
    let posts = featuredPosts;
    switch(sortMethod){
      case 'ascending':
        posts = posts.sort((a,b) => {
          if ( a.title < b.title ){
            return -1;
          }
          if ( a.title > b.title ){
            return 1;
          }
          return 0;
        });
        break;
      case 'descending':
        posts = posts.sort((a,b) => {
          if ( a.title < b.title ){
            return 1;
          }
          if ( a.title > b.title ){
            return -1;
          }
          return 0;
        });
        break;
      case 'byDate':
        posts = posts.sort((a,b) => moment(b.createdAt).format('YYYYMMDD') - moment(a.createdAt).format('YYYYMMDD'));
        break;
      default:
        posts = posts.sort((a,b) => {
          if ( a.populartitlePtBr < b.populartitlePtBr ){
            return 1;
          }
          if ( a.populartitlePtBr > b.populartitlePtBr ){
            return -1;
          }
          return 0;
        });
        break;
    }
    return posts;
  }

  return(
  <div>
    <Head>
      <title>Home</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Header />
    <div className="container">
      <MainSlider slides={featuredPosts}/>
      <PresentationArea text="Etiam luctus tincidunt justo in aliquam. Nulla quam diam, auctor et turpis nec, bibendum vehicula velit. Nulla sollicitudin ornare justo, a blandit est vehicula a. Integer imperdiet tortor eget congue consequat. Provitae justo auctor fermentum aliquet a sem." />
      <div className="switchArea">
        <button>Canais</button>
        <Switch
          height={22}
          width={40}
          uncheckedIcon={false}
          checkedIcon={false}
          offColor="#49a25a"
          onColor="#49a25a"
          className="switch"
          checked={activeSection === 'plants' ? true : false }
          onChange={toogleSection}
        />
        <button>Plantas</button>
      </div>
      <Search
        searchTerm={setCurrentSearchTerm}
        // order={setResultSort}
        placeholder={activeSection === 'channels' ? 'Buscar canal' : 'Buscar planta'}
        activeSection={activeSection}/>
      {activeSection === 'channels' ? 
        <div className="channelResults">
          {searchTerm && 
            <Channels
              channels={filterChannels()}
            />}
          {/* {searchTerm && foundPosts && 
            <Posts posts={filterPosts()}/>} */}
          <h2 className="lastPosts">Últimas postagens:</h2>
          {/* <Posts posts={orderedPosts()}/> */}
        </div>
        :<>
          <Filters/>
        </>
      }
    </div>
    
    <style jsx>{`
      .container{
        width: 100%;
        max-width: 1024px;
        margin: 0 auto;
        padding-top: 48px;
      }
      .switchArea{
        width: 100%;
        max-width: 80%;
        margin: 30px auto 0 auto;
      }
      .switchArea button{
        display: inline-block;
        vertical-align: middle;
        border: none;
        background: none;
        font-family: 'Helvetica Light';
        font-size: 14px;
        padding: 0;
        margin:0;
      }
      :global(.switch){
        display: inline-block;
        vertical-align: middle !important;
        margin: 0 5px;
      }
    `}</style>
  </div>
)}

export default Home

Home.getInitialProps = async () => {
  let initialFeaturedPosts = [];
  await Api.getFeaturedPosts().then(res => {
    initialFeaturedPosts = res;
  })
  let channels = [];
  await Api.getChannels().then(res => {
    channels = res;
    console.log(res);
  })
  
  return { initialFeaturedPosts, channels };
}



