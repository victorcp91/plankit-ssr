import React, { useState } from 'react';

import Theme from '../libs/Theme';
import houseIcon from '../assets/icons/houseIcon.svg';
import pinIcon from '../assets/icons/pinIcon.svg';
import clipboardIcon from '../assets/icons/clipboardIcon.svg';

// import PlantInfo from './PlantInfo';
// import LoginModal from './LoginModal';


const plants = React.memo(props => {

  const [selectedPlant, setSelectedPlant] = useState(null);
  const [loginModalActive, setLoginModalActive] = useState(false);
  const [loginDisclaimer, setLoginDisclaimer] = useState('');

  const selectPlant = (plantId) => {
    setSelectedPlant(plantId);
    document.body.style.overflow = "hidden";
  }

  const getSelectedPlant = () => {
    return props.plants.find(plant => plant.id === selectedPlant);
  }

  const setMyGarden = plant => {
    
    if(!props.user || !props.user.gardem){
      setLoginDisclaimer('Para organizar suas plantas do seu jeitinho é necessário fazer login');
      toogleLoginModal();
    } else {
      if(props.user.gardem.find(p => p.id === plant.id)){
        props.removeGardemPlant(plant);
      }else{
        props.addGardemPlant(plant);
      }
    }
  }

  const toogleLoginModal = () => {
    setLoginModalActive(!loginModalActive);
  }

  const closeInfoModal = () => {
    setSelectedPlant(null);
  }

  const insideMyGardem = (plantId) => {
    if(props.user.gardem && props.user.gardem.length){
      return props.user.gardem.find(plant => plant.id === plantId)
    }
  }
  
  return(
    props.plants && props.plants.length || props.loading ? 
    <>
    <div className="plantsContainer">
      {selectedPlant && getSelectedPlant() ?
        <>
        <span className="overlay"/>
        {/* <PlantInfo
          plant={getSelectedPlant()}
          close={closeInfoModal}
          user={props.user}
          myGarden = {setMyGarden}
          /> */}
        </>: null }
      {props.plants.map(plant => (
        <div key={plant.id} className={`plantCard ${props.myArea ? "small" :'' }`}>
          <img className="imageContainer" src={plant.image} />
          <span className="mobileContainer">
            <div className="infoContainer">
              <h3 className="plantTitle">{plant.popularNamePtBr}</h3>
              <h4 className="otherNames">{plant.otherPopularNamesPtBr.map(name => <span key={name} className="other">{name}</span>)}</h4>
              <h5 className="scientificName">{plant.scientificName}</h5>
            </div>
            <div className="actionsContainer">
              <div className="labelArea">
                <button 
                  className={`actionButton
                  garden
                  ${insideMyGardem(plant.id) ? "active" : ''}
                  ${props.myArea ? "small" :'' }`}
                  onClick={() => setMyGarden(plant)}
                >
                  <img className="icon" src={houseIcon} alt="Meu Jardim"/>
                </button>
                <label className="label">
                  Adicionar ao<br/>Meu Jardim
                </label>
              </div>

              {/* <div className="labelArea}>
                <button className={`$"actionButton} $"location}`}>
                  <img className="icon} src={pinIcon} alt="Onde encontrar"/>
                </button>
                <label className="label}>
                Onde<br/>Encontrar
                </label>
              </div> */}
              <div className={`labelArea infoButton`}>
                <button
                  className={`actionButton info ${props.myArea ? "small" :'' }`}
                  onClick={() => selectPlant(plant.id)}>
                  <img className="icon" src={clipboardIcon} alt="Informações"/>
                </button>
                <label className="label">
                    Informações
                </label>
              </div>
            </div>
          </span>
        </div>
      ))}
    </div>
    {loginModalActive ?
      <>
        <span className="loginContainerOverlay" />
        {/* <LoginModal
          close={toogleLoginModal}
          disclaimer={loginDisclaimer}/> */}
      </> : null}
    </>
    : <>
      {props.loading ?
        <h1>LOADING</h1>
        :<h1>{props.myArea ? 'Você ainda não adicionou nenhuma planta no seu jardim': 'Ops! Nenhuma planta foi encontrada. :('}</h1>}
      </>
  );
});

export default plants;