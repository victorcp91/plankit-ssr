import React, { useState, useRef, useEffect } from 'react';
// import firebase from "firebase/app";
// import { connect } from 'react-redux';

// import { deleteUser } from '../store/user';

import { Theme } from '../libs/variables';
// import Api from '../libs/Api';
import logoIcon from '../assets/icons/plankitIcon.svg';
import userIcon from '../assets/icons/userIcon.svg';

// import LoginModal from './LoginModal';


const Header = React.memo(props => {

  const [ menuActive, setMenuActive ] = useState(false);
  const [ loginModalActive, setLoginModalActive ] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    }
  }, []);


  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setMenuActive(false);
    }
  };

  const toogleUserMenu = () => {
    setMenuActive(!menuActive);
  }

  const toogleLoginModal = () => {
    if(!loginModalActive){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
    setLoginModalActive(!loginModalActive);
    setMenuActive(!menuActive);
  }

  const logout = () => {
    // firebase.auth().signOut();
    setMenuActive(!menuActive);
    // deleteUser();
  }

  return (
    <header className="header">
      <div className="container">
        <div className="logoContainer">
          {/* <Link to="/"> */}
            <img src={logoIcon} className="logoIcon" alt="Logo Plankit" />
            <h1 className="logoName">PLAN<span className="textGreen">KI</span>T</h1>
          {/* </Link> */}
        </div>
        <div className="userMenuContainer" ref={wrapperRef}>
          <button onClick={toogleUserMenu} className="userMenuButton">
            {false && props.user.uid ?
            <img src={props.user.avatar} className="userAvatar" alt={props.user.display_name}/>
            :<img src={userIcon} className="userIcon" alt="User" />}
          </button>
          {menuActive ? 
            <ul className="userOptions">
              {props.user.uid ? 
              <>
                <li className="option">
                  <Link 
                    to="/minha-area"
                    className="link">
                      Minha Área
                  </Link>
                </li>
                <li className="option">
                  <button 
                    onClick={logout}
                    className="loginButton">
                      Sair
                  </button>
                </li>
              </>
              :
              <li className="option">
                <button 
                  onClick={toogleLoginModal}
                  className="loginButton">
                    Entrar
                </button>
              </li>
              }
            </ul>
          : null}
        </div>
      </div>
      {/* {loginModalActive ?
        <>
          <span className="loginContainerOverlay} />
          <LoginModal close={toogleLoginModal}/>
        </> : null} */}
      <style jsx>{`
        .header{
          top: 0;
          width: 100%;
          max-height: 48px;
          padding: 10px;
          box-sizing: border-box;
          background-color: rgba(247,247,247,.8);
          position: fixed;
          z-index: 2;
        }
        .container{
          display: flex;
          width: 100%;
          max-width: 1024px;
          margin: 0 auto;
        }
        .logoContainer{
          flex: 1;
          margin-left: 10px;
        }
        .logoIcon{
          max-width: 25px;
          display: inline-block;
          vertical-align: middle;
          margin-top: -5px;
        }
        .logoName{
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          font-family: 'Myriad Pro', sans-serif;
          color: ${Theme.black};
          font-size: 25px;
        }
        .textGreen{
          color: ${Theme.green};
        }
        .userMenuContainer{
          text-align: right;
          position: relative;
        }
        .userMenuButton{
          border: none;
          background-color: transparent;
          margin: 0 10px 0 0;
          padding: 0;
          cursor: pointer;
        }
        .userIcon, .userAvatar{
          display: block;
          width: 25px;
          height: 25px;
        }
        .userAvatar{
          border-radius: 50%;
        }
        .userOptions{
          position: absolute;
          align-items: center;
          right:-10px;
          top: 34px;
          z-index: 1;
          background-color: ${Theme.gray};
          min-width: 100px;
          min-height: 50px;
          box-sizing: border-box;
          padding: 10px;
        }
        .userOptions:before{
          content:'';
          position: absolute;
          display: block;
          width: 10px;
          height: 10px;
          background-color: ${Theme.gray};
          top: -5px;
          right: 17px;
          transform: rotate(45deg);
          z-index: 0;
        }
        .option{
          width: 100%;
          text-align: center;
          margin: 5px 0;
        }
        .loginButton,.link{
          width: 100%;
          border: none;
          background-color: transparent;
          color: ${Theme.white};
          font-family: 'Helvetica Rounded Bold';
          font-size: 12px;
          text-decoration: none;
          cursor: pointer;
        }
        .loginContainerOverlay{
          position: fixed;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0,0,0,.5);
          z-index: 2;
          top: 0;
          left: 0;
        }
      `}</style>
    </header>
  )
});

export default Header;