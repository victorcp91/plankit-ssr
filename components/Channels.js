import React, { useState } from 'react';
import { Link } from 'next/link';
import { userSelector } from 'react-redux';
import Theme from '../libs/Theme';

const channels = React.memo(props => {

  const unfollow = (e) => {
    e.preventDefault();
    props.unfollow(e.target.value);
  }
  
  return(
    <>
      <div className={`${props.unfollow ? 'followedChannels' : 'channels'}`}>
        {props.channels.length ? 
          props.channels.map(channel => (
            <div className="channel">
              {props.unfollow ? <button className="delete" value={channel.id} onClick={unfollow}/>: null}
              <img
                className="profileImage"
                src={channel.profileImage}
                alt={channel.name}/>
              <div className="info">
                <h2 className="name">{channel.name}</h2>
                <p className="description">{channel.description}</p>
              </div>
            </div>
          )): 'Você ainda não está seguindo nenhum canal =('}
      </div>
      <style jsx>{`
        .channels {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          padding: 0 20px;
          box-sizing: border-box;
          justify-content: space-around;
        }
        @media only screen and (min-width: 600px) {
          .channels {
            justify-content: flex-start;
          }
        }
        @media only screen and (min-width: 1024px) {
          .channels {
            padding: 0;
          }
        }
        .channels .channel {
          display: block;
          position: relative;
          width: 35vw;
          text-decoration: none;
          color: ${Theme.black};
          font-family: 'Helvetica Light';
          margin-bottom: 40px;
          overflow: hidden;
        }
        @media only screen and (min-width: 600px) {
          .channels .channel {
            width: 170px;
          }
          .channels .channel:nth-child(2n) {
            margin-left: 0;
          }
          .channels .channel:nth-child(3n + 2) {
            margin-left: calc((100% - 510px)/2);
            margin-right: calc((100% - 510px)/2);
          }
        }
        @media only screen and (min-width: 760px) {
          .channels .channel:nth-child(3n + 2) {
            margin-left: 0;
            margin-right: 0;
          }
          .channels .channel:nth-child(4n + 2) {
            margin-left: calc((100% - 680px)/3);
            margin-right: calc((100% - 680px)/3);
          }
          .channels .channel:nth-child(4n + 3) {
            margin-right: calc((100% - 680px)/3);
          }
        }
        @media only screen and (min-width: 930px) {
          .channels .channel:nth-child(4n + 2) {
            margin-left: 0;
            margin-right: 0;
          }
          .channels .channel:nth-child(4n + 3) {
            margin-right: 0;
          }
          .channels .channel:nth-child(5n + 2) {
            margin-left: calc((100% - 850px)/4);
            margin-right: calc((100% - 850px)/4);
          }
          .channels .channel:nth-child(5n + 3) {
            margin-right: calc((100% - 850px)/4);
          }
          .channels .channel:nth-child(5n + 4) {
            margin-right: calc((100% - 850px)/4);
          }
        }
        .channel .profileImage {
          box-sizing: border-box;
          box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.1);
          background-color: #ebebeb;
          border: none;
          padding: 10px;
          font-size: 14px;
          white-space: pre-line;
          object-fit: cover;
          display: inline-block;
          width: 100%;
          height: 35vw;
        }
        @media only screen and (min-width: 600px) {
          .channels .channel .profileImage {
            max-width: 170px;
            max-height: 170px;
            width: 170px;
            height: 170px;
          }
        }
        .channels .channel .delete {
          box-sizing: border-box;
          box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.1);
          background-color: #ebebeb;
          border: none;
          padding: 10px;
          font-size: 14px;
          white-space: pre-line;
          position: absolute;
          right: 0px;
          top: 0px;
          transform: translate(25%, -25%);
          padding: 0;
          margin: 0;
          width: 40px;
          height: 40px;
          background-color: ${Theme.lightGray};
          border-radius: 50%;
          border: none;
          cursor: pointer;
        }
        .channels .channel .delete:before {
          position: absolute;
          content: '';
          left: 30%;
          bottom: 40%;
          display: block;
          width: 10px;
          height: 2px;
          transform: rotate(-45deg);
          background-color: ${Theme.red};
        }
        .channels .channel .delete:after {
          position: absolute;
          content: '';
          display: block;
          width: 10px;
          height: 2px;
          left: 30%;
          bottom: 40%;
          transform: rotate(45deg);
          background-color: ${Theme.red};
        }
        .channels .channel .name {
          margin: 5px 0;
          font-weight: bold;
          font-size: 14px;
        }
        .channels .channel .description {
          font-size: 12px;
        }
        .followedChannels {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        @media only screen and (min-width: 760px) {
          .followedChannels {
            justify-content: flex-start;
          }
        }
        .followedChannels .channel {
          display: block;
          position: relative;
          width: 35vw;
          text-decoration: none;
          color: ${Theme.black};
          font-family: 'Helvetica Light';
          margin-bottom: 20px;
          overflow: hidden;
        }
        @media only screen and (min-width: 600px) {
          .followedChannels .channel {
            width: 170px;
          }
        }
        @media only screen and (min-width: 760px) {
          .followedChannels .channel {
            width: 170px;
          }
          .followedChannels .channel:nth-child(3n + 2) {
            margin-left: calc((100% - 510px)/2);
            margin-right: calc((100% - 510px)/2);
          }
        }
        @media only screen and (min-width: 930px) {
          .followedChannels .channel {
            width: 170px;
          }
          .followedChannels .channel:nth-child(3n + 2) {
            margin: 0 0 20px 0;
          }
          .followedChannels .channel:nth-child(4n + 2) {
            margin-left: calc((100% - 680px)/3);
            margin-right: calc((100% - 680px)/3);
          }
          .followedChannels .channel:nth-child(4n + 3) {
            margin-right: calc((100% - 680px)/3);
          }
        }
        .followedChannels .channel .profileImage {
          box-sizing: border-box;
          box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.1);
          background-color: #ebebeb;
          border: none;
          padding: 10px;
          font-size: 14px;
          white-space: pre-line;
          object-fit: cover;
          display: inline-block;
          width: 100%;
          height: 35vw;
        }
        @media only screen and (min-width: 600px) {
          .followedChannels .channel .profileImage {
            max-width: 170px;
            max-height: 170px;
            width: 170px;
            height: 170px;
          }
        }
        .followedChannels .channel .delete {
          box-sizing: border-box;
          box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.1);
          background-color: #ebebeb;
          border: none;
          padding: 10px;
          font-size: 14px;
          white-space: pre-line;
          position: absolute;
          right: 0px;
          top: 0px;
          transform: translate(25%, -25%);
          padding: 0;
          margin: 0;
          width: 40px;
          height: 40px;
          background-color: ${Theme.lightGray};
          border-radius: 50%;
          border: none;
          cursor: pointer;
        }
        .followedChannels .channel .delete:before {
          position: absolute;
          content: '';
          left: 30%;
          bottom: 40%;
          display: block;
          width: 10px;
          height: 2px;
          transform: rotate(-45deg);
          background-color: ${Theme.red};
        }
        .followedChannels .channel .delete:after {
          position: absolute;
          content: '';
          display: block;
          width: 10px;
          height: 2px;
          left: 30%;
          bottom: 40%;
          transform: rotate(45deg);
          background-color: red;
        }
        .followedChannels .channel .name {
          margin: 5px 0;
          font-weight: bold;
          font-size: 14px;
        }
        .followedChannels .channel .description {
          font-size: 12px;
        }
      `}
      </style>
    </>
  );
});

export default channels;