import React, { useEffect, useState } from 'react';
import Switch from "react-switch";
import Head from 'next/head';
import Api from '../libs/Api';
import Header from '../components/Header';
import MainSlider from '../components/MainSlider';
import PresentationArea from '../components/PresentationArea';
import Search from '../components/Search';
import Filters from '../components/Filters';

import { useSelector } from 'react-redux';

const Home = ({ initialFeaturedPosts }) => {

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
  }, []);

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
      <Search/>
      <Filters/>
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
  await Api.getFeaturedPosts().then((res) => {
    initialFeaturedPosts = res;
  })
  return { initialFeaturedPosts };
}



